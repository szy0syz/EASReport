const express    = require('express');
const bodyParser = require('body-parser');
const exphbs     = require('express-handlebars'); 
const winston    = require('winston');
const exWinston  = require('express-winston');

module.exports = function() {
  console.log('init express...');
  let app = express();

  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.engine('handlebars', exphbs({defaultLayout: 'main'})); //设置模板页名称main
  app.set('view engine', 'handlebars');

  //加载路由...
  require('../app/routes/daily.server.route')(app);
  
  //记录错误堆栈信息到日志文件
  app.use(exWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      }),
      new winston.transports.File({
        filename: 'logs/error.log'
      })
    ]
  }));

    //处理404
    app.use(function(req, res, next) {
    try {
      res.status(404).send('404 - 未找到');
    } catch(e) {
      console.error('404 set header agter sent');
    }
  });

  //处理500
  app.use(function(err, req, res, next) {
  console.log('检查到未处理的错误：' + err.message);
  res.status(500).send('500 - 服务器错误');
})

  return app;
}

