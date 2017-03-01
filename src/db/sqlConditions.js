var sqlConditions = {
    FBizDateStart: '2017-02-04',
    FBizDateEnd:   '2017-02-04'
}

module.exports = sqlConditions;

// module.exports = function(options) {
//   if(validate(options)) return {};
  
//   let resObj = {};

//   resObj.FBizDateStart = options.FBizDateStart;
//   resObj.FBizDateEnd = options.FBizDateEnd;

//   resObj.exec = function() {
//     let sb = '';
//     if(options.source.toLowerCase() == 'PurIn') {
//         sb += ' and '
//     }
//   }


// };

// function validate(data) {
//   let arr = 'FBizDateStart FBizDateEnd'.split(' ');
//   arr.forEach((val) => {
//     if(!data[val]) return false;
//     return true;
//   });
// }