'use client';
import { useState } from 'react';

const PRODUCTS = [
  { slug:'sand-washed',  name:'ماسه شسته',  price:3800000, desc:'دانه‌بندی یکنواخت، مناسب بتن و ملات' },
  { slug:'sand-natural', name:'ماسه طبیعی', price:3200000, desc:'مناسب پرکردن و زیرسازی' },
  { slug:'gravel-coarse',name:'شن درشت',    price:4500000, desc:'مناسب بتن سازه‌ای' },
  { slug:'gravel-fine',  name:'شن ریز',     price:4000000, desc:'مناسب ملات و بتن سبک' },
  { slug:'crushed-stone',name:'سنگ شکسته', price:5500000, desc:'زیرسازی راه و فنداسیون', unit:'تن' },
];
const fmt = (n) => Math.round(n/10).toLocaleString('fa-IR');

export default function OrderSand() {
  const [sel, setSel] = useState(null);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ volume:'', city:'', address:'', date:'', name:'', phone:'' });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const inp = { background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'12px 14px', color:'#E6EDF3', fontFamily:'Vazirmatn,sans-serif', fontSize:14, width:'100%', outline:'none' };
  const btn = { background:'linear-gradient(135deg,#F59E0B,#D97706)', color:'#000', border:'none', padding:'13px 28px', borderRadius:8, fontFamily:'Vazirmatn,sans-serif', fontWeight:700, fontSize:15, cursor:'pointer' };

  const totalEst = sel && form.volume ? fmt(sel.price * parseFloat(form.volume)) : null;

  return (
    <div style={{fontFamily:'Vazirmatn,sans-serif',direction:'rtl',background:'#0D1117',color:'#E6EDF3',minHeight:'100vh',padding:'40px 5%'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap'); input:focus,select:focus,textarea:focus{border-color:#F59E0B!important} input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.3)} select option{background:#1C2333}`}</style>
      <a href="/" style={{color:'rgba(255,255,255,0.4)',fontSize:14,textDecoration:'none'}}>← صفحه اصلی</a>
      <h1 style={{fontSize:32,fontWeight:900,marginTop:16,marginBottom:28}}>🪨 سفارش شن و ماسه</h1>

      {step === 0 && (
        <>
          <p style={{color:'rgba(255,255,255,0.5)',marginBottom:24}}>نوع مصالح مورد نیاز را انتخاب کنید:</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:14,maxWidth:900,marginBottom:32}}>
            {PRODUCTS.map(p => (
              <div key={p.slug} onClick={()=>setSel(p)}
                style={{background:sel?.slug===p.slug?'rgba(245,158,11,0.12)':'rgba(255,255,255,0.03)', border:`2px solid ${sel?.slug===p.slug?'#F59E0B':'rgba(255,255,255,0.08)'}`, borderRadius:14, padding:22, cursor:'pointer', transition:'all 0.2s'}}>
                <div style={{fontWeight:800,fontSize:16,marginBottom:6,color:sel?.slug===p.slug?'#F59E0B':'#E6EDF3'}}>{p.name}</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,0.4)',marginBottom:12,lineHeight:1.5}}>{p.desc}</div>
                <div style={{fontSize:17,fontWeight:800,color:'#F59E0B'}}>{fmt(p.price)}</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.3)'}}>تومان/هر {p.unit||'m³'}</div>
              </div>
            ))}
          </div>
          <button style={btn} onClick={()=>sel?setStep(1):alert('لطفاً نوع مصالح را انتخاب کنید')}>مرحله بعد ←</button>
        </>
      )}

      {step === 1 && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:28,maxWidth:840}}>
          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:28}}>
            <h3 style={{fontWeight:700,fontSize:18,marginBottom:22}}>مشخصات سفارش</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
              <div>
                <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>حجم ({sel?.unit||'m³'}) *</label>
                <input style={inp} type="number" placeholder="مثال: ۱۵" value={form.volume} onChange={e=>set('volume',e.target.value)} min="1" />
              </div>
              <div>
                <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>شهر *</label>
                <input style={inp} placeholder="مثال: تهران" value={form.city} onChange={e=>set('city',e.target.value)} />
              </div>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>آدرس تحویل *</label>
              <textarea style={{...inp,height:80,resize:'vertical'}} placeholder="آدرس کامل..." value={form.address} onChange={e=>set('address',e.target.value)} />
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
              <div>
                <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>تاریخ تحویل *</label>
                <input style={inp} type="date" value={form.date} onChange={e=>set('date',e.target.value)} min={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>موبایل *</label>
                <input style={inp} type="tel" placeholder="09..." value={form.phone} onChange={e=>set('phone',e.target.value)} />
              </div>
            </div>
            <div style={{marginBottom:22}}>
              <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>نام *</label>
              <input style={inp} placeholder="نام و نام خانوادگی" value={form.name} onChange={e=>set('name',e.target.value)} />
            </div>
            <div style={{display:'flex',gap:12}}>
              <button style={{...btn,background:'transparent',color:'#F59E0B',border:'1.5px solid #F59E0B'}} onClick={()=>setStep(0)}>← قبلی</button>
              <button style={btn} onClick={()=>{
                if(!form.volume||!form.city||!form.name||!form.phone) return alert('فیلدهای ستاره‌دار را کامل کنید');
                alert(`✅ سفارش ثبت شد!\nمحصول: ${sel.name}\nحجم: ${form.volume} ${sel.unit||'m³'}\nکارشناس ما با شما تماس می‌گیرد.`);
              }}>ثبت سفارش ←</button>
            </div>
          </div>
          <div style={{background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:22,height:'fit-content',position:'sticky',top:80}}>
            <h4 style={{fontWeight:700,fontSize:15,marginBottom:16,color:'#F59E0B'}}>خلاصه سفارش</h4>
            {[['🪨 محصول',sel?.name],['📦 حجم',form.volume?`${form.volume} ${sel?.unit||'m³'}`:'—'],['📍 شهر',form.city||'—'],['📅 تحویل',form.date||'—']].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,0.06)',fontSize:13}}>
                <span style={{color:'rgba(255,255,255,0.5)'}}>{k}</span>
                <span style={{fontWeight:600}}>{v}</span>
              </div>
            ))}
            {totalEst && (
              <div style={{textAlign:'center',marginTop:16}}>
                <div style={{fontSize:12,color:'rgba(255,255,255,0.4)'}}>تخمین هزینه</div>
                <div style={{fontSize:22,fontWeight:900,color:'#F59E0B',marginTop:4}}>{totalEst}</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.3)'}}>تومان</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
