var express = require('express');
var router = express.Router();
var connection = require('../config/connection');

router.get('/', function(req, res, next) {
    connection.query('SELECT * FROM departments limit 100', function(err, rows){
        if (err) throw err;
        res.render('dashboard', {departments: rows});
    })
})

module.exports = router;