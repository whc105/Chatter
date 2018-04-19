const mongoose = require('mongoose');

require('../db');
const Chatroom = mongoose.model('Chatroom');
const User = mongoose.model('User');

module.exports = app => {
    app.get('/api/getAllMessages/:roomID', (req, res)=> {
        console.log(req.params);
        Chatroom.findOne({id: req.params.roomID}, {_id: 0, messages: 1}, (err, messages)=> {
            (err) ? console.log(err) : res.send(messages);
        });
    });
};