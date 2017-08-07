'use strict';

module.exports = {
  routeErrors: function(app) {
    // Development error handler will print stacktrace
    app.use(function(err, req, res, next) {
      var error = err.status || 500;
      res.status(error);

      if (app.get('env') === 'development') {
        error = {
          status: error,
          message: err.message,
          stack: err.stack
        };
      } else {
        error = {
          status: error,
          message: err.message
        };
      }

      // Is JSON or Browser? Used to detrmine if errors get rendered as JSON or Webpage
      if (req.get('X-Requested-With') === 'XMLHttpRequest')
        res.json(error);
      else
        res.render('error', {
          error: error
        });
    });
  }
};
