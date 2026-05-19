import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/client';
import { setAuth } from '../store/store';
export default function Register(){
  const [f,setF]=useState({name:'',email:'',phone:'',password:''});
  const d=useDispatch(); const n=useNavigate();
  const submit=async e=>{e.preventDefault();
    try{ const {data}=await api.post('/auth/register',f); d(setAuth(data)); toast.success('Account created!'); n('/dashboard');}
    catch(err){toast.error(err.response?.data?.message||'Failed')}
  };
  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="h-display text-3xl font-bold">Create account</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input className="input" placeholder="Full name" onChange={e=>setF({...f,name:e.target.value})}/>
        <input className="input" type="email" placeholder="Email" onChange={e=>setF({...f,email:e.target.value})}/>
        <input className="input" placeholder="Phone" onChange={e=>setF({...f,phone:e.target.value})}/>
        <input className="input" type="password" placeholder="Password" onChange={e=>setF({...f,password:e.target.value})}/>
        <button className="btn-primary w-full">Register</button>
      </form>
    </div>
  );
}
