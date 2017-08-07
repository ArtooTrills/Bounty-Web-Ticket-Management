'use strict';

(function(app) {

	// super simple service
	// each function returns a promise object
	var Register = ['$http', function($http) {
		return {
			submit: function(user) {
				return $http.post('/api/validateRegistration', user);
			},
			getUserRoles: function() {
				return $http.post('/api/getUserRoles');
			},
			getUsers: function() {
				return $http.post('/api/getUsers');
			},
		}
	}];

	app.factory('Register', Register);

})(App);
