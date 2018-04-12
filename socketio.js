module.exports = io => {
    io.on('connection', (socket)=> {
        console.log('Connected');
        
        socket.on('disconnect', ()=> {
            console.log('Disconnected User');
        });
        
        socket.on('change color', (color)=> {
            console.log('Color changed', color);
            io.sockets.emit('change color', color);
        });
        
        socket.on('send', (message)=> {
            console.log(message);
            io.sockets.emit('send', message);
        });
    });
};