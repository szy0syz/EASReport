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
  //以后这里从数据库取，不要写死！
  var brandFString = ['尿素', '碳铵', '硫铵', '氯化铵', '硝磷铵', '普钙', '重钙', '钙镁', '磷铵', '富钙', '硫酸钾', '氯化钾', '硫酸钾肥', '高含量', '低含量']
  var brandF = [];
  //根据顺序初始化
  brandFString.forEach(function (s, i) {
    var o = {
      name: s,
      sumQty: 0,
      sumAmount: 0,
      data: []
    };
    brandF.push(o);
  })
  //根据数据分析,待优化!
  arrData.forEach(function (item) {
    brandF.forEach(function (brand) {  // 这里brand其实就是brandF里的每一个元素，对其修改肯定会改变。
      if (item.FBrandFertilizer == brand.name) {
        brand.sumQty += item.FBaseQty;
        brand.sumAmount += item.FAmount;  //修改为含税的
        brand.data.push(item);
      }
    });
  });
  /////
  //添加明细统计
  brandF.forEach((val) => {
    val.details = statDetails(val.data, (item) => {return item.FBrandFertilizer == val.name}, (item) => { return item.FMaterialType3})
  });

  //为统计对象中尿素结果排序！
  //待处理的数组藏在外层数组中，先循环找“尿素”吧。
  brandF.forEach((val) => {
    if(val.name == '尿素') {
      val.details.sort((a,b) => parseInt(a.number)-parseInt(b.number));
    }
  });
  

  brandF.push({
    name: '复合肥',
    sumQty: brandF[13].sumQty + brandF[14].sumQty,
    sumAmount: brandF[13].sumAmount + brandF[14].sumAmount
  });
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
  statRes.sumUreaSubBranchMaterialDetailQty = utils.filterAndGroupAndSumByColumn(arrData, {
    filter: function(item) { //先过滤出来五大分公司所有库存尿素物料明细
      return item.CorrStorageOrgUnit != '进出口部' && item.FInventoryEndQty != 0 && item.FBrandCarbaMind != '非尿素'
    },
    group: function(item) {
      return item.FMaterial; //以物料名称分组
    },
    colName: 'FInventoryEndQty'
  })

  //invtObj.sumFertSubBranchQtyEx = 碳铵207吨，硝磷铵1468吨，普钙804吨，重钙695吨，钙镁磷190吨，磷铵112吨，钾肥5490吨，复合肥11460吨
  //求五大分公司库存除尿素和其它化肥以外 物料明细数组
  arrData = [];
  arrData = arrDataOri.slice();
  statRes.sumFertSubBranchQtyEx = utils.filterAndGroupAndSumByColumn(arrData, {
    filter: function(item) { //
      return item.CorrStorageOrgUnit != '进出口部' && item.FInventoryEndQty != 0 && item.FBrandFertilizer != '其它' && item.FBrandFertilizer != '尿素'
    },
    group: function(item) {
      return item.FBrandFertilizer; //以化肥类别
    },
    colName: 'FInventoryEndQty'
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

/////////////////////////////////////////
module.exports = function(startDate) {
  let bizDateStart = Moment(startDate);
  let bizDateEnd = Moment(startDate);
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

  var queryPurIn = sequelize.query(sqlCommand.purIn, {
    type: sequelize.QueryTypes.SELECT,
    model: PurInEntry,
    replacements: {
      FBizDateStart: strDateStart,
      FBizDateEnd: strDateEnd
    }
  });

  var queryPurInCurtAcc = sequelize.query(sqlCommand.purIn, {
    type: sequelize.QueryTypes.SELECT,
    model: PurInEntry,
    replacements: {
      FBizDateStart: Moment(strDateStart).month(0).date(1).format('YYYY-MM-DD'), //set month=1
      FBizDateEnd: strDateEnd
    } 
  });

  var queryPurInLastAcc = sequelize.query(sqlCommand.purIn, {
    type: sequelize.QueryTypes.SELECT,
    model: PurInEntry,
    replacements: {
      FBizDateStart: Moment(strDateStart).add(-1, 'year').month(0).date(1).format('YYYY-MM-DD'), //set year-1, month=1
      FBizDateEnd: Moment(strDateEnd).add(-1, 'year').format('YYYY-MM-DD')
    }
  });

  let queryInventory = sequelize.query(sqlCommand.Invt, {
    type: sequelize.QueryTypes.SELECT,
    model: InventoryEntry,  //如果是结账日之后,统计到次月1日.
    replacements: { FBizDateEnd:  isEndMonth ? Moment(strDateEnd).add(1, 'M').date(1).format('YYYY-MM-DD') : strDateEnd }
  });

  Promise.join(query, queryCurtAcc, queryLastAcc, queryPurIn, queryInventory, function (curtData, curtAccData, lastAccData, curtPurData, invtData) {
    const statSaleRes = {
      sumCurtQty: utils.sumByColumnName(curtData, 'FBaseQty'),
      sumCurtAmount: utils.sumByColumnName(curtData, 'FAmount'),
      statFertRes: statFert(curtData),
      sumAccCurtQty: utils.sumByColumnName(curtAccData, 'FBaseQty'),  //本年度累计数量
      sumAccCurtAmount: utils.sumByColumnName(curtAccData, 'FAmount'),//本年度累计金额
      sumAccLastQty: utils.sumByColumnName(lastAccData, 'FBaseQty'),  //去年同期累计数量
      sumAccLastAmount: utils.sumByColumnName(lastAccData, 'FAmount'),//去年统计累计金额
      statDetails: statDetails(curtData,function(v) { return v.FBrandCarbaMind != '非尿素' },function(item) {return item.FMaterialNumber})
    };
    const statPurRes = {
      sumCurtQty: utils.sumByColumnName(curtPurData, 'FBaseQty'),
      sumCurtAmount: utils.sumByColumnName(curtPurData, 'FTaxAmount'),
      statFertRes: statFert(curtPurData),
      statDetails: statDetails(curtData,function(v) { return v.FBrandCarbaMind != '非尿素' },function(item) {return item.FMaterialNumber})
    };
    const statInvtRes = statInventory(invtData);

    const dailyObj = {
      date: startDate,
      pur: statPurRes,
      sale: statSaleRes,
      invt: statInvtRes,
    };

    const report = dailyTemplate(dailyObj);
    
    jsonrw.writeJSON(config.pathDailyJson + startDate.toString().slice(0,4) + '/' + startDate + '.json', dailyObj);

    // let obj = jsonrw.readJSON(config.pathDailyJson + startDate.toString().slice(0,4) + '/' + startDate + '.json');
    // console.dir(obj.sale);

    fs.writeFile('./public/'+ startDate +'.txt', report, 'utf8', function() { 
      console.log('写入完成。');
    });

  });
}