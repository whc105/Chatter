const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../db');

const Chatroom = mongoose.model('Chatroom');

router.post('/make-room', (req, res)=> {
    if (req.body.createdBy === undefined) {
        req.body.createdBy = 'Anonymous';
    }
    new Chatroom(req.body).save((err)=> {
        (err) ? res.send(err) : res.send(true);
    });
});

module.exports = router;