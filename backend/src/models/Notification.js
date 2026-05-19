import mongoose from 'mongoose';
export default mongoose.model('Notification', new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String, message: String, read: { type: Boolean, default: false }
}, { timestamps: true }));
