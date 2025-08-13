import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import {app, server} from './lib/socket.js'

const port = process.env.PORT || 3000;


// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:3000", 
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

server.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  connectDB()
});