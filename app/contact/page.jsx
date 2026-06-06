'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({name:'',phone:'',subject:'',message:''});
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/contact', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
    } catch {}
    setSent(true);
  };

  const inp = {background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'12px 14px',color:'#E6EDF3',fontFamily:'Vazirmatn,sans-serif',fontSize:14,width:'100%',outline:'none'};

  return (
    <div style={{fontFamily:'Vazirmatn,sans-serif',direction:'rtl',background:'#0D1117',color:'#E6EDF3',minHeight:'100vh',padding:'40px 5%'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap'); input:focus,select:focus,textarea:focus{border-color:#F59E0B!important} input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.3)}`}</style>
      <a href="/" style={{color:'rgba(255,255,255,0.4)',fontSize:14,textDecoration:'none'}}>← صفحه اصلی</a>
      <h1 style={{fontSize:32,fontWeight:900,marginTop:16,marginBottom:32}}>📞 تماس با ما</h1>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,maxWidth:900}}>
        <div>
          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:32}}>
            {sent ? (
              <div style={{textAlign:'center',padding:'40px 0'}}>
                <div style={{fontSize:48,marginBottom:16}}>✅</div>
                <h3 style={{fontSize:20,fontWeight:700,marginBottom:8}}>پیام شما ارسال شد</h3>
                <p style={{color:'rgba(255,255,255,0.5)'}}>در اسرع وقت پاسخ خواهیم داد</p>
              </div>
            ) : (
              <>
                <h3 style={{fontSize:18,fontWeight:700,marginBottom:24}}>ارسال پیام</h3>
                <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:14}}>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                    <div>
                      <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>نام *</label>
                      <input style={inp} placeholder="نام شما" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
                    </div>
                    <div>
                      <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>موبایل *</label>
                      <input style={inp} type="tel" placeholder="09..." value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required />
                    </div>
                  </div>
                  <div>
                    <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>موضوع</label>
                    <select style={inp} value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>
                      <option value="">انتخاب کنید...</option>
                      <option>استعلام قیمت</option><option>ثبت سفارش</option>
                      <option>شکایت</option><option>همکاری</option><option>سایر</option>
                    </select>
                  </div>
                  <div>
                    <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>پیام *</label>
                    <textarea style={{...inp,height:120,resize:'vertical'}} placeholder="پیام خود را بنویسید..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required />
                  </div>
                  <button type="submit" style={{background:'linear-gradient(135deg,#F59E0B,#D97706)',color:'#000',border:'none',padding:'13px',borderRadius:8,fontFamily:'Vazirmatn,sans-serif',fontWeight:700,fontSize:15,cursor:'pointer'}}>
                    ارسال پیام ←
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {[
            {icon:'📞',title:'تلفن مستقیم',val:'۰۲۱-۰۰۰۰۰۰۰۰',sub:'شنبه تا پنجشنبه ۷ تا ۱۷'},
            {icon:'💬',title:'واتساپ',val:'۰۹۱۲-۰۰۰۰۰۰۰',sub:'پاسخ سریع در ساعات کاری'},
            {icon:'🤖',title:'ربات تلگرام',val:'@parsian_materials_bot',sub:'۲۴ ساعته، ۷ روز هفته'},
            {icon:'📍',title:'آدرس',val:'تهران، جاده مخصوص کرج',sub:'کیلومتر ۱۵، کارخانه بتن'},
          ].map(c=>(
            <div key={c.title} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:22,display:'flex',alignItems:'center',gap:16}}>
              <div style={{width:48,height:48,background:'rgba(245,158,11,0.12)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>{c.icon}</div>
              <div>
                <div style={{fontSize:13,color:'rgba(255,255,255,0.4)',marginBottom:4}}>{c.title}</div>
                <div style={{fontWeight:700,marginBottom:2}}>{c.val}</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,0.3)'}}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
