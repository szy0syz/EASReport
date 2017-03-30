let DailyController = require('../controllers/daily.server.controller');

module.exports = function(app) {
  app.route('/daily')
    .get(DailyController.get)     // 返回日报视图，其功能包含日报制作与日报查询
    .post(DailyController.post);  // 提交制作目标日期日报的请求

  app.route('/daily/:targetDate')
    .get(DailyController.getReport)  //发送获取日报的请求，返回hbs视图
    .post(DailyController.getReport) //发送获取日报的请求，返回json对象

  app.param('targetDate', DailyController.getReportByDate);
}