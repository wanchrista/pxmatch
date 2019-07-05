//setup =================================================
var express = require('express');
var path = require('path');
var http= require('http');
var mongoose = require('mongoose');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var pg = require('pg');
var flash = require('connect-flash');
//var User = require('./models/users');
var uristring = process.env.MONGODB_URI || process.env.MONGOLAB_RED_URI || 'mongodb://localhost/';
var theport = process.env.PORT || 5000;
var uristring = 'mongodb://heroku_f9nb6r1s:a0ojrjrdrr6at3br8s6efvuo35@ds129796.mlab.com:29796/heroku_f9nb6r1s';
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

const mainController = require('./controllers/main.controller.js');

mongoose.connect(uristring, function (err, res){
  if (err){
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  }
  else{
    console.log('Succeeded connected to: ' + uristring);
  } 
});


//config ==============================================
require('./passport')(passport); 
app.use(expressValidator());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('.html', require('ejs').__express);

app.use(session({
  secret: 'apfepaijfpoaijsopefi',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('port', theport);

app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(request, response) {
  response.render('pages/login')
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
app.get('/', function(request, response) {
  response.render('pages/index')
})
    app.get('/index', function(req, res) {
        res.render('pages/index');  
    })

    app.get('/login', function(req, res) {
        res.render('pages/login');
    })

    app.get('/confirmation', function(req, res) {
        res.render('pages/confirmation');
    })

    app.get('/submit', function(req, res) {
        res.render('pages/submit');
    })

    app.get('/specialty', function(req, res) {
        res.render('pages/specialty');
    })

    app.get('/psychiatry', function(req, res) {
        res.render('pages/psychiatry');
    })


    app.get('/physician', function(req, res) {
        res.render('pages/physician');
    })

    app.get('/weyleong', function(req, res) {
        res.render('pages/weyleong');
    })

    app.get('/patient', function(req, res) {
        res.render('pages/patient');
    })

    app.get('/psychiatrists', function(req, res) {
        res.render('pages/psychiatrists');
    })

    app.get('/signup', function(req, res) {
        res.render('pages/signup', {
            message: req.flash('signupMessage'),
            loggedIn: req.user,
            user: req.user,
            status: 'signup',

        });
    })

    app.get('/search', mainController.getSearch);

    app.post('/locations/newId', mainController.newLocation);

    app.post('/locations/removeId', mainController.removeLocation);


    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/search', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/confirmation', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

function loggedIn(req, res, next) {
    if (req.user) {
        next();
        return true;
    } else {
        res.redirect('/login');
        return false;
    }
}

    app.get('/logout', function(req, res) {
        req.logout();
        req.session.save(function() {
            res.redirect('/login');
        });
    }); 

app.get('/user', function(req, res) {
        const errors = req.validationErrors();
        if (errors){
            req.flash('errors', errors.map(err =>err.msg));
            res.redirec('/user');
        }
        //console.log(req.user.local.username);
        res.render('pages/user', {
            user: req.user.local.username
        });
    })



   // app.post('/search/newUser', mainController.createUser);
