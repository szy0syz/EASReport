var Sequelize = require('Sequelize');
var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001_20160912");

var T_IM_SaleIssueEntry = sequelize.import('./models/T_IM_SaleIssueEntry');
var T_BD_Customer = sequelize.import('./models/T_BD_Customer');
T_BD_Customer.hasMany(T_IM_SaleIssueEntry);
T_IM_SaleIssueEntry
  .findAll({
    where: {
      FID: {$in: ["//+EZEEHQPa9cg9Rl1X+RbvAf74=","//0koJx+T06P5VxHU+YuWrvAf74="]}
    },
    include: [{
      model: T_BD_Customer,
      as: "c",
      where: {FID: sequelize.col('FCustomerID')}
    }]
  })
  .then(function(rows) {
    console.log(rows.length);
})