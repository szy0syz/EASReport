const Sequelize = require('Sequelize');
const config = require('./config');

module.exports = function() {
  let seq = new Sequelize(config.dbConnectStr, config.sequelizeOptions);
  return seq;
}