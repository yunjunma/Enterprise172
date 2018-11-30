var express = require('express');
var router = express.Router();
var connection = require('../config/connection');
var mysql      = require('mysql');
var async      = require('async');
var credentials = {connectionLimit: 10};


router.get('/', function (req, res) {
    var pool = mysql.createPool(credentials);
    var query1 = "SELECT COUNT(DISTINCT title) as title from titles";
    var query2 = "SELECT COUNT(emp_no) as employee FROM employees";
    var query3 = "SELECT SUM(salary) as money FROM salaries";
    var query4 = "SELECT COUNT(dept_name) as department FROM departments";
    var query5 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1985";
    var query6 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1986";
    var query7 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1987";
    var query8 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1988";
    var query9 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1989";
    var query10 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1990";
    var query11 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1991";
    var query12 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1992";
    var query13 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1993";
    var query14 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1994";
    var query15 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1995";
    var query16 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1996";
    var query17 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1997";
    var query18 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1998";
    var query19 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) = 1999";
    //var query20 = "SELECT COUNT(emp_no) as employee FROM employees where YEAR(hire_date) > 2000";
    //var query10 = "SELECT title, MIN(age), MAX(age) FROM User, Loan where User.uID = Loan.uID group by title;"; 
    // Not sure which query this is for so I will just leave this as is
    
    //var query10 = "SELECT YEAR(hire_date) as year FROM employees";

    var return_data = {};
/*
    connection.query(query1, function(err, result1) {
        connection.query(query2, function(err, result2) {
            connection.query(query3, function(err, result3) {
                connection.query(query4, function(err, result4) {
                    connection.query(query5, function(err, result5) {
                        connection.query(query6, function(err, result6) {
                            res.render('dashboard', { rows : result1, rows2 : result2, rows3 : result3, rows4 : result4, rows5 : result5, rows6 : result6 });
                        });
                    });
                });
            });
        });
    });
*/

    async.parallel([
        function(callback) { connection.query(query1, callback) },
        function(callback) { connection.query(query2, callback) }, 
        function(callback) { connection.query(query3, callback) },
        function(callback) { connection.query(query4, callback) },
        function(callback) { connection.query(query5, callback) },
        function(callback) { connection.query(query6, callback) },
        function(callback) { connection.query(query7, callback) },
        function(callback) { connection.query(query8, callback) },
        function(callback) { connection.query(query9, callback) },
        function(callback) { connection.query(query10, callback) },
        function(callback) { connection.query(query11, callback) },
        function(callback) { connection.query(query12, callback) }, 
        function(callback) { connection.query(query13, callback) },
        function(callback) { connection.query(query14, callback) },
        function(callback) { connection.query(query15, callback) },
        function(callback) { connection.query(query16, callback) },
        function(callback) { connection.query(query17, callback) },
        function(callback) { connection.query(query18, callback) },
        function(callback) { connection.query(query19, callback) },
        //function(callback) { connection.query(query20, callback) },
        //function(callback) { connection.query(query10, callback) },
      ], function(err, results) {
        //console.log(JSON.stringify(results[9][0][0]["year"]));
        res.render('dashboard', { rows : JSON.stringify(results[0][0][0]["title"]), 
                                rows2 : JSON.stringify(results[1][0][0]["employee"]), 
                                rows3 : JSON.stringify(results[2][0][0]["money"]), 
                                rows4 : JSON.stringify(results[3][0][0]["department"]), 
                                rows5 : JSON.stringify(results[4][0][0]["employee"]), 
                                rows6 : JSON.stringify(results[5][0][0]["employee"]), 
                                rows7 : JSON.stringify(results[6][0][0]["employee"]), 
                                rows8 : JSON.stringify(results[7][0][0]["employee"]), 
                                rows9 : JSON.stringify(results[8][0][0]["employee"]), 
                                rows10 : JSON.stringify(results[9][0][0]["employee"]), 
                                rows11 : JSON.stringify(results[10][0][0]["employee"]), 
                                rows12 : JSON.stringify(results[11][0][0]["employee"]), 
                                rows13 : JSON.stringify(results[12][0][0]["employee"]), 
                                rows14 : JSON.stringify(results[13][0][0]["employee"]), 
                                rows15 : JSON.stringify(results[14][0][0]["employee"]), 
                                rows16 : JSON.stringify(results[15][0][0]["employee"]), 
                                rows17 : JSON.stringify(results[16][0][0]["employee"]), 
                                rows18 : JSON.stringify(results[17][0][0]["employee"]), 
                                rows19 : JSON.stringify(results[18][0][0]["employee"]), 
                                //rows20 : JSON.stringify(results[19][0][0]["employee"]), 
                                //rows10 : JSON.stringify(results[9][0][0][""]) 
                                // Will leave rows10 out if query10 is not needed. 
                            });
      });

 /* 
    async.parallel([
       function(parallel_done) {
           pool.query(query1, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.table1 = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           pool.query(query2, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.table2 = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           pool.query(query3, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.table3 = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           pool.query(query4, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.table4 = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           pool.query(query5, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.table5 = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           pool.query(query6, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.table6 = results;
               parallel_done();
           });
       }
    ], function(err) {
         if (err) console.log(err);
         pool.end();
         res.send(return_data);
    });
    */
});

module.exports = router;

/*
router.get('/', function(req, res, next) {
    connection.query('SELECT COUNT(DISTINCT title) from titles', function(err, rows){
        if (err) throw err;
        res.render('dashboard', {titles: rows});
    })
})

router.get('/', function(req, res, next) {
    connection.query('SELECT COUNT(emp_no) FROM employees', function(err, rows){
        if (err) throw err;
        res.render('dashboard', {employees: rows});
    })
})

router.get('/', function(req, res, next) {
    connection.query('SELECT SUM(salary) FROM salaries', function(err, rows){
        if (err) throw err;
        res.render('dashboard', {salaries: rows});
    })
})

router.get('/', function(req, res, next) {
    connection.query('SELECT COUNT(dept_name) FROM departments', function(err, rows){
        if (err) throw err;
        res.render('dashboard', {departments: rows});
    })
})

router.get('/', function(req, res, next) {
    connection.query('SELECT COUNT(emp_no) FROM employees where hire_date > 2014 and hire_date < 2018', function(err, rows){
        if (err) throw err;
        res.render('dashboard', {employees: rows});
    })
})

router.get('/', function(req, res, next) {
    connection.query('select title, min(age), max(age) from User, Loan where User.uID = Loan.uID group by title;', function(err, rows){
        if (err) throw err;
        res.render('dashboard', {User, Loan: rows});
    })
})
module.exports = router;
*/