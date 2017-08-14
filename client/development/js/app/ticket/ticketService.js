'use strict';

(function(app) {

	// super simple service
	// each function returns a promise object
	var Tickets = ['$http', function($http) {
		return {
			get: function(role) {
				return $http.get('/api/ticket/'+role);
			},
			getCurrentTicketById: function(id) {
				return $http.get('/api/ticket/' + id);
			},
			getTicketsByAssignedTo: function(assignedTo) {
				return $http.get('/api/ticket/' + assignedTo);
			},
			create: function(ticket) {
				return $http.post('/api/ticket', ticket);
			},
			delete: function(id) {
				return $http.delete('/api/ticket/' + id);
			},
			put: function(id) {
				return $http.put('/api/ticket/' + id);
			},
			update: function(ticket) {
				return $http.post('/api/ticket',ticket);
			}
		}
	}];

	app.factory('Tickets', Tickets);
})(App);
