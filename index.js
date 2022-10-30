import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';

//Mimic old __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
//Servidor de socket
const httpServer = createServer(app);

//Configuración del socket
const io = new Server(httpServer, {
  // ...
});
//Desplegar el directorio público

app.use(express.static(__dirname + "/public"));
io.on("connection", (socket) => {
    socket.emit("mensaje-bienvenida", {
        msg: "Bienvenido al servidor",
        fecha: new Date(),
    });
    socket.on('mensaje-cliente',payload=>{
        console.log(payload);
    })
});

httpServer.listen(8080 , () => {
    console.log('Servidor corriendo en http://localhost:8080');
});


