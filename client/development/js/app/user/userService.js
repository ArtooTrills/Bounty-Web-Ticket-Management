'use strict';

(function(app) {

	// super simple service
	// each function returns a promise object
	var Users = ['$http', function($http) {
		return {
			get: function() {
				return $http.get('/api/user');
			},
			delete: function(id) {
				return $http.destroy('/api/user/' + id);
			}
		}
	}];

	app.factory('Users', Users);
})(App);
