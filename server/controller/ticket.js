'use strict';

var Ticket = require(app_settings.modelTicket);


function getTickets(req, res) {
  Ticket.find({
	  openedBy: 2
    }, function(err, tickets) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
		  res.send(err);
		}
		console.log(tickets);
		var openedBy =req.body.openedBy?req.body.openedBy:req.params.opened_by
		res.render('./index', {openedBy:openedBy, ticketList:tickets});
		//  res.json(tickets); // return all todos in JSON format
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
    getTickets(req, res);
	
  },

  // create todo and send back all todos after creation
  post: function(req, res) {
    // create a todo, information comes from AJAX request from Angular
	//req.session.openedBy =req.body.openedBy
    Ticket.create({
      summary: req.body.summary.length==3?req.body.summary:req.body.summary+'ticket',
      dateofoccurance: req.body.dateofoccurance,
      timeofoccurance: req.body.timeofoccurance,
      details: req.body.details,
      sshipaddress: req.body.sshipaddress,
      sshport: req.body.sshport,
      hostnameserial: req.body.hostnameserial,
      troubleshootingdetails: req.body.troubleshootingdetails,
      status: 'open',
      openedBy: req.body.openedBy
    }, function(err, ticket) {
      if (err)
        res.send(err);

      // get and return all the tickets after you create another
      getTickets(req,res);
    });
  },

  // delete a ticket
  delete: function(req, res) {
    Ticket.remove({
      _id: req.params.ticket_id
    }, function(err, ticket) {
      if (err)
        res.send(err);
	
	  req.param.opened_by=2;
      getTickets(req,res);
    });
  },
  
   put: function(req, res) {
    // create a todo, information comes from AJAX request from Angular
	//req.session.openedBy =req.body.openedBy
	Ticket.update({_id:req.params.ticket_id}, {$set: { status: 'resolved' }}, {upsert: true},function(err, doc){
	 if (err)
        res.send(err);
	 req.param.opened_by=1;
      // get and return all the tickets after you create another
      getTickets(req,res);
    });
  },
};
