import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import Sockets from "./sockets.js";
import cors from "cors";

class ServerIO {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //Http server
    this.server = createServer(this.app);
    //Configuraciones de socket
    this.io = new Server(this.server, {
      /* configuraciones */
    });
  }

  middlewares() {
    //Mimic old __dirname and __filename with ES6
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    //Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    //use cors
    this.app.use(cors());
  }

  //Configurar Sockets
  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    //Inicializar middlewares
    this.middlewares();
    //init server
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
    this.configurarSockets();
  }
}

export default ServerIO;
