const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');

require('../db');
const User = mongoose.model('User');

passport.serializeUser((user, done)=> {
    done(null, user._id);
});

passport.deserializeUser((id, done)=> {
    User.findOne({_id: id}, 'username chatrooms email permission', (err, user)=> {
        if (err) {
            done(err.stack);
        } else {
            done(null, user);
        }
    });
});


passport.use(new LocalStrategy(
    (username, password, done)=> {
        User.findOne({username: username, password: password}, (err, user)=> {
            if (err) {
                done(err);
            } else if (!user) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        });
    }
));