var Sequelize = require('Sequelize');
var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001_20160912");

sequelize.import('./models')