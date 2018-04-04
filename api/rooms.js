const express = require('express');
const mongoose = require('mongoose');

require('../db');
const Chatroom = mongoose.model('Chatroom');

module.exports = app => {
    app.get('/api/getAllRooms', (req, res)=> {
        Chatroom.find({}, 'name', (err, rooms)=> {
            if (err) {
                console.log(err);
            } else {
                res.send(rooms);
            }
        });
    });
    
    app.get('/api/getRoom', (req, res)=> {
        Chatroom.findOne({id: req.query.id}, 'users name messages', (err, room)=> {
            if (err) {
                console.log(err);
            } else {
                res.send(room);
            }
        });
    });
};