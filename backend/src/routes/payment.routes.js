import { Router } from 'express';
const r = Router();
// Chapa init stub
r.post('/chapa/init', async (req, res) => {
  // TODO: integrate https://developer.chapa.co
  res.json({ checkout_url: 'https://checkout.chapa.co/checkout/test', ref: 'chapa_' + Date.now() });
});
r.post('/telebirr/init', async (_req, res) => res.json({ url: 'https://telebirr.example/pay', ref: 'tb_' + Date.now() }));
r.post('/webhook/chapa', (_req, res) => res.json({ received: true }));
export default r;
