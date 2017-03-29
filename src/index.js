//var Sequelize = require('Sequelize');
var Moment = require('moment');
var Promise = require("bluebird");
const Sequelize = require('./config/sequelize');
const loadModels = require('./config/loadModels')
const fs = require('fs')

// var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001",{dialectOptions: {
//     requestTimeout: 60*1000
//   }});
// var SaleIssueEntry = sequelize.import('./models/SaleIssueEntry');
// var PurInEntry = sequelize.import('./models/PurInEntry');
// let InventoryEntry = sequelize.import('./models/InventoryEntry');

let sequelize = Sequelize();

let SaleIssueEntry = loadModels(sequelize, 'SaleIssueEntry');
let PurInEntry = loadModels(sequelize, 'PurInEntry');
let InventoryEntry = loadModels(sequelize, 'InventoryEntry');

var Command = require('./db/sqlCommand');


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

  brandF.push({
    name: '复合肥',
    sumQty: brandF[13].sumQty + brandF[14].sumQty,
    sumAmount: brandF[13].sumAmount + brandF[14].sumAmount
  });
  //返回结果
  return brandF;
}

// 这个算法已经被更新不用了
// function statUrea(arrData) {
//   var brandC = accObj = [];
//   arrData
//     .filter(function (v) { return v.FBrandCarbaMind != '非尿素' })
//     .group(ii => ii.FMaterialType3)
//     .forEach(function (v1, i1) {
//       var o = {
//         name: v1.key,
//         sumQty: 0,
//         sumAmount: 0,
//         data: []
//       }
//       // 一次循环求两个字段的和
//       accObj = v1.data.reduce((acc, val) => {
//         acc.sumQty += val.FBaseQty;
//         acc.sumAmount += val.FTaxAmount;   //修改为含税的
//         acc.data.push({
//           materialNumber: val.FMaterialNumber,
//           materialName: val.FMaterial,
//           materialModel: val.FMaterialModel,
//           qty: val.FBaseQty,
//           amount: val.FTaxAmount   //修改为含税的
//         })
//         return acc;
//       }, { sumQty: 0, sumAmount: 0, data: [] }); //初始化acc对象！
//       o.sumQty = accObj.sumQty;
//       o.sumAmount = accObj.sumAmount;
//       o.data = accObj.data;
//       brandC.push(o);
//     });
//   //返回处理结果
//   return brandC;
// }

/////////////////
// 这个明细直接必须直接明细到具体物料,否这算法会出错.
// 这个算法还是有点耦合了,后期改。
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

function sumByColumnName(arrData, cn) {
  let sum = arrData.reduce((acc, val) => {
    acc += Number(val[cn]);
    return acc;
  }, 0);
  return sum;
}

function groupAndSumByColumn(arrData, group, colName) {
  // 要保证arrData里的数据没有null！
  arrData = arrData.group(group);
  arrData = arrData.reduce((acc, val) => {
    acc.push({
      name: val.key,
      sum: sumByColumnName(val.data, colName)
    })
    return acc;
  }, [])
}

/////////////////////////////////////////////////////////
// paras:  arrData = sql metadata models
//         options = {fitter, group, colName}
// return: array[{name: xx, sum:yy}, {name: xx, sum:yy}]
function filterAndGroupAndSumByColumn(arrData, options) {
  // 检查arrData不能为空，为空educe报错。
  if(arrData) {
    // 先过滤
    if(options.filter) {
      arrData = arrData.filter(options.filter);
    }
    // 再分组
    if(options.group) {
      arrData = arrData.group(options.group);
    }
    // 最后聚合
    arrData = arrData.reduce((acc, val) => {
    acc.push({
      name: val.key,
      sum: sumByColumnName(val.data, options.colName) //待判断！！
    })
    return acc;
  }, [])
}
return arrData;
  return [];
}

