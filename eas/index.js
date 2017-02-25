var Sequelize = require('Sequelize');
var Moment = require('moment');
var Promise = require("bluebird");

var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001");
var SaleIssueEntry = sequelize.import('./models/SaleIssueEntry');
var PurInEntry = sequelize.import('./models/PurInEntry');

var sqlCommand = require('./db/sqlCommand');
var sqlConditions = require('./db/sqlConditions');


//{ type: sequelize.QueryTypes.SELECT} 只返回Sequelize查询到结果，不返回数据库的元数据。
var query = sequelize.query(sqlCommand.saleOut, {
  type: sequelize.QueryTypes.SELECT,
  model: SaleIssueEntry,
  replacements: sqlConditions
});

var queryCurtAcc = sequelize.query(sqlCommand.saleOut, {
  type: sequelize.QueryTypes.SELECT,
  model: SaleIssueEntry,
  replacements: {
    FBizDateStart: Moment(sqlConditions.FBizDateStart).month(0).date(1).format('YYYY-MM-DD'), //set month=1
    FBizDateEnd: sqlConditions.FBizDateEnd
  }
});

var queryLastAcc = sequelize.query(sqlCommand.saleOut, {
  type: sequelize.QueryTypes.SELECT,
  model: SaleIssueEntry,
  replacements: {
    FBizDateStart: Moment(sqlConditions.FBizDateStart).add(-1, 'year').month(0).date(1).format('YYYY-MM-DD'), //set year-1, month=1
    FBizDateEnd: Moment(sqlConditions.FBizDateEnd).add(-1, 'year').format('YYYY-MM-DD')
  }
});

var queryPurIn = sequelize.query(sqlCommand.PruIn, {
  type: sequelize.QueryTypes.SELECT,
  model: PurInEntry,
  replacements: sqlConditions
});

var queryPurInCurtAcc = sequelize.query(sqlCommand.PruIn, {
  type: sequelize.QueryTypes.SELECT,
  model: PurInEntry,
  replacements: {
    FBizDateStart: Moment(sqlConditions.FBizDateStart).month(0).date(1).format('YYYY-MM-DD'), //set month=1
    FBizDateEnd: sqlConditions.FBizDateEnd
  }
});

var queryPurInLastAcc = sequelize.query(sqlCommand.PruIn, {
  type: sequelize.QueryTypes.SELECT,
  model: PurInEntry,
  replacements: {
    FBizDateStart: Moment(sqlConditions.FBizDateStart).add(-1, 'year').month(0).date(1).format('YYYY-MM-DD'), //set year-1, month=1
    FBizDateEnd: Moment(sqlConditions.FBizDateEnd).add(-1, 'year').format('YYYY-MM-DD')
  }
});

let query_Inventory = sequelize.query(sqlCommand.Inventory, {
  type: sequelize.QueryTypes.SELECT,
  model: InventoryEntry,
  replacements: sqlConditions
});

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

// Object.defineProperty(Array.prototype, 'group', {
//   enumerable: false,
//   value: function (key) {
//     var map = {};
//     this.forEach(function (e) {
//       var k = key(e);
//       map[k] = map[k] || [];
//       map[k].push(e);
//     });
//     return Object.keys(map).map(function (k) {
//       return {key: k, data: map[k]};
//     });
//   }
// });

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
  let res = accObj = [];
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
  var sum = arrData.reduce((acc, val) => {
    acc += val[cn];
    return acc;
  }, 0);
  return sum;
}

////
function printDetailsSummary(arrData) {  //数组要用reduce 一定要把空的剔除！
  let sumDetailsReport;
  if(arrData) {
    sumDetailsReport = arrData
                          .reduce((acc, val) => {
                              acc.push(val.name + '['+ val.model +']' + val.sumQty.toFixed(2) + "吨,单价" + (val.sumAmount / val.sumQty).toFixed(0));                       
                            return acc;
                          }, [])
                          .join(','); //以逗号相连
  }
  return sumDetailsReport;
}

