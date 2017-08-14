'use strict';

var handler = require(app_settings.errorHandler);
var authentication = require(app_settings.authentication);
var applicationName = app_settings.applicationName;

module.exports = function(express, settings) {
  var router = express.router;
  var express = express.self;
  var URLRoot;

  router.use(function(req, res, next) {
    URLRoot = req.baseUrl + '/';
    next();
  });

  router.use(express.static(settings.publicFolder));

  // Views
  router.get('/', function(req, res) {
    res.redirect(req.baseUrl + app_settings.indexPage);
  });

  router.get('/login', function(req, res) {
    res.render('login', {
      title: applicationName,
      render: settings['login'], //TODO: move to function, so I can catch unknown views
      root: URLRoot
    });
  });

  router.get(app_settings.indexPage, authentication.check, function(req, res) {
    res.render('index', {
      title: applicationName,
      render: settings['index'],
      root: URLRoot
    });
  });

  router.get(app_settings.registrationPage, function(req, res) {
    res.render('register', {
      title: applicationName,
      render: settings['register'],
      root: URLRoot
    });
  });
  
  router.get(app_settings.usersPage, function(req, res) {
    res.render('users', {
      title: applicationName,
      render: settings['users'],
      root: URLRoot
    });
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect(URLRoot);
  });

  handler.routeErrors(router);
}
