var Sequelize = require('Sequelize');
var sequelize = new Sequelize("mssql://szy0syz0yngf2017:xQnWdw3u4BOgwTuU@192.168.97.199:1433/YNNZ2011001_20160912");

var T_IM_SaleIssueEntry = sequelize.import('./models/T_IM_SaleIssueEntry');
var T_IM_SaleIssueBill = sequelize.import('./models/T_IM_SaleIssueBill');
var T_BD_Customer = sequelize.import('./models/T_BD_Customer');
var T_BD_PaymentType = sequelize.import('./models/T_BD_PaymentType');

var sql = 
"    SELECT top 10" +
"             sb.FID ,c.FName_L2 as FCustomer, pt.FName_L2 as FPaymentType,bu.FName_L2 as FStorageOrgUnit , bu4. FParentUnit AS FParentStorageOrgUnit, "+
"             tt.FName_L2 as FTransactionType,sb.FAuditTime , u1.FName_L2 as FAuditor ,  "+
"             sb.FBaseStatus AS FBaseStatus ,bizt.FName_L2 as FBizType,  "+
"             blt.FName_L2 as FBillType,sb.FYear , sb.FPeriod ,sb. FNumber,  "+
"             sb.FBizDate ,u.FName_L2 as FCreator,sb.FCreateTime , bu1.FName_L2 as FControlUnit,  "+
"             sb.FIsInTax ,sb.FMonth ,sb.FDay, bu2. FName_L2 as CFNZDepCash,  "+
"             se.FTaxPrice ,FActualPrice ,  "+
"             c1.FName_L2 as FBalanceCustomer,c2.FName_L2 as FOrderCustomer,c3.FName_L2 as FPaymentCustomer ,  "+
"             bu3.FName_L2 as FCompanyOrgUnit,wh.FName_L2 as FWarehouse,"+
"             se.FQty ,FBaseQty ,  "+
"             se.FPrice ,FAmount , FUnitActualCost ,FActualCost ,  "+
"             mu.FName_L2 as FUnit,mu1.FName_L2 as FBaseUnit ,  "+
"             se.FDiscount ,se.CFMinPrice ,CFNZMaterialName ,  "+
"             cg.FNumber as FCustomerNumber, cg.FDisplayName_L2 as FCustomerDisplayName, cg.type0 as FCustomerType0,  "+
"             cg.type1 as FCustomerType1, cg.type2 as FCustomerType2,  "+
"             mg.FNumber as FMaterialNumber, mg.FName_l2 as FMaterial, mg.FModel AS FMaterialModel, mg.FDisplayName_L2 as FMaterialDisplayName, "+ 
"             mg.type0 as FMaterialType0, mg.type1 as FMaterialType1, mg.type2 as FMaterialType2,  "+
"             mgp.FMaterialGroupStandard AS FBrandFertilizer , mgp1.FMaterialGroupStandard AS FBrandCarbaMind "+
"from T_IM_SaleIssueEntry as se "+
"left join T_IM_SaleIssueBill as sb on se.FParentID = sb.FID "+
"left join T_BD_Customer as c on sb.FCustomerID = c.FID  "+
"left join T_BD_PaymentType as pt on sb.FPaymentTypeID = pt.FID  "+
"left join T_ORG_BaseUnit as bu on sb.FStorageOrgUnitID = bu.FID  "+
"left join T_SCM_TransactionType as tt on sb.FTransactionTypeID = tt.FID "+ 
"left join T_SCM_BizType as bizt on sb.FBizTypeID = bizt.FID "+  
"left join T_SCM_BillType as blt on sb.FBillTypeID = blt.FID  "+
"left join T_PM_User as u on sb.FCreatorID = u.FID "+
"left join T_PM_User as u1 on sb.FAuditorID = u1.FID  "+
"left join T_ORG_BaseUnit as bu1 on sb.FControlUnitID = bu1.FID "+
"left join T_ORG_BaseUnit as bu2 on sb.CFNZDepCashID = bu2.FID  "+
"left join T_BD_Customer as c1 on se.FBalanceCustomerID = c1.FID  "+
"left join T_BD_Customer as c2 on se.FOrderCustomerID = c2.FID  "+
"left join T_BD_Customer as c3 on se.FPaymentCustomerID = c3.FID  "+
"left join T_ORG_BaseUnit as bu3 on se.FCompanyOrgUnitID = bu3.FID  "+
"left join T_DB_WAREHOUSE as wh on se.FWarehouseID = wh.FID "+ 
"left join T_BD_MeasureUnit as mu on se.FUnitID = mu.FID  "+
"inner join T_BD_MeasureUnit as mu1 on se.FBaseUnitID = mu1.FID  "+
"LEFT JOIN  "+
             "( "+
                   "SELECT ibu.FID, ibu.FName_L2 ,ibu1. FName_L2 AS FParentUnit,ibu1.FID AS FParentUnitID FROM T_ORG_BaseUnit AS ibu  "+
                   "LEFT JOIN T_ORG_BaseUnit AS ibu1 ON ibu.FParentID = ibu1.FID  "+
             ") AS bu4 ON se.FStorageOrgUnitID = bu4.FID "+
