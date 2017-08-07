'use strict';

var express = require('express'); // Application framework
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');

module.exports = function(logger) {;
  var app = express();
  var router = express.Router();

  router.use(cookieParser());
  router.use(bodyParser.json()); // parse application/json
  router.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json({
    type: 'application/vnd.api+json'
  })); // parse application/vnd.api+json as json
  app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

  // Initialize console logging
  if (logger)
    router.use(logger);

  app.set('views', 'server/view');
  app.set('view engine', 'jade');
  app.disable('x-powered-by');

  if (router.get('env') === 'development') {
    app.disable('view cache');
    router.use(function(req, res, next) {
      res.removeHeader("x-content-type-options");
      // Disable HTTP 304 caching ??
      res.setHeader('Last-Modified', (new Date()).toUTCString());
      next();
    });
  }

  return {
    self: express,
    router: router,
    app: app
  };
};