////CorrStorageOrgUnit
function statInventory(arrData, options) {
  let statRes = {
    sumFertQty: 0,
    sumUreaQty: 0,
    summaryFert: [],
    summartUrea: [],
    detailUrea: [],
    detailFert: [],
    detailOtherFert: []
  }
  ///////为了把直营店数据联合进分公司
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
  ////////再细分组织，仅有分公司和进出口部
  arrData.map((item) => {
    if(item.FStorageOrgUnit == '进出口部') {
      item.CorrStorageOrgUnitPlus = '进出口部';
    }
    else{
      item.CorrStorageOrgUnitPlus = '分公司';
    }
  })

  // arrDataOri代表未分组时库存物料信息(已经细分过两次) 
  let arrDataOri = arrData.slice(); //复制数组

  ///////////////////统计化肥总概括
  arrData = arrData.group((item) => {return item.CorrStorageOrgUnit;});

  arrData.map((item) => {
    item.sumQty = sumByColumnName(item.data, 'FInventoryEndQty');
  });
  statRes.summaryFert = arrData.slice(); //复制数组
  statRes.sumFertQty = sumByColumnName(arrData, 'sumQty');

  ///////////////////化肥
  arrData = [];
  arrData = arrDataOri.slice();
  arrData = arrData
    .filter((item) => { return item.FBrandFertilizer == '尿素'; })
    .group((item) => { return item.CorrStorageOrgUnit;  })
  arrData.map((item) => {
    item.sumQty = sumByColumnName(item.data, 'FInventoryEndQty');
  });
  statRes.summartUrea = arrData.slice(); //复制数组
  statRes.sumUreaQty = sumByColumnName(arrData, 'sumQty');

  ///////////////////尿素+明细
  arrData = [];
  arrData = arrDataOri.slice();
  arrData
    .filter((item) => { return item.FBrandFertilizer == '尿素'; })
    .group((item) => { return item.FMaterial;  }) //这里以物料名称为分组，相同名称不同规格的物料会被合并！
    .map((item) => {
      let o = {
        key: item.key,
        name: item.key,
        number: item.data[0].FNumber,
        sumQty: sumByColumnName(item.data, 'FInventoryEndQty')
      };
      statRes.detailUrea.push(o);
    })
  
  //////////////////统计除了尿素和其他化肥以外的品牌化肥，其中分为进出口和分公司两档。
  // 分两种情况，一种进出口部没库存，第二种进出口部和分公司各有库存！
  // return: [{key:xxx, data:[{name:'分公司', sum:xx}, {name:'进出口部', sum:xx}]}, {key:yyy, data:[{name:'分公司', sum:yy}]} ]
  arrData = [];
  arrData = arrDataOri.slice();
  arrData = arrData
    .filter((item) => { return item.FBrandFertilizer != '尿素' && item.FBrandFertilizer != '其他'; })
    .group((item) => { return item.FBrandFertilizer; }) // 这里已经按品牌化肥分好类，格式为[{key: FBrandFertilizer, data:[....]},{key: FBrandFertilizer, data:[....]}]
    .reduce((acc, val) => {
      let arr = filterAndGroupAndSumByColumn(val.data, { //这里有问题！
                group: function(item) {
                  return item.CorrStorageOrgUnitPlus;
                },
                colName: 'FInventoryEndQty'
              });
      acc.push({
        key: val.key,
        data: arr
      });
      return acc;
    }, []);
  statRes.detailFert = arrData
  ////////////////////////////////
  arrData = [];
  arrData = arrDataOri.slice();
  arrData = arrData
    .filter((item) => { return item.FBrandFertilizer == '其他'; })
    .group((item) => { return item.FMaterialType2; }) // 这里已经按品牌化肥分好类，格式为[{key: FMaterialType2, data:[....]},{key: FMaterialType2, data:[....]}]
    .reduce((acc, val) => {
      acc.push({
        name: val.key,
        sum: sumByColumnName(val.data, 'FInventoryEndQty').toFixed(0)
      })
      return acc;
    }, []);
  statRes.detailOtherFert = arrData

  return statRes;
}

