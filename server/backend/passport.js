'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var User = require(app_settings.modelUser);
var openedBy;


var createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

var isValidPassword = function(user, password) {
  return bCrypt.compareSync(password, user.password);
}

var toTitleCase = function(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function login(passport) {
  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
    function(req, username, password, done) {
      // check in mongo if a user with username exists or not
      User.findOne({
        'username': username.toLowerCase(),
		'role': req.body.role
      },
        function(err, user) {
          // In case of any error, return using the done method
          if (err)
            return done(err);

          // Username does not exist, log the error and redirect back
          if (!user) {
            console.log('User Not Found with username ' + username);
            return done({
              status: 401,
              message: 'Authencation failed: User Not Found with username ' + username
            }, false);
          }

          // User exists but wrong password, log the error
          if (!isValidPassword(user, password)) {
            console.log('Invalid Password');
            return done({
              status: 401,
              message: 'Authencation failed: Invalid Password'
            }, false);

          } else {
            // Authencation succecced, but we need to do one more check before authorizing...
            if (user.active === false) {
              console.log('User not activate');
              return done({
                status: 401,
                message: 'This login has not been activated by the Administrator'
              }, false);
            }
          }

          // User and password both match, return user from done method
          // which will be treated like success
          console.log('Login succesful: ', user);
          return done(null, user);
        }
      );

    }));
}

function register(passport) {
  passport.use('register', new LocalStrategy({
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    function(req, username, password, done) {
      var findOrCreateUser = function() {
        // find a user in Mongo with provided username
        User.findOne({
          'username': username
        }, function(err, user) {

          // In case of any error, return using the done method
          if (err) {
            console.log('Registration error: ' + err);
            return done(err);
          }

          // already exists
          if (user) {
            console.log('User already exists with username: ' + username);
            return done({
              status: 400,
              message: 'Registration failed'
            }, false);

          } else {
            if (!req.body.email || !req.body.firstname || !req.body.lastname)
              return done({
                status: 400,
                message: 'Registration failed'
              }, false);

            var newUser = new User();

            // set the user's local credentials
            newUser.username = username.toLowerCase();
            newUser.password = createHash(password);
            newUser.email = req.body.email.toLowerCase();
            newUser.firstname = toTitleCase(req.body.firstname);
            newUser.lastname = toTitleCase(req.body.lastname);
            newUser.role = req.body.role;

            // save the user
            newUser.save(function(err) {
              if (err) {
                console.log('Error in Saving user: ' + err);
                throw err;
              }
              console.log('Registration succesful: ', newUser);
              return done(null, newUser);
            });
          }
        });
      };
      // Delay the execution of findOrCreateUser and execute the method
      // in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    }));
}

module.exports = function(passport) {
  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function(user, done) {
    console.log('serializing user: ');
    console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      //console.log('deserializing user:',user);
      done(err, user);
    });
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  login(passport);
  register(passport);
}
