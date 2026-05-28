import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import orderRoutes from './routes/order.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import reviewRoutes from './routes/review.routes.js';

dotenv.config();

await connectDB();

const app = express();
const server = http.createServer(app);

/* =========================
   CORS MUST BE FIRST
========================= */
app.use(cors({
  origin: "https://ethioshoe-service-h2ug.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

/* =========================
   SOCKET.IO
========================= */
export const io = new Server(server, {
  cors: {
    origin: "https://ethioshoe-service-h2ug.onrender.com",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

/* =========================
   SECURITY
========================= */
// TEMPORARILY DISABLED FOR TESTING
// app.use(helmet());

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json({ limit: '10mb' }));
app.use(xss());
app.use(morgan('dev'));

/* =========================
   STATIC FILES
========================= */
app.use('/uploads', express.static('uploads'));

/* =========================
   RATE LIMIT
========================= */
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
  })
);

/* =========================
   HEALTH CHECK
========================= */
app.get('/api/health', (_, res) => {
  res.json({
    ok: true,
    service: 'EthioShoe API',
  });
});

/* =========================
   ROUTES
========================= */
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);

/* =========================
   ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

/* =========================
   SOCKET CONNECTION
========================= */
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('join', (room) => {
    socket.join(room);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

/* =========================
   PORT
========================= */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 EthioShoe API running on port ${PORT}`);
});