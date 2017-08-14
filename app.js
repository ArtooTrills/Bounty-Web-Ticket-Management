'use strict';

// Get ENV variables
var env = process.env.NODE_ENV || 'development';
var port = process.env.NODE_PORT || 8118;
var root = process.env.NODE_ROOT || '/';

// Reference internal modules and settings
GLOBAL.app_settings = require('./server/config/settings');
var server = require(app_settings.serverFunctions).init();
var db = require(app_settings.databaseConf);

// External modules
var debug = require('debug')('app');
var morgan = require('morgan'); // Console logger
var logger = server.initLogging(morgan, env); // Initialize custom console logging
var mongoose = require('mongoose'); // DB object modeling

// Configs
var express = require(app_settings.expressConf)(logger);
var passport = require(app_settings.passportConf)(express.app, mongoose);
var compression = require(app_settings.compressionLogic)(express.app);
var watcher = require(app_settings.watcher).watch(express.app);

var viewSettings = compression.initiate(function(viewSettings) {
  var routes = require(app_settings.routeConf)(express.router, passport);
  var views = require(app_settings.viewConf)(express, viewSettings);

  // Safely exit...
  process.on('uncaughtException', server.exitHandler)
  process.on('SIGINT', server.exitHandler);

  // Connect to DB
  // mongodb://10.0.0.124/
  // mongodb://localhost/
  server.database(mongoose, db.Url, env).connect(function() {
    server.setupServer(express, port, root);
  });
});
