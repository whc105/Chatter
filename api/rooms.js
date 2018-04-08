const mongoose = require('mongoose');

require('../db');
const Chatroom = mongoose.model('Chatroom');

module.exports = app => {
    app.get('/api/getAllRooms', (req, res)=> {
        Chatroom.find({}, 'name id', (err, rooms)=> {
            if (err) {
                res.send(err);
            } else {
                res.send(rooms);
            }
        });
    });
    
    app.get('/api/getRoom', (req, res)=> {
        Chatroom.findOne({id: req.query.id}, 'users name messages id', (err, room)=> {
            if (err) {
                res.send(err);
            } else {
                res.send(room);
            }
        });
    });
};