const config = require('../config');

const decimalDigits = config.decimalDigits = 0;


//////////////////////////////////////////////////////
function printDetailsSummary(arrData) {  //数组要用reduce 一定要把空的剔除！
  let sumDetailsReport;
  if(arrData) {
    sumDetailsReport = arrData
                          .reduce((acc, val) => {
                              acc.push(val.name + '['+ val.model +']' + val.sumQty.toFixed(decimalDigits) + "吨,均单价" + (val.sumAmount / val.sumQty).toFixed(0));                       
                            return acc;
                          }, [])
                          .join(';'); //以逗号相连
  }
  return sumDetailsReport;
}

//采购和销售报表的statRes对象
// {
//   name:'高含量',
//   sumQty: 120,
//   sumAmount: 400320.00,
//   detail: [...{key: '火炬牌', name:'火炬牌复合肥', model: '15-15-15,50kg', sumQty: 120, sumAmount: 258000, type0:'化肥', type1: '复合肥', type2: '火炬牌', type3: '火炬牌', data:[metadata]}...],
//   data: [...metadata...]
// }
// 销售报表打印
function printSaleSummary(statRes, startDate) {
  var sumFert = statRes
    .statFertRes.filter((item) => { return item.sumQty != 0 })
    .reduce((acc, val) => {
      if(val.name == "尿素") {
        acc.push(val.name + val.sumQty.toFixed(decimalDigits) + '吨' + "(" + printDetailsSummary(val.details) + ")"); //val.details存明细
      } else { //这里只为“尿素”分类打印明细
        acc.push(val.name + val.sumQty.toFixed(decimalDigits) + '吨');
      }        
      return acc;
    }, [])
    .join(';');
  var strSaleSummary = "二、销售：化肥总售出" + statRes.sumCurtQty.toFixed(decimalDigits) + "吨，" + (statRes.sumCurtAmount / 10000).toFixed(decimalDigits) + "万元。" +
      "其中化肥" +sumFert + "。（以销售出库单统计）。";
  return strSaleSummary;
}

// 销售累计报表打印
function printSaleAccSummary(statRes, startDate) {
  let res = "三、" + startDate.toString().slice(0,4) + "年累计销售：全公司累计销售" + statRes.sumAccCurtQty.toFixed(decimalDigits) + "吨，同比增长" 
    + (((statRes.sumAccCurtQty - statRes.sumAccLastQty) / statRes.sumAccLastQty) * 100).toFixed() + "%；累计销额"
    + (statRes.sumAccCurtAmount / 10000).toFixed(decimalDigits) + "万元，同比增长" + (((statRes.sumAccCurtAmount - statRes.sumAccLastAmount) / statRes.sumAccLastAmount) * 100).toFixed() + '%；其中'
    + statRes.subAcc + '('
    + statRes.subAccDetail.reduce((acc, val) => {
      acc.push(val.name + val.sum.toFixed() + '吨,同比' + val.ratio + '%')
      return acc
    }, []).join(';')
    + ')；' 
    + statRes.jckAcc
    + '。';
  return res;
}

// 采购报表打印
function printPurSummary(statRes, startDate) {
  let sumFert = statRes
    .statFertRes.filter((item) => { return item.sumQty != 0 }) 
    .reduce((acc, val) => {
      // if(val.name == "尿素") {
      //   acc.push(val.name + val.sumQty.toFixed(decimalDigits) + '吨' + "(" + printDetailsSummary(val.details) + ")");
      // } else { //这里只为“尿素”分类打印明细
      //   acc.push(val.name + val.sumQty.toFixed(decimalDigits) + '吨');
      // }
      //所有物料都明细:尿素22吨（湖光尿素22吨，单价1700元）
      //acc.push(val.name + val.sumQty.toFixed(decimalDigits) + '吨' + "(" + printDetailsSummary(val.details) + ")");
      //只打印所有物料,不再打印大类合计了。
      acc.push(printDetailsSummary(val.details))
      return acc;
    }, [])
    .join(';');
  let strSaleSummary = "一、购进：化肥总购入" + statRes.sumCurtQty.toFixed(decimalDigits) + "吨，" + (statRes.sumCurtAmount / 10000).toFixed(decimalDigits) + "万元。" +
      "其中" + sumFert + "。";
  return strSaleSummary;
}

