//日报表统计算法
//参数：目标日期

const Moment = require('moment');
let Promise = require("bluebird");
const Sequelize = require('../../config/sequelize');
const loadModels = require('../../config/loadModels');
const fs = require('fs')
const config = require('../../config/config');
const utils = require('../utils/util');
const jsonrw = require('../utils/jsonRW');
let dailyInvtModel = require('../models/daily.invt.model');
let dailyTemplate = require('../../config/templates/daily');

const sequelize = Sequelize();

const SaleIssueEntry = loadModels(sequelize, 'SaleIssueEntry');
const PurInEntry = loadModels(sequelize, 'PurInEntry');
const InventoryEntry = loadModels(sequelize, 'InventoryEntry');

const Command = require('../../db/sqlCommand');


/////////////
Object.defineProperty(Array.prototype, 'group2', {
  enumerable: false,
  value: function (key) {
    var map = {};
    this.map(e => ({ k: key(e), d: e })).forEach(e => {
      map[e.k] = map[e.k] || [];
      map[e.k].push(e.d);
    });
    return Object.keys(map).map(k => ({ key: k, data: map[k] }));
  }
});
/////////////

Object.defineProperty(Array.prototype, 'group', {
  enumerable: false,
  value: function (key) {
    var map = {};
    this.forEach(function (e) {
      var k = key(e);
      map[k] = map[k] || [];
      map[k].push(e);
    })
    return Object.keys(map).map(function (k) {
      return { key: k, data: map[k] };
    })
  }
})

//根据传入的数组分析化肥大类统计结果，返回的是一个对象数组。
//其中返回对象格式：
// {
//   name:'高含量',
//   sumQty: 120,
//   sumAmount: 400320.00,
//   detail: [...{key: '火炬牌', name:'火炬牌复合肥', model: '15-15-15,50kg', sumQty: 120, sumAmount: 258000, type0:'化肥', type1: '复合肥', type2: '火炬牌', type3: '火炬牌', data:[metadata]}...],
//   data: [...metadata...]
// }
function statFert(arrData) {
  var brandF = [];
  //算法已经重构并解耦
  //将数据库metadata先过滤，再分组[{key:'xxx',data: [...]}, {key: 'yyy', data: [...]}]，最后合计字段后将结果存入对象。
  arrData
    .filter((item) => item.FBrandFertilizer != '非化肥')
    .group((item) => item.FBrandFertilizer)
    .forEach((val) => {
      brandF.push({
        name: val.key,
        sumQty: utils.sumByColumnName(val.data, 'FBaseQty'),
        sumAmount: utils.sumByColumnName(val.data, 'FAmount'),
        data: val.data
      });
    });

  /////
  //添加明细统计
  brandF.forEach((val) => {
    val.details = statDetails(val.data, (item) => {return item.FBrandFertilizer == val.name}, (item) => { return item.FMaterialNumber}) //修改为按物料编码聚合
  });

  //为统计对象中尿素结果排序！
  //待处理的数组藏在外层数组中，先循环找“尿素”吧。
  brandF.forEach((val) => {
    if(val.name == '尿素') {
      val.details.sort((a,b) => parseInt(a.number)-parseInt(b.number));
    }
  });

  //为化肥大类排序，使用FFertGroupID排序
  brandF.sort((a,b) => {
    if(a.data.length >0 && b.data.length >0) {
      return a.data[0].FFertGroupID - b.data[0].FFertGroupID;
    }
    return 0;
  });  

  // 复合肥这里要修复的哦！！！！！
  // brandF.push({
  //   name: '复合肥',
  //   sumQty: brandF[13].sumQty + brandF[14].sumQty,
  //   sumAmount: brandF[13].sumAmount + brandF[14].sumAmount
  // });
  //返回结果
  return brandF;
}

