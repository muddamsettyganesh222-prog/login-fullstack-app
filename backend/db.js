const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Inf0rmati0n@123',
    database: 'login_app',
    port: 3306
})

module.exports = db