import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { sendEmail } from '../utils/email.js';

const sign = (u) => jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

export const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already used' });
  const hashed = await bcrypt.hash(password, 10);
  const verifyToken = crypto.randomBytes(24).toString('hex');
  const user = await User.create({ name, email, password: hashed, phone, verifyToken });
  await sendEmail({ to: email, subject: 'Verify EthioShoe', html: `<a href="${process.env.CLIENT_URL}/verify/${verifyToken}">Verify your email</a>` });
  res.json({ token: sign(user), user: { id: user._id, name, email, role: user.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: 'Invalid credentials' });
  res.json({ token: sign(user), user: { id: user._id, name: user.name, email, role: user.role } });
};

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.resetToken = crypto.randomBytes(24).toString('hex');
  user.resetExpires = Date.now() + 3600_000;
  await user.save();
  await sendEmail({ to: user.email, subject: 'Reset password', html: `<a href="${process.env.CLIENT_URL}/reset/${user.resetToken}">Reset</a>` });
  res.json({ message: 'Reset email sent' });
};

export const verifyEmail = async (req, res) => {
  const u = await User.findOne({ verifyToken: req.params.token });
  if (!u) return res.status(400).json({ message: 'Invalid token' });
  u.isVerified = true; u.verifyToken = undefined; await u.save();
  res.json({ message: 'Email verified' });
};
