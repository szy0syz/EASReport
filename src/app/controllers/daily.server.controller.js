let DailyLogic = require('../logic/daily.server.logic');

module.exports = {
  get: function(req, res, next) {
    if(!req.params.targetDate) return next(new Error('params is undefined'));
    //执行算法对象生成结果文件
    DailyLogic(req.body.targetDate);
    res.json({success: true});
  },
  post: function(req, res, next) {
    //此方法主要用来生成日报表结果对象
    if(!req.params.targetDate) return next(new Error('params is undefined'));
    //执行算法对象生成结果文件
    DailyLogic(req.body.targetDate);
    res.json({success: true});

  },
  getReportByDate: function(req, res, next, date) {
    if(!date) return next(new Error('params is undefined'));
    //获取这边前端直接生成吧
  },
  getReport: function(req, res, next) {

  }
}