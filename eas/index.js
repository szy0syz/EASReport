var Sequelize = require('Sequelize');
var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001_20160912");

var T_IM_SaleIssueEntry = sequelize.import('./models/T_IM_SaleIssueEntry');
var T_IM_SaleIssueBill = sequelize.import('./models/T_IM_SaleIssueBill');

//T_IM_SaleIssueEntry.belongsToMany(T_IM_SaleIssueBill, {as: 'sb', through:'as.FID'})

T_IM_SaleIssueBill.hasMany(T_IM_SaleIssueEntry, 
  {
    as: 'se',
    foreignKey: 'FParentID',
    constraints: false,
  });

T_IM_SaleIssueEntry.belongsTo(T_IM_SaleIssueBill, 
  {
    as: 'sb',
    foreignKey: 'FID',
    constraints: false,
  });

T_IM_SaleIssueEntry
  .findAll({
    where: {
      FID: {$in: ["//+EZEEHQPa9cg9Rl1X+RbvAf74=","//0koJx+T06P5VxHU+YuWrvAf74="]}
    },
    include: [{
      model: T_IM_SaleIssueBill,
      as: "sb",
      required : false
      //,where: {FID: sequelize.col('FCustomerID')}
    }]
  })
  .then(function(rows) {
    console.log(rows.length);
})
