import React, { useState } from 'react';
import { useApp } from '../App';

export default function OutletSelectionPage() {
  const { outlets, user, selectOutlet, logout } = useApp();
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const cards = [
    { id: 'cafe-eat-meat', name: 'Cafe Eat & Meat', subtitle: 'Main Cafe', icon: '☕' },
    { id: 'cafe-eat-meat-bar', name: 'Cafe Eat & Meat Bar', subtitle: 'Bar Outlet', icon: '🍹' },
    { id: 'cafe-eat-meat-bbq', name: 'Cafe Eat & Meat BBQ', subtitle: 'BBQ Outlet', icon: '🔥' },
  ];
  const openOutlet = async (outlet) => {
    if (!outlets.some((item) => item.id === outlet.id)) return setError('Your account does not have access to this outlet.');
    setLoading(outlet.id); setError('');
    const result = await selectOutlet(outlet);
    if (!result.success) setError(result.message);
    setLoading('');
  };
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:32, background:'var(--bg)' }}>
      <div style={{ width:'100%', maxWidth:920 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ fontSize:42, marginBottom:10 }}>☕</div>
          <h1 style={{ color:'var(--text)', margin:'0 0 8px', fontSize:28 }}>Select Your Outlet</h1>
          <p style={{ color:'var(--text-muted)', margin:0 }}>Welcome, {user?.name}. Choose an outlet to continue.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:18 }}>
          {cards.map((outlet) => {
            const allowed = outlets.some((item) => item.id === outlet.id);
            return <button key={outlet.id} onClick={() => openOutlet(outlet)} disabled={!allowed || !!loading}
              style={{ textAlign:'left', padding:26, minHeight:190, borderRadius:16, border:'1px solid var(--border)', background:'var(--bg-card)', color:'var(--text)', cursor:allowed?'pointer':'not-allowed', opacity:allowed?1:.45 }}>
              <div style={{ fontSize:36, marginBottom:18 }}>{outlet.icon}</div>
              <div style={{ fontSize:18, fontWeight:800 }}>{outlet.name}</div>
              <div style={{ color:'var(--text-muted)', fontSize:12, marginTop:6 }}>{allowed ? outlet.subtitle : 'No access assigned'}</div>
              <div style={{ marginTop:18, color:'var(--primary)', fontWeight:700, fontSize:13 }}>{loading===outlet.id ? 'Opening…' : allowed ? 'Open outlet →' : 'Access restricted'}</div>
            </button>;
          })}
        </div>
        {error && <p style={{ color:'var(--danger)', textAlign:'center', marginTop:18 }}>{error}</p>}
        <div style={{ textAlign:'center', marginTop:24 }}>
          <button className="btn btn-ghost" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
