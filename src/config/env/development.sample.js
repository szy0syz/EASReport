module.exports = {
  dbConnectStr: 'mssql://username:password@localhost:port/dbname',
  sequelizeOptions: {
    dialectOptions: {
      requestTimeout: 60*1000
    }
  },
  port: 6006,
  decimalDigits: 0 //统计结果的小数点位数
}