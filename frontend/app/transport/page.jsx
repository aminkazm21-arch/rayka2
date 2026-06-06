'use client';
import { useState } from 'react';

const fmt = (n) => n.toLocaleString('fa-IR');

export default function TransportPage() {
  const [form, setForm] = useState({ material:'', weight:'', origin:'', destination:'', date:'', name:'', phone:'', notes:'' });
  const [step, setStep] = useState(0);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const inp = { background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'12px 14px', color:'#E6EDF3', fontFamily:'Vazirmatn,sans-serif', fontSize:14, width:'100%', outline:'none' };
  const btn = { background:'linear-gradient(135deg,#F59E0B,#D97706)', color:'#000', border:'none', padding:'13px 28px', borderRadius:8, fontFamily:'Vazirmatn,sans-serif', fontWeight:700, fontSize:15, cursor:'pointer' };

  if (step === 2) return (
    <div style={{fontFamily:'Vazirmatn,sans-serif',direction:'rtl',background:'#0D1117',color:'#E6EDF3',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap');`}</style>
      <div style={{textAlign:'center',maxWidth:400}}>
        <div style={{fontSize:72,marginBottom:20}}>✅</div>
        <h2 style={{fontSize:26,fontWeight:800,marginBottom:12}}>درخواست ثبت شد</h2>
        <p style={{color:'rgba(255,255,255,0.5)',lineHeight:1.8,marginBottom:28}}>درخواست حمل شما ثبت شد.<br/>کارشناس ما حداکثر طی ۳۰ دقیقه با شما تماس می‌گیرد.</p>
        <button style={btn} onClick={()=>location.href='/'}>بازگشت به صفحه اصلی</button>
      </div>
    </div>
  );

  return (
    <div style={{fontFamily:'Vazirmatn,sans-serif',direction:'rtl',background:'#0D1117',color:'#E6EDF3',minHeight:'100vh',padding:'40px 5%'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap'); input:focus,select:focus,textarea:focus{border-color:#F59E0B!important} input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.3)} select option{background:#1C2333}`}</style>
      <a href="/" style={{color:'rgba(255,255,255,0.4)',fontSize:14,textDecoration:'none'}}>← صفحه اصلی</a>
      <h1 style={{fontSize:32,fontWeight:900,marginTop:16,marginBottom:8}}>🚛 درخواست حمل مصالح</h1>
      <p style={{color:'rgba(255,255,255,0.5)',marginBottom:36}}>ناوگان مجهز، پوشش ۱۵۰ کیلومتر، تحویل به‌موقع</p>

      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:32,maxWidth:900}}>
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:32}}>
          
          {step === 0 && (
            <>
              <h3 style={{fontWeight:700,fontSize:18,marginBottom:22}}>مشخصات محموله</h3>
              <div style={{marginBottom:14}}>
                <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>نوع مصالح *</label>
                <select style={inp} value={form.material} onChange={e=>set('material',e.target.value)}>
                  <option value="">انتخاب کنید...</option>
                  <option>بتن آماده</option><option>شن و ماسه</option><option>سنگ شکسته</option>
                  <option>آجر و بلوک</option><option>گچ و سیمان</option><option>سایر</option>
                </select>
              </div>
              <div style={{marginBottom:14}}>
                <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>وزن یا حجم *</label>
                <input style={inp} placeholder="مثال: ۱۰ تن یا ۱۵ متر مکعب" value={form.weight} onChange={e=>set('weight',e.target.value)} />
              </div>
              <div style={{marginBottom:14}}>
                <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>مبدأ (آدرس یا شهر) *</label>
                <input style={inp} placeholder="محل بارگیری..." value={form.origin} onChange={e=>set('origin',e.target.value)} />
              </div>
              <div style={{marginBottom:14}}>
                <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>مقصد (آدرس پروژه) *</label>
                <input style={inp} placeholder="محل تخلیه..." value={form.destination} onChange={e=>set('destination',e.target.value)} />
              </div>
              <div style={{marginBottom:22}}>
                <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>تاریخ مورد نیاز</label>
                <input style={inp} type="date" value={form.date} onChange={e=>set('date',e.target.value)} min={new Date().toISOString().split('T')[0]} />
              </div>
              <button style={btn} onClick={()=>form.material&&form.weight&&form.origin&&form.destination?setStep(1):alert('فیلدهای ستاره‌دار را کامل کنید')}>مرحله بعد ←</button>
            </>
          )}

          {step === 1 && (
            <>
              <h3 style={{fontWeight:700,fontSize:18,marginBottom:22}}>اطلاعات تماس</h3>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                <div>
                  <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>نام *</label>
                  <input style={inp} placeholder="نام کامل" value={form.name} onChange={e=>set('name',e.target.value)} />
                </div>
                <div>
                  <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>موبایل *</label>
                  <input style={inp} type="tel" placeholder="09..." value={form.phone} onChange={e=>set('phone',e.target.value)} />
                </div>
              </div>
              <div style={{marginBottom:22}}>
                <label style={{fontSize:13,color:'rgba(255,255,255,0.5)',display:'block',marginBottom:6}}>توضیحات</label>
                <textarea style={{...inp,height:80,resize:'vertical'}} placeholder="هر اطلاعات اضافه‌ای..." value={form.notes} onChange={e=>set('notes',e.target.value)} />
              </div>
              <div style={{display:'flex',gap:12}}>
                <button style={{...btn,background:'transparent',color:'#F59E0B',border:'1.5px solid #F59E0B'}} onClick={()=>setStep(0)}>← قبلی</button>
                <button style={btn} onClick={()=>form.name&&form.phone?setStep(2):alert('نام و موبایل الزامی است')}>ثبت درخواست ←</button>
              </div>
            </>
          )}
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          {[
            {icon:'🚛',title:'انواع ناوگان',items:['تراک‌میکسر ۷ و ۱۰ متری','کامیون ۱۰ تا ۲۵ تن','وانت و نیسان برای بارهای کوچک']},
            {icon:'📍',title:'پوشش جغرافیایی',items:['تهران و حومه','کرج و البرز','شهریار و اسلامشهر','تا ۱۵۰ کیلومتر']},
            {icon:'⏰',title:'زمان پاسخ‌دهی',items:['استعلام: زیر ۳۰ دقیقه','تحویل: ۲۴ تا ۴۸ ساعت','فوری: با هماهنگی']},
          ].map(c=>(
            <div key={c.title} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:22}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                <span style={{fontSize:22}}>{c.icon}</span>
                <span style={{fontWeight:700}}>{c.title}</span>
              </div>
              {c.items.map(i=><div key={i} style={{fontSize:13,color:'rgba(255,255,255,0.5)',marginBottom:6,paddingRight:10,borderRight:'2px solid rgba(245,158,11,0.3)'}}>• {i}</div>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
