var Sequelize = require("Sequelize");
var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001_20160912");

// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });

sequelize
  .query("SELECT * FROM dbo.T_BAS_BillType")
  .then(function(rows) {
    console.log(rows);
  });

var SE = sequelize.define('T_IM_SaleIssueEntry', {
  FParentID: {
    type: Sequelize.STRING
  },
  FID: {
    type: Sequelize.STRING
  },
  FQty: {
    type: Sequelize.FLOAT
  },
  FBaseQty: {
    type: Sequelize.FLOAT
  },
  FPrice: {
    type: Sequelize.FLOAT
  },
  FAmount: {
    type: Sequelize.FLOAT
  }
},{
  tableName: 'T_IM_SaleIssueEntry'
})

SE.findAll();


