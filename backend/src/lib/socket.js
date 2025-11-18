import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chatlify-80ig198le-faizals-projects-96c8bb70.vercel.app"
    ],
    credentials: true,
  },
});

// AUTH MIDDLEWARE
io.use(socketAuthMiddleware);

// Online users map
const userSocketMap = {}; // { userId: socketId }

// Function to check if user is online
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Socket connection handler
io.on("connection", (socket) => {
  console.log("A user connected:", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
