var express = require('express');
var router = express.Router();
var User = require('../models/users');
var ObjectId = require('mongoose').Types.ObjectId;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Do we need this?
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//app.use(bodyParser.json());



/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/coupons', function(req, res, next) {
  res.render('coupon');
});

router.get('/settings', function(req, res, next) {
  res.render('settings');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});



///* GET home page. */
//router.get('/index', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});
//
//router.get('/coupons', function(req, res, next) {
//  res.render('coupon', { title: 'Express' });
//});
//
//router.get('/settings', function(req, res, next) {
//  res.render('settings', { title: 'Express' });
//});
//
//router.get('/login', function(req, res, next) {
//  res.render('login', { title: 'Express' });
//});
//
//router.get('/register', function(req, res, next) {
//  res.render('register', { title: 'Express' });
//});


//router.post('/login', function(req, res){
//    var username = req.body.username;
//    var password = req.body.password;
//
//
//    User.getUserByUsername(username, function(err,user){
//
//        if (err){
//            throw err
//        }
//
//        console.log(user);
//
//        if(!user){
//            console.log("Authentication failed. User not found.");
//        }
//        else{
//            if(password === user.password){
//                res.render('index', {title: 'Express'})
//            }
//            else{
//                console.log("Incorrect credentials");
//            }
//        }
//    });
//});

passport.use(new LocalStrategy(
    function (username, password, done){
        User.getUserByUsername(username, function (err,user){
            if(err) throw err

            if(!user){
                  console.log("unknown user")
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err

                if(isMatch){
                    return done(null, user);
                }
                else{
                    console.log("invalid password");
                    return done(null, false, {message:'Invalid password'});
                }
            });
        })
    }
))


passport.serializeUser(function(user,done){
    done(null, user.id);
});


passport.deserializeUser(function(id,done){
    User.getUserById(id, function(err, user){
        done(err,user);
    });
});


router.post('/login', passport.authenticate('local', {successRedirect:'/index', failureRedirect:'/login', failureFlash:true}),
function(req,res){
    res.redirect('/index');
});

router.post('/signup', function(req,res){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    //*** Make sure all fields are provided
    req.checkBody('username', "User name is required").notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        console.log("errors in register");

        res.render('register',{
            errors: errors
        });
    }
    else{
        /**Here if all data fields are provided*/
        User.getUserByUsername(username, function(err,user){
            if (err){
                throw err
            }

            if(!user){
                /**If the userName does not exist, create the account*/

                var newUser = new User({
                    username: username,
                    email: email,
                    password: password
                });

                User.createUser(newUser, function(err, user){
                    if(err){
                        throw err
                    }

                    console.log(user)
                });

                console.log("Succesfully created a user!");
                /**in order for this message to show we need to add a template in our layouts*/
                req.flash('success_msg', 'You are registered and can now log in');
                res.redirect('login');

//                let newUser = new User();
//                newUser.username = req.body.username;
//                newUser.email = req.body.email;
//                newUser.password = req.body.password;
//
//                newUser.save(function(err){
//                if(err){
//                    console.log(err);
//                }
//                else{
//                    // redirect the user to a success page!
//                    console.log("succesfully added")
//                    }
//                });
            }
            else{
                /**If we are here its because the user name exists*/
                console.log("Username alredy exists. Please choose another");
            }

        });
    }

});


module.exports = router;
