'use strict';

(function(app) {

	// inject the Todo service factory into our controller
	var UserController = ['$http', 'Users', function($http, Users) {
		var self = this;

		self.users = {};
		self.isProcessing = true;

		// GET =====================================================================
		// when landing on the page, get all tickets and show them
		// use the service to get all the tickets
		Users.get()
			.success(function(data) {
				self.users = data;
				self.isProcessing = false;
			});

		// DELETE ==================================================================
		// delete a todo after checking it
		self.deleteUser = function(id) {
			self.isProcessing = true;

			Users.delete(id)
				// if successful creation, call our get function to get all the new ticket
				.success(function(data) {
					self.isProcessing = false;
					self.users = data; // assign our new list of ticket
				});
		};
	}];

	app.controller('UserController', UserController);
})(App);
