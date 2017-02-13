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

  var array1 = res.group(item => item.FBrandCarbaMind);
  
  //以后这里从数据库取，不要写死！
  var brandFString = ['尿素','碳铵','硫铵','氯化铵','硝磷铵','普钙','重钙','钙镁','磷铵','富钙','硫酸钾','氯化钾','硫酸钾肥','高含量','低含量']
  var brandF = [];

  var brandC = [];
  var tmpObj = {};

  brandFString.forEach(function(s,i) {
    var o = {
      name: s,
      sumQty: 0,
      sumAmount: 0
    };
    brandF.push(o);
  })

  res.forEach(function(item, index) {
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
  })
  
  ///////////////////////
  var newarr1 = res.filter(function(v) { return v.FBrandCarbaMind != '非尿素'}).group(i => i.FMaterialType3);

  console.log(brandF)
});

function carbaMindStats (arr) {
  var brandC = [];
  arr.forEach(function(item) {
    if(item.FBrandCarbaMind == '非尿素') {
    }
  });
}


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