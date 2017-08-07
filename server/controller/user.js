'use strict';

var User = require(app_settings.modelUser);
function getUsers(res) {
  User.find(function(err, users) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      res.send(err);
    }

    res.json(users); // return all todos in JSON format
  });
}
/****
AJAX Funtions
****/
module.exports = {

  // api ---------------------------------------------------------------------
  // get all todos
  get: function(req, res) {
    // use mongoose to get all todos in the database
    getUsers(res);
  },
  
  load: function(req, res, next, id) {
    User.load(id, function(err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Record not found'));
      req.user = user;
      next();
    });
  },

  create: function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err) {
      //if (err) return res.json(err);
      if (err) {
        if (err.name == 'ValidationError') {
          for (var error in err.errors) {
            console.log(err.errors[error].kind + ': \n\t' + err.errors[error].message + '\n\t' + 'path: ' + err.errors[error].path + '\n');
          }
          res.status(400);
          res.json(err);

        } else {
          // A general error (db, crypto, etc…)
          res.status(400);
          res.json(err);
        }
      } else {

        res.json('ok');
      }
    });
  },

  list: function(req, res, next) {
    var page = (req.params.page > 0 ? req.params.page : 1) - 1;
    var perPage = null;
    var options = {
      perPage: perPage,
      page: page
    };

    options.sort = {
      'created_at': -1
    };
    options.fieldLimit = {};

    User.list(options, function(err, user) {
      if (err) return next(err);
      User.count().exec(function(err, count) {
        res.json(user);
      });
    });
  },

  destroy: function(req, res) {
    var user = req.user;
    user.remove(function(err) {
      res.json('Ok');
    });
  }
};
