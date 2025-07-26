import express from 'express';
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();



app.use("/api/auth", authRoutes)

app.listen(5000, () => {
  console.log('Server is running on port 5000');
  
});

