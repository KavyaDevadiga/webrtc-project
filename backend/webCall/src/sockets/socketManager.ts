import { Server, Socket } from "socket.io";

import { socketAuthMiddleware } from "@src/middlewares/socketAuth";
import { Server as HttpServer } from "http";
import { EventHandler } from "./eventHandlers";

export class SocketManager {
  private io: Server;
  private eventHandler: EventHandler;

  constructor(server: HttpServer, eventHandler: EventHandler) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    this.eventHandler = eventHandler;
  }

  public initialize(): void {
    this.io.use(socketAuthMiddleware);

    this.io.on("connection", (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`);

      this.eventHandler.registerHandlers(socket);

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  }
}
