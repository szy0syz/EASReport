/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('T_ORG_BaseUnit', {
    FPartHRID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FIsHROrgUnit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
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
      allowNull: true
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
    FIsLeaf: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FLevel: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FLongNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FIsGrouping: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FEffectDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FInvalidDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FIsFreeze: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FIsCompanyOrgUnit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FIsAdminOrgUnit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FIsSaleOrgUnit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FIsPurchaseOrgUnit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FIsStorageOrgUnit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FIsProfitOrgUnit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FIsCostOrgUnit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FIsCU: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FIsUnion: {
      type: DataTypes.INTEGER,
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
      allowNull: true
    },
    FParentID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FPartCtrlID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FPartAdminID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FPartFIID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FPartSaleID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FPartStorageID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FPartPurchaseID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FPartCostCenterID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FPartProfitCenterID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FIsStart: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FIsOUSealUp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FPartUnionGroupID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FDisplayName_L1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FDisplayName_L2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FDisplayName_L3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FEnglishName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FVersionNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FMaintainCUID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FIsAssistantOrg: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FMainOrgID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FAccountSchemeID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FIsTransportOrgUnit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FPartTransportID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FIsQualityOrgUnit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FPartQualityID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FOrgTypeStr: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'T_ORG_BaseUnit'
  });
};
