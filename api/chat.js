const mongoose = require('mongoose');

require('../db');
const Chatroom = mongoose.model('Chatroom');
const User = mongoose.model('User');

module.exports = app => {
    app.get('/api/getAllMessages/:id', (req, res)=> {
        console.log("REEE");
    });
};