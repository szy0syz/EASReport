var Sequelize = require('Sequelize');
var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001_20160912");

var SaleIssueEntry = sequelize.import('./models/SaleIssueEntry');

require('./sqlCommand');

//{ type: sequelize.QueryTypes.SELECT} 只返回Sequelize查询到结果，不返回数据库的元数据。
sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
    model: SaleIssueEntry
    })
    .then(function(rows) {
        console.log(rows[0].FBrandFertilizer);
    })