function printSaleSummary1(statRes, startDate) {
  var sumUrea = statRes.statFertRes.filter((item) => { return item.name == '尿素' })[0].sumQty.toFixed(2) || 0;
  var sumUreaDetails = statRes.statUreaRes
    .reduce((acc, val) => {
      acc.push(val.name + '['+ val.model +']' + val.sumQty.toFixed(2) + "吨,单价" + (val.sumAmount / val.sumQty).toFixed(0));
      return acc;
    }, [])
    .join(',');
  var sumFert = statRes
    .statFertRes.filter((item) => { return item.name != '尿素' && item.sumQty != 0 })
    .reduce((acc, val) => {
      acc.push(val.name + val.sumQty.toFixed(2) + '吨');
      return acc;
    }, [])
    .join(',');
  var strSaleSummary = "销售：化肥总售出" + statRes.sumCurtQty.toFixed(2) + "吨，" + (statRes.sumCurtAmount / 10000).toFixed(2) + "万元。其中尿素" +
    sumUrea + "吨\（" + sumUreaDetails + "），"
    + sumFert + "。" + startDate.split('-')[0] + "年累计销售" + statRes.sumAccCurtQty.toFixed(2) + "吨，同比增长" + ((statRes.sumAccCurtQty / statRes.sumAccLastQty) * 100).toFixed() + "%；累计销额" + (statRes.sumAccCurtAmount / 10000).toFixed(2) + "万元，同比增长" + ((statRes.sumAccCurtAmount / statRes.sumAccLastAmount) * 100).toFixed() + "%（以销售出库单统计）。";
  return strSaleSummary;
}

////
function printSaleSummary(statRes, startDate) {
  var sumFert = statRes
    .statFertRes.filter((item) => { return item.name != '尿素' && item.sumQty != 0 })
    .reduce((acc, val) => {
      acc.push(val.name + val.sumQty.toFixed(2) + '吨' + "(" + printDetailsSummary(val.details) + ")");
      return acc;
    }, [])
    .join(',');
  var strSaleSummary = "销售：化肥总售出" + statRes.sumCurtQty.toFixed(2) + "吨，" + (statRes.sumCurtAmount / 10000).toFixed(2) + "万元。" +
      sumFert + "。" + startDate.split('-')[0] + "年累计销售" + statRes.sumAccCurtQty.toFixed(2) + "吨，同比增长" + ((statRes.sumAccCurtQty / statRes.sumAccLastQty) * 100).toFixed() + "%；累计销额" + (statRes.sumAccCurtAmount / 10000).toFixed(2) + "万元，同比增长" + ((statRes.sumAccCurtAmount / statRes.sumAccLastAmount) * 100).toFixed() + "%（以销售出库单统计）。";
  return strSaleSummary;
}



function printPurSummary(statRes, startDate) {
  let sumFert = statRes
    .statFertRes.filter((item) => { return item.name != '尿素' && item.sumQty != 0 })
    .reduce((acc, val) => {
      acc.push(val.name + val.sumQty.toFixed(2) + '吨' + "(" + printDetailsSummary(val.details) + ")");
      return acc;
    }, [])
    .join(',');
  let strSaleSummary = "购进：化肥总购入" + statRes.sumCurtQty.toFixed(2) + "吨，" + (statRes.sumCurtAmount / 10000).toFixed(2) + "万元。" +
      sumFert + "。" + startDate.split('-')[0] + "年累计购入" + statRes.sumAccCurtQty.toFixed(2) + "吨，同比增长" + ((statRes.sumAccCurtQty / statRes.sumAccLastQty) * 100).toFixed() + "%；累计销额" + (statRes.sumAccCurtAmount / 10000).toFixed(2) + "万元，同比增长" + ((statRes.sumAccCurtAmount / statRes.sumAccLastAmount) * 100).toFixed() + "%（以采购入库单统计）。";
  return strSaleSummary;
}

Promise.join(query, queryCurtAcc, queryLastAcc, queryPurIn, queryPurInCurtAcc, queryPurInLastAcc, function (curtData, curtAccData, lastAccData, curtPurData, curtPurAccData, lastPurAccData) {
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

  var saleRes = printSaleSummary(statSaleRes, sqlConditions.FBizDateStart);
  var purRes = printPurSummary(statPurRes, sqlConditions.FBizDateStart);
  console.log(saleRes);
  console.log(purRes);
});
