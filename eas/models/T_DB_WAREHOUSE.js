/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_DB_WAREHOUSE', {
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
		FstorageOrgID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FregionID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FAddress: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FwhmanID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FTelPhone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FWhState: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FTransState: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FHasLocation: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FHasLocationLevel: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FDefaultLocationGroupID: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'T_DB_WAREHOUSE',
		timestamps: false
	});
};
