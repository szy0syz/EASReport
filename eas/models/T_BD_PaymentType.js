/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_BD_PaymentType', {
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
		FCreatorID: {
			type: DataTypes.STRING,
			allowNull: false
		},
		FCreateTime: {
			type: DataTypes.DATE,
			allowNull: true
		},
		FLastUpdateUserID: {
			type: DataTypes.STRING,
			allowNull: false
		},
		FLastUpdateTime: {
			type: DataTypes.DATE,
			allowNull: true
		},
		FControlUnitID: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'T_BD_PaymentType'
	});
};
