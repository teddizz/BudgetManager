var express = require('express');
var router = express.Router();
var User = require('../models/users');
var ObjectId = require('mongoose').Types.ObjectId;

//Do we need this?
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//app.use(bodyParser.json());


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

    let newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
           console.log("succesfully added")
        }
    });


    /**remove this after redirecting the user to a success page!*/
    return;
});

module.exports = router;
