const express = require('express');
const mongoose = require('mongoose');

require('../db');
const Chatroom = mongoose.model('Chatroom');

module.exports = app => {
    app.get('/api/getAllRooms', (req, res)=> {
        Chatroom.find({}, 'name', (err, user)=> {
            if (err) {
                console.log(err);
            } else {
                res.send(user);
            }
        });
    });
};