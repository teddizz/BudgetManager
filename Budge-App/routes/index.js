var express = require('express');
var router = express.Router();
var User = require('../models/users');

//Do we need this?
var bodyParser = require('body-parser');


/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/coupons', function(req, res, next) {
  res.render('coupon', { title: 'Express' });
});

router.get('/settings', function(req, res, next) {
  res.render('settings', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.post('/signup', function(req,res){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    

});

module.exports = router;
