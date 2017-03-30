let DailyController = require('../controllers/daily.server.contorller');

module.exports = function(app) {
  app.route('/daily')
    .get(DailyController.get)
    .post(DailyController.post);

  app.route('/daily/:targetDate')
    .get(DailyController.getReport);

  app.params('targetDate', DailyController.getReportByDate);
}