/////////////////
// 这个明细直接必须直接明细到具体物料,否这算法会出错.
// 这个算法还是有点耦合了,后期改。
// 返回对象{key: '火炬牌', name:'火炬牌复合肥', model: '15-15-15,50kg', sumQty: 120, sumAmount: 258000, type0:'化肥', type1: '复合肥', type2: '火炬牌', type3: '火炬牌', data:[metadata]}
/////////////////
function statDetails(arrData, filter, group) {
  let res = [],
      accObj = [];
  arrData
    .filter(filter)
    .group(group)
    .forEach((value, index) => {
      let o = {
        key: value.key,
        name: value.data[0].FMaterial, //因为这里经过Object.keys,所以肯定是有值.
        model: value.data[0].FMaterialModel,
        number: value.data[0].FMaterialNumber, //加入物料编码，排序用
        type0: value.data[0].FMaterialType0,
        type1: value.data[0].FMaterialType1,
        type2: value.data[0].FMaterialType2,
        type3: value.data[0].FMaterialType3,
        sumQty: 0,
        sumAmount: 0,
        data: []
      };
      accObj = value.data.reduce((acc, val) => {
        acc.sumQty += val.FBaseQty;
        acc.sumAmount += val.FTaxAmount;
        acc.data.push(val);
        return acc;
      }, { sumQty: 0, sumAmount: 0, data: [] });
      o.sumQty = accObj.sumQty;
      o.sumAmount = accObj.sumAmount;
      o.data = accObj.data;
      res.push(o);
    })
    return res;
}

