'use strict';

var SequelizeAuto = require('sequelize-auto');

var auto = new SequelizeAuto('YNNZ2011001_20160912', 'szy0syz0yngf2017', 'xQnWdw3u4BOgwTuU', {
    host: '192.168.97.199',
    dialect: 'mssql',
    port: '1433',
    additional: {
        timestamps: false
    },
    tables: ['T_IM_SaleIssueBill', 'T_IM_SaleIssueEntry', 'T_BD_Customer', 'T_BD_MeasureUnit', 'T_BD_PaymentType', 'T_DB_WAREHOUSE', 'T_ORG_BaseUnit', 'T_PM_User', 'T_SCM_BillType', 'T_SCM_BizType', 'T_SCM_TransactionType']
});

auto.run(function (err) {
    if (err) throw err;
});