var express = require('express');
var router = express.Router();
var connection = require('../config/connection');

router.get('/', function(req, res, next) {
    connection.query('SELECT dept_emp.dept_no,dept_name, count(*) as employees_count from dept_emp,departments where departments.dept_no = dept_emp.dept_no group by dept_no limit 100', function(err, rows){
        if (err) throw err;
        res.render('departments', {departments: rows});
    })
})

module.exports = router;