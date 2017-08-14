'use strict';

(function(app) {

  // inject the Todo service factory into our controller
  var RegistrationController = ['Register', function(Register) {
    var self = this;

    self.user = {};
	self.users = {};
    self.roles = {};
    self.isProcessing = true;
	self.setRegister = true;
	// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
	self.set = function() {
			return self.setRegister=false;
	};
    Register.getUserRoles().then(function(data) {
      self.roles = data.data || {
        id: 0,
        name: 'ERROR'
      };
      self.isProcessing = false;
    });
		// GET =====================================================================
		// when landing on the page, get all tickets and show them
		// use the service to get all the tickets
	self.getUsers=function() {
			Register.getUsers
			.then(function(data) {
				self.users = data;
				self.isProcessing = false;
				self.setRegister = false;
	});
	};

    self.submit = function(user) {
      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
      if (self.user != undefined) {
        self.isProcessing = true;

        var data = {
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
          username: user.username,
          password: user.password1,
          role: user.role
        };

        console.log(user);
        // call the create function from our service (returns a promise object)
        Register.submit(data)

          // if successful creation, call our get function to get all the new todos
          .then(function(response) {
            self.isProcessing = false;
			self.setRegister=true;
            self.user = {}; // clear the form so our user is ready to enter another
			alert(response.data.msg);
			window.location =response.data.redirect
          });
      }
    };
  }];

  app.controller('RegistrationController', RegistrationController);

})(App);
