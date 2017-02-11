// szy
// SaleIssueEntry

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SaleIssueEntry', {
        FID: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
        FCustomer: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FPaymentType: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FStorageOrgUnit: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FParentStorageOrgUnit: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FTransactionType: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FAuditTime: {
			type: DataTypes.DATE,
			allowNull: true
		},
        FAuditor: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FBaseStatus: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
        FBizType: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FBillType: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FYear: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
        FPeriod: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
        FNumber: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FBizDate: {
			type: DataTypes.DATE,
			allowNull: true
		},
        FCreator: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FCreateTime: {
			type: DataTypes.DATE,
			allowNull: true
		},
        FControlUnit: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FIsInTax: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
        FMonth: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
        FDay: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
        CFNZDepCash: {
			type: DataTypes.STRING,
			allowNull: true
		},
        ///////////////////////////////
        ////////////entry//////////////
        FTaxPrice: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
        FActualPrice: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
        FBalanceCustomer: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FOrderCustomer: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FPaymentCustomer: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FCompanyOrgUnit: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FWarehouse: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FQty: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
        FBaseQty: {
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
        FUnitActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
        FActualCost: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
        FUnit: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FBaseUnit: {
			type: DataTypes.STRING,
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
        ////////////////////////////
        ////////CustomerGroup///////
        FCustomerNumber: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FCustomerDisplayName: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FCustomerType0: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FCustomerType1: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FCustomerType2: {
			type: DataTypes.STRING,
			allowNull: true
		},
        /////////////////////////////
        ////////////MaterialGroup////
        FMaterialNumber: {
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
        FMaterialDisplayName: {
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
        FName_L2: {
			type: DataTypes.STRING,
			allowNull: true
		},
        ///////////////////////////
        ///////addtional///////////
        FBrandFertilizer: {
			type: DataTypes.STRING,
			allowNull: true
		},
        FBrandCarbaMind: {
			type: DataTypes.STRING,
			allowNull: true
		}
    });
}