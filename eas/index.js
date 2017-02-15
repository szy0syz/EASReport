var Sequelize = require('Sequelize');
var Moment = require('moment');
var Promise = require("bluebird");

var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001");
var SaleIssueEntry = sequelize.import('./models/SaleIssueEntry');

var sqlCommand = require('./db/sqlCommand');
var sqlConditions = require('./db/sqlConditions');


//{ type: sequelize.QueryTypes.SELECT} 只返回Sequelize查询到结果，不返回数据库的元数据。
var query = sequelize.query(sqlCommand, {
    type: sequelize.QueryTypes.SELECT,
    model: SaleIssueEntry,
    replacements: sqlConditions
});

var queryCurtAcc = sequelize.query(sqlCommand, {
    type: sequelize.QueryTypes.SELECT,
    model: SaleIssueEntry,
    replacements: {
      FBizDateStart: Moment(sqlConditions.FBizDateStart).month(0).date(1).format('YYYY-MM-DD'), //set month=1
      FBizDateEnd: sqlConditions.FBizDateEnd
    }
});

var queryLastAcc = sequelize.query(sqlCommand, {
    type: sequelize.QueryTypes.SELECT,
    model: SaleIssueEntry,
    replacements: {
      FBizDateStart: Moment(sqlConditions.FBizDateStart).add(-1,'year').month(0).date(1).format('YYYY-MM-DD'), //set year-1, month=1
      FBizDateEnd: Moment(sqlConditions.FBizDateEnd).add(-1,'year').format('YYYY-MM-DD')
    }
});

/////////////
Object.defineProperty(Array.prototype, 'group', {
  enumerable: false,
  value: function (key) {
    var map = {};
    this.map(e => ({k: key(e), d: e})).forEach(e => {
      map[e.k] = map[e.k] || [];
      map[e.k].push(e.d);
    });
    return Object.keys(map).map(k => ({key: k, data: map[k]}));
  }
});
/////////////

function statFert(arrData) {
  //以后这里从数据库取，不要写死！
  var brandFString = ['尿素','碳铵','硫铵','氯化铵','硝磷铵','普钙','重钙','钙镁','磷铵','富钙','硫酸钾','氯化钾','硫酸钾肥','高含量','低含量']
  var brandF = [];
  //根据顺序初始化
  brandFString.forEach(function(s,i) {
    var o = {
      name: s,
      sumQty: 0,
      sumAmount: 0
    };
    brandF.push(o);
  })
  //根据数据分析
  arrData.forEach(function(item, index) {
    brandF.forEach(function(brand,i) {
      if(item.FBrandFertilizer == brand.name) {
        brand.sumQty += item.FBaseQty;
        brand.sumAmount += item.FAmount;
      }
    });
  });
  brandF.push({
    name: '复合肥',
    sumQty: brandF[13].sumQty+ brandF[14].sumQty,
    sumAmount: brandF[13].sumAmount+ brandF[14].sumAmount,
  });
  //返回结果
  return brandF;
}

function statUrea(arrData) {
  var brandC = accObj = [];
  arrData
    .filter(function(v) { return v.FBrandCarbaMind != '非尿素'})
    .group(ii => ii.FMaterialType3)
    .forEach(function(v1, i1) {
      var o = {
        name: v1.key,
        sumQty: 0,
        sumAmount: 0,
        data: []
      }
      // 一次循环求两个字段的和
      accObj = v1.data.reduce((acc, val) => {
        acc.sumQty += val.FBaseQty;
        acc.sumAmount += val.FAmount;
        acc.data.push({
          materialNumber: val.FMaterialNumber,
          materialName: val.FMaterial,
          materialModel: val.FMaterialModel,
          qty: val.FBaseQty,
          amount: val.FAmount
        })
        return acc;
      }, {sumQty:0, sumAmount:0, data:[]});//初始化acc对象！
      o.sumQty = accObj.sumQty;
      o.sumAmount = accObj.sumAmount;
      o.data = accObj.data;
      brandC.push(o);
    });
    //返回处理结果
    return brandC;
}

function sumByColumnName(arrData, cn) {
  var sum = arrData.reduce((acc, val) => {
    acc += val[cn];
    return acc;
  }, 0);
  return sum;
}



function printSaleSummary(statRes, startDate) {
  var sumUrea = statRes.statFertRes.filter((item) => {return item.name == '尿素'})[0].sumQty.toFixed(2) || 0;
  var sumUreaDetails = statRes.statUreaRes
    .reduce((acc, val) => {
      acc.push(val.name + val.sumQty.toFixed(2) + "吨,单价" + (val.sumAmount/val.sumQty).toFixed(0));
      return acc;
    }, [])
    .join(',');
  var sumFert = statRes
    .statFertRes.filter((item) => {return item.name != '尿素' && item.sumQty != 0})
    .reduce((acc, val) => {
      acc.push(val.name + val.sumQty.toFixed(2) + '吨');
      return acc;
    }, [])
    .join(',');
  var strSaleSummary = "销售：化肥总售出"+ statRes.sumCurtQty.toFixed(2) +"吨，"+ (statRes.sumCurtAmount/10000).toFixed(2) +"万元。其中尿素"+ 
    sumUrea +"吨\（"+ sumUreaDetails +"），"
    + sumFert +"。"+ startDate.split('-')[0] +"年累计销售"+ statRes.sumAccCurtQty.toFixed(2) +"吨，同比增长"+ ((statRes.sumAccCurtQty/statRes.sumAccLastQty)*100).toFixed() +"%；累计销额"+ (statRes.sumAccCurtAmount/10000).toFixed(2) +"万元，同比增长"+ ((statRes.sumAccCurtAmount/statRes.sumAccLastAmount)*100).toFixed() +"%（以销售出库单统计）。";
  return strSaleSummary;
}


Promise.join(query, queryCurtAcc ,queryLastAcc ,function(curtData, curtAccData, lastAccData){
  var statRes = {
    sumCurtQty: sumByColumnName(curtData, 'FBaseQty'),
    sumCurtAmount: sumByColumnName(curtData, 'FAmount'),
    statFertRes: statFert(curtData),
    statUreaRes: statUrea(curtData),
    sumAccCurtQty: sumByColumnName(curtAccData,'FBaseQty'),
    sumAccCurtAmount: sumByColumnName(curtAccData,'FAmount'),
    sumAccLastQty: sumByColumnName(lastAccData,'FBaseQty'),
    sumAccLastAmount: sumByColumnName(lastAccData,'FAmount')
  };

  var realRes = printSaleSummary(statRes, sqlConditions.FBizDateStart);
  console.log(realRes);
});
