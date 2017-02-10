/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('T_IM_SaleIssueBill', {
    FCustomerID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FCurrencyID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FExchangeRate: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    FPaymentTypeID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FConvertMode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FIsSysBill: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FTotalLocalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    FActBizDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FStorageOrgUnitID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FAdminOrgUnitID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FStockerID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FVoucherID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FTotalQty: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    FTotalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    FFiVouchered: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FTotalStandardCost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    FTotalActualCost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    FIsReversed: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FTransactionTypeID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FIsInitBill: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FAuditTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FBaseStatus: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FBizTypeID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FSourceBillTypeID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FBillTypeID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FPeriod: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FModifierID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FModificationTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FBizDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FHandlerID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FHasEffected: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FAuditorID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FSourceBillID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FSourceFunction: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FCreatorID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FCreateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FLastUpdateUserID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FLastUpdateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FControlUnitID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    FIsGenBizAR: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FIsInTax: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FMonth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FDay: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CFCreditAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    CFCreditARAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    CFCreditAmountBal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    CFPriceMinIF: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CFTransportCompanies: {
      type: DataTypes.STRING,
      allowNull: true
    },
    CFTransportworkers: {
      type: DataTypes.STRING,
      allowNull: true
    },
    CFTransportCarNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    CFTransportIDNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    CFNZChkReason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    CFNZMinPriceifNY: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CFNZMinPriceifHF: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CFNZDepCashID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    CFUpdateDate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    CFDBSource: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'T_IM_SaleIssueBill'
  });
};
