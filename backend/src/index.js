import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import { notFound, errorHandler } from './middleware/error.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'MERN Capstone Backend API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_capstone';

async function start() {
  if (process.env.NODE_ENV !== 'test') {
    await mongoose.connect(MONGO_URI);
  }
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: '*'} });
  app.set('io', io);
  io.on('connection', (socket) => {
    // simple connection log
  });
  server.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
  return { app, server, io };
}

if (process.env.JEST_WORKER_ID === undefined) {
  start();
}

export { app, start };
