const {Pool} = require('pg');
const {cn} = require('./config');

const connection = new Pool({
    user: cn.user,
    password: cn.password,
    host: cn.host,
    port: cn.port,
    database: cn.database
});

module.exports = connection;