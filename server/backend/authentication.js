'use strict';
var User = require(app_settings.modelUser);


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function modifyUserInfo(user) {
  if (user) {
    return {
      firstname: user.firstname.charAt(0).toUpperCase(),
      lastname: user.lastname.charAt(0).toUpperCase(),
      email: user.email.toLowerCase(),
      username: user.username,
      fullname: capitalizeFirstLetter(user.firstname) + ' ' + capitalizeFirstLetter(user.lastname),
      role: user.role || 1,
	  _id: user._id
    };

  } else {
    return null;
  }
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();

  // Is JSON or Browser? Used to detrmine if errors get rendered as JSON or Webpage
  if (req.get('X-Requested-With') === 'XMLHttpRequest') {
    var err = new Error('Authentication failed!');
    err.status = 401;
    return next(err);

  } else {
    res.redirect(req.baseUrl + '/login');
  }
}

module.exports = {
  check: isAuthenticated,
  
  getUsers: function(req, res) {
    // use mongoose to get all todos in the database
    User.find({
	role:1  
  },function(err, users) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      res.send(err);
    }

    res.json(users); // return all todos in JSON format
  });
  },
  
  routes: function(app, passport) {
    app.get('/api/verifySession', isAuthenticated, function(req, res) {
      res.json('ok');
    });

    app.post('/api/retoreSession', function(req, res, next) {
      var status = 200;

      if (!req.user) {
        status = 401;
        res.status(status);
      }

      return res.json({
        status: status,
        user: modifyUserInfo(req.user)
      });
    });

    app.post('/api/getUserRoles', function(req, res, next) {
      return res.json({
        guest: {
          id: 1,
          name: 'Product Engineer'
        },
        user: {
          id: 2,
          name: 'Support Engineer'
        },
        admin: {
          id: 100,
          name: 'admin'
        }
      });
    });
	
	app.post('/api/getUsers', function(req, res, next) {
      User.find({
	role:1  
  },function(err, users) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			return  res.send(err);
			}

			return res.json(users); // return all todos in JSON format
		  });
    });


    app.post('/api/verifyCredentials', function(req, res, next) {
      passport.authenticate('login', function(err, user, info) {
         if (err) {
			  return res.json({
				data :{status: 401,
				//redirect: req.baseUrl + './login',
				msg:err.message}
			  });
		  }

        if (!user) return next({
          status: 401,
          message: 'Authentication failed'
        });

        req.login(user, function(err) {
          if (err) return next(err);
          console.log("Login successful.");
		  req.session.openedBy =user.role
          return res.json({
           data :{ status: 200,
            user: modifyUserInfo(user),
            redirect: req.baseUrl + './api/ticket/'+user.role,
		   msg:'Login successful'}
          });
        });

      })(req, res);
    });

    app.post('/api/validateRegistration', function(req, res, next) {
      passport.authenticate('register', function(err, user, info) {
        if (err) {
          return next(err)
        }
        console.log(user);

        if (!user) return next({
          status: 400,
          message: 'Registeration failed'
        });

        req.login(user, function(err) {
          if (err) {
			  return res.json({
				status: 401,
				redirect: req.baseUrl + './login',
				msg:err
			  });
		  }
          console.log("Registered successfully.");
          return res.json({
            status: 200,
            redirect: req.baseUrl + './login',
			msg:'Registered successfully'
          });
        });

      })(req, res);
    });
  }
};
