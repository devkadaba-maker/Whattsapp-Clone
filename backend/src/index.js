
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.route.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './lib/db.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:3000", 
    "https://cb378054-078b-4d30-a41a-2135c7a4caff-00-2uq7d29wzoour.picard.replit.dev",
    "https://cb378054-078b-4d30-a41a-2135c7a4caff-00-2uq7d29wzoour.picard.replit.dev:3000"
  ],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  connectDB()
});
