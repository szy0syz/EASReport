var Sequelize = require('Sequelize');
var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001_20160912");
// sequelize.options.timestamps = false;
var T_BAS_BillType = sequelize.import('./models/T_BAS_BillType')
console.log(T_BAS_BillType.options.timestamps);
T_BAS_BillType.findAll().then(function(rows) {
    console.log(rows[0].FName_l2);
})