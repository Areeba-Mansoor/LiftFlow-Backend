import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import { initSocket } from './config/socket.js';

import authRoutes from './routes/auth.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

initSocket(server);

// Connect Database
connectDB();

// Middlewares
app.use(cors({
  origin: ['https://lift-flow-frontend.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));


app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'LiftFlow Backend is running successfully!' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;