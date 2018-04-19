const mongoose = require('mongoose');

require('./db');
const Chatroom = mongoose.model('Chatroom');
const User = mongoose.model('User');

module.exports = io => {
    io.on('connection', socket=> {
        console.log('Connected');
        socket.on('disconnect', ()=> {
            console.log('Disconnected User');
        });
        
        console.log(io.engine.clientsCount);

        //Counts total online users
        socket.on('getClientTotal', ()=> {
            setInterval(()=> {
                socket.emit('getClientTotal', io.engine.clientsCount);
            }, 2000);
        });
        
        socket.on('send', (data)=> {
            console.log(data);
            io.sockets.emit('send', data.message);
        });
    });
};