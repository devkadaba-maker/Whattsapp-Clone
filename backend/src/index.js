import express from 'express';
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.route.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectDB } from './lib/db.js';


dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "https://*.replit.dev"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  connectDB()
 
});

