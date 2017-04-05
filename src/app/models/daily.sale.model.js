const DEFAULTS = {
  sumFertQty:       0, //全公司化肥购进数量
  sumFertAmount:    0, //全公司化肥购进金额
  detailFert:       [] //全公司化肥购进明细，其为一个对象数据，格式：[{name:'尿素', sum 123.0, data:[{name:'湖光尿素', qty:44, price:2000, model:'13-5-7'}, {name:'816尿素', qty:44, price:2000, model:'13-5-7'}]} ]
}

module.exports = function (obj) {
  obj = Object.assign({}, DEFAULTS, obj);
  return obj;
}