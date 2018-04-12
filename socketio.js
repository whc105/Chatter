module.exports = io => {
    io.on('connection', socket=> {
        console.log('Connected');
        socket.on('disconnect', ()=> {
            console.log('Disconnected User');
        });
        
        console.log(io.engine.clientsCount);
        
        //Counts total online users
        setInterval(()=> {
            socket.emit('getClientTotal', io.engine.clientsCount);
        }, 2000);
        
        socket.on('send', (message)=> {
            console.log(message);
            io.sockets.emit('send', message);
        });
    });
};