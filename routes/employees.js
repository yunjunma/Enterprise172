var express = require('express');
var router = express.Router();
var connection = require('../config/connection')

router.post('/', function (req, res) {
  var lastname = req.body.s_lastname;
  var firstname = req.body.s_firstname;
  var sql = "SELECT * FROM employees, titles";

  if (lastname) {
      sql += " and last_name='" + lastname + "' ";
  }

  if (firstname) {
      sql += " and first_name='" + firstname + "' ";
  }

  sql += " and employees.emp_no = titles.emp_no"
  sql = sql.replace("and","where");
  connection.query(sql, function (err, rows) {
      if (err) {
          res.end("Error：", err)
      } else {
          res.render("employees", {employees:rows});
      }
  });
});
 
/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT * FROM employees limit 100', function (err, rows){
    if (err) throw err;
    console.log(rows);
    res.render('employees', { title: 'Express', employees:rows });

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