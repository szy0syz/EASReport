var Sequelize = require('Sequelize');
var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001");
//var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001_20160912");
var SaleIssueEntry = sequelize.import('./models/SaleIssueEntry');

var sqlCommand = require('./db/sqlCommand');
var sqlConditions = require('./db/sqlConditions');

//{ type: sequelize.QueryTypes.SELECT} 只返回Sequelize查询到结果，不返回数据库的元数据。
var query = sequelize.query(sqlCommand, {
    type: sequelize.QueryTypes.SELECT,
    model: SaleIssueEntry
    ,replacements: sqlConditions
});

query.then(function(res) {
  var rept = {
    sumQty: 0,
    sumAmount: 0,

    sumNQty: 0,
    sumNAmount: 0,

    sumUreaQty: 0,
    sumUreaAmount: 0,

    sumPQty: 0,
    sumPAmount: 0,

    sumKQty: 0,
    sumKAmount: 0,

    sumNPKQty: 0,
    sumNPKAmount: 0,

    sumNPKhQty: 0,
    sumNPKhAmount: 0

  }

  var brandFString = ['尿素','碳铵','硫铵','氯化铵','硝磷铵','普钙','重钙','钙镁','磷铵','富钙','硫酸钾','氯化钾','硫酸钾肥','高含量','低含量']
  var brandF = [];

  brandFString.forEach(function(s,i) {
    var o = {
      name: s,
      sumQty: 0,
      sumAmount: 0
    };
    brandF.push(o);
  })

  console.log(brandF);

  var arrUrea = arrN = arrP = arrK = arrNPK = arrNPKh = [],
    itemType = '';

  console.log('rows: '+res.length);
  res.forEach(function(item, index) {
    rept.sumQty +=  item.FBaseQty;
    rept.sumAmount +=  item.FAmount;
    itemType = item.FMaterialType0.split('_');
    if(itemType[1] == '氮肥') {
      arrN.push(item);
      rept.sumNAmount += item.FAmount;
      rept.sumNQty += item.FBaseQty;
    }
    if(itemType[2] == '尿素') {
      arrUrea.push(item);
      rept.sumUreaAmount += item.FAmount;
      rept.sumUreaQty += item.FBaseQty;
    }
    if(itemType[1] == '磷肥') {
      arrP.push(item);
      rept.sumPAmount += item.FAmount;
      rept.sumPQty += item.FBaseQty;
    }
    if(itemType[1] == '钾肥') {
      arrP.push(item);
      rept.sumKAmount += item.FAmount;
      rept.sumKQty += item.FBaseQty;
    }
    if(itemType[1] == '复合肥') {
      arrNPK.push(item);
      rept.sumNPKAmount += item.FAmount;
      rept.sumNPKQty += item.FBaseQty;
    }
    if(item.FBrandFertilizer == '高含量') {
      arrNPKh.push(item);
      rept.sumNPKhQty += item.FBaseQty;
      rept.sumNPKhAmount += item.FAmount;
    }
  });

  console.log(rept)
});

// // ---no~~~
// function getData() {
//   var data;
//   return query.then(function(result) {
//     data = result;
//   }).return(data);
// }

//     .then(function(rows) {
//         console.log(Object.prototype.toString.call(rows[0])); //array
//         console.log(rows.length);
//     })