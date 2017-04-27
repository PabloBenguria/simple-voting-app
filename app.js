'use strict';

const express = require('express'); 
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const env = require('./config/env');

require('./models/user');
require('./models/poll');

require('./middleware/passport')(passport);

mongoose.connect(env.DATABASE_URL, function(err, res) {
  if(err) throw err;
  console.log('Conectado con éxito a la BD');
});

const app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.favicon());
app.use(express.logger('dev'));

app.use(express.cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.session({ 
	secret: 'lollllo',
	cookie:{_expires : 60000000} 
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

require('./routes/auth')(app);
require('./routes/poll')(app);

app.listen(app.get('port'), function(){
  console.log('Aplicación Express escuchando en el puerto ' + app.get('port'));
});
