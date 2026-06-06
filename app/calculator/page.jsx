'use client';
import { useState } from 'react';

const PRICES = { C15:16500000, C20:18000000, C25:19500000, C30:21000000, C35:23000000, C40:25000000 };
const TRANSPORT = { base:1500000, perKm:80000 };

function fmt(n) { return Math.round(n).toLocaleString('fa-IR'); }

export default function Calculator() {
  const [mode, setMode] = useState('concrete'); // concrete | sand | transport
  const [c, setC] = useState({ grade:'C25', l:'', w:'', h:'', waste:5 });
  const [sand, setSand] = useState({ type:'شن درشت', volume:'' });
  const [tr, setTr] = useState({ distance:'', weight:'' });

  const concreteVol = c.l && c.w && c.h ? parseFloat(c.l)*parseFloat(c.w)*parseFloat(c.h) : 0;
  const withWaste = concreteVol * (1 + parseFloat(c.waste)/100);
  const concretePrice = PRICES[c.grade] || 0;
  const concreteCost = withWaste * concretePrice / 10; // به تومان
  const trucks = Math.ceil(withWaste / 7);

  const sandPrices = { 'شن درشت':450000, 'شن ریز':400000, 'ماسه شسته':380000, 'ماسه طبیعی':320000 };
  const sandCost = sand.volume ? parseFloat(sand.volume) * (sandPrices[sand.type]||380000) / 10 : 0;

  const transportCost = tr.distance ? (TRANSPORT.base + parseFloat(tr.distance)*TRANSPORT.perKm) / 10 : 0;

  const tabStyle = (m) => ({
    padding:'10px 24px', borderRadius:8, border:'none', cursor:'pointer',
    fontFamily:'Vazirmatn,sans-serif', fontWeight:600, fontSize:14,
    background: mode===m ? 'rgba(245,158,11,0.2)' : 'transparent',
    color: mode===m ? '#F59E0B' : 'rgba(255,255,255,0.5)',
    borderBottom: mode===m ? '2px solid #F59E0B' : '2px solid transparent',
    transition:'all 0.2s',
  });
  const inp = { background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'12px 14px', color:'#E6EDF3', fontFamily:'Vazirmatn,sans-serif', fontSize:15, width:'100%', outline:'none' };
  const lbl = { fontSize:13, color:'rgba(255,255,255,0.6)', display:'block', marginBottom:6 };

  return (
    <div style={{ fontFamily:'Vazirmatn,sans-serif', direction:'rtl', background:'#0D1117', color:'#E6EDF3', minHeight:'100vh', padding:'40px 5%' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap'); input:focus,select:focus{border-color:#F59E0B!important} select option{background:#1C2333}`}</style>

      <div style={{ maxWidth:800, margin:'0 auto' }}>
        <a href="/" style={{ color:'rgba(255,255,255,0.4)', fontSize:14, textDecoration:'none' }}>← صفحه اصلی</a>
        <h1 style={{ fontSize:34, fontWeight:900, marginTop:16, marginBottom:8 }}>🧮 محاسبه‌گر مصالح</h1>
        <p style={{ color:'rgba(255,255,255,0.5)', marginBottom:36 }}>برآورد دقیق حجم، تعداد سرویس و هزینه پروژه</p>

        {/* Tabs */}
        <div style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,0.08)', marginBottom:36, gap:4 }}>
          <button style={tabStyle('concrete')} onClick={()=>setMode('concrete')}>🏗️ بتن آماده</button>
          <button style={tabStyle('sand')} onClick={()=>setMode('sand')}>🪨 شن و ماسه</button>
          <button style={tabStyle('transport')} onClick={()=>setMode('transport')}>🚛 هزینه حمل</button>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
          {/* Inputs */}
          <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:28 }}>

            {mode === 'concrete' && (
              <>
                <h3 style={{ fontSize:17, fontWeight:700, marginBottom:20 }}>ابعاد سازه</h3>
                <div style={{ marginBottom:14 }}>
                  <label style={lbl}>رده بتن</label>
                  <select style={inp} value={c.grade} onChange={e=>setC({...c,grade:e.target.value})}>
                    {Object.keys(PRICES).map(g=><option key={g}>{g}</option>)}
                  </select>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:14 }}>
                  {[['طول (m)','l'],['عرض (m)','w'],['ارتفاع (m)','h']].map(([pl,k])=>(
                    <div key={k}>
                      <label style={lbl}>{pl}</label>
                      <input style={inp} type="number" step="0.1" placeholder="0" value={c[k]} onChange={e=>setC({...c,[k]:e.target.value})} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={lbl}>اضافه هدررفت: {c.waste}٪</label>
                  <input type="range" min="3" max="15" value={c.waste} onChange={e=>setC({...c,waste:e.target.value})}
                    style={{ width:'100%', accentColor:'#F59E0B' }} />
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'rgba(255,255,255,0.3)', marginTop:2 }}>
                    <span>۳٪ حداقل</span><span>۱۵٪ حداکثر</span>
                  </div>
                </div>
              </>
            )}

            {mode === 'sand' && (
              <>
                <h3 style={{ fontSize:17, fontWeight:700, marginBottom:20 }}>نوع و حجم</h3>
                <div style={{ marginBottom:14 }}>
                  <label style={lbl}>نوع مصالح</label>
                  <select style={inp} value={sand.type} onChange={e=>setSand({...sand,type:e.target.value})}>
                    {Object.keys(sandPrices).map(k=><option key={k}>{k}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>حجم مورد نیاز (متر مکعب)</label>
                  <input style={inp} type="number" placeholder="0" value={sand.volume} onChange={e=>setSand({...sand,volume:e.target.value})} />
                </div>
              </>
            )}

            {mode === 'transport' && (
              <>
                <h3 style={{ fontSize:17, fontWeight:700, marginBottom:20 }}>مشخصات حمل</h3>
                <div style={{ marginBottom:14 }}>
                  <label style={lbl}>فاصله از انبار (کیلومتر)</label>
                  <input style={inp} type="number" placeholder="0" value={tr.distance} onChange={e=>setTr({...tr,distance:e.target.value})} />
                </div>
                <div>
                  <label style={lbl}>وزن محموله (تن)</label>
                  <input style={inp} type="number" placeholder="0" value={tr.weight} onChange={e=>setTr({...tr,weight:e.target.value})} />
                </div>
                <div style={{ marginTop:16, padding:14, background:'rgba(255,255,255,0.04)', borderRadius:10, fontSize:12, color:'rgba(255,255,255,0.4)', lineHeight:1.7 }}>
                  هزینه پایه: {fmt(TRANSPORT.base/10)} تومان<br/>
                  به ازای هر کیلومتر: {fmt(TRANSPORT.perKm/10)} تومان
                </div>
              </>
            )}
          </div>

          {/* Results */}
          <div>
            <div style={{ background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:16, padding:28 }}>
              <h3 style={{ fontSize:17, fontWeight:700, marginBottom:20, color:'#F59E0B' }}>نتیجه محاسبه</h3>

              {mode === 'concrete' && concreteVol > 0 && (
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {[
                    ['📐 حجم خالص', `${fmt(concreteVol)} m³`],
                    [`📦 با ${c.waste}٪ هدررفت`, `${fmt(withWaste)} m³`],
                    ['🚛 تعداد سرویس (۷m³)', `${trucks} سرویس`],
                    ['💰 تخمین هزینه مصالح', `${fmt(concreteCost)} تومان`],
                  ].map(([k,v])=>(
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                      <span style={{ color:'rgba(255,255,255,0.6)', fontSize:14 }}>{k}</span>
                      <span style={{ fontWeight:700, color: k.includes('هزینه')?'#F59E0B':'#E6EDF3' }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {mode === 'concrete' && !concreteVol && (
                <div style={{ textAlign:'center', color:'rgba(255,255,255,0.3)', padding:'30px 0' }}>
                  ابعاد سازه را وارد کنید تا نتیجه نمایش داده شود
                </div>
              )}

              {mode === 'sand' && sand.volume > 0 && (
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {[
                    ['📦 حجم', `${sand.volume} m³`],
                    ['⚖️ وزن تقریبی', `${fmt(parseFloat(sand.volume)*1.65)} تن`],
                    ['🚛 بار کامیون (۱۲m³)', `${Math.ceil(parseFloat(sand.volume)/12)} بار`],
                    ['💰 تخمین هزینه', `${fmt(sandCost)} تومان`],
                  ].map(([k,v])=>(
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                      <span style={{ color:'rgba(255,255,255,0.6)', fontSize:14 }}>{k}</span>
                      <span style={{ fontWeight:700, color: k.includes('هزینه')?'#F59E0B':'#E6EDF3' }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {mode === 'transport' && tr.distance > 0 && (
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {[
                    ['📏 فاصله', `${tr.distance} کیلومتر`],
                    ['🔧 هزینه پایه', `${fmt(TRANSPORT.base/10)} تومان`],
                    ['🛣️ هزینه مسیر', `${fmt(tr.distance*TRANSPORT.perKm/10)} تومان`],
                    ['💰 جمع کل حمل', `${fmt(transportCost)} تومان`],
                  ].map(([k,v])=>(
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                      <span style={{ color:'rgba(255,255,255,0.6)', fontSize:14 }}>{k}</span>
                      <span style={{ fontWeight:700, color: k.includes('جمع')?'#F59E0B':'#E6EDF3' }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:10 }}>
              <button onClick={()=>location.href='/order/concrete'}
                style={{ background:'linear-gradient(135deg,#F59E0B,#D97706)', color:'#000', border:'none', padding:'13px', borderRadius:8, fontFamily:'Vazirmatn,sans-serif', fontWeight:700, fontSize:15, cursor:'pointer' }}>
                ثبت سفارش ←
              </button>
              <button onClick={()=>window.print()}
                style={{ background:'transparent', color:'rgba(255,255,255,0.5)', border:'1px solid rgba(255,255,255,0.12)', padding:'11px', borderRadius:8, fontFamily:'Vazirmatn,sans-serif', fontSize:14, cursor:'pointer' }}>
                🖨️ چاپ / ذخیره PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
