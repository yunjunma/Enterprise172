var request = require('request');
var express = require('express');
var router = express.Router();

/*
  ALL OF THE ROUTES IN THIS PAGE REQUIRE AN AUTHENTICATED USER
*/

/* GET users listing. */
router.get('/', function(req, res, next) {

  // console.log(req.user)

  res.render('users', {
    title: 'Users',
    loginUser: req.user
  });
});

/* GET the profile of the current authenticated user */
router.get('/profile', function(req, res, next) {

  request.get(`https://openid-connect.onelogin.com/oidc/me`, {
    'auth': {
      'bearer': req.session.accessToken
    }
  },function(err, respose, body){

    // console.log('User Info')
    // console.log(body);

    res.render('profile', {
      title: 'Profile',
      loginUser: JSON.parse(body)
    });

  });
});

module.exports = router;