module.exports = io => {
    io.on('connection', socket=> {
        console.log('Connected');
        
        socket.on('disconnect', ()=> {
            console.log('Disconnected User');
        });
        
        socket.on('send', (message)=> {
            console.log(message);
            io.sockets.emit('send', message);
        });
    });
};