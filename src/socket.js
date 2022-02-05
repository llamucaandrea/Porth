const req = require("express/lib/request");

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '12345678',
    database: 'chat',
    port: '5433'
});

const createMsg = async (chat) => {

    const { nombre, mensaje, fecha } = chat;
    const res = await pool.query('INSERT INTO mensaje (nombre, mensaje, fecha) VALUES ($1, $2, $3)', [nombre, mensaje, fecha]);
    return res
};
module.exports = (http) => {
    const io = require('socket.io')(http);

    //recibir mensaje
    io.on('connection', (socket) => {
        
        console.log('Usuario conectado!');

        
        socket.on('chat-message', (msg) => {
            createMsg(msg)
            //responder
            io.emit('chat-message', msg);
        });

        socket.on('disconnect', () => {
            console.log('Usuario desconectado!');
        });

    });
}

