var express = require('express')
var bodyParser = require('body-parser')
var exphbs  = require('express-handlebars');
var dailyReport = require('./index.js')
var app = express()
app.use(express.static('public'));
app.use(require('body-parser')());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/daily/:targetDate', function (req, res) {
    dailyReport(req.params.targetDate); //只要一个日期参数
    res.send(req.query.s + '的日报表正在制作,请2分钟后访问报表结果.');
})

// //处理404
// app.use(function(req, res, next) {
//   try {
//     return res.end('404 - 未找到');
//   } catch(e) {
//     console.error('404 set header agter sent');
//   }
// })

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

app.listen(6008, function () {
  console.log('Example app listening on port 6008!')
})