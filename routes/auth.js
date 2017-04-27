'use strict';

const passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {
	
	app.get('/twitter', (req, res) => {
		res.json({user: req.user})
	});
	
	app.get('/logout', function(req, res) {
	  req.logout();
	  res.json({message: 'Logout'});
	});
	
	app.get('/auth/twitter', passport.authenticate('twitter'));
	
	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get('/auth/twitter/callback', passport.authenticate('twitter',
	  { successRedirect: '/', failureRedirect: '/login' }
	));

	app.get('/auth/facebook/callback', passport.authenticate('facebook',
	  { successRedirect: '/', failureRedirect: '/login' }
	));

}