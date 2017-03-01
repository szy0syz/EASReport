var express = require('express')
var dailyReport = require('./index.js')
var app = express()

app.get('/report/daily', function (req, res) {
  console.log("_________4444");
  dailyReport(req.query.s, req.query.e);
  res.send(req.query.s+ '___' +req.query.e);
  console.log("_________55555");
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})