module.exports = function(res) {
    let purObj = res.pur;
    let saleObj = res.sale;
    let saleAccObj = res.saleAcc;
    let invtObj = res.invt;
    let startDate = res.startDate;
    let endDate = res.endDate;
    //purObj对象格式：{
    //    sumFertQty:       0, //全公司化肥总购入数量
    //    sumFertAmount:    0, //全公司化肥总购入金额
    //    detailFert:       [],//全公司化肥购进明细，其为一个对象数据，格式：[{name:'尿素', sum 123.0, data:[{name:'湖光尿素', qty:44, price:2000, model:'13-5-7'}, {name:'816尿素', qty:44, price:2000, model:'13-5-7'}]} ]
    //}
    // //采购报表:其实
    // let purReport = `
    //     一、购进：化肥总购进${purObj.sumFertQty}吨，${purObj.sumFertAmount}万元。`;
    // //purReport += purReport + `其中尿素${detailFert.filter((i) => i.)}吨（湖光，单价1800）。`;

    //purObj对象格式：{
    //    sumFertQty:       0, //全公司化肥总销售数量
    //    sumFertAmount:    0, //全公司化肥总销售金额
    //    detailFert:    0, //化肥销售数量明细
    //}
    // //采购报表:其实
    // let saleReport = `
    //     二、销售：化肥总售出530吨，105万元。其中尿素446吨（云化32吨，均单价1962；美丰59吨，单价1880；湖光5吨，单价1880；丰喜207吨，均单价1886；工农111吨，均单价1851；华锦32吨，单价1800），
    //     硝磷铵2吨，普钙13吨，钾肥40吨，复合肥30吨（高含量27吨）。2017年累计销售95965吨，同比增长28%；累计销额14906万元，同比增长38%（以销售出库单统计）。
    // `;

    let purReport = printPurSummary(purObj, startDate);
    let saleReport = printSaleSummary(saleObj, startDate);
    let saleAccReport = printSaleAccSummary(saleAccObj, startDate);
    //invtObj.sumFertSubBranchDetailQty = 滇中11792吨，楚雄13334吨，开远12124吨，大理18283吨，滇东北4644吨
    //invtObj.sumUreaSubBranchDetailQty = 滇中6859吨，楚雄7000吨，开远9525吨，大理13647吨，滇东北2621吨
    //invtObj.sumUreaSubBranchMaterialDetailQty = 云化2767吨，解化2吨，川化2吨，美丰3363吨，湖光7245吨，四面山19吨，蜀龙10吨，宜化145吨，财神10吨，丰喜5962吨，工农16969吨，816牌455吨，华锦813吨，天华987吨，天华螯合钾锌48吨，润飞288吨，金象微时代327吨，象牌179吨，裕农82吨
    //invtObj.sumUreaSubBranchQty = 尿素39676吨
    //invtObj.sumFertSubBranchQtyEx = 碳铵207吨，硝磷铵1468吨，普钙804吨，重钙695吨，钙镁磷190吨，磷铵112吨，钾肥5490吨，复合肥11460吨
    //invtObj.sumOtherFertSubBranchQty = 其它98吨
    //invtObj.sumOtherFertSubDetailQty = 纳若夏有机肥19吨，明月47吨，金满田32吨
    //invtObj.jckSumFertDetailQty = 尿素44吨，重钙21080吨，磷铵41108吨，磷酸984吨
    let invtReport = `四、库存：全公司化肥库存${invtObj.sumFertQty}吨。其中1、分公司库存${invtObj.sumFertSubBranchQty}吨（${invtObj.sumFertSubBranchDetailQty}），尿素${invtObj.sumUreaSubBranchQty}吨（${invtObj.sumUreaSubBranchDetailQty}，其中${invtObj.sumUreaSubBranchMaterialDetailQty}），${invtObj.sumFertSubBranchQtyEx}，其它${invtObj.sumOtherFertSubBranchQty}吨（${invtObj.sumOtherFertSubDetailQty}）。2、进出口部库存${invtObj.jckSumFertQty}吨（${invtObj.jckSumFertDetailQty}）。`;
    
    let rHeader = '';

    if(startDate != endDate) {
      rHeader = `${startDate.toString().slice(0,4)}年${startDate.toString().slice(4,6)}月${startDate.toString().slice(6)}至${endDate.toString().slice(0,4)}年${endDate.toString().slice(4,6)}月${endDate.toString().slice(6)}日化肥进销存：`;
    } else {
      rHeader = `${startDate.toString().slice(0,4)}年${startDate.toString().slice(4,6)}月${startDate.toString().slice(6)}日化肥进销存：`;
    }
    
    return rHeader+ '\n' + purReport + '\n' + saleReport + '\n' + saleAccReport + '\n' + invtReport;
}