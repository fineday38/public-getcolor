const mysql = require('mysql2');
const db_config = require('../config/db_config')

const dbpool = mysql.createPool(db_config.getcolor_db_config);

module.exports = {
    dbpool: dbpool.promise()
};