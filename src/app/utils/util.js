module.exports = {
  //方法：根据传入参数求对象数组某一属性名的累加和
  //参数：（对象数组，对象属性名）
  //返回：数字结果
  sumByColumnName(arrData, cn) {
    let sum = arrData.reduce((acc, val) => {
    acc += Number(val[cn]); 
    return acc;
    }, 0.0);
    return sum;
  },
  ////////////////////////////////////////////////
  // paras:  arrData = sql metadata models
  //         options = {fitter, group, colName}
  // return: array[{name: xx, sum:yy}, {name: xx, sum:yy}]
  filterAndGroupAndSumByColumn(arrData, options) {
    // 检查arrData不能为空，colName长度大于0。
    if(!arrData && options.colName.length >0) return [];
  
    // 先过滤
    if(options.filter) {
      arrData = arrData.filter(options.filter);
    }
    // 再分组
    if(options.group) {
      arrData = arrData.group(options.group);
    }
    // 最后聚合
    arrData = arrData.reduce((acc, val) => {
    acc.push({
      name: val.key,
      sum: this.sumByColumnName(val.data, options.colName)
    })
    return acc;
    }, []);
    return arrData;
  },
  /////////////////////////////////////////////////
  filterAndGroupAndSumByColumnWithDetails(arrData, options) {
    // 检查arrData不能为空，colName长度大于0。
    if(!arrData && options.colName.length >0) return [];
  
    // 先过滤
    if(options.filter) {
      arrData = arrData.filter(options.filter);
    }
    // 再分组
    if(options.group) {
      arrData = arrData.group(options.group);
    }
    // 最后聚合
    arrData = arrData.reduce((acc, val) => {
    acc.push({
      name: val.key,
      sum: this.sumByColumnName(val.data, options.colName),
      data: val.data // plus metadata array
    })
    return acc;
    }, []);
    return arrData;
  }
}