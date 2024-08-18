const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    let username = '';

    socket.on('set username', (name) => {
        username = name;
        socket.broadcast.emit('user connected', `${username} entrou no chat`);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', { user: username, text: msg });
    });

    socket.on('disconnect', () => {
        io.emit('user disconnected', `${username} saiu do chat`);
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
