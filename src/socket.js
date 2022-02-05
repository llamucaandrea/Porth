module.exports = (http) => {
    const io = require('socket.io')(http);

    //recibir mensaje
    io.on('connection', (socket) => {
        
        console.log('Usuario conectado!');

        
        socket.on('chat-message', (msg) => {
            //responder
            io.emit('chat-message', msg);
        });

        socket.on('disconnect', () => {
            console.log('Usuario desconectado!');
        });
    });
}