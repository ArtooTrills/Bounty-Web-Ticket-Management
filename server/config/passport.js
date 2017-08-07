'use strict';

var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var initPassport = require('../backend/passport');

module.exports = function(app, mongoose) {
  initPassport(passport);

  app.use(session({
    secret: '03070307',
    name: app_settings.applicationName + '_session',
    cookie: {
      maxAge: ((24 * 60 * 60) * 1000)
    },
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  return passport;
}
