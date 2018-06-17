const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Create local (login) strategy
// Setup options for local strategy
const localOptions = { usernameField: "email" };
// strategies are constructors, this is important. (Why do they do this?)
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  // Verify this username and password, call done with the user
  // If it is the correct username and password
  // Otherwise, call done with false
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    //compare passwords - is `password` equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});

// Create JWT (signup) Strategy
// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
};
const jwtSignup = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that user object
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      // if they do exist, call done with user
      done(null, user);
    } else {
      // if they don't exist, reject
      done(null, false);
    }
  });
});

// Tell passport to use strategies
passport.use(jwtSignup);
passport.use(localLogin);
