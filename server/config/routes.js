'use strict';

var Ticket = require(app_settings.controllerTicket);
var User = require(app_settings.controllerUser);
var authentication = require(app_settings.authentication);

module.exports = function(router, passport) {
  authentication.routes(router, passport);

  router.get('/api/ticket/:opened_by', authentication.check, Ticket.get);
  router.post('/api/ticket', authentication.check, Ticket.post);
  router.delete('/api/ticket/:ticket_id', authentication.check, Ticket.delete);
  router.put('/api/ticket/:ticket_id', authentication.check, Ticket.put);
  router.get('/api/user', authentication.check, User.get);
  router.param('userid', User.load);
  router.post('/api/getUsers', authentication.check, User.list);
  router.delete('/api/deleteUser/:userid', authentication.check, User.destroy);
};
