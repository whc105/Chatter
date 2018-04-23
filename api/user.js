const mongoose = require('mongoose');

require('../db');
const User = mongoose.model('User');

module.exports = app => {
    app.get('/api/current-user', (req, res)=> {
        (req.user) ? res.send(req.user) : res.send(null);
    });
    
    app.get('/api/getAllUsers', (req, res)=> {
        User.find({}, {_id: 0, username: 1}, (err, users)=> {
            (err) ? res.send(err) : res.send(users);
        });
    });
};