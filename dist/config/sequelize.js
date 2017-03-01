'use strict';

var Sequelize = require('Sequelize');
var config = require('./config');

module.exports = function () {
  var seq = new Sequelize(config.dbConnectStr, config.sequelizeOptions);
  return seq;
};