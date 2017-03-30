module.exports = function(res) {
    let invtObj = res.invt;
    //invtObj.sumFertSubBranchDetailQty = 滇中11792吨，楚雄13334吨，开远12124吨，大理18283吨，滇东北4644吨
    //invtObj.sumUreaSubBranchDetailQty = 滇中6859吨，楚雄7000吨，开远9525吨，大理13647吨，滇东北2621吨
    //invtObj.sumUreaSubBranchMaterialDetailQty = 云化2767吨，解化2吨，川化2吨，美丰3363吨，湖光7245吨，四面山19吨，蜀龙10吨，宜化145吨，财神10吨，丰喜5962吨，工农16969吨，816牌455吨，华锦813吨，天华987吨，天华螯合钾锌48吨，润飞288吨，金象微时代327吨，象牌179吨，裕农82吨
    //invtObj.sumFertSubBranchQty = 尿素39676吨
    //invtObj.sumFertSubBranchQtyEx = 碳铵207吨，硝磷铵1468吨，普钙804吨，重钙695吨，钙镁磷190吨，磷铵112吨，钾肥5490吨，复合肥11460吨
    //invtObj.sumOtherFertSubBranchQty = 其它98吨
    //invtObj.sumOtherFertSubDetailQty = 纳若夏有机肥19吨，明月47吨，金满田32吨
    //${invtObj.jckSumFertDetailQty} = 尿素44吨，重钙21080吨，磷铵41108吨，磷酸984吨
    let invtReport = `
        三、库存：全公司化肥库存${invtObj.sumFertQty}吨。其中
        1、分公司库存${invtObj.sumFertSubBranchQty}吨（${invtObj.sumFertSubBranchDetailQty}），
        （${invtObj.sumUreaSubBranchDetailQty}，其中${invtObj.sumUreaSubBranchMaterialDetailQty}），
        ${invtObk.sumFertSubBranchQtyEx}，
        ${invtObj.sumOtherFertSubBranchQty}（）。
        2、进出口部库存${invtObj.jckSumFertQty}吨（${invtObj.jckSumFertDetailQty}）。
    `

    return invtReport;
}