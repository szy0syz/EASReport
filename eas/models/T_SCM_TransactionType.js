/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_SCM_TransactionType', {
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
		FBillTypeID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FStoreTypeID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FStoreTypePreID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FStoreStateID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FStoreStatePreID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FBizTypeID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FScheduled: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FExistingQty: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FExistingQtyPre: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FEffectCostMode: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FEffectCostModePre: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FEffectDirection: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FEffectDirectionPre: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FRIType: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FRITypePre: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FIsCounteract: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FCounteractID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FIsCalculate: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FAuditAfterSave: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FMakeVahAfterAudit: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FSourceBillTypeID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FCoreBillTypeID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FStatus: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		FRI: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FEffectManufactureCost: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		FIsManuCostCalculate: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		FIsUpdatePresent: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		tableName: 'T_SCM_TransactionType'
	});
};
