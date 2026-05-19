import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../api/client';

const SUB_CITIES = ['Bole','Yeka','Addis Ketema','Kirkos','Lideta','Arada','Akaki Kality','Nifas Silk-Lafto','Gulele','Kolfe'];

export default function Order() {
  const [form, setForm] = useState({
    fullName:'', email:'', phone:'', altPhone:'', address:'', subCity:'Bole', kebele:'',
    shoeType:'', shoeBrand:'', color:'', cleaningType:'deep', numberOfShoes:1,
    pickupDate:'', pickupTime:'', deliveryOption:'delivery', notes:'', paymentMethod:'cod'
  });
  const [files, setFiles] = useState([]);
  const [done, setDone] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = (k,v) => setForm(s=>({...s,[k]:v}));

  const submit = async (e) => {
    e.preventDefault();
    if (!/^(\+251|0)(9|7)\d{8}$/.test(form.phone)) return toast.error('Invalid Ethiopian phone');
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v])=>fd.append(k,v));
      files.forEach(f=>fd.append('images',f));
      const { data } = await api.post('/orders', fd);
      setDone(data);
      toast.success('Order placed!');
    } catch(err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  if (done) return (
    <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} className="max-w-xl mx-auto mt-20 card text-center">
      <div className="text-6xl">🎉</div>
      <h2 className="h-display text-3xl mt-3">Order Confirmed!</h2>
      <p className="mt-2 text-white/70">Your tracking ID:</p>
      <p className="text-2xl font-mono mt-2 text-ethio-yellow">{done.orderId}</p>
      <p className="mt-4">Total: <b>{done.totalAmount} ETB</b></p>
    </motion.div>
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="h-display text-4xl font-bold mb-6">Place Your Order</h1>
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
        <input className="input" placeholder="Full name" required onChange={e=>update('fullName',e.target.value)}/>
        <input className="input" type="email" placeholder="Email" required onChange={e=>update('email',e.target.value)}/>
        <input className="input" placeholder="Phone (+2519..)" required onChange={e=>update('phone',e.target.value)}/>
        <input className="input" placeholder="Alt phone (optional)" onChange={e=>update('altPhone',e.target.value)}/>
        <input className="input sm:col-span-2" placeholder="Address" required onChange={e=>update('address',e.target.value)}/>
        <select className="input" value={form.subCity} onChange={e=>update('subCity',e.target.value)}>
          {SUB_CITIES.map(s=><option key={s}>{s}</option>)}
        </select>
        <input className="input" placeholder="Kebele (optional)" onChange={e=>update('kebele',e.target.value)}/>
        <input className="input" placeholder="Shoe type (sneaker, leather...)" onChange={e=>update('shoeType',e.target.value)}/>
        <input className="input" placeholder="Brand (Nike, Adidas...)" onChange={e=>update('shoeBrand',e.target.value)}/>
        <input className="input" placeholder="Color" onChange={e=>update('color',e.target.value)}/>
        <select className="input" onChange={e=>update('cleaningType',e.target.value)}>
          <option value="deep">Deep Cleaning</option>
          <option value="whitening">Whitening</option>
          <option value="restoration">Sneaker Restoration</option>
          <option value="polishing">Polishing</option>
          <option value="fast">Fast Cleaning</option>
          <option value="luxury">Luxury Care</option>
        </select>
        <input className="input" type="number" min="1" defaultValue="1" onChange={e=>update('numberOfShoes',+e.target.value)}/>
        <input className="input" type="date" required onChange={e=>update('pickupDate',e.target.value)}/>
        <input className="input" type="time" required onChange={e=>update('pickupTime',e.target.value)}/>
        <select className="input" onChange={e=>update('deliveryOption',e.target.value)}>
          <option value="delivery">Pickup & Delivery</option>
          <option value="pickup">Drop-off Myself</option>
        </select>
        <select className="input" onChange={e=>update('paymentMethod',e.target.value)}>
          <option value="cod">Cash on Delivery</option>
          <option value="telebirr">Telebirr</option>
          <option value="chapa">Chapa</option>
          <option value="cbe">CBE Birr</option>
        </select>
        <textarea className="input sm:col-span-2" placeholder="Additional notes" onChange={e=>update('notes',e.target.value)}/>
        <input className="input sm:col-span-2" type="file" multiple accept="image/*" onChange={e=>setFiles([...e.target.files])}/>
        <button disabled={loading} className="btn-primary sm:col-span-2">{loading?'Placing...':'Place Order'}</button>
      </form>
    </div>
  );
}
