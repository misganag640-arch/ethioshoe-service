import { Router } from 'express';
import { register, login, forgotPassword, verifyEmail } from '../controllers/auth.controller.js';
const r = Router();
r.post('/register', register);
r.post('/login', login);
r.post('/forgot-password', forgotPassword);
r.get('/verify/:token', verifyEmail);
export default r;
