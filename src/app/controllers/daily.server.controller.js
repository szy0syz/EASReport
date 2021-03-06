let DailyLogic = require('../logics/daily.server.logic');

module.exports = {
  get: function(req, res, next) {
    res.render('daily');
  },
  post: function(req, res, next) {
    //此方法主要用来生成日报表结果对象
    if(!req.body.startDate && !req.body.endDate) return next(new Error('params is undefined'));
    //执行算法对象生成结果文件
    DailyLogic(req.body.startDate, req.body.endDate);
    res.render('success', {title: '提交成功', msg: `${req.body.startDate}至${req.body.endDate}日报正在制作中...\n请勿重复提交!!!`});

  },
  getReportByDate: function(req, res, next, val) {
    if(!val) return next(new Error('params is undefined'));
    console.log('in params;');
    //获取这边前端直接生成吧
    return next();
  },
  getReport: function(req, res, next) {

  }
}