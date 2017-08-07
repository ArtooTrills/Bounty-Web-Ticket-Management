'use strict';

(function(app) {

  // inject the Todo service factory into our controller
  var LoginController = ['Login', '$window', function(Login, $window) {
    var self = this;

    self.user = {};
    self.isProcessing = false;
	Login.getUserRoles().then(function(data) {
      self.roles = data.data || {
        id: 0,
        name: 'ERROR'
      };
      self.isProcessing = false;
    });
    self.submit = function(user) {
      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
      if (self.user != undefined) {
        self.isProcessing = true;

        var data = {
          username: user.username,
          password: user.password,
		  role:user.role
        };
		if(user.role==100 && (user.username!="admin" || user.password != "admin")){
			return alert("Please enter admin/admin to login as Admin.")
		}else if(user.role==100){
			return $window.location = './register'
		}
        // call the create function from our service (returns a promise object)
        Login.submit(data)

        // if successful creation, call our get function to get all the new todos
		.success(function(response) {
          self.isProcessing = false;
		 sessionStorage.openedBy=user.role;
          alert(response.data.msg);
          if (typeof response.data.redirect == 'string')
            $window.location = response.data.redirect;
        })
		.error(function(response) {
          self.isProcessing = false;
          if (typeof response.data.redirect == 'string')
            $window.location = response.data.redirect;
        });
      }
    };
  }];

  app.controller('LoginController', LoginController);

})(App);
