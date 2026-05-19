import { Router } from 'express';
import { protect, admin } from '../middleware/auth.js';
import { listOrders, listCustomers, analytics } from '../controllers/admin.controller.js';
const r = Router();
r.use(protect, admin);
r.get('/orders', listOrders);
r.get('/customers', listCustomers);
r.get('/analytics', analytics);
export default r;
