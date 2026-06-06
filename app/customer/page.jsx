'use client';
import { useState } from 'react';

const MOCK_ORDERS = [
  {id:'ORD-1404-0142',product:'بتن C25 — 20m³',status:'confirmed',amount:'۳۹٬۰۰۰٬۰۰۰',date:'۱۴۰۴/۰۴/۱۵',city:'تهران'},
  {id:'ORD-1404-0130',product:'شن درشت — 10m³',status:'delivered',amount:'۴٬۵۰۰٬۰۰۰',date:'۱۴۰۴/۰۳/۲۸',city:'کرج'},
  {id:'ORD-1404-0118',product:'بتن C30 — 35m³',status:'delivered',amount:'۷۳٬۵۰۰٬۰۰۰',date:'۱۴۰۴/۰۳/۱۰',city:'تهران'},
];
const ST={pending:'در انتظار',confirmed:'تأیید شده',in_production:'در تولید',dispatched:'ارسال شده',delivered:'تحویل شده'};
const SC={pending:'#F59E0B',confirmed:'#3B82F6',in_production:'#8B5CF6',dispatched:'#06B6D4',delivered:'#10B981'};

export default function CustomerPanel() {
  const [auth, setAuth] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [tab, setTab] = useState('orders');

  if (!auth) return (
    <div style={{fontFamily:'Vazirmatn,sans-serif',direction:'rtl',background:'#0D1117',color:'#E6EDF3',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap'); input{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);borderRadius:8px;padding:12px 14px;color:#E6EDF3;fontFamily:Vazirmatn,sans-serif;fontSize:14px;width:100%;outline:none;marginBottom:12px;border-radius:8px} input:focus{border-color:#F59E0B!important}`}</style>
      <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,padding:48,width:360,textAlign:'center'}}>
        <div style={{fontSize:40,marginBottom:12}}>👤</div>
        <h2 style={{fontSize:22,fontWeight:800,marginBottom:6}}>پنل مشتری</h2>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:14,marginBottom:28}}>با شماره موبایل وارد شوید</p>
        <input type="tel" placeholder="شماره موبایل: 09..." value={phone} onChange={e=>setPhone(e.target.value)} style={{display:'block',width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'12px 14px',color:'#E6EDF3',fontFamily:'Vazirmatn,sans-serif',marginBottom:12,outline:'none'}} />
        {otpSent && <input type="text" placeholder="کد ۶ رقمی" value={otp} onChange={e=>setOtp(e.target.value)} style={{display:'block',width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'12px 14px',color:'#E6EDF3',fontFamily:'Vazirmatn,sans-serif',marginBottom:12,outline:'none',textAlign:'center',letterSpacing:6,fontSize:18}} />}
        <button onClick={()=>{ if(!otpSent){setOtpSent(true);alert('کد تأیید ارسال شد (نمونه: 123456)')} else {setAuth(true)} }}
          style={{background:'linear-gradient(135deg,#F59E0B,#D97706)',color:'#000',border:'none',padding:'13px',borderRadius:8,fontFamily:'Vazirmatn,sans-serif',fontWeight:700,fontSize:15,cursor:'pointer',width:'100%'}}>
          {otpSent ? 'تأیید کد' : 'دریافت کد تأیید'}
        </button>
      </div>
    </div>
  );

  const tabBtn = (t,l,ic) => (
    <button onClick={()=>setTab(t)} style={{padding:'10px 20px',borderRadius:8,border:'none',background:tab===t?'rgba(245,158,11,0.15)':'transparent',color:tab===t?'#F59E0B':'rgba(255,255,255,0.5)',fontFamily:'Vazirmatn,sans-serif',fontWeight:tab===t?700:400,fontSize:14,cursor:'pointer'}}>
      {ic} {l}
    </button>
  );

  return (
    <div style={{fontFamily:'Vazirmatn,sans-serif',direction:'rtl',background:'#0D1117',color:'#E6EDF3',minHeight:'100vh',padding:'40px 5%'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap');`}</style>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:32}}>
        <div>
          <h1 style={{fontSize:26,fontWeight:800}}>👤 پنل من</h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:14}}>خوش آمدید — {phone}</p>
        </div>
        <button onClick={()=>location.href='/order/concrete'} style={{background:'linear-gradient(135deg,#F59E0B,#D97706)',color:'#000',border:'none',padding:'12px 24px',borderRadius:8,fontFamily:'Vazirmatn,sans-serif',fontWeight:700,cursor:'pointer'}}>
          + سفارش جدید
        </button>
      </div>

      <div style={{display:'flex',gap:4,marginBottom:28,background:'rgba(255,255,255,0.03)',borderRadius:10,padding:4,width:'fit-content'}}>
        {tabBtn('orders','سفارش‌ها','📋')}
        {tabBtn('invoices','فاکتورها','🧾')}
        {tabBtn('profile','پروفایل','⚙️')}
      </div>

      {tab==='orders' && (
        <div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:28,maxWidth:600}}>
            {[['کل سفارشات','۳ سفارش'],['در جریان','۱ سفارش'],['جمع خرید','۱۱۷ میلیون']].map(([l,v])=>(
              <div key={l} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:20}}>
                <div style={{fontSize:12,color:'rgba(255,255,255,0.4)',marginBottom:6}}>{l}</div>
                <div style={{fontSize:20,fontWeight:800,color:'#F59E0B'}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {MOCK_ORDERS.map((o,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:22,display:'flex',alignItems:'center',gap:20,flexWrap:'wrap'}}>
                <div style={{flex:1,minWidth:200}}>
                  <div style={{fontWeight:700,marginBottom:4}}>{o.product}</div>
                  <div style={{fontSize:12,color:'rgba(255,255,255,0.4)'}}>📍 {o.city} — {o.date}</div>
                </div>
                <span style={{background:`${SC[o.status]}20`,color:SC[o.status],padding:'5px 12px',borderRadius:20,fontSize:12,fontWeight:600,flexShrink:0}}>{ST[o.status]}</span>
                <div style={{fontWeight:800,color:'#F59E0B',fontSize:15,flexShrink:0}}>{o.amount} ت</div>
                <button style={{padding:'7px 14px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.6)',borderRadius:7,fontSize:12,cursor:'pointer',fontFamily:'Vazirmatn,sans-serif',flexShrink:0}}>جزئیات</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='invoices' && (
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:32,textAlign:'center',color:'rgba(255,255,255,0.3)'}}>
          <div style={{fontSize:48,marginBottom:12}}>🧾</div>
          <p>فاکتورهای شما اینجا نمایش داده می‌شود</p>
        </div>
      )}

      {tab==='profile' && (
        <div style={{maxWidth:500,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:28}}>
          <h3 style={{fontSize:16,fontWeight:700,marginBottom:20}}>اطلاعات پروفایل</h3>
          {[['نام کامل',''],['شماره موبایل',phone],['شرکت',''],['شهر','']].map(([l,v])=>(
            <div key={l} style={{marginBottom:14}}>
              <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>{l}</label>
              <input defaultValue={v} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'11px 14px',color:'#E6EDF3',fontFamily:'Vazirmatn,sans-serif',fontSize:14,width:'100%',outline:'none'}} />
            </div>
          ))}
          <button style={{background:'linear-gradient(135deg,#F59E0B,#D97706)',color:'#000',border:'none',padding:'12px 24px',borderRadius:8,fontFamily:'Vazirmatn,sans-serif',fontWeight:700,fontSize:14,cursor:'pointer'}}>ذخیره تغییرات</button>
        </div>
      )}
    </div>
  );
}
