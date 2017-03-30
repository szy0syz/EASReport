const Sequelize = require('Sequelize');
const config = require('./config');

module.exports = function() {
  const seq = new Sequelize(config.dbConnectStr, config.sequelizeOptions);
  return seq;
}