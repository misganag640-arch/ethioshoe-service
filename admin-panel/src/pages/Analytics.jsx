import { useEffect, useState } from 'react'; import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
export default function Analytics(){
  const [data,setData]=useState(null);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    axios.get((import.meta.env.VITE_API_URL||'http://localhost:5000/api')+'/admin/analytics',{headers:{Authorization:`Bearer ${token}`}}).then(r=>setData(r.data)).catch(()=>{});
  },[]);
  if(!data) return <p>Loading...</p>;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-neutral-900 p-4 rounded"><p className="text-neutral-400">Total orders</p><p className="text-3xl font-bold">{data.total}</p></div>
        <div className="bg-neutral-900 p-4 rounded"><p className="text-neutral-400">Revenue</p><p className="text-3xl font-bold">{data.revenue} ETB</p></div>
      </div>
      <div className="h-64 bg-neutral-900 p-4 rounded">
        <ResponsiveContainer><BarChart data={data.byStatus}><XAxis dataKey="_id"/><YAxis/><Bar dataKey="count" fill="#FCDD09"/></BarChart></ResponsiveContainer>
      </div>
    </div>
  );
}
