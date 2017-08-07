'use strict';

(function(app) {

	// super simple service
	// each function returns a promise object
	var Tickets = ['$http', function($http) {
		return {
			get: function(role) {
				return $http.get('/api/ticket/' + role);
			},
			create: function(ticket) {
				return $http.post('/api/ticket', ticket);
			},
			delete: function(id) {
				return $http.delete('/api/ticket/' + id);
			},
			put: function(id) {
				return $http.put('/api/ticket/' + id);
			}
		}
	}];

	app.factory('Tickets', Tickets);
})(App);
