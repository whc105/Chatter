const mongoose = require('mongoose');

require('../db');
const Key = mongoose.model('Key');

module.exports = app => {
    app.post('/api/createRoomKeys', (req, res)=> {
        const keyVal = isNaN(parseInt(req.body.keyVal, 10)) ? 0 : Math.abs(parseInt(req.body.keyVal, 10));
        const keyInput = {
            key: Math.floor(Math.random() * 100000),
            type: req.body.roomID,
            uses: parseInt(keyVal, 10)
        };
        new Key(keyInput).save((err)=> {
            (err) ? res.send(err) : res.send(true);
        });
    });
};