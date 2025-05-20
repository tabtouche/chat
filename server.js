const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = {};

app.use(express.static('public'));

io.on('connection', (socket) => {

    socket.on('new-user', username => {
        users[socket.id] = username
        socket.broadcast.emit('user-connected', username);
    })
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', { msg: msg, username: users[socket.id] });
    });

    socket.on('disconnect', () => {
        const username = users[socket.id];
        if (username) {
            socket.broadcast.emit('user-disconnected', username);
            delete users[socket.id];
        }
    });
});

server.listen(3000, () => {
    console.log('Serveur lancé sur http://localhost:3000');
});
