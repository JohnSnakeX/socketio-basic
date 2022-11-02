import ServerIO from "./models/server.js";
import dotenv from "dotenv";
dotenv.config();

const server = new ServerIO();
server.execute();