const decimalDigits = 0;
////
function printDetailsSummary(arrData) {  //数组要用reduce 一定要把空的剔除！
  let sumDetailsReport;
  if(arrData) {
    sumDetailsReport = arrData
                          .reduce((acc, val) => {
                              acc.push(val.name + '['+ val.model +']' + val.sumQty.toFixed(decimalDigits) + "吨,单价" + (val.sumAmount / val.sumQty).toFixed(0));                       
                            return acc;
                          }, [])
                          .join(','); //以逗号相连
  }
  return sumDetailsReport;
}




////
function printSaleSummary(statRes, startDate) {
  var sumFert = statRes
    //.statFertRes.filter((item) => { return item.name != '尿素' && item.sumQty != 0 })
    .statFertRes.filter((item) => { return item.sumQty != 0 })
    .reduce((acc, val) => {
      if(val.name == "尿素") {
        acc.push(val.name + val.sumQty.toFixed(decimalDigits) + '吨' + "(" + printDetailsSummary(val.details) + ")");
      } else { //这里只为“尿素”分类打印明细
        acc.push(val.name + val.sumQty.toFixed(decimalDigits) + '吨');
      }     
      return acc;
    }, [])
    .join(',');
  var strSaleSummary = "销售：化肥总售出" + statRes.sumCurtQty.toFixed(2) + "吨，" + (statRes.sumCurtAmount / 10000).toFixed(decimalDigits) + "万元。" +
      sumFert + "。" + startDate.split('-')[0] + "年累计销售" + statRes.sumAccCurtQty.toFixed(2) + "吨，同比增长" + ((statRes.sumAccCurtQty / statRes.sumAccLastQty) * 100).toFixed() + "%；累计销额" + (statRes.sumAccCurtAmount / 10000).toFixed(decimalDigits) + "万元，同比增长" + ((statRes.sumAccCurtAmount / statRes.sumAccLastAmount) * 100).toFixed() + "%（以销售出库单统计）。";
  return strSaleSummary;
}

function printPurSummary(statRes, startDate) {
  let sumFert = statRes
    .statFertRes.filter((item) => { return item.sumQty != 0 }) //item.name != '尿素' && 
    .reduce((acc, val) => {
      if(val.name == "尿素") {
        acc.push(val.name + val.sumQty.toFixed(decimalDigits) + '吨' + "(" + printDetailsSummary(val.details) + ")");
      } else { //这里只为“尿素”分类打印明细
        acc.push(val.name + val.sumQty.toFixed(decimalDigits) + '吨');
      }
      return acc;
    }, [])
    .join(',');
  let strSaleSummary = "购进：化肥总购入" + statRes.sumCurtQty.toFixed(decimalDigits) + "吨，" + (statRes.sumCurtAmount / 10000).toFixed(decimalDigits) + "万元。" +
      sumFert + "。" + startDate.split('-')[0] + "年累计购入" + statRes.sumAccCurtQty.toFixed(decimalDigits) + "吨，同比增长" + ((statRes.sumAccCurtQty / statRes.sumAccLastQty) * 100).toFixed() + "%；累计购额" + (statRes.sumAccCurtAmount / 10000).toFixed(decimalDigits) + "万元，同比增长" + ((statRes.sumAccCurtAmount / statRes.sumAccLastAmount) * 100).toFixed() + "%（以采购入库单统计）。";
  return strSaleSummary;
}

