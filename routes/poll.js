'use strict';

const mongoose = require('mongoose');
const Poll = mongoose.model('Poll');
const checkUser = require('../middleware/checkUser');

module.exports = app => {
	
	// GET all polls
	app.get('/poll', (req, res) => {
		Poll.find({}, (err, poll) => {
			if (err){
				res.send(err);
			}
			res.json(poll);
		});
	});

	// CREATE poll
	app.post('/poll', checkUser.ensureAuthenticated, (req, res) => {
		let poll = new Poll();
		poll.name = req.body.name;
		poll.author = req.body.author;
		poll.save(err => {
			if(err){
				res.send(err);
			}
			res.json({message: 'Poll created!'});
		});
	});

	// UPDATE poll
	app.put('/poll', checkUser.ensureAuthenticated, checkUser.ensureVoted, (req, res) => {
		Poll.findOne({'_id': req.body._id}, (err, poll) => {		
			poll.users_voted.push(req.body.users_voted);
			poll.save(err => {
				if(err){
					res.send(err);
				}
				res.send({voted: false});
			});
		});
	});

}