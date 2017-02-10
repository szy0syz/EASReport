/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('T_BD_Customer', {
    FID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
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
    FName_L1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FName_L2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FName_L3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FDescription_L1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FDescription_L2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FDescription_L3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FSimpleName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FCountryID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FCityID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FProvince: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FRegionID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FTaxDataID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FUsedStatus: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FBizAnalysisCodeID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FIndustryID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FInternalCompanyID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FFreezeOrgUnitID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FBrowseGroupID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FArtificialPerson: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FBizRegisterNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FIsInternalCompany: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FTxRegisterNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FVersion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FEffectedStatus: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FSuperiorUnit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FBarCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FMnemonicCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FBusiLicence: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FBusiExequatur: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FGSPAuthentication: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FCustomerKind: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FForeignName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FAdminCUID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FParentID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FInvoiceType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FIsCredited: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FTaxRate: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    FIsMultiCopy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FIsSwitch: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'T_BD_Customer'
  });
};
