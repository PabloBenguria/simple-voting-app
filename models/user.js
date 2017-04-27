'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: String, 
	provider_id: {
		type: String, 
		unique: true
	}, 
	photo: String,
	voted: {
		type: Boolean,
		default: false
	},
	created_at: {
		type: Date, 
		default: Date.now
	},
	updated_at: {
    type: Date,
    default: Date.now
  } 
});

const User = mongoose.model('User', UserSchema);
