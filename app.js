const express = require('express');
const session = require('express-session');
const engines = require('consolidate');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);

//Socket IO Init
const io = socketIO(server);

//Config Keys
const config = require('./config/config');

//Routes
const register = require('./routes/register');

const userAPI = require('./api/user');
const roomAPI = require('./api/rooms');
const chatAPI = require('./api/chat');
const keyAPI = require('./api/key');
const authAPI = require('./auth/authRoutes');

require('./db');
require('./socketio')(io);

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
roomAPI(app);
chatAPI(app);
keyAPI(app);
authAPI(app);

//Routes
app.use('/register', register);

app.get('*', (req, res) => {
	res.render('pages/index');
});

server.listen(config.PORT, function () {
	console.log(`App currently running; navigate to localhost:${config.PORT} in a web browser.`);
});