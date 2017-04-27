'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
  name: String,
  author: String,
  alternatives: [String],
  //votes: [Number],
  users_voted: [String],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Poll = mongoose.model('Poll', PollSchema);