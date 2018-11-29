var express = require('express');
var router = express.Router();
var connection = require('../config/connection')

router.post('/', function (req, res) {
  var lastname = req.body.s_lastname;
  var firstname = req.body.s_firstname;
  var birthday = req.body.birthday;
  var e_id = req.body.e_id;
  var title = req.body.title;
  var hire_date = req.body.hire_date;
  var salary = req.body.salary;
  var end_date = req.body.end_date;
  var gender = req.body.gender;

  var e_sql = "insert into employees "
    e_sql += "(emp_no, birth_date, first_name, last_name, gender,hire_date) "
    e_sql += "values "
    e_sql += "(" + e_id + ", '" + birthday + "', '" + firstname +"', '"+ lastname+ "', '"+ gender + "', '"+ hire_date + "') "

  var t_sql = "insert into titles "
    t_sql += "(emp_no, title, from_date, to_date) "
    t_sql += "values "
    t_sql += "(" + e_id + ", '" + title + "', '" + hire_date +"', '" + end_date + "') "

  var s_sql = "insert into salaries "
    s_sql += "(emp_no, salary, from_date, to_date) "
    s_sql += "values "
    s_sql += "(" + e_id + ", " + salary + ", '" + hire_date +"', '" + end_date + "') "

  connection.query(e_sql, function (err, result) {
      if (err) {
          res.end("Error：", err)
      } else {
        //   res.render("employee");
          console.log("Passed!");
        //   console.log(result)
      }
  });
  connection.query(t_sql, function (err, result) {
        if (err) {
            res.end("Error：", err)
        } else {
            // res.render("employee");
            console.log("Passed!");
        //   console.log(result)
        }
    });
    connection.query(s_sql, function (err, result) {
        if (err) {
            res.end("Error：", err)
        } else {
            res.render("employee");
            console.log("Passed!");
        //   console.log(result)
        }
    });
});

router.get('/', function(req, res, next) {

    connection.query('SELECT * FROM employees limit 100', function (err, rows){
      if (err) throw err;
      console.log(rows);
      res.render('employee', { employees:rows });
  
    })
  
  });
 
// insert into employees
// (emp_no, birth_date, first_name, last_name, gender,hire_date)
// values
// (600000, '1990-12-12', 'Tim', 'John', 'M', '2018-11-29')

// insert into titles
// (emp_no, title, from_date, to_date)
// values
// (600000, 'senior', '2018-12-12', '2019-11-29')

// insert into salaries
// (emp_no, salary, from_date, to_date)
// values
// (600000, 100000, '2018-12-12', '2019-11-29')

module.exports = router;