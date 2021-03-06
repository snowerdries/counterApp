'use strict';

module.exports = function(app) {
  var User = require('./userModel.js');
    //715231429824-6em74hbnmpc68j0dpj61fvjd9bi5dk9v.apps.googleusercontent.com
//NeMrRHIzob3mcfdnUJD-NUdu
var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: '715231429824-6em74hbnmpc68j0dpj61fvjd9bi5dk9v.apps.googleusercontent.com',
    clientSecret: 'NeMrRHIzob3mcfdnUJD-NUdu',
    callbackURL: "http://snowerdries.herokuapp.com/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {

         return done(null, profile);

  }
));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {  
    var guser=req.user;    
    User.findOne({ userId: guser.id }, function(err, user) {
      if (!err && user && user.userId === guser.id){
        req.session.user=req.user;
      }
      res.redirect('/');       
    });     
  });

app.get('/api/user',function(req, res){
    res.setHeader('Content-Type', 'application/json'); 
    if(req.session.user){
      res.send(req.session.user._json);
    } else {
      res.send('{}');
    }
    
  });

  app.get('/api/user/logout',function(req, res){
    res.setHeader('Content-Type', 'application/json'); 
    req.session.user=null;      
    res.send('{}');    
  });
  
  return require('express').Router();
};



