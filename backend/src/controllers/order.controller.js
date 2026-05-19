import Order from '../models/Order.js';
import { generateOrderId } from '../utils/orderId.js';
import { sendEmail } from '../utils/email.js';
import { io } from '../server.js';

const DELIVERY_FEES = { Bole: 150, Yeka: 120, 'Addis Ketema': 100, Kirkos: 100, Lideta: 100, 'Arada': 120, 'Akaki Kality': 180, 'Nifas Silk-Lafto': 150, Gulele: 120, Kolfe: 150 };
const PRICES = { deep: 250, whitening: 350, restoration: 600, polishing: 150, fast: 200, luxury: 800 };

export const createOrder = async (req, res) => {
  const body = req.body;
  const orderId = generateOrderId();
  const images = (req.files || []).map(f => `/uploads/${f.filename}`);
  const deliveryFee = body.deliveryOption === 'delivery' ? (DELIVERY_FEES[body.subCity] || 150) : 0;
  const totalAmount = (PRICES[body.cleaningType] || 250) * (Number(body.numberOfShoes) || 1) + deliveryFee;
  const order = await Order.create({ ...body, orderId, images, deliveryFee, totalAmount, user: req.user?.id });
  await sendEmail({ to: body.email, subject: `Order ${orderId} received`, html: `<h2>Thank you!</h2><p>Order ID: <b>${orderId}</b></p>` });
  io.emit('order:new', order);
  res.status(201).json(order);
};

export const trackOrder = async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.orderId });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};

export const myOrders = async (req, res) => {
  res.json(await Order.find({ user: req.user.id }).sort('-createdAt'));
};

export const updateStatus = async (req, res) => {
  const order = await Order.findOneAndUpdate({ orderId: req.params.orderId }, { status: req.body.status }, { new: true });
  io.emit(`order:${order.orderId}`, order);
  res.json(order);
};