/////////////////////////////////////////////////////////////////////////////////
//统计及时库存
function statInventory(arrData, options) {
  //初始化统计结果对象
  let statRes = {
    sumFertQty:       0, //化肥总数量
    sumFertSubBranchQty: 0,       //除去进出口部,尿素&其他化肥 分公司的化肥库存总数
    sumFertSubBranchDetailQty: [], //除去进出口部,尿素&其他化肥 分公司的化肥库存分类明细
    sumUreaSubBranchDetailQty: [], //除进出口部分公司尿素库存总数
    sumUreaSubBranchQty: 0,  //五大分公司库存尿素总数
    sumUreaSubBranchMaterialDetailQty: [], //五大分公司说库存具体尿素物料明细
    sumOtherFertSubBranchQty: 0,  //除进出口部分公司其他化肥总数
    sumOtherFertSubDetailQty: [],  //除进出口部分公司其他化肥明细数组
    jckSumFertQty: 0,     //进出口部化肥库存总数
    jckSumFertDetailQty: 0 //进出口部化肥库存明细数据
  }

  //--------------------------------------------------------
  //将分公司所属直营店修正后放入CorrStorageOrgUnit，此字段仅有分公司名称。
  arrData.map((item) => {
    if(item.FParentStorageOrgUnit == '云南供销农资连锁总部') {
      item.CorrStorageOrgUnit = item.FShopAttributionUnit;
    }
    else if(item.FParentStorageOrgUnit == '分公司') {
      item.CorrStorageOrgUnit = item.FStorageOrgUnit;
    }
    else {
      item.CorrStorageOrgUnit = item.FParentStorageOrgUnit;
    }
  });

  // arrDataOri代表未分组时库存物料信息(已经细分过两次) 
  let arrDataOri = arrData.slice(); //复制数组,已经是新数组,引用已变.

  //----求公司的库存化肥数量
  statRes.sumFertQty = utils.sumByColumnName(arrData, 'FInventoryEndQty').toFixed(config.decimalDigitsInvt);

  //----------求五大分公司化肥库存数量数组
  arrData = [];
  arrData = arrDataOri.slice();
  statRes.sumFertSubBranchDetailQty = utils.filterAndGroupAndSumByColumn(arrData, {
    filter: function(item) { //过滤非进出口部，非期末库存为0
      return item.CorrStorageOrgUnit != '进出口部' && item.FInventoryEndQty != 0 //过滤非进出口部
    },
    group: function(item) {
      return item.CorrStorageOrgUnit; //按修正后的库存组织分组聚会
    },
    colName: 'FInventoryEndQty' //按期末库存求和
  })

  //----------求五大分公司化肥库存数量数组
  statRes.sumFertSubBranchQty = utils.sumByColumnName(statRes.sumFertSubBranchDetailQty, 'sum').toFixed(config.decimalDigitsInvt);
  //----------

  //----------求公司尿素库存数量数组
  arrData = [];
  arrData = arrDataOri.slice();
  statRes.sumUreaSubBranchDetailQty = utils.filterAndGroupAndSumByColumn(arrData, {
    filter: function(item) { //过滤非进出口部，非期末库存为0
      return item.CorrStorageOrgUnit != '进出口部' && item.FInventoryEndQty != 0 && item.FBrandCarbaMind != '非尿素' 
    },
    group: function(item) {
      return item.CorrStorageOrgUnit; //按修正后的库存组织分组聚会
    },
    colName: 'FInventoryEndQty' //按期末库存求和
  })
  //----------

  //----求五大分公司的库存尿素数量
  statRes.sumUreaSubBranchQty = utils.sumByColumnName(statRes.sumUreaSubBranchDetailQty, 'sum').toFixed(config.decimalDigitsInvt);

  //求五大分公司库存尿素物料明细数组, 云化2767吨，解化2吨，川化2吨，美丰3363吨，湖光7.......
  arrData = [];
  arrData = arrDataOri.slice();
  statRes.sumUreaSubBranchMaterialDetailQty = utils.filterAndGroupAndSumByColumnWithDetails(arrData, {
    filter: function(item) { //先过滤出来五大分公司所有库存尿素物料明细
      return item.CorrStorageOrgUnit != '进出口部' && item.FInventoryEndQty != 0 && item.FBrandCarbaMind != '非尿素'
    },
    group: function(item) {
      return item.FMaterialType3; //以物料品牌分类3聚合
    },
    colName: 'FInventoryEndQty'
  })

  statRes.sumUreaSubBranchMaterialDetailQty.sort((a, b)=> {   
    if(a.data.length >0 && b.data.length >0) {
      return a.data[0].FNumber - b.data[0].FNumber; //靠这里全是尿素，不能那个用FFertGroupID比较
    }
    else 0;
  })

  //invtObj.sumFertSubBranchQtyEx = 碳铵207吨，硝磷铵1468吨，普钙804吨，重钙695吨，钙镁磷190吨，磷铵112吨，钾肥5490吨，复合肥11460吨
  //求五大分公司库存除尿素和其它化肥以外 物料明细数组
  arrData = [];
  arrData = arrDataOri.slice();
  statRes.sumFertSubBranchQtyEx = utils.filterAndGroupAndSumByColumnWithDetails(arrData, {
    filter: function(item) { //
      return item.CorrStorageOrgUnit != '进出口部' && item.FInventoryEndQty != 0 && item.FBrandFertilizer != '其它' && item.FBrandFertilizer != '尿素'
    },
    group: function(item) {
      return item.FBrandFertilizer; //以化肥类别
    },
    colName: 'FInventoryEndQty'
  })

  statRes.sumFertSubBranchQtyEx.sort((a, b)=> {   
    if(a.data.length >0 && b.data.length >0) {
      return a.data[0].FFertGroupID - b.data[0].FFertGroupID; //靠这里全是尿素，不能那个用FFertGroupID比较
    }
    else 0;
  })

  //sumOtherFertSubBranchQty = 其它98吨
  //sumOtherFertSubDetailQty = 纳若夏有机肥19吨，明月47吨，金满田32吨
  statRes.sumOtherFertSubDetailQty = utils.filterAndGroupAndSumByColumn(arrData, {
    filter: function(item) {
      return item.CorrStorageOrgUnit != '进出口部' && item.FInventoryEndQty != 0 && item.FBrandFertilizer == '其它';
    },
    group: function(item) {
      return item.FMaterialType2;
    },
    colName: 'FInventoryEndQty'
  })
  statRes.sumOtherFertSubBranchQty = utils.sumByColumnName(statRes.sumOtherFertSubDetailQty, 'sum').toFixed(config.decimalDigitsInvt);

  //---------------求进出口部库存化肥明细---------------------
  arrData = [];
  arrData = arrDataOri.slice();
  statRes.jckSumFertDetailQty = utils.filterAndGroupAndSumByColumn(arrData, {
                      filter: function(item) {
                        return item.CorrStorageOrgUnit == '进出口部' && item.FInventoryEndQty != 0; //过滤进出口部数据
                      },
                      group: function(item) {
                        return item.FBrandFertilizer; //按化肥类别分组
                      },
                      colName: 'FInventoryEndQty'
                    });
  statRes.jckSumFertQty = utils.sumByColumnName(statRes.jckSumFertDetailQty, 'sum').toFixed(config.decimalDigitsInvt);
  //arrJCKDetail.map((item) =>  {return Number(item.sum).toFixed(1)});
  //--------------------------------------------------------

  let invtRes1 = statRes;
  Object.keys(invtRes1).forEach((k,i) =>  {
    if(Object.prototype.toString.call(invtRes1[k]) === '[object Array]') {
      invtRes1[k] = invtRes1[k].reduce((acc, val) => {
        acc.push(`${val['name']}${val['sum'].toFixed(config.decimalDigitsInvt)}吨`);
        return acc;
      },[]).join();
    }
  });
  return statRes;
}



