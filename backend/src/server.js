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
import { errorHandler } from './middleware/error.js';

dotenv.config();
await connectDB();

const app = express();
const server = http.createServer(app);
export const io = new Server(server, { cors: { origin: process.env.CLIENT_URL, credentials: true } });

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(xss());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

app.get('/api/health', (_, res) => res.json({ ok: true, service: 'EthioShoe API' }));
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(errorHandler);

io.on('connection', (socket) => {
  socket.on('join', (room) => socket.join(room));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 EthioShoe API on :${PORT}`));
