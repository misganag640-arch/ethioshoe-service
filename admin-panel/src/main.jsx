import React from 'react'; import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Orders from './pages/Orders.jsx'; import Analytics from './pages/Analytics.jsx';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className="min-h-screen flex">
      <aside className="w-56 bg-neutral-900 p-4 space-y-2">
        <h1 className="font-bold text-xl mb-4">EthioShoe Admin</h1>
        <Link to="/" className="block hover:text-yellow-400">Orders</Link>
        <Link to="/analytics" className="block hover:text-yellow-400">Analytics</Link>
      </aside>
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Orders/>}/>
          <Route path="/analytics" element={<Analytics/>}/>
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);
