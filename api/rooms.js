const mongoose = require('mongoose');

require('../db');
const Chatroom = mongoose.model('Chatroom');
const User = mongoose.model('User');
const Key = mongoose.model('Key');

module.exports = app => {
    app.get('/api/getAllRooms', (req, res)=> {
        Chatroom.find({}, 'name id', (err, rooms)=> {
            (err) ? res.send(err) : res.send(rooms);
        });
    });
    
    app.get('/api/getRoom', (req, res)=> {
        Chatroom.findOne({id: req.query.id}, {_id:0, __v:0}, (err, room)=> {
            (err) ? res.send(err) : res.send(room);
        });
    });
    
    app.post('/api/joinRoom', (req, res)=> {
        if (req.user && !req.user.chatrooms.includes(req.body.roomID)) {
            Key.findOneAndUpdate({key: req.body.key, type: req.body.roomID, uses: {$gt: 0}}, {$inc: {uses: -1}}, (err, result)=> {
                if (err) {
                    res.send(err);
                } else if (result !== null){
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
    
    app.post('/api/create-room', (req, res)=> {
        if (req.body.createdBy === undefined) {
            req.body.createdBy = 'Anonymous';
        }
        new Chatroom(req.body).save((err)=> {
            (err) ? res.send(err) : res.send(true);
        });
    });
    
    app.post('/api/delete-room', (req, res)=> {
        console.log(req.body.roomID);
        Chatroom.remove({id: req.body.roomID, createdBy: req.user.username}, (err)=> {
            if (err) {
                res.send(err);
            } else {
                User.updateMany({}, {$pull: {chatrooms: req.body.roomID}},
                (err)=> {
                    (err) ? res.send(err) : res.send(true);
                });
            }
        });
    });
};