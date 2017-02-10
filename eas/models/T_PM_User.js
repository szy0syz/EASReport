/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('T_PM_User', {
    FID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    FNumber: {
      type: DataTypes.STRING,
      allowNull: true
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
    FType: {
      type: DataTypes.INTEGER,
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
    FPassword: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FIsDelete: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FIsLocked: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FForbidden: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FEffectiveDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FInvalidationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FDefaultLocale: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FIsRegister: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FErrCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FGroupID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FPersonId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FSecurityId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FPWEffectiveDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FLockedTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FIsBizAdmin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FIsChangedPW: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FDefOrgUnitID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FControlUnitID: {
      type: DataTypes.STRING,
      allowNull: false
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
    FCustomerID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FSupplierID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FMainRoleID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FagentUser: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FLoginAuthorWay: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FPwdHisStr: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FReferId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FCell: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FBackupEMail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FHomePhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FOfficePhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FEMail: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'T_PM_User'
  });
};
