-- 统计记录条数，不能使用出库单上的核计数  
-- all times is 'left join', because some filed is NULL  
-- modfied time: 2015-01-08 21:27 
-- log:  
--          2014-11-15 13:20  add 'FBrandFertilizer' and 'BrandCarbaMind' fields  
--          2014-11-15 14:48  add 'FMaterialModel' field  
--          2014-11-15 15:02  优化EAS分类标准表中 'FBrandFertilizer' 和'BrandCarbaMind' 两个字段相关全部物料 (屏蔽NULL 值)  
--          2014-11-20 21:56  add 'FBaseStatus' field
--          2015-01-05 10:14  remove filter "FControlUnitID" ,add "FControlUnitID" to filed
--          2015-01-08 21:27  add 'FShopAttributionUnit' filed , left join table 'SZY_ShopData_Table'
--          2015-12-11 14:24  del 'FShopAttributionUnit' filed , and del left join table 'SZY_ShopData_Table'
--          2015-12-11 14:25  del function 'Get_StrArrayStrOfIndex' , and it will remark in linq
--------********************************************************************-------  
-- remarks:  
--          01. 缺库位字段； 02.FParentStorageOrgUnit需在tableau 作二次逻辑判断； 
--			03. 底层有许多库存组织为空的销售出库单，为历史遗留问题，暂全部过滤；  
-----------------------------------------------------------------------------------  
SELECT
             sb.FID ,c.FName_L2 as FCustomer, pt.FName_L2 as FPaymentType,bu.FName_L2 as FStorageOrgUnit , bu4. FParentUnit AS FParentStorageOrgUnit,  
             tt.FName_L2 as FTransactionType,sb.FAuditTime , u1.FName_L2 as FAuditor ,  
             sb.FBaseStatus AS FBaseStatus ,bizt.FName_L2 as FBizType,  
             blt.FName_L2 as FBillType,sb.FYear , sb.FPeriod ,sb. FNumber,  
             sb.FBizDate ,u.FName_L2 as FCreator,sb.FCreateTime , bu1.FName_L2 as FControlUnit,  
             sb.FIsInTax ,sb.FMonth ,sb.FDay, bu2. FName_L2 as CFNZDepCash,  
             ------entry------  
             se.FTaxPrice ,FActualPrice ,  
             c1.FName_L2 as FBalanceCustomer,c2.FName_L2 as FOrderCustomer,c3.FName_L2 as FPaymentCustomer ,  
             bu3.FName_L2 as FCompanyOrgUnit,wh.FName_L2 as FWarehouse, --少库位,se.FStockerID  
             se.FQty ,FBaseQty ,  
             se.FPrice ,FAmount , FUnitActualCost ,FActualCost ,  
             mu.FName_L2 as FUnit,mu1.FName_L2 as FBaseUnit ,  
             se.FDiscount ,se.CFMinPrice ,CFNZMaterialName ,  
             --------CustomerGroup--------  
             cg.FNumber as FCustomerNumber, cg.FDisplayName_L2 as FCustomerDisplayName, cg.type0 as FCustomerType0,  
             cg.type1 as FCustomerType1, cg.type2 as FCustomerType2,  
             --------MaterialGroup---------  
             mg.FNumber as FMaterialNumber, mg.FName_l2 as FMaterial, mg.FModel AS FMaterialModel, mg.FDisplayName_L2 as FMaterialDisplayName,  
             mg.type0 as FMaterialType0, mg.type1 as FMaterialType1, mg.type2 as FMaterialType2,  
             ------------------------------  
             mgp.FMaterialGroupStandard AS FBrandFertilizer , mgp1.FMaterialGroupStandard AS FBrandCarbaMind
