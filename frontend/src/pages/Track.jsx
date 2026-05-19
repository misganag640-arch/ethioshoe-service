import { useState } from 'react';
import api from '../api/client';
const STEPS = ['pending','pickup_scheduled','washing','drying','ready','delivered'];
export default function Track() {
  const [id,setId]=useState(''); const [order,setOrder]=useState(null); const [err,setErr]=useState('');
  const find = async () => {
    setErr('');
    try { const { data } = await api.get(`/orders/track/${id}`); setOrder(data); }
    catch(e){ setErr('Order not found'); setOrder(null);}
  };
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="h-display text-4xl font-bold">Track Order</h1>
      <div className="flex gap-2 mt-6">
        <input className="input" placeholder="ESC-XXXX-XXXX" value={id} onChange={e=>setId(e.target.value)}/>
        <button onClick={find} className="btn-primary">Track</button>
      </div>
      {err && <p className="text-red-400 mt-4">{err}</p>}
      {order && (
        <div className="mt-8 card">
          <p className="text-white/60">Status</p>
          <p className="h-display text-2xl capitalize">{order.status.replace('_',' ')}</p>
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {STEPS.map((s,i)=>{
              const active = STEPS.indexOf(order.status) >= i;
              return <div key={s} className={`px-3 py-1 rounded-full text-xs ${active?'bg-ethio-green':'bg-white/10'}`}>{s.replace('_',' ')}</div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
