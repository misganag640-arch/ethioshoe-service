// Seed admin user: run with `node database/seed.js` from backend folder after `npm install`
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../backend/src/models/User.js';

await mongoose.connect(process.env.MONGO_URI);
const password = await bcrypt.hash('admin123', 10);
await User.findOneAndUpdate(
  { email: 'admin@ethioshoe.et' },
  { name: 'Admin', email: 'admin@ethioshoe.et', password, role: 'admin', isVerified: true },
  { upsert: true }
);
console.log('✅ Admin seeded: admin@ethioshoe.et / admin123');
process.exit(0);
