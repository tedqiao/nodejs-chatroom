/**
 * Created by jianqiao on 7/28/15.
 */
// config/passport.js

// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
//var User = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID        : '372900172902126',
            clientSecret    : 'd31adda03d0d261a1affa6a5fec7b76b',
            callbackURL     : "http://localhost:8000/auth/fb/callback",
            profileFields   : ['id', 'displayName', 'photos','email']

        },

        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {

                    // To keep the example simple, the user's Facebook profile is returned to
                    // represent the logged-in user.  In a typical application, you would want
                    // to associate the Facebook account with a user record in your database,
                    // and return that user instead.
                    return done(null, profile);

            });

        }));

};