var Sequelize = require('Sequelize');
var Moment = require('moment');
var Promise = require("bluebird");

var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001");
//var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001_20160912");
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
      FBizDateStart: Moment(sqlConditions.FBizDateStart).set('month',0).format('YYYY-MM-DD'), //set month=1
      FBizDateEnd: sqlConditions.FBizDateEnd

    }
});

var queryLastAcc = sequelize.query(sqlCommand, {
    type: sequelize.QueryTypes.SELECT,
    model: SaleIssueEntry,
    replacements: {
      FBizDateStart: Moment(sqlConditions.FBizDateStart).add(-1,'year').set('month',0).format('YYYY-MM-DD'), //set year-1, month=1
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

function statUrea(arrDate) {
  var brandC = accObj = [];
  var newarr1 = arrDate.filter(function(v) { return v.FBrandCarbaMind != '非尿素'}).group(ii => ii.FMaterialType3);
  newarr1.forEach(function(v1, i1) {
    var o = {
      name: v1.key,
      sumQty: 0,
      sumAmount: 0
    }
    // 一次循环求两个字段的和
    accObj = v1.data.reduce((acc, val) => {
      acc.sumQty += val.FBaseQty;
      acc.sumAmount += val.FAmount; 
      return acc;
    }, {sumQty:0, sumAmount:0});//初始化acc对象！
    o.sumQty = accObj.sumQty;
    o.sumAmount = accObj.sumAmount;
    brandC.push(o);
  });
  return brandC;
}

Promise.join(query, queryCurtAcc ,queryLastAcc ,function(curtData, curtAccData, lastAccData){
  console.log(curtData.length + '___' + curtAccData.length + '___' + lastAccData.length);
  var sum1 = statFert(curtData);
  var sim2 = statUrea(curtData);
});