//---------------------------
// // 分公司累计销售155872吨，同比增长18%；累计销额23748万元，同比增长31% || 进出口部累计销售68032吨，同比增长84%；累计销额9392万元，同比增长23%
// (((statRes.sumAccCurtAmount - statRes.sumAccLastAmount) / statRes.sumAccLastAmount) * 100).toFixed()
function statAccCurtLast(filter, curtAccData, lastAccData, orgName) {
  const curtAccQty = utils.sumByColumnName(curtAccData.filter(filter), 'FBaseQty').toFixed()
  const curtAccAmount = utils.sumByColumnName(curtAccData.filter(filter), 'FAmount').toFixed()
  const lastAccQty = utils.sumByColumnName(lastAccData.filter(filter), 'FBaseQty').toFixed()
  const lastAccAmount = utils.sumByColumnName(lastAccData.filter(filter), 'FAmount').toFixed()

  const qtyRatio = (((curtAccQty - lastAccQty) / lastAccQty) * 100).toFixed()
  const amountRatio =  (((curtAccAmount - lastAccAmount) / lastAccAmount) * 100).toFixed()

  return orgName + '累计销售' + curtAccQty + '吨，' + '同比' + utils.isGrowth(qtyRatio) + qtyRatio + '%；累计销额' + (curtAccAmount/10000).toFixed() + '万元，同比' + utils.isGrowth(amountRatio) + amountRatio + '%'
}


