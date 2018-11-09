var mysql = require('mysql');
// https://o7planning.org/en/11959/connecting-to-mysql-database-using-nodejs

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees',
});

connection.connect(function (err) {
    if(err) throw err;
})

module.exports = connection;