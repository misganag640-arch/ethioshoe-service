import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: String,
  altPhone: String,
  address: String,
  subCity: String,
  kebele: String,
  role: { type: String, enum: ['customer','admin','employee'], default: 'customer' },
  isVerified: { type: Boolean, default: false },
  verifyToken: String,
  resetToken: String,
  resetExpires: Date,
  loyaltyPoints: { type: Number, default: 0 },
  referralCode: String,
}, { timestamps: true });
export default mongoose.model('User', userSchema);
