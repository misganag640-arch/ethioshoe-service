import Order from '../models/Order.js';
import User from '../models/User.js';
export const listOrders = async (_req, res) => res.json(await Order.find().sort('-createdAt'));
export const listCustomers = async (_req, res) => res.json(await User.find({ role: 'customer' }));
export const analytics = async (_req, res) => {
  const total = await Order.countDocuments();
  const revenue = await Order.aggregate([{ $match: { paymentStatus: 'paid' } }, { $group: { _id: null, sum: { $sum: '$totalAmount' } } }]);
  const byStatus = await Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
  res.json({ total, revenue: revenue[0]?.sum || 0, byStatus });
};
