// szy
// InventoryEntry

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('InventoryEntry', {
		//////////InventoryEntry///////////
        FNumber: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FMaterial: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FMaterialModel: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FInventoryEndQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FStorageOrgUnit: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FBrandFertilizer: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FBrandCarbaMind: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FInventoryInitQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FInventroyInitAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FPurInWarehsQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FPurInWarehsAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FPurInWarehsActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FMoveInWarehsQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FMoveInWarehsAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FMoveInWarehsActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FOtherInWarehsQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FOtherInWarehsAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FOtherInWarehsActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FSaleIssueQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FSaleIssueAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FSaleIssueActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FMoveIssueQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FMoveIssueAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FMoveIssueActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FOtherIssueQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FOtherIssueAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FOtherIssueActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FShopAttributionUnit: {
			type: DataTypes.STRING,
			allowNull: true
		}
		
		
		
    });
}