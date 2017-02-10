/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('T_BAS_BillType', {
    FName_l1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FName_l2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FName_l3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FullEntityName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    FSubsysid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FIndex: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FBosType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FType: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'T_BAS_BillType'
  });
};
