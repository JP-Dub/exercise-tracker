'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  userId: String,
  log: [{
    description: String,
    duration: Number,
    date: Date
  }]
});

module.exports = mongoose.model('User', User);