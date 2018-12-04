var express = require('express');
var router = express.Router();
var connection = require('../config/connection')

router.post('/', function (req, res) {
//   var lastname = req.body.s_lastname;
  var searchName = req.body.s_searchName;
  var sql = 'SELECT *,DATE_FORMAT(birth_date, "%d/%m/%Y") AS birthday, DATE_FORMAT(hire_date, "%d/%m/%Y" ) AS hiredate FROM employees, titles';

//   if (lastname) {
//       sql += " and last_name='" + lastname + "' ";
//   }

  if (searchName) {
    //   sql += " and first_name='" + firstname + "' or last_name='" + firstname + "' ";
    sql += " and concat(first_name, ' ', last_name) Like '%" + searchName + "%'";
  }

  sql += " and employees.emp_no = titles.emp_no limit 100;"
  sql = sql.replace("and","where");
  console.log(sql)
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

  connection.query('SELECT *,DATE_FORMAT(birth_date,"%d/%m/%Y") AS birthday, DATE_FORMAT(hire_date,"%d/%m/%Y") AS hiredate FROM employees, titles where employees.emp_no = titles.emp_no limit 100', function (err, rows){
    if (err) throw err;
    // console.log(rows);
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