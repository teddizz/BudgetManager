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


router.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;


    User.getUserByUsername(username, function(err,user){

        if (err){
            throw err
        }

        console.log(user);

        if(!user){
            console.log("Authentication failed. User not found.");
        }
        else{
            if(password === user.password){
                res.render('index', {title: 'Express'})
            }
            else{
                console.log("Incorrect credentials");
            }
        }
    });
});

router.post('/signup', function(req,res){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    //*** Make sure all fields are provided
    req.checkBody('username', "User name is required").notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        console.log("errors in register");

        res.render('signup',{
            errors: errors
        });
    }
    else{
        /**Here if all data fields are provided*/
        User.getUserByUsername(username, function(err,user){
            if (err){
                throw err
            }
            console.log(user);

            if(!user){
                /**If the userName does not exist, create the account*/
                let newUser = new User();
                newUser.username = req.body.username;
                newUser.email = req.body.email;
                newUser.password = req.body.password;

                newUser.save(function(err){
                if(err){
                    console.log(err);
                }
                else{
                    // redirect the user to a success page!
                    console.log("succesfully added")
                    }
                });
            }
            else{
                /**If we are here its because the user name exists*/
                console.log("Username alredy exists. Please choose another");
            }

        });
    }

});

module.exports = router;
