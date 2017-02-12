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
    sumFAmount: 0,
    sumNQty: 0,
    sumNAmount: 0,
    averageN: 0,
    sumP: 0,
    averageP: 0,
    sumK: 0,
    averageK: 0,
    sumNPK: 0,
    averageNKP: 0
  }
  var arrUrea = arrN = arrP = arrK = arrNPK = [],
    itemType = '';

  console.log('rows: '+res.length);
  res.forEach(function(item, index) {
    rept.sumQty +=  item.FBaseQty;
    rept.sumFAmount +=  item.FAmount;
    itemType = item.FMaterialType0.split('_');
    if(itemType[1] == '氮肥') {
          arrN.push(item);
          rept.sumNAmount += item.FAmount;
          rept.sumNQty += item.FBaseQty;
          rept.averageN += item.FPrice;
    }
  });
  rept.averageN = rept.averageN / rept.sumNQty;
  console.log(rept.sumQty)
  console.log(rept.sumFAmount)
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