from T_IM_SaleIssueEntry as se -- finall, used SaleIssueEntry , it's metadate !  
left join T_IM_SaleIssueBill as sb on se.FParentID = sb.FID -- right is great !  
left join T_BD_Customer as c on sb.FCustomerID = c.FID  
left join T_BD_PaymentType as pt on sb.FPaymentTypeID = pt.FID  
left join T_ORG_BaseUnit as bu on sb.FStorageOrgUnitID = bu.FID  
left join T_SCM_TransactionType as tt on sb.FTransactionTypeID = tt.FID  
left join T_SCM_BizType as bizt on sb.FBizTypeID = bizt.FID  
left join T_SCM_BillType as blt on sb.FBillTypeID = blt.FID  
left join T_PM_User as u on sb.FCreatorID = u.FID    -- may be NULL , must be 'left join' !!!  
left join T_PM_User as u1 on sb.FAuditorID = u1.FID  
left join T_ORG_BaseUnit as bu1 on sb.FControlUnitID = bu1.FID  -- 销售出库单控制单元，就是所属的总公司 
left join T_ORG_BaseUnit as bu2 on sb.CFNZDepCashID = bu2.FID  
left join T_BD_Customer as c1 on se.FBalanceCustomerID = c1.FID  
left join T_BD_Customer as c2 on se.FOrderCustomerID = c2.FID  
left join T_BD_Customer as c3 on se.FPaymentCustomerID = c3.FID  
left join T_ORG_BaseUnit as bu3 on se.FCompanyOrgUnitID = bu3.FID  
left join T_DB_WAREHOUSE as wh on se.FWarehouseID = wh.FID  
left join T_BD_MeasureUnit as mu on se.FUnitID = mu.FID  
inner join T_BD_MeasureUnit as mu1 on se.FBaseUnitID = mu1.FID  
LEFT JOIN  
             ( -- 以后应该输出 flevel，加以判断  
                   SELECT ibu.FID, ibu.FName_L2 ,ibu1. FName_L2 AS FParentUnit,ibu1.FID AS FParentUnitID FROM T_ORG_BaseUnit AS ibu  
                   LEFT JOIN T_ORG_BaseUnit AS ibu1 ON ibu.FParentID = ibu1.FID  
             ) AS bu4 ON se.FStorageOrgUnitID = bu4.FID  --bu4: 查询销售库存组织的上级组织！
left join  
       (  
             SELECT c.FID , c.FNumber ,c. FName_L2, cg.FDisplayName_L2,  
             cg.FDisplayName_L2 AS 'type0',  
             cg.FDisplayName_L2 AS 'type1',  
             cg.FDisplayName_L2 AS 'type2'  
             FROM dbo.T_BD_Customer AS c  
             LEFT JOIN dbo. T_BD_CSSPGroup AS cg ON cg.FID = c.FBrowseGroupID  
       )     as cg on sb.FCustomerID = cg.FID  
left join  
       (  
             SELECT m.FID ,m. FNumber, m.FName_l2, m.FModel ,mg.FDisplayName_L2  
             ,mg.FDisplayName_L2 AS 'type0'  
             ,mg.FDisplayName_L2 AS 'type1'  
             ,mg.FDisplayName_L2 AS 'type2'  
             FROM dbo.T_BD_Material AS m  
             LEFT JOIN dbo. T_BD_MaterialGroup AS mg ON mg.FID = m.FMaterialGroupID  
       )     as mg on se.FMaterialID = mg.FID  
LEFT JOIN  
             (  
                   SELECT m.FID AS FMaterialID ,m. FNumber AS FNumber, m.FName_l2 AS FName, m.FModel AS FModel , mgs. FName_L2, mg.FName_L2 AS FMaterialGroupStandard  
                   FROM dbo.T_BD_MaterialGroupDetial AS mgd  
                   INNER JOIN dbo. T_BD_Material AS m ON mgd.FMaterialID = m.FID  
                   INNER JOIN dbo. T_BD_MaterialGroup AS mg ON mgd.FMaterialGroupID = mg.FID  
                   INNER JOIN dbo. T_BD_MaterialGroupStandard AS mgs ON mgd.FMaterialGroupStandardID = mgs.FID  
                   WHERE mgs.FID = 'zKoH04SnSGaaBPGx4Fnth5eb4R8=' --品牌化肥销售统计表 BrandFertilizer  
             ) AS mgp ON mgp.FMaterialID = se.FMaterialID  
LEFT JOIN  
             (  
                   SELECT m.FID AS FMaterialID ,m. FNumber AS FNumber, m.FName_l2 AS FName, m.FModel AS FModel , mgs. FName_L2, mg.FName_L2 AS FMaterialGroupStandard  
                   FROM dbo.T_BD_MaterialGroupDetial AS mgd  
                   INNER JOIN dbo. T_BD_Material AS m ON mgd.FMaterialID = m.FID  
                   INNER JOIN dbo. T_BD_MaterialGroup AS mg ON mgd.FMaterialGroupID = mg.FID  
                   INNER JOIN dbo. T_BD_MaterialGroupStandard AS mgs ON mgd.FMaterialGroupStandardID = mgs.FID  
                   WHERE mgs.FID = 'rxeYrJ6RSpquKqs0T4Jhs5eb4R8=' --品牌尿素销售统计表 BrandCarbaMind  
             ) AS mgp1 ON mgp1.FMaterialID = se.FMaterialID 
WHERE se.FStorageOrgUnitID IS NOT NULL  --过滤销售出库单单据体中，库存组织为空的元数据。
             --以下是 test  
			 --AND sb.FControlUnitID = 'a06viCxSRPSu0pa/lIWabcznrtQ='    -- YNGF --以下是 test  
			 --AND sb.FBizDate between '2014-10-01' and '2014-10-31'  
			 --AND mg.FName_l2 LIKE '%云化%' AND bu4.FParentUnit LIKE '%大理%'