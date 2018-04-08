const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('../db');
const User = mongoose.model('User');

router.post('/', (req, res)=> {
    req.body.permission = 0;
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
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(true);
                    }
                });
            });
        }
    });
});

module.exports = router;