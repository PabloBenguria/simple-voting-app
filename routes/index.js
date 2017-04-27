'use strict';

module.exports = function(){
	app.use('/auth', require('auth'));
	app.use('/poll', require('poll'));
};
