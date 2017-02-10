var Sequelize = require('Sequelize');
var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001_20160912");

var T_BAS_BillType = sequelize.import('./models/T_BD_PaymentType')
T_BAS_BillType.findAll({limit: 10}).then(function(rows) {
    console.log(rows);
})