'use strict';

// 根据传入的sequelize实例和model名加载对象
// 还是依照啥时候要啥时候加载原则处理！
module.exports = function (seq, modelName) {
  return seq.import('../models/' + modelName);
};