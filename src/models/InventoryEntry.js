// szy
// InventoryEntry

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('InventoryEntry', {
		// 物料编码
        FNumber: {
			type: DataTypes.STRING,
			allowNull: true
		},
		// 物料名称
		FMaterial: {
			type: DataTypes.STRING,
			allowNull: true
		},
		// 物料型号（暂未处理）
        FMaterialModel: {
			type: DataTypes.STRING,
			allowNull: true
		},
		// 期末库存数量
		FInventoryEndQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 库存组织
		FStorageOrgUnit: {
			type: DataTypes.STRING,
			allowNull: true
		},
		// 上级库存组织
		FParentStorageOrgUnit: {
			type: DataTypes.STRING,
			allowNull: true
		},
		// 自定义化肥类别
		FBrandFertilizer: {
			type: DataTypes.STRING,
			allowNull: true
		},
		// 品牌尿素类别
		FBrandCarbaMind: {
			type: DataTypes.STRING,
			allowNull: true
		},
		// 期初库存
		FInventoryInitQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 期初库存金额
		FInventroyInitAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 采购入库数量
		FPurInWarehsQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 采购入库金额
		FPurInWarehsAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 采购入库实际成本
		FPurInWarehsActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 调拨入库数量
		FMoveInWarehsQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 调拨入库金额
		FMoveInWarehsAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 调拨入库实际成本
		FMoveInWarehsActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 其它入库数量
		FOtherInWarehsQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 其它入库金额
		FOtherInWarehsAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 其它入库实际成本
		FOtherInWarehsActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 销售出库数量
		FSaleIssueQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 销售出库金额
		FSaleIssueAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 销售出库实际成本
		FSaleIssueActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 调拨入库数量
		FMoveIssueQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 调拨入库金额
		FMoveIssueAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 调拨入库实际成本
		FMoveIssueActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 其它入库数量
		FOtherIssueQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 其它入库金额
		FOtherIssueAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 其它入库实际成本
		FOtherIssueActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		// 门店所属分公司
		FShopAttributionUnit: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FMaterialType0: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FMaterialType1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FMaterialType2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FMaterialType3: {
			type: DataTypes.STRING,
			allowNull: true
		}	
    });
}