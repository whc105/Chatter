const express = require('express');
const session = require('express-session');
const engines = require('consolidate');
const config = require('./config');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

//Routes
const login = require('./routes/login');
const register = require('./routes/register');
const chat = require('./routes/chat');

const userAPI = require('./api/currentUser');

const app = express();
require('./db');

app.engine('njk', engines.nunjucks);
app.set('view engine', 'njk');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

//Session and Passport JS
require('./auth/passport');
app.use(session({
	secret: 'placeholder secret',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//APIs
userAPI(app);

//Routes
app.use('/login', login);
app.use('/register', register);
app.use('/chat', chat);

app.get('*', (req, res) => {
	res.render('pages/index');
});


app.listen(config.PORT, function () {
	console.log(`App currently running; navigate to localhost:${config.PORT} in a web browser.`);
});