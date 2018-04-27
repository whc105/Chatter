const mongoose = require('mongoose');

require('../db');
const Key = mongoose.model('Key');
const Chatroom = mongoose.model('Chatroom');

module.exports = app => {
    app.post('/api/createRoomKeys', (req, res)=> {
        const keyVal = isNaN(parseInt(req.body.keyVal, 10)) ? 0 : Math.abs(parseInt(req.body.keyVal, 10));
        const keyInput = {
            key: Math.floor(Math.random() * 100000),
            type: req.body.roomID,
            uses: parseInt(keyVal, 10)
        };
        
        Chatroom.findOne({createdBy: req.user.username, id: req.body.roomID}, (err, result)=> {
            if (err) {
                res.send(err);
            } else {
                if (result) {
                    new Key(keyInput).save((err)=> {
                        (err) ? res.send(err) : res.send(true);
                    });
                }
            }
        });
    });
};