/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_SCM_BillType', {
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
		FBillTypeGroup: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FScheduled: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FHeadTable: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FEntryTable: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FBosType: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'T_SCM_BillType'
	});
};
