'use strict';

module.exports = function(app) {
    //715231429824-6em74hbnmpc68j0dpj61fvjd9bi5dk9v.apps.googleusercontent.com
//NeMrRHIzob3mcfdnUJD-NUdu

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
    res.redirect('/home');
  });
  return require('express').Router();
};