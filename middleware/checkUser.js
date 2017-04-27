'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.ensureAuthenticated = (req, res, next) => {
	if(req.user){
    next();
  }else{
    res.send({message: 'Access denied'});
  }
};

exports.ensureVoted = (req, res, next) => {
	User.findOne({'name': req.body.users_voted}, (err, user) => {
		if(err){
			res.send(err);
		}
		if(user.voted == true){
			res.send({voted: true});
		}else{
			user.voted = true;
			user.save(err => {
				if(err){
					res.send(err);
				}
				res.send({voted: false});
			});
			next();
		}
	});
};


