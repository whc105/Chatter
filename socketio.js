const mongoose = require('mongoose');

require('./db');
const Chatroom = mongoose.model('Chatroom');

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
            const roomID = data.roomID;
            const username = data.username;
            const time = new Date();
            const message = {
                username: (username) ? username : 'Anonymous',
                message: data.message,
                time: time
            };
            
            Chatroom.update({id: roomID}, {$push: {messages: message}},
            (err)=> {
                if (err) {
                    console.log(err);
                } else {
                    io.sockets.emit('send', message);
                }
            });
        });
    });
};