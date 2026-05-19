import { Router } from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
const r = Router();
r.get('/me', protect, async (req,res)=> res.json(await User.findById(req.user.id).select('-password')));
r.patch('/me', protect, async (req,res)=> res.json(await User.findByIdAndUpdate(req.user.id, req.body, {new:true}).select('-password')));
export default r;
