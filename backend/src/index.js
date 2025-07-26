import express from 'express';
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './lib/db.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  connectDB()
 
});

