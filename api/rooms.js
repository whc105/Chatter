const mongoose = require('mongoose');

require('../db');
const Chatroom = mongoose.model('Chatroom');
const User = mongoose.model('User');

module.exports = app => {
    app.get('/api/getAllRooms', (req, res)=> {
        Chatroom.find({}, 'name id', (err, rooms)=> {
            (err) ? res.send(err) : res.send(rooms);
        });
    });
    
    app.get('/api/getRoom', (req, res)=> {
        Chatroom.findOne({id: req.query.id}, {'_id':0, '__v':0}, (err, room)=> {
            (err) ? res.send(err) : res.send(room);
        });
    });
    
    app.post('/api/joinRoom', (req, res)=> {
        if (req.user && !req.user.chatrooms.includes(req.body.roomID)) {
            Chatroom.update({id: req.body.roomID}, {$push: {users: req.user.username}},
            (err)=> {
                if (err) {
                    res.send(err);
                } else {
                    User.update({username: req.user.username}, {$push: {chatrooms: req.body.roomID}},
                    (err)=> {
                        (err) ? res.send(err) : res.send(true);
                    });
                }
            });
        } else {
            res.send(false);
        }
    });
    
    app.post('/api/leaveRoom', (req, res)=> {
        if (req.user.chatrooms.includes(req.body.roomID)) {
            Chatroom.update({id: req.body.roomID}, {$pull: {users: req.user.username}},
            (err)=> {
                if (err) {
                    res.send(err);
                } else {
                    User.update({username: req.user.username}, {$pull: {chatrooms: req.body.roomID}},
                    (err)=> {
                        (err) ? res.send(err) : res.send(true);
                    });
                }
            });
        } else {
            res.send(false);
        }
    });
};