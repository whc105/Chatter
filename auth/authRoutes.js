const passport = require('passport');

module.exports = app => {
	app.post('/auth/login', (req, res, next)=> {
		//Stops logged in users from loggin in
		if (req.user !== undefined) {
			res.redirect('/');
		}
		passport.authenticate('local', (err, user, info)=> {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.send('Wrong username or password');
			} else {
				req.logIn(user, (err)=> {
					if (err) {
						return next(err);
					} else {
						return res.send(true);
					}
				});
			}
		})(req, res, next);
	});
	
	app.get('/auth/logout', function(req, res){
		req.logout();
		res.send(true);
	});
};