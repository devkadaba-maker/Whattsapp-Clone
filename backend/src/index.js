import express from 'express';
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)

app.listen(5000, '0.0.0.0', () => {
  console.log('Server is running on port 5000');
});

