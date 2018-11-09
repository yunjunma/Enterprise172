var express = require('express');
var router = express.Router();
var connection = require('../config/connection')
 
/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT * FROM employees limit 100', function (err, rows){
    if (err) throw err;
    res.render('index', { title: 'Express', employees:rows });

  })

  // tables in employees
// | current_dept_emp     |
// | departments          |
// | dept_emp             |
// | dept_emp_latest_date |
// | dept_manager         |
// | employees            |
// | salaries             |
// | titles 
});

module.exports = router;
