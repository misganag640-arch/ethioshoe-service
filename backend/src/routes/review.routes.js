import { Router } from 'express';
import Review from '../models/Review.js';
import { protect } from '../middleware/auth.js';
const r = Router();
r.get('/', async (_req,res) => res.json(await Review.find().populate('user','name').sort('-createdAt').limit(20)));
r.post('/', protect, async (req,res) => res.json(await Review.create({ ...req.body, user: req.user.id })));
export default r;
