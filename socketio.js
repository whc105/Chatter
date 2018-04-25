const mongoose = require('mongoose');

require('./db');
const Chatroom = mongoose.model('Chatroom');
const Privateroom = mongoose.model('Privateroom');

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
        
        //Sends data to chatroom
        socket.on('group-send', (data)=> {
            const roomID = data.roomID;
            const username = data.username;
            const message = {
                username: (username) ? username : 'Anonymous',
                message: data.message,
                time: new Date()
            };
            
            Chatroom.update({id: roomID}, {$push: {messages: message}},
            (err)=> {
                if (err) {
                    console.log(err);
                } else {
                    io.sockets.emit('group-send', message);
                }
            });
        });
        
        //Sends data to private room
        socket.on('direct-send', (data)=> {
            const username = data.username;
            const selectedUser = data.selectedUser;
            const message = {
                username: username,
                message: data.message,
                time: new Date()
            };
            Privateroom.update({users: {$all: [username, selectedUser]}}, {$push: {messages: message}},
            (err)=> {
                if (err) {
                    console.log(err);
                } else {
                    io.sockets.emit('direct-send', data);
                }
            });
        });
    });
};