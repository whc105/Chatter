const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../db');

const Chatroom = mongoose.model('Chatroom');

router.post('/make-room', (req, res)=> {
    console.log(req.body);
    new Chatroom(req.body).save((err)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(true);
        }
    });
});

module.exports = router;