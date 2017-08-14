'use strict';

(function(app) {

	// inject the Todo service factory into our controller
	var TicketController = ['$scope','Tickets','Login', '$window', function($scope, Tickets,Login, $window) {
		var self = this;

		self.tickets = {};
		self.users = {};
		self.ticket ={};
		self.isProcessing = true;
		self.openedBy = 2;
		
		Login.getUsers().then(function(data) {
			  self.users = data.data || {
				id: 0,
				name: 'ERROR'
			  };
			  self.isProcessing = false;
		});
			
		// GET =====================================================================
		// when landing on the page, get all tickets and show them
		// use the service to get all the tickets
		var role = sessionStorage.openedBy;	
		var assignedTo = sessionStorage.assignee	
		self.openedBy = role;
		if(role==2)
			Tickets.get(role)
				.success(function(data) {
					
					self.isProcessing = false;
					self.openedBy = 2;
					//$scope.openedBy = 2
				});
		else if(role==1)
			Tickets.get(assignedTo)
			.success(function(data) {
				
				self.isProcessing = false;
				self.openedBy = 2;
				//$scope.openedBy = 2
			});
		
		self.getCurrentTicketById = function(id) {
			self.isProcessing = true;
			
			Tickets.getCurrentTicketById('I'+id)
				// if successful creation, call our get function to get all the new ticket
				.success(function(data) {
					self.isProcessing = false;
					self.ticketForm = data[0];
					$scope.ticket={_id:data[0]._id,summary:data[0].summary, details:data[0].details,status:data[0].status,assignedTo:'Pro1'} // assign our new list of ticket
				//	$window.location = '/api/ticket/'+sessionStorage.openedBy;
				}).
				error(function(data){
					debugger;
				});
		};
		
		// UPDATE ==================================================================
		// when submitting the add form, send the text to the node API
		self.updateTicket = function(ticket) {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if (ticket && ticket.summary != undefined) {
				self.isProcessing = true;
				ticket.openedBy= sessionStorage.openedBy
				ticket.isUpdate=true;
				// call the create function from our service (returns a promise object)
				Tickets.update(ticket)
					// if successful creation, call our get function to get all the new ticket
					.success(function(data) {
						self.isProcessing = false;
						self.ticketForm = {}; // clear the form so our user is ready to enter another
						self.tickets = data;
						$window.location = '/api/ticket/'+sessionStorage.openedBy;						// assign our new list of ticket
					});
			}
		};
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		self.createTicket = function(ticket) {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if (ticket && ticket.summary != undefined) {
				self.isProcessing = true;
				ticket.openedBy= sessionStorage.openedBy

				// call the create function from our service (returns a promise object)
				Tickets.create(ticket)
					// if successful creation, call our get function to get all the new ticket
					.success(function(data) {
						self.isProcessing = false;
						self.ticketForm = {}; // clear the form so our user is ready to enter another
						self.tickets = data;
						$window.location = '/api/ticket/'+sessionStorage.openedBy;						// assign our new list of ticket
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		self.deleteTicket = function(id) {
			self.isProcessing = true;

			Tickets.delete(id)
				// if successful creation, call our get function to get all the new ticket
				.success(function(data) {
					self.isProcessing = false;
					self.tickets = data; // assign our new list of ticket
					$window.location = '/api/ticket/'+sessionStorage.openedBy;
				}).
				error(function(data){
					debugger;
				});
		};
		
		// UPDATE ==================================================================
		// update a todo after checking it
		self.resolveTicket = function(id) {
			self.isProcessing = true;
			var role = sessionStorage.openedBy;	
			var assignedTo = sessionStorage.assignee
			Tickets.put(id)
				// if successful creation, call our get function to get all the new ticket
				.success(function(data) {
					
					self.isProcessing = false;
					self.tickets = data; // assign our new list of ticket
					if(role==1){
						Tickets.get(assignedTo)
						.success(function(data) {
							
							self.isProcessing = false;
							self.openedBy = 2;
							//$scope.openedBy = 2
						}).
						error(function(data){
							debugger;
						});
					}
					$window.location = '/api/ticket/'+assignedTo;
				}).
				error(function(data){
					debugger;
				});
		};
		
		self.logout = function() {
			$window.location = '/login';
		};		
	}];

	app.controller('TicketController', TicketController);
})(App);
