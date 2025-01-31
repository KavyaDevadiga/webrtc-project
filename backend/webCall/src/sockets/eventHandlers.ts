import { Socket } from "socket.io";

//temporary

const emailToSocketmap = new Map();
const socketToEmailmap = new Map();

export class EventHandler {
  public registerHandlers(socket: Socket): void {
    // Handle a custom event: 'message'
    socket.on("message", (data: { message: string }) => {
      console.log(`Message received from ${socket.id}: ${data.message}`);
      socket.emit("message-received", { status: "success" });
    });

    // Handle another custom event: 'ping'
    socket.on("ping", () => {
      console.log(`Ping received from ${socket.id}`);
      socket.emit("pong", { message: "Pong!" });
    });

    socket.on("user:register", (data) => {
      console.log("user:register", data);
      const { currentEmail } = data;
      emailToSocketmap.set(currentEmail, socket.id);
      socketToEmailmap.set(socket.id, currentEmail);
      socket.emit("user:registered", data);
    });

    // Add more event handlers as needed
    socket.on("join:request", (data) => {
      console.log("-----------", data);
      const { email, room, from, offer } = data;
      socket.join([room]);
      const receiverId = emailToSocketmap.get(email);
      console.log("----------", emailToSocketmap);

      if (receiverId) {
        socket.to(receiverId).emit("join:requested", {
          email,
          from,
          requestedRoom: room,
          offer,
          remoteSocket: socket.id,
        });
      }
      // socket.emit("room:joined", data);
    });

    socket.on("join:accept", (data) => {
      console.log("join:accept", data);
      const { to, ans } = data;
      console.log("-----------", data);
      socket.to(to).emit("join:accepted", { ans, from: socket.id });
    });

    socket.on("user:call", ({ to, offer }) => {
      console.log("user:call", to, offer);
      socket.to(to).emit("incoming:call", { offer, from: socket.id });
    });

    socket.on("call:accepted", ({ to, ans }) => {
      socket.to(to).emit("call:accepted", { ans, from: socket.id });
    });

    socket.on("peer:nego:needed", ({ to, offer }) => {
      socket.to(to).emit("peer:nego:needed", { offer, from: socket.id });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
      socket.to(to).emit("peer:nego:final", { ans, from: socket.id });
    });
  }
}
