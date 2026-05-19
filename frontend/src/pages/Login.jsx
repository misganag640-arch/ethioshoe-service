import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/client';
import { setAuth } from '../store/store';
export default function Login(){
  const [f,setF]=useState({email:'',password:''});
  const d=useDispatch(); const n=useNavigate();
  const submit=async e=>{e.preventDefault();
    try{ const {data}=await api.post('/auth/login',f); d(setAuth(data)); toast.success('Welcome!'); n('/dashboard');}
    catch(err){toast.error(err.response?.data?.message||'Login failed')}
  };
  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="h-display text-3xl font-bold">Login</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input className="input" type="email" placeholder="Email" onChange={e=>setF({...f,email:e.target.value})}/>
        <input className="input" type="password" placeholder="Password" onChange={e=>setF({...f,password:e.target.value})}/>
        <button className="btn-primary w-full">Login</button>
      </form>
      <p className="mt-4 text-sm text-white/60">No account? <Link className="text-ethio-yellow" to="/register">Register</Link></p>
    </div>
  );
}
