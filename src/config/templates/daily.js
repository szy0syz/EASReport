module.exports = function(res) {
    let purObj = res.pur;
    //purObj对象格式：{
    //    sumFertQty:       0, //全公司化肥总购入数量
    //    sumFertAmount:    0, //全公司化肥总购入金额
    //    detailFert:    0, //化肥购进数量明细
    //}
    //采购报表:其实
    let purReport = `
        一、购进：化肥总购进${purObj.sumFertQty}吨，${purObj.sumFertAmount}万元。其中尿素360吨（湖光，单价1800）。
    
    `;

    let saleObj = res.sale;
    //purObj对象格式：{
    //    sumFertQty:       0, //全公司化肥总销售数量
    //    sumFertAmount:    0, //全公司化肥总销售金额
    //    detailFert:    0, //化肥销售数量明细
    //}
    //采购报表:其实
    let saleReport = `
        二、销售：化肥总售出530吨，105万元。其中尿素446吨（云化32吨，均单价1962；美丰59吨，单价1880；湖光5吨，单价1880；丰喜207吨，均单价1886；工农111吨，均单价1851；华锦32吨，单价1800），
        硝磷铵2吨，普钙13吨，钾肥40吨，复合肥30吨（高含量27吨）。2017年累计销售95965吨，同比增长28%；累计销额14906万元，同比增长38%（以销售出库单统计）。
    
    `;


    let invtObj = res.invt;
    //invtObj.sumFertSubBranchDetailQty = 滇中11792吨，楚雄13334吨，开远12124吨，大理18283吨，滇东北4644吨
    //invtObj.sumUreaSubBranchDetailQty = 滇中6859吨，楚雄7000吨，开远9525吨，大理13647吨，滇东北2621吨
    //invtObj.sumUreaSubBranchMaterialDetailQty = 云化2767吨，解化2吨，川化2吨，美丰3363吨，湖光7245吨，四面山19吨，蜀龙10吨，宜化145吨，财神10吨，丰喜5962吨，工农16969吨，816牌455吨，华锦813吨，天华987吨，天华螯合钾锌48吨，润飞288吨，金象微时代327吨，象牌179吨，裕农82吨
    //invtObj.sumUreaSubBranchQty = 尿素39676吨
    //invtObj.sumFertSubBranchQtyEx = 碳铵207吨，硝磷铵1468吨，普钙804吨，重钙695吨，钙镁磷190吨，磷铵112吨，钾肥5490吨，复合肥11460吨
    //invtObj.sumOtherFertSubBranchQty = 其它98吨
    //invtObj.sumOtherFertSubDetailQty = 纳若夏有机肥19吨，明月47吨，金满田32吨
    //invtObj.jckSumFertDetailQty = 尿素44吨，重钙21080吨，磷铵41108吨，磷酸984吨
    let invtReport = `
        三、库存：全公司化肥库存${invtObj.sumFertQty}吨。其中
        1、分公司库存${invtObj.sumFertSubBranchQty}吨（${invtObj.sumFertSubBranchDetailQty}），
        尿素（${invtObj.sumUreaSubBranchDetailQty}顿，其中${invtObj.sumUreaSubBranchMaterialDetailQty}），
        ${invtObj.sumFertSubBranchQtyEx}，
        其它${invtObj.sumOtherFertSubBranchQty}吨（${invtObj.sumOtherFertSubDetailQty}）。
        2、进出口部库存${invtObj.jckSumFertQty}吨（${invtObj.jckSumFertDetailQty}）。
    `

    return invtReport;
}