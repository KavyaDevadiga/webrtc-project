import { EventHandler } from "@src/sockets/eventHandlers";
import { SocketManager } from "@src/sockets/socketManager";
import { createServer } from "http";

export const startSocketServer = (port: number): void => {
  const httpServer = createServer();
  const eventHandler = new EventHandler();
  const socketManager = new SocketManager(httpServer, eventHandler);

  socketManager.initialize();

  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
