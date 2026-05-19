import { useEffect, useState } from 'react'; import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const STATUSES=['pending','pickup_scheduled','washing','drying','ready','delivered'];
export default function Orders(){
  const [orders,setO]=useState([]);
  const token = localStorage.getItem('token');
  const load=()=>axios.get(`${API}/admin/orders`,{headers:{Authorization:`Bearer ${token}`}}).then(r=>setO(r.data)).catch(()=>{});
  useEffect(load,[]);
  const update=async(id,status)=>{ await axios.patch(`${API}/orders/${id}/status`,{status},{headers:{Authorization:`Bearer ${token}`}}); load(); };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <table className="w-full text-sm">
        <thead><tr className="text-left text-neutral-400"><th>ID</th><th>Customer</th><th>Service</th><th>Total</th><th>Status</th></tr></thead>
        <tbody>{orders.map(o=>(
          <tr key={o._id} className="border-t border-neutral-800">
            <td className="py-2 font-mono">{o.orderId}</td><td>{o.fullName}</td><td>{o.cleaningType}</td><td>{o.totalAmount} ETB</td>
            <td><select value={o.status} onChange={e=>update(o.orderId,e.target.value)} className="bg-neutral-800 p-1 rounded">{STATUSES.map(s=><option key={s}>{s}</option>)}</select></td>
          </tr>))}</tbody>
      </table>
    </div>
  );
}
