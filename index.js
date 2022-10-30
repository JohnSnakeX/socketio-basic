//Servidor de express
const app = require('express')();

//Servidor de sockets
const server = require('http').createServer(app);

//configuracion de socket.io
const io = require('socket.io')(server);
io.on('connection', () => { /* … */ });
server.listen(8080 , () => {
    console.log('Servidor corriendo en http://localhost:8080');
});