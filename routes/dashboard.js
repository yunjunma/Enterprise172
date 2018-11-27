var express = require('express');
var router = express.Router();
var connection = require('../config/connection');
var mysql      = require('mysql');
var async      = require('async');
var credentials = {connectionLimit: 10};


router.get('/', function (req, res) {
    var pool = mysql.createPool(credentials);
    var query1 = "SELECT COUNT(DISTINCT title) from titles";
    var query2 = "SELECT COUNT(emp_no) FROM employees";
    var query3 = "SELECT SUM(salary) FROM salaries";
    var query4 = "SELECT COUNT(dept_name) FROM departments";
    var query5 = "SELECT COUNT(dept_name) FROM departments";
    var query6 = "SELECT title, MIN(age), MAX(age) FROM User, Loan where User.uID = Loan.uID group by title;";

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
      ], function(err, results) {
        console.log(JSON.stringify(results[0][0]))
        res.render('dashboard', { rows : (JSON.stringify(results[0][0]))["COUNT(DISTINCT title)"], 
                                rows2 : JSON.stringify(results[1][0]).COUNT(emp_no), 
                                rows3 : JSON.stringify(results[2][0]), 
                                rows4 : JSON.stringify(results[3][0]), 
                                rows5 : JSON.stringify(results[4][0]), 
                                rows6 : JSON.stringify(results[5][0]) 
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