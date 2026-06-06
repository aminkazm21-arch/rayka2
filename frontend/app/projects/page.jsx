'use client';
import { useState } from 'react';

const PROJECTS = [
  { id:1, title:'مجتمع مسکونی ستاره شمال', city:'تهران', type:'مسکونی', concrete:'C25', volume:'450 m³', year:'۱۴۰۳', image:'🏢', desc:'پروژه ۸ طبقه، ۳۲ واحد مسکونی، تهران سعادت‌آباد' },
  { id:2, title:'پارکینگ طبقاتی شهرک قدس', city:'تهران', type:'تجاری', concrete:'C30', volume:'280 m³', year:'۱۴۰۳', image:'🏗️', desc:'پارکینگ ۳ طبقه با ظرفیت ۱۲۰ خودرو' },
  { id:3, title:'کارخانه تولیدی البرز', city:'کرج', type:'صنعتی', concrete:'C35', volume:'820 m³', year:'۱۴۰۲', image:'🏭', desc:'سوله صنعتی با فنداسیون سنگین' },
  { id:4, title:'پل عابر پیاده بزرگراه', city:'تهران', type:'زیرساخت', concrete:'C35', volume:'120 m³', year:'۱۴۰۲', image:'🌉', desc:'پل فلزی با پی‌های بتنی' },
  { id:5, title:'مجتمع تجاری شهریار', city:'شهریار', type:'تجاری', concrete:'C25', volume:'360 m³', year:'۱۴۰۳', image:'🏬', desc:'پاساژ ۴ طبقه، ۸۰ واحد تجاری' },
  { id:6, title:'مدرسه ۱۸ کلاسه اسلامشهر', city:'اسلامشهر', type:'آموزشی', concrete:'C25', volume:'195 m³', year:'۱۴۰۳', image:'🏫', desc:'ساختمان آموزشی ۳ طبقه' },
];

const TYPES = ['همه','مسکونی','تجاری','صنعتی','زیرساخت','آموزشی'];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('همه');
  const [selected, setSelected] = useState(null);
  const filtered = filter === 'همه' ? PROJECTS : PROJECTS.filter(p=>p.type===filter);

  return (
    <div style={{fontFamily:'Vazirmatn,sans-serif',direction:'rtl',background:'#0D1117',color:'#E6EDF3',minHeight:'100vh',padding:'40px 5%'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap');`}</style>
      <a href="/" style={{color:'rgba(255,255,255,0.4)',fontSize:14,textDecoration:'none'}}>← صفحه اصلی</a>
      <h1 style={{fontSize:32,fontWeight:900,marginTop:16,marginBottom:8}}>🏗️ پروژه‌های انجام‌شده</h1>
      <p style={{color:'rgba(255,255,255,0.5)',marginBottom:32}}>نمونه کارهای ما در سراسر منطقه</p>

      <div style={{display:'flex',gap:8,marginBottom:32,flexWrap:'wrap'}}>
        {TYPES.map(t=>(
          <button key={t} onClick={()=>setFilter(t)}
            style={{padding:'8px 20px',borderRadius:20,border:`1px solid ${filter===t?'#F59E0B':'rgba(255,255,255,0.12)'}`,
              background:filter===t?'rgba(245,158,11,0.15)':'transparent',
              color:filter===t?'#F59E0B':'rgba(255,255,255,0.5)',
              fontFamily:'Vazirmatn,sans-serif',fontSize:13,cursor:'pointer'}}>
            {t}
          </button>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:20}}>
        {filtered.map(p=>(
          <div key={p.id} onClick={()=>setSelected(p)}
            style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,overflow:'hidden',cursor:'pointer',transition:'all 0.3s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(245,158,11,0.3)';e.currentTarget.style.transform='translateY(-4px)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.07)';e.currentTarget.style.transform='translateY(0)'}}>
            <div style={{height:160,background:'linear-gradient(135deg,rgba(245,158,11,0.1),rgba(16,185,129,0.05))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:72,borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
              {p.image}
            </div>
            <div style={{padding:22}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                <span style={{background:'rgba(245,158,11,0.15)',color:'#F59E0B',fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:20}}>{p.type}</span>
                <span style={{fontSize:12,color:'rgba(255,255,255,0.3)'}}>{p.year}</span>
              </div>
              <h3 style={{fontWeight:700,fontSize:15,marginBottom:6,lineHeight:1.4}}>{p.title}</h3>
              <p style={{fontSize:12,color:'rgba(255,255,255,0.4)',lineHeight:1.6,marginBottom:14}}>{p.desc}</p>
              <div style={{display:'flex',gap:16}}>
                {[['📍',p.city],['🏗️',p.concrete],['📦',p.volume]].map(([ic,v])=>(
                  <div key={v} style={{fontSize:12,color:'rgba(255,255,255,0.5)',display:'flex',alignItems:'center',gap:4}}>
                    <span>{ic}</span><span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999,padding:20}} onClick={()=>setSelected(null)}>
          <div style={{background:'#161B22',border:'1px solid rgba(255,255,255,0.12)',borderRadius:20,padding:40,maxWidth:480,width:'100%'}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:64,textAlign:'center',marginBottom:16}}>{selected.image}</div>
            <h2 style={{fontSize:22,fontWeight:800,marginBottom:8,textAlign:'center'}}>{selected.title}</h2>
            <p style={{color:'rgba(255,255,255,0.5)',textAlign:'center',marginBottom:24}}>{selected.desc}</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:28}}>
              {[['📍 شهر',selected.city],['🏗️ رده بتن',selected.concrete],['📦 حجم',selected.volume],['📅 سال',selected.year]].map(([k,v])=>(
                <div key={k} style={{background:'rgba(255,255,255,0.04)',borderRadius:10,padding:'12px 14px'}}>
                  <div style={{fontSize:12,color:'rgba(255,255,255,0.4)',marginBottom:4}}>{k}</div>
                  <div style={{fontWeight:700}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:12}}>
              <button onClick={()=>location.href='/order/concrete'} style={{flex:1,background:'linear-gradient(135deg,#F59E0B,#D97706)',color:'#000',border:'none',padding:'12px',borderRadius:8,fontFamily:'Vazirmatn,sans-serif',fontWeight:700,cursor:'pointer'}}>سفارش مشابه</button>
              <button onClick={()=>setSelected(null)} style={{flex:1,background:'transparent',color:'rgba(255,255,255,0.5)',border:'1px solid rgba(255,255,255,0.12)',padding:'12px',borderRadius:8,fontFamily:'Vazirmatn,sans-serif',cursor:'pointer'}}>بستن</button>
            </div>
          </div>
        </div>
      )}

      <div style={{marginTop:48,textAlign:'center',padding:'40px',background:'rgba(245,158,11,0.06)',borderRadius:20,border:'1px solid rgba(245,158,11,0.15)'}}>
        <h3 style={{fontSize:24,fontWeight:800,marginBottom:12}}>پروژه شما می‌تواند اینجا باشد</h3>
        <p style={{color:'rgba(255,255,255,0.5)',marginBottom:24}}>با ما تماس بگیرید و پروژه‌تان را به بهترین شکل اجرا کنید</p>
        <button onClick={()=>location.href='/order/concrete'} style={{background:'linear-gradient(135deg,#F59E0B,#D97706)',color:'#000',border:'none',padding:'14px 32px',borderRadius:8,fontFamily:'Vazirmatn,sans-serif',fontWeight:700,fontSize:16,cursor:'pointer'}}>
          شروع پروژه ←
        </button>
      </div>
    </div>
  );
}
