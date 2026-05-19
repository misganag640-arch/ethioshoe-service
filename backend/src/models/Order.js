import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fullName: String, email: String, phone: String, altPhone: String,
  address: String, subCity: String, kebele: String,
  shoeType: String, shoeBrand: String, color: String,
  cleaningType: { type: String, enum: ['deep','whitening','restoration','polishing','fast','luxury'] },
  numberOfShoes: { type: Number, default: 1 },
  pickupDate: Date, pickupTime: String,
  deliveryOption: { type: String, enum: ['pickup','delivery'], default: 'delivery' },
  notes: String,
  images: [String],
  status: { type: String, enum: ['pending','pickup_scheduled','washing','drying','ready','delivered','cancelled'], default: 'pending' },
  paymentMethod: { type: String, enum: ['cod','telebirr','chapa','cbe'], default: 'cod' },
  paymentStatus: { type: String, enum: ['unpaid','paid','refunded'], default: 'unpaid' },
  totalAmount: Number,
  deliveryFee: Number,
}, { timestamps: true });
export default mongoose.model('Order', orderSchema);
