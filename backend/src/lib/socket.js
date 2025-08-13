import { Server } from "socket.io"
import http from "http"
import express from "express" 


const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
})

const userSocketMap = {}; // userId:socketId

export function getReceiverSocketId(userID){
  return userSocketMap[userID]
}


io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});  


export { io, app, server }

