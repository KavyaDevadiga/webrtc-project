import { Socket } from "socket.io";

export const socketAuthMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
): void => {
  //   const token = socket.handshake.auth.token; // Extract token from handshake

  //   if (!token) {
  //     console.log("Authentication failed: Missing token");
  //     return next(new Error("Authentication error: Missing token"));
  //   }

  try {
    // const decoded = verifyToken(token);
    // (socket as any).user = decoded;
    next();
  } catch (error: any) {
    console.log("Authentication failed:", error.message);
    next(new Error("Authentication error"));
  }
};

const verifyToken = (token: string): any => {
  if (token === "valid-token") {
    return { userId: 1, username: "testUser" }; // Mock user data
  }
  throw new Error("Invalid token");
};
