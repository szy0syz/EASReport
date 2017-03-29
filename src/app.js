var express = require('express')
var dailyReport = require('./index.js')
var app = express()
app.use(express.static('public'));

app.get('/report/daily', function (req, res) {
  //console.log("_________4444");
  dailyReport(req.query.s); //只要一个日期参数
  res.send(req.query.s + '的日报表正在制作,请2分钟后访问http://localhost:6006/2017xxxx.txt读取报表结果.');
  //console.log("_________55555");
})

//倒数第二处理500
app.use(function(err, req, res, next) {
  console.log('检查到未处理的错误：' + err.message);
  res.sned('500 - 服务器错误');
})

//最后处理404
app.use(function(req, res) {
  console.log('未找到路由');
  res.send('404 - 未找到');
})

app.listen(6007, function () {
  console.log('Example app listening on port 6007!')
})