"left join  "+
      " ( "+
             "SELECT c.FID , c.FNumber ,c. FName_L2, cg.FDisplayName_L2,  "+
             "cg.FDisplayName_L2 AS 'type0',  "+
             "cg.FDisplayName_L2 AS 'type1',  "+
             "cg.FDisplayName_L2 AS 'type2'  "+
             "FROM dbo.T_BD_Customer AS c  "+
             "LEFT JOIN dbo. T_BD_CSSPGroup AS cg ON cg.FID = c.FBrowseGroupID  "+
       ")     as cg on sb.FCustomerID = cg.FID  "+
"left join  "+
       "( "+ 
             "SELECT m.FID ,m. FNumber, m.FName_l2, m.FModel ,mg.FDisplayName_L2  "+
             ",mg.FDisplayName_L2 AS 'type0'  "+
             ",mg.FDisplayName_L2 AS 'type1'  "+
             ",mg.FDisplayName_L2 AS 'type2'  "+
             "FROM dbo.T_BD_Material AS m  "+
             "LEFT JOIN dbo. T_BD_MaterialGroup AS mg ON mg.FID = m.FMaterialGroupID  "+
       ")     as mg on se.FMaterialID = mg.FID  "+
"LEFT JOIN "+ 
             "(  "+
                   "SELECT m.FID AS FMaterialID ,m. FNumber AS FNumber, m.FName_l2 AS FName, m.FModel AS FModel , mgs. FName_L2, mg.FName_L2 AS FMaterialGroupStandard  "+
                   "FROM dbo.T_BD_MaterialGroupDetial AS mgd  "+
                   "INNER JOIN dbo. T_BD_Material AS m ON mgd.FMaterialID = m.FID  "+
                   "INNER JOIN dbo. T_BD_MaterialGroup AS mg ON mgd.FMaterialGroupID = mg.FID  "+
                   "INNER JOIN dbo. T_BD_MaterialGroupStandard AS mgs ON mgd.FMaterialGroupStandardID = mgs.FID  "+
                   "WHERE mgs.FID = 'zKoH04SnSGaaBPGx4Fnth5eb4R8=' "+
             ") AS mgp ON mgp.FMaterialID = se.FMaterialID  "+
"LEFT JOIN  "+
             "(  "+
                   "SELECT m.FID AS FMaterialID ,m. FNumber AS FNumber, m.FName_l2 AS FName, m.FModel AS FModel , mgs. FName_L2, mg.FName_L2 AS FMaterialGroupStandard "+ 
                   "FROM dbo.T_BD_MaterialGroupDetial AS mgd  "+
                   "INNER JOIN dbo. T_BD_Material AS m ON mgd.FMaterialID = m.FID  "+
                   "INNER JOIN dbo. T_BD_MaterialGroup AS mg ON mgd.FMaterialGroupID = mg.FID  "+
                   "INNER JOIN dbo. T_BD_MaterialGroupStandard AS mgs ON mgd.FMaterialGroupStandardID = mgs.FID  "+
                   "WHERE mgs.FID = 'rxeYrJ6RSpquKqs0T4Jhs5eb4R8=' "+
             ") AS mgp1 ON mgp1.FMaterialID = se.FMaterialID "+
"WHERE se.FStorageOrgUnitID IS NOT NULL";

sequelize.query(sql)
  .then(function(rows) {
      console.log(Object.prototype.toString.call(rows[1]));
      rows[0].forEach(function(value,index) {
        console.log(value.FMaterial);
      })    
    //console.log(rows[0][0]); //array
  })

// T_IM_SaleIssueBill.hasMany(T_IM_SaleIssueEntry, 
//   {
//     as: 'se',
//     foreignKey: 'FParentID',
//     constraints: false
//   });

// T_IM_SaleIssueEntry.belongsTo(T_IM_SaleIssueBill, 
//   {
//     as: 'sb',
//     foreignKey: 'FID',
//     constraints: false
//   });

// T_BD_Customer.hasMany(T_IM_SaleIssueBill,{
//   as: 'sb',
//   foreignKey: 'FCustomerID',
//   constraints: false
// });

// T_IM_SaleIssueBill.belongsTo(T_BD_Customer,{
//   as: 'c',
//   foreignKey: 'FID',
//   constraints: false
// });


// T_IM_SaleIssueEntry
//   .findAll({
//     where: {
//       FID: {$in: ["//+EZEEHQPa9cg9Rl1X+RbvAf74=","//0koJx+T06P5VxHU+YuWrvAf74="]}
//     },
//     include: [{
//       model: T_IM_SaleIssueBill,
//       as: "sb",
//       required : false
//     },
//     {
//         model: T_BD_Customer,
//         as: "c",
//         required: false
//     }]
//   })
//   .then(function(rows) {
//     console.log(rows.length);
// })



