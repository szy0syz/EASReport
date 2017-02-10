/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_IM_SaleIssueEntry', {
		FParentID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FWrittenOffQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FWrittenOffAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FUnWriteOffQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FUnWriteOffAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FOrderNumber: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FSaleOrderNumber: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FSaleOrderEntrySeq: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FTaxRate: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FTax: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FLocalTax: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FLocalPrice: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FLocalAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FNonTaxAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FLocalNonTaxAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FDrewQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FWrittenOffBaseQty: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FUnWriteOffBaseQty: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FDrewBaseQty: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FSaleOrderID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FSaleOrderEntryID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FCoreBillTypeID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FUnReturnedBaseQty: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FIsLocked: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		FInventoryID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FOrderPrice: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FTaxPrice: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FActualPrice: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FSaleOrgUnitID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FSaleGroupID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FSalePersonID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FUndeliverQty: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FUndeliverBaseQty: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FUnInQty: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FUnInBaseQty: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FBalanceCustomerID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FIsCenterBalance: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		FIsBetweenCompanySend: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		FTotalInWarehsQty: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FBaseUnitActualcost: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FOrderCustomerID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FPaymentCustomerID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FConfirmQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FConfirmBaseQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FAssociateBaseQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FConfirmDate: {
			type: DataTypes.DATE,
			allowNull: true
		},
		FSendAddress: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FNetOrderBillID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FNetOrderBillNumber: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FNetOrderBillEntryID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FIsSquareBalance: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		FStorageOrgUnitID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FCompanyOrgUnitID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FWarehouseID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FLocationID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FStockerID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FLot: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FAssistQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FBaseQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FReverseQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FReturnsQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FPrice: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FUnitStandardCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FStandardCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FUnitActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FIsPresent: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FMfg: {
			type: DataTypes.DATE,
			allowNull: true
		},
		FExp: {
			type: DataTypes.DATE,
			allowNull: true
		},
		FReverseBaseQty: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FReturnBaseQty: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		FMaterialID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FAssistPropertyID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FUnitID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FSourceBillID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FSourceBillNumber: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FSourceBillEntryID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FSourceBillEntrySeq: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FAssCoefficient: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FBaseStatus: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FAssociateQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FSourceBillTypeID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FBaseUnitID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FAssistUnitID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FRemark: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FReasonCodeID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FSeq: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FID: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		FContractNumber: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FProjectID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FTrackNumberID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FSupplierID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		FSalePrice: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FDiscountType: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		FDiscountAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		FDiscount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		CFMinPrice: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		CFNZMaterialName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		CFK3Price: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		CFK3Amount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		}
	}, {
		tableName: 'T_IM_SaleIssueEntry',
		timestamps: false
	});
};
