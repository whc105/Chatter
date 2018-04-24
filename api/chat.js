const mongoose = require('mongoose');

require('../db');
const Chatroom = mongoose.model('Chatroom');
const Privateroom = mongoose.model('Privateroom');

module.exports = app => {
    app.get('/api/getAllMessages/:roomID', (req, res)=> {
        Chatroom.findOne({id: req.params.roomID}, {_id: 0, messages: 1}, (err, messages)=> {
            (err) ? console.log(err) : res.send(messages);
        });
    });
    
    app.post('/api/createDirectMessage', (req, res)=> {
        const username = (req.user) ? req.user.username : 'Anonymous';
        const selectedUser = req.body.selectedUser;
        
        //Creates a user if none exists, otherwise send back the found user's direct message
        Privateroom.findOne({users: { $all: [username, selectedUser]}}, {_id: 0, messages: 1}, (err, result)=> {
            if (err) {
                res.send(err);
            } else if (result === null) {
                new Privateroom({
                    users: [username, selectedUser],
                    messages: []
                }).save((err)=> {
                    if (err) {
                        res.send(err);
                    }
                });
            } else {
                res.send(result);
            }
        });
    });
};