'use client';
import { useState } from 'react';

const ALL_PRICES = [
  { slug:'concrete-c15', name:'بتن آماده C15', cat:'بتن', price:16500000, unit:'m³', change:0, desc:'پی‌سازی سبک' },
  { slug:'concrete-c20', name:'بتن آماده C20', cat:'بتن', price:18000000, unit:'m³', change:2.1, desc:'پی‌سازی معمولی' },
  { slug:'concrete-c25', name:'بتن آماده C25', cat:'بتن', price:19500000, unit:'m³', change:0, desc:'سازه‌های متداول' },
  { slug:'concrete-c30', name:'بتن آماده C30', cat:'بتن', price:21000000, unit:'m³', change:1.5, desc:'سازه‌های مهم' },
  { slug:'concrete-c35', name:'بتن آماده C35', cat:'بتن', price:23000000, unit:'m³', change:0, desc:'سازه‌های صنعتی' },
  { slug:'concrete-c40', name:'بتن آماده C40', cat:'بتن', price:25000000, unit:'m³', change:-0.8, desc:'سازه‌های ویژه' },
  { slug:'sand-washed',  name:'ماسه شسته',    cat:'شن و ماسه', price:3800000,  unit:'m³', change:0, desc:'دانه‌بندی یکنواخت' },
  { slug:'gravel-coarse',name:'شن درشت',      cat:'شن و ماسه', price:4500000,  unit:'m³', change:3.0, desc:'بتن و راه‌سازی' },
  { slug:'gravel-fine',  name:'شن ریز',       cat:'شن و ماسه', price:4000000,  unit:'m³', change:0, desc:'ملات و بتن' },
  { slug:'crushed-stone',name:'سنگ شکسته',   cat:'سنگ', price:5500000,  unit:'تن', change:1.2, desc:'زیرسازی' },
];

const fmt = (n) => (n/10).toLocaleString('fa-IR');

export default function PricesPage() {
  const [cat, setCat] = useState('همه');
  const cats = ['همه', 'بتن', 'شن و ماسه', 'سنگ'];
  const filtered = cat === 'همه' ? ALL_PRICES : ALL_PRICES.filter(p => p.cat === cat);
  const today = new Date().toLocaleDateString('fa-IR');

  return (
    <div style={{fontFamily:'Vazirmatn,sans-serif',direction:'rtl',background:'#0D1117',color:'#E6EDF3',minHeight:'100vh',padding:'40px 5%'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap');`}</style>
      <a href="/" style={{color:'rgba(255,255,255,0.4)',fontSize:14,textDecoration:'none'}}>← صفحه اصلی</a>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:16,marginBottom:8}}>
        <h1 style={{fontSize:32,fontWeight:900}}>💰 قیمت روز مصالح</h1>
        <div style={{fontSize:13,color:'rgba(255,255,255,0.4)',background:'rgba(255,255,255,0.05)',padding:'6px 14px',borderRadius:20}}>
          🕐 بروزرسانی: {today}
        </div>
      </div>
      <p style={{color:'rgba(255,255,255,0.4)',marginBottom:32}}>قیمت‌ها تخمینی است — برای قیمت دقیق استعلام بگیرید</p>

      <div style={{display:'flex',gap:8,marginBottom:28}}>
        {cats.map(c => (
          <button key={c} onClick={()=>setCat(c)}
            style={{padding:'8px 20px',borderRadius:20,border:`1px solid ${cat===c?'#F59E0B':'rgba(255,255,255,0.12)'}`,
              background:cat===c?'rgba(245,158,11,0.15)':'transparent',
              color:cat===c?'#F59E0B':'rgba(255,255,255,0.5)',
              fontFamily:'Vazirmatn,sans-serif',fontSize:13,cursor:'pointer'}}>
            {c}
          </button>
        ))}
      </div>

      <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'rgba(255,255,255,0.04)',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
              {['محصول','کاربرد','قیمت (تومان)','واحد','تغییر','سفارش'].map(h=>(
                <th key={h} style={{padding:'13px 20px',textAlign:'right',fontSize:12,color:'rgba(255,255,255,0.4)',fontWeight:600}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p,i)=>(
              <tr key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.02)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <td style={{padding:'16px 20px',fontWeight:700}}>{p.name}</td>
                <td style={{padding:'16px 20px',fontSize:13,color:'rgba(255,255,255,0.4)'}}>{p.desc}</td>
                <td style={{padding:'16px 20px',color:'#F59E0B',fontWeight:800,fontSize:16}}>{fmt(p.price)}</td>
                <td style={{padding:'16px 20px',fontSize:13,color:'rgba(255,255,255,0.4)'}}>هر {p.unit}</td>
                <td style={{padding:'16px 20px'}}>
                  {p.change === 0
                    ? <span style={{color:'rgba(255,255,255,0.3)',fontSize:13}}>بدون تغییر</span>
                    : <span style={{color:p.change>0?'#10B981':'#EF4444',fontSize:13,fontWeight:600}}>
                        {p.change>0?'▲':'▼'} {Math.abs(p.change)}٪
                      </span>}
                </td>
                <td style={{padding:'16px 20px'}}>
                  <button onClick={()=>location.href='/order/concrete'}
                    style={{background:'linear-gradient(135deg,#F59E0B,#D97706)',color:'#000',border:'none',padding:'8px 18px',borderRadius:7,fontFamily:'Vazirmatn,sans-serif',fontWeight:700,fontSize:13,cursor:'pointer'}}>
                    سفارش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{marginTop:20,padding:16,background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.15)',borderRadius:12,fontSize:13,color:'rgba(255,255,255,0.5)',lineHeight:1.8}}>
        ⚠️ <strong style={{color:'rgba(255,255,255,0.7)'}}>توجه:</strong> قیمت‌های فوق تخمینی بوده و ممکن است بر اساس حجم سفارش، فاصله پروژه و شرایط بازار متفاوت باشد. قیمت دقیق پس از بررسی پروژه توسط کارشناسان ما اعلام خواهد شد.
      </div>

      <div style={{marginTop:32,display:'flex',gap:16,flexWrap:'wrap'}}>
        <button onClick={()=>location.href='/order/concrete'}
          style={{background:'linear-gradient(135deg,#F59E0B,#D97706)',color:'#000',border:'none',padding:'13px 28px',borderRadius:8,fontFamily:'Vazirmatn,sans-serif',fontWeight:700,fontSize:15,cursor:'pointer'}}>
          ثبت سفارش آنلاین ←
        </button>
        <button onClick={()=>location.href='/calculator'}
          style={{background:'transparent',color:'#F59E0B',border:'1.5px solid #F59E0B',padding:'12px 24px',borderRadius:8,fontFamily:'Vazirmatn,sans-serif',fontWeight:600,fontSize:14,cursor:'pointer'}}>
          🧮 محاسبه هزینه
        </button>
      </div>
    </div>
  );
}
