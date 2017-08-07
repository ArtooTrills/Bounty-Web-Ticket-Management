'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: 'First name required'
  },
  lastname: {
    type: String,
    trim: true,
    required: 'Last name required'
  },
  email: {
    type: String,
    trim: true,
    required: 'Email required'
  },
  username: {
    type: String,
    trim: true,
    required: 'Username required'
  },
  password: {
    type: String,
    trim: true,
    required: 'Password required'
  },
  role: {
    type: Number,
    default: 1
  },
  active: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

UserSchema.statics = {
  load: function(id, cb) {
    this.findOne({
        _id: id
      })
      .exec(cb);
  },

  list: function(options, cb) {
    var criteria = options.criteria || {};
    var fieldLimit = options.fieldLimit || {};
    var sort = options.sort || {};

    this.find(criteria, fieldLimit)
      .sort(sort)
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  },
};

module.exports = mongoose.model('User', UserSchema);