function printInvtSummary(statRes, endDate) {
  let fert = '化肥总库存'+ statRes.sumFertQty.toFixed(decimalDigits) +'吨（其中'
    + statRes.summaryFert.reduce((acc, val) => {acc.push(val.key + val.sumQty.toFixed(decimalDigits) + "吨"); return acc;}, []).join(',')
    + ')， '
    + '尿素'+ statRes.sumUreaQty.toFixed(decimalDigits) +'吨（其中'
    + statRes.summartUrea.reduce((acc, val) => {acc.push(val.key + val.sumQty.toFixed(decimalDigits) + "吨"); return acc;}, []).join(',')
    + ')， '
    + '其中'
    + statRes.detailUrea.reduce((acc, val) => {acc.push(val.key + val.sumQty.toFixed(decimalDigits) + "吨"); return acc;}, []).join(',')
    + ')， '
    + statRes.detailFert.reduce((acc, val) => {
      if(val.data.length == 1) acc.push(val.key + val.data[0].sum.toFixed(decimalDigits) + '吨');
      else {
        acc.push(val.key + sumByColumnName(val.data, 'sum').toFixed(decimalDigits) + '吨' + '(' + val.data.reduce((a, v) => {a.push(v.name + v.sum.toFixed(decimalDigits));return a;}, []).join(',') + ')');
      }
      return acc;
    },[]).join(',')
    + '，'
    + '其他肥' + sumByColumnName(statRes.detailOtherFert, 'sum').toFixed(0) + '吨（'
    + statRes.detailOtherFert.reduce((acc, val) => {acc.push(val.name + val.sum + '吨');return acc;},[]).join(',')
    + ')。 ';
    return fert;
}

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
  //{ type: sequelize.QueryTypes.SELECT} 只返回Sequelize查询到结果，不返回数据库的元数据。
  var query = sequelize.query(sqlCommand.saleOut, {
    type: sequelize.QueryTypes.SELECT,
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
    model: InventoryEntry,
    replacements: { FBizDateEnd:  isEndMonth ? Moment(strDateEnd).add(1, 'M').date(1).format('YYYY-MM-DD') : strDateEnd }
  });

  Promise.join(query, queryCurtAcc, queryLastAcc, queryPurIn, queryPurInCurtAcc, queryPurInLastAcc, queryInventory, function (curtData, curtAccData, lastAccData, curtPurData, curtPurAccData, lastPurAccData, invtData) {
  var statSaleRes = {
    sumCurtQty: sumByColumnName(curtData, 'FBaseQty'),
    sumCurtAmount: sumByColumnName(curtData, 'FAmount'),
    statFertRes: statFert(curtData),
    sumAccCurtQty: sumByColumnName(curtAccData, 'FBaseQty'),
    sumAccCurtAmount: sumByColumnName(curtAccData, 'FAmount'),
    sumAccLastQty: sumByColumnName(lastAccData, 'FBaseQty'),
    sumAccLastAmount: sumByColumnName(lastAccData, 'FAmount'),
    statDetails: statDetails(curtData,function(v) { return v.FBrandCarbaMind != '非尿素' },function(item) {return item.FMaterialNumber})
  };
  var statPurRes = {
    sumCurtQty: sumByColumnName(curtPurData, 'FBaseQty'),
    sumCurtAmount: sumByColumnName(curtPurData, 'FTaxAmount'),
    statFertRes: statFert(curtPurData),
    sumAccCurtQty: sumByColumnName(curtPurAccData, 'FBaseQty'),
    sumAccCurtAmount: sumByColumnName(curtPurAccData, 'FTaxAmount'),
    sumAccLastQty: sumByColumnName(lastPurAccData, 'FBaseQty'),
    sumAccLastAmount: sumByColumnName(lastPurAccData, 'FTaxAmount'),
    statDetails: statDetails(curtData,function(v) { return v.FBrandCarbaMind != '非尿素' },function(item) {return item.FMaterialNumber})
  };

  var saleRes = printSaleSummary(statSaleRes, startDate) + '\n\n';
  var purRes = printPurSummary(statPurRes, startDate)+'\n\n';
  let invtRes = printInvtSummary(statInventory(invtData))+'\n\n';

  fs.writeFile('./public/'+ startDate +'.txt', saleRes + purRes + invtRes, 'utf8', function() { 
    console.log('写入完成。');
  });
  //console.log(saleRes);
  });
}


