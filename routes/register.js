const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('../db');
const User = mongoose.model('User');
const Key = mongoose.model('Key');

router.post('/', (req, res)=> {
    if (req.body.key === '') {
        req.body.permission = 0;
        createUser(req, res);
    } else {
        Key.findOneAndUpdate({key: req.body.key, type: 'register'}, {$inc: {uses: -1}}, (err)=> {
            if (err) {
                res.send(err);
            } else {
                req.body.permission = 1;
                createUser(req, res);
            }
        });
    }
});

function createUser(req, res) {
    //Check if user already exists.
    if (req.body.password.length < 8) {
        res.send(false);
    } else {
        User.findOne({$or: [{username: req.body.username}, {email: req.body.email}]}, (err, user)=> {
            if (err) {
                res.send(err);
            } else if (user) {
                res.send(false);
            } else {
                bcrypt.hash(req.body.password, 10)
                .then((hash)=> {
                    req.body.password = hash;
                    new User(req.body).save((err)=> {
                        (err) ? res.send(err) : res.send(true);
                    });
                });
            }
        });
    }
}

module.exports = router;