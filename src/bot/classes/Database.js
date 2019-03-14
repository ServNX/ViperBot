const mysql = require('mysql');
const config = require('../config');

module.exports = class DB {
  constructor () {
    this.db = mysql.createConnection({
      host: 'servnx.com',
      user: config.DB_USER,
      password: config.DB_PASS,
      database: config.DB_NAME,
    });

    this.db.connect(err => {
      if (err) console.log(`MySQL Error: ${err.code}`);
    });
  }
};
