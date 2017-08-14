var mongoose = require('mongoose');

module.exports = mongoose.model('Tickets', {
  summary: {
    type: String,
    default: ''
  },
  dateofoccurance: {
    type: String,
    default: ''
  },
  timeofoccurance: {
    type: String,
    default: ''
  },
  details: {
    type: String,
    default: ''
  },
  sshipaddress: {
    type: String,
    default: ''
  },
  sshport: {
    type: String,
    default: ''
  },
  hostnameserial: {
    type: String,
    default: ''
  },
  troubleshootingdetails: {
    type: String,
    default: ''
  },
   status: {
    type: String,
    default: ''
  },
  openedBy: {
    type: Number,
    default: 2
  },
  assignedTo: {
    type: String
  },
});
