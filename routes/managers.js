var express = require('express');
var router = express.Router();
var connection = require('../config/connection')

router.post('/', function (req, res) {
//   var lastname = req.body.s_lastname;
//   var firstname = req.body.s_firstname;
  var searchName = req.body.s_searchName;
  var sql = 'SELECT *,DATE_FORMAT(birth_date, "%d/%m/%Y") AS birthday, DATE_FORMAT(hire_date, "%d/%m/%Y" ) AS hiredate FROM employees, dept_manager';

//   if (lastname) {
//       sql += " and last_name='" + lastname + "' ";
//   }

  if (searchName) {
      sql += " and concat(first_name, ' ', last_name) Like '%" + searchName + "%'";
  }

  sql += " and employees.emp_no = dept_manager.emp_no limit 100"
  sql = sql.replace("and","where");
  connection.query(sql, function (err, rows) {
      console.log(sql);
      if (err) {
          res.end("Error：", err)
      } else {
          res.render("managers", {employees:rows});
      }
  });
});
 
/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT *, DATE_FORMAT(birth_date,"%d/%m/%Y") AS birthday, DATE_FORMAT(hire_date,"%d/%m/%Y") AS hiredate FROM employees, dept_manager where employees.emp_no = dept_manager.emp_no limit 100', function (err, rows){
    if (err) throw err;
    console.log(rows);
    res.render('managers', { employees:rows });

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