/////////////////////////////////////////
module.exports = function(startDate, endDate) {
  let bizDateStart = Moment(startDate);
  let bizDateEnd = Moment(endDate);
  let day = Moment(startDate).date();
  let isEndMonth = day >= 26 && day <= 31 ? true : false;
  if (isEndMonth) {
    bizDateEnd = bizDateEnd.add(1, 'd');
  }

  let strDateStart = bizDateStart.format('YYYY-MM-DD');
  let strDateEnd = bizDateEnd.format('YYYY-MM-DD');

  let sqlCommand = new Command(startDate); //实例化Command对象

  var query = sequelize.query(sqlCommand.saleOut, {
    type: sequelize.QueryTypes.SELECT, // 只返回Sequelize查询到结果，不返回数据库的元数据。
    model: SaleIssueEntry,
    replacements: {
      FBizDateStart: strDateStart,
      FBizDateEnd: strDateEnd
    }
  });

  var queryPurIn = sequelize.query(sqlCommand.purIn, {
    type: sequelize.QueryTypes.SELECT,
    model: PurInEntry,
    replacements: {
      FBizDateStart: strDateStart,
      FBizDateEnd: strDateEnd
    }
  });

  var queryCurtAcc = sequelize.query(sqlCommand.saleOut, {
    type: sequelize.QueryTypes.SELECT,
    model: SaleIssueEntry,
    replacements: { //每次必须重新实例化Moment对象,要不然对其的操作是影响原来的值!!!!
      FBizDateStart: Moment(strDateStart).month(0).date(1).format('YYYY-MM-DD'), //set month=1
      FBizDateEnd: Moment(strDateEnd).format('YYYY-MM-DD')
    }
  });

  var queryLastAcc = sequelize.query(sqlCommand.saleOut, {
    type: sequelize.QueryTypes.SELECT,
    model: SaleIssueEntry,
    replacements: {
      FBizDateStart: Moment(strDateStart).add(-1, 'year').month(0).date(1).format('YYYY-MM-DD'), //set year-1, month=1
      FBizDateEnd: Moment(strDateEnd).add(-1, 'year').format('YYYY-MM-DD')
    }
  });

  // var queryPurInCurtAcc = sequelize.query(sqlCommand.purIn, {
  //   type: sequelize.QueryTypes.SELECT,
  //   model: PurInEntry,
  //   replacements: {
  //     FBizDateStart: Moment(strDateStart).month(0).date(1).format('YYYY-MM-DD'), //set month=1
  //     FBizDateEnd: strDateEnd
  //   } 
  // });

  // var queryPurInLastAcc = sequelize.query(sqlCommand.purIn, {
  //   type: sequelize.QueryTypes.SELECT,
  //   model: PurInEntry,
  //   replacements: {
  //     FBizDateStart: Moment(strDateStart).add(-1, 'year').month(0).date(1).format('YYYY-MM-DD'), //set year-1, month=1
  //     FBizDateEnd: Moment(strDateEnd).add(-1, 'year').format('YYYY-MM-DD')
  //   }
  // });

  let queryInventory = sequelize.query(sqlCommand.Invt, {
    type: sequelize.QueryTypes.SELECT,
    model: InventoryEntry,  //如果是结账日之后,统计到次月1日.
    replacements: { FBizDateEnd:  isEndMonth ? Moment(strDateEnd).add(1, 'M').date(1).format('YYYY-MM-DD') : strDateEnd }
  });

  Promise.join(query, queryCurtAcc, queryLastAcc, queryPurIn, queryInventory, function (curtData, curtAccData, lastAccData, purInData, invtData) {

    // 一、购进统计
    const statPurRes = { 
      sumCurtQty: utils.sumByColumnName(purInData, 'FBaseQty'),
      sumCurtAmount: utils.sumByColumnName(purInData, 'FTaxAmount'),
      statFertRes: statFert(purInData),
      statDetails: statDetails(purInData, function(v) { return v.FBrandCarbaMind != '非尿素' },function(item) {return item.FMaterialNumber})
    };

    // 二、销售统计
    const statSaleRes = {
      sumCurtQty: utils.sumByColumnName(curtData, 'FBaseQty'),
      sumCurtAmount: utils.sumByColumnName(curtData, 'FAmount'),
      statFertRes: statFert(curtData),
      statDetails: statDetails(curtData,function(v) { return v.FBrandCarbaMind != '非尿素' },function(item) {return item.FMaterialNumber})
    };

    // 三、销售累计
    const satateSaleAccRes = {
      sumAccCurtQty: utils.sumByColumnName(curtAccData, 'FBaseQty'),  //本年度累计数量
      sumAccCurtAmount: utils.sumByColumnName(curtAccData, 'FAmount'),//本年度累计金额
      sumAccLastQty: utils.sumByColumnName(lastAccData, 'FBaseQty'),  //去年同期累计数量
      sumAccLastAmount: utils.sumByColumnName(lastAccData, 'FAmount'),//去年统计累计金额
      subAcc: statAccCurtLast(function (item) {
        return item.FStorageOrgUnit != '进出口部' // 必须是化肥已经在sql命令中过滤
      }, curtAccData, lastAccData, '分公司'), // 统计某些个组织的今去年累计 
      jckAcc: statAccCurtLast((item) => item.FStorageOrgUnit == '进出口部', curtAccData, lastAccData, '进出口部')
  } 

    // 四、库存
    const statInvtRes = statInventory(invtData);

    const dailyObj = {
      startDate: startDate,
      endDate: endDate,
      pur: statPurRes,
      sale: statSaleRes,
      saleAcc: satateSaleAccRes,
      invt: statInvtRes,
    };

    const report = dailyTemplate(dailyObj);
    
    //json 暂时不写
    //jsonrw.writeJSON(config.pathDailyJson + startDate.toString().slice(0,4) + '/' + startDate + '.json', dailyObj);

    fs.writeFile('./public/'+ startDate + '_' + endDate +'.txt', report, 'utf8', function() { 
      console.log('写入完成。');
    });

  });
}