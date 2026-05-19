import { useEffect, useState } from 'react';
import api from '../api/client';
export default function Dashboard(){
  const [orders,setOrders]=useState([]);
  useEffect(()=>{ api.get('/orders/mine').then(r=>setOrders(r.data)).catch(()=>{}); },[]);
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="h-display text-4xl font-bold">My Dashboard</h1>
      <div className="mt-6 grid gap-3">
        {orders.length===0 && <p className="text-white/60">No orders yet.</p>}
        {orders.map(o=>(
          <div key={o._id} className="card flex justify-between items-center">
            <div><p className="font-mono">{o.orderId}</p><p className="text-white/60 text-sm">{o.cleaningType} · {o.numberOfShoes} pair(s)</p></div>
            <div className="text-right"><p className="capitalize">{o.status.replace('_',' ')}</p><p className="text-ethio-yellow">{o.totalAmount} ETB</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}
