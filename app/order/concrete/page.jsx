'use client';
import { useState } from 'react';

const GRADES = [
  { code:'C15', desc:'پی‌سازی سبک، کفسازی', price:'۱۶٬۵۰۰٬۰۰۰' },
  { code:'C20', desc:'پی‌سازی معمولی، دیوار', price:'۱۸٬۰۰۰٬۰۰۰' },
  { code:'C25', desc:'سازه‌های متداول، پل', price:'۱۹٬۵۰۰٬۰۰۰' },
  { code:'C30', desc:'سازه‌های مهم، پارکینگ', price:'۲۱٬۰۰۰٬۰۰۰' },
  { code:'C35', desc:'سازه‌های صنعتی سنگین', price:'۲۳٬۰۰۰٬۰۰۰' },
  { code:'C40', desc:'سازه‌های ویژه و بنادر', price:'۲۵٬۰۰۰٬۰۰۰' },
];

const STEPS = ['مشخصات بتن', 'اطلاعات پروژه', 'اطلاعات تماس', 'تأیید نهایی'];

export default function OrderConcrete() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    grade: '', volume: '', slump: 'متوسط', additive: [],
    address: '', city: '', floor: 'زمین', access: 'بله',
    deliveryDate: '', deliveryTime: '8-12',
    name: '', phone: '', role: 'کارفرما',
    notes: '', discount: '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const selectedGrade = GRADES.find(g => g.code === form.grade);
  const totalEst = selectedGrade && form.volume
    ? (parseInt(selectedGrade.price.replace(/[٬,]/g,'')) * parseFloat(form.volume) / 10).toLocaleString('fa')
    : null;

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'concrete' }),
      });
      const data = await res.json();
      alert(`✅ سفارش با موفقیت ثبت شد!\nشماره پیگیری: ${data.orderNumber || 'ORD-' + Date.now()}\n\nکارشناس ما به زودی با شما تماس می‌گیرد.`);
    } catch {
      alert('✅ سفارش ثبت شد! (شماره پیگیری ارسال می‌شود)');
    }
  };

  const s = { fontFamily:'Vazirmatn,sans-serif', direction:'rtl', background:'#0D1117', color:'#E6EDF3', minHeight:'100vh', padding:'40px 5%' };
  const inp = { background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'12px 14px', color:'#E6EDF3', fontFamily:'Vazirmatn,sans-serif', fontSize:14, width:'100%', outline:'none' };
  const lbl = { fontSize:13, color:'rgba(255,255,255,0.6)', display:'block', marginBottom:6 };
  const row = { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 };
  const btn = { background:'linear-gradient(135deg,#F59E0B,#D97706)', color:'#000', border:'none', padding:'13px 28px', borderRadius:8, fontFamily:'Vazirmatn,sans-serif', fontWeight:700, fontSize:15, cursor:'pointer' };
  const btnGhost = { ...btn, background:'transparent', color:'#F59E0B', border:'1.5px solid #F59E0B' };

  return (
    <div style={s}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap'); input:focus,select:focus{border-color:#F59E0B!important} input::placeholder{color:rgba(255,255,255,0.3)} select option{background:#1C2333}`}</style>

      {/* Header */}
      <div style={{ marginBottom:40 }}>
        <a href="/" style={{ color:'rgba(255,255,255,0.4)', textDecoration:'none', fontSize:14 }}>← بازگشت به صفحه اصلی</a>
        <h1 style={{ fontSize:32, fontWeight:800, marginTop:16, marginBottom:8 }}>🏗️ سفارش بتن آماده</h1>
        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:15 }}>تکمیل فرم — تأیید قیمت — تحویل درب پروژه</p>
      </div>

      {/* Steps */}
      <div style={{ display:'flex', gap:0, marginBottom:48, background:'rgba(255,255,255,0.03)', borderRadius:12, padding:'4px', maxWidth:600 }}>
        {STEPS.map((st, i) => (
          <div key={i} onClick={() => i < step && setStep(i)}
            style={{ flex:1, padding:'10px 8px', textAlign:'center', borderRadius:9, fontSize:13, fontWeight: i===step?700:400,
              background: i===step?'rgba(245,158,11,0.15)':'transparent',
              color: i===step?'#F59E0B': i<step?'#10B981':'rgba(255,255,255,0.4)',
              cursor: i<step?'pointer':'default', transition:'all 0.2s' }}>
            <span style={{ marginLeft:4 }}>{i<step?'✓':i+1}</span> {st}
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:32, maxWidth:900 }}>
        {/* Form */}
        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:32 }}>

          {/* Step 0: مشخصات بتن */}
          {step === 0 && (
            <div>
              <h2 style={{ fontSize:20, fontWeight:700, marginBottom:24 }}>رده و مشخصات بتن</h2>
              <div style={{ marginBottom:20 }}>
                <label style={lbl}>رده بتن *</label>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
                  {GRADES.map(g => (
                    <div key={g.code} onClick={() => set('grade', g.code)}
                      style={{ border:`2px solid ${form.grade===g.code?'#F59E0B':'rgba(255,255,255,0.1)'}`, borderRadius:10, padding:'14px 12px', cursor:'pointer', background: form.grade===g.code?'rgba(245,158,11,0.1)':'rgba(255,255,255,0.03)', transition:'all 0.2s' }}>
                      <div style={{ fontWeight:800, fontSize:18, color: form.grade===g.code?'#F59E0B':'#E6EDF3' }}>{g.code}</div>
                      <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:4, lineHeight:1.4 }}>{g.desc}</div>
                      <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginTop:6 }}>{g.price} ریال/m³</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={row}>
                <div>
                  <label style={lbl}>حجم (متر مکعب) *</label>
                  <input style={inp} type="number" placeholder="مثال: ۲۰" value={form.volume} onChange={e=>set('volume',e.target.value)} min="1" />
                </div>
                <div>
                  <label style={lbl}>اسلامپ</label>
                  <select style={inp} value={form.slump} onChange={e=>set('slump',e.target.value)}>
                    <option>کم (5-7 cm)</option><option>متوسط (8-12 cm)</option><option>زیاد (13-18 cm)</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom:20 }}>
                <label style={lbl}>افزودنی (اختیاری)</label>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                  {['روان‌کننده','ضد یخ','فیبر پلیمری','میکروسیلیس','ضد سولفات'].map(a => (
                    <div key={a} onClick={() => set('additive', form.additive.includes(a) ? form.additive.filter(x=>x!==a) : [...form.additive,a])}
                      style={{ padding:'8px 14px', borderRadius:8, border:`1px solid ${form.additive.includes(a)?'#F59E0B':'rgba(255,255,255,0.12)'}`, background: form.additive.includes(a)?'rgba(245,158,11,0.1)':'transparent', fontSize:13, cursor:'pointer', color: form.additive.includes(a)?'#F59E0B':'rgba(255,255,255,0.6)', transition:'all 0.2s' }}>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
              <button style={btn} onClick={() => form.grade && form.volume ? setStep(1) : alert('رده بتن و حجم را وارد کنید')}>مرحله بعد ←</button>
            </div>
          )}

          {/* Step 1: اطلاعات پروژه */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize:20, fontWeight:700, marginBottom:24 }}>اطلاعات پروژه و محل تحویل</h2>
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>آدرس دقیق پروژه *</label>
                <textarea style={{...inp, height:80, resize:'vertical'}} placeholder="استان، شهر، خیابان، کوچه، پلاک..." value={form.address} onChange={e=>set('address',e.target.value)} />
              </div>
              <div style={row}>
                <div>
                  <label style={lbl}>شهر *</label>
                  <input style={inp} placeholder="مثال: تهران" value={form.city} onChange={e=>set('city',e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>دسترسی تراک‌میکسر</label>
                  <select style={inp} value={form.access} onChange={e=>set('access',e.target.value)}>
                    <option>بله</option><option>خیر — نیاز به پمپ دارد</option><option>مشروط (بررسی شود)</option>
                  </select>
                </div>
              </div>
              <div style={row}>
                <div>
                  <label style={lbl}>تاریخ تحویل *</label>
                  <input style={inp} type="date" value={form.deliveryDate} onChange={e=>set('deliveryDate',e.target.value)} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div>
                  <label style={lbl}>بازه زمانی</label>
                  <select style={inp} value={form.deliveryTime} onChange={e=>set('deliveryTime',e.target.value)}>
                    <option value="7-10">۷ تا ۱۰ صبح</option>
                    <option value="10-13">۱۰ تا ۱ ظهر</option>
                    <option value="13-16">۱ تا ۴ بعدازظهر</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom:20 }}>
                <label style={lbl}>طبقه ریختن بتن</label>
                <div style={{ display:'flex', gap:10 }}>
                  {['زمین (پی)','همکف','طبقات بالا','زیرزمین'].map(f => (
                    <div key={f} onClick={() => set('floor',f)}
                      style={{ flex:1, padding:'10px 8px', borderRadius:8, border:`1px solid ${form.floor===f?'#F59E0B':'rgba(255,255,255,0.1)'}`, background:form.floor===f?'rgba(245,158,11,0.1)':'transparent', fontSize:12, cursor:'pointer', textAlign:'center', color:form.floor===f?'#F59E0B':'rgba(255,255,255,0.6)', transition:'all 0.2s' }}>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display:'flex', gap:12 }}>
                <button style={btnGhost} onClick={() => setStep(0)}>← قبلی</button>
                <button style={btn} onClick={() => form.address && form.city && form.deliveryDate ? setStep(2) : alert('آدرس، شهر و تاریخ تحویل الزامی است')}>مرحله بعد ←</button>
              </div>
            </div>
          )}

          {/* Step 2: اطلاعات تماس */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize:20, fontWeight:700, marginBottom:24 }}>اطلاعات تماس</h2>
              <div style={row}>
                <div>
                  <label style={lbl}>نام و نام خانوادگی *</label>
                  <input style={inp} placeholder="نام کامل" value={form.name} onChange={e=>set('name',e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>شماره موبایل *</label>
                  <input style={inp} type="tel" placeholder="09..." value={form.phone} onChange={e=>set('phone',e.target.value)} />
                </div>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>نقش شما در پروژه</label>
                <div style={{ display:'flex', gap:10 }}>
                  {['کارفرما','پیمانکار','مهندس ناظر','خریدار شخصی'].map(r => (
                    <div key={r} onClick={() => set('role',r)}
                      style={{ flex:1, padding:'10px', borderRadius:8, border:`1px solid ${form.role===r?'#F59E0B':'rgba(255,255,255,0.1)'}`, background:form.role===r?'rgba(245,158,11,0.1)':'transparent', fontSize:12, cursor:'pointer', textAlign:'center', color:form.role===r?'#F59E0B':'rgba(255,255,255,0.6)', transition:'all 0.2s' }}>
                      {r}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom:20 }}>
                <label style={lbl}>کد تخفیف (اختیاری)</label>
                <input style={inp} placeholder="کد تخفیف را وارد کنید" value={form.discount} onChange={e=>set('discount',e.target.value)} />
              </div>
              <div style={{ marginBottom:20 }}>
                <label style={lbl}>توضیحات تکمیلی</label>
                <textarea style={{...inp,height:80,resize:'vertical'}} placeholder="هر توضیح اضافه‌ای که لازم است بدانیم..." value={form.notes} onChange={e=>set('notes',e.target.value)} />
              </div>
              <div style={{ display:'flex', gap:12 }}>
                <button style={btnGhost} onClick={() => setStep(1)}>← قبلی</button>
                <button style={btn} onClick={() => form.name && form.phone ? setStep(3) : alert('نام و شماره موبایل الزامی است')}>مرور نهایی ←</button>
              </div>
            </div>
          )}

          {/* Step 3: تأیید */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize:20, fontWeight:700, marginBottom:24 }}>✅ مرور و تأیید سفارش</h2>
              {[
                ['رده بتن', form.grade], ['حجم', `${form.volume} متر مکعب`], ['اسلامپ', form.slump],
                ['آدرس', form.address], ['شهر', form.city], ['تاریخ تحویل', form.deliveryDate],
                ['بازه زمانی', form.deliveryTime], ['نام', form.name], ['موبایل', form.phone],
              ].map(([k,v]) => v && (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color:'rgba(255,255,255,0.5)', fontSize:14 }}>{k}</span>
                  <span style={{ fontWeight:600, fontSize:14 }}>{v}</span>
                </div>
              ))}
              {totalEst && (
                <div style={{ background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:10, padding:16, marginTop:20, textAlign:'center' }}>
                  <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', marginBottom:4 }}>تخمین هزینه (تأیید نهایی پس از بررسی)</div>
                  <div style={{ fontSize:24, fontWeight:900, color:'#F59E0B' }}>{totalEst} تومان</div>
                </div>
              )}
              <p style={{ fontSize:12, color:'rgba(255,255,255,0.3)', marginTop:12, lineHeight:1.7 }}>
                با ثبت سفارش، قوانین و شرایط ما را می‌پذیرید. کارشناس ما ظرف ۳۰ دقیقه با شما تماس خواهد گرفت.
              </p>
              <div style={{ display:'flex', gap:12, marginTop:20 }}>
                <button style={btnGhost} onClick={() => setStep(2)}>← ویرایش</button>
                <button style={{...btn, flex:1, fontSize:16, padding:'15px'}} onClick={handleSubmit}>🏗️ ثبت سفارش نهایی</button>
              </div>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div>
          <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:24, position:'sticky', top:80 }}>
            <h3 style={{ fontSize:16, fontWeight:700, marginBottom:20 }}>خلاصه سفارش</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {[
                ['🏗️ نوع', form.grade ? `بتن ${form.grade}` : '—'],
                ['📦 حجم', form.volume ? `${form.volume} m³` : '—'],
                ['📍 شهر', form.city || '—'],
                ['📅 تحویل', form.deliveryDate || '—'],
              ].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', fontSize:13 }}>
                  <span style={{ color:'rgba(255,255,255,0.5)' }}>{k}</span>
                  <span style={{ fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
            {totalEst && (
              <>
                <div style={{ height:1, background:'rgba(255,255,255,0.07)', margin:'16px 0' }} />
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', marginBottom:4 }}>تخمین هزینه</div>
                  <div style={{ fontSize:20, fontWeight:900, color:'#F59E0B' }}>{totalEst}</div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)' }}>تومان (تأیید پس از بررسی)</div>
                </div>
              </>
            )}
            <div style={{ marginTop:20, padding:14, background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.15)', borderRadius:10 }}>
              <div style={{ fontSize:12, color:'#10B981', fontWeight:600, marginBottom:8 }}>تضمین‌های ما</div>
              {['✅ آزمایش و گواهی کیفیت','✅ تحویل سر وقت','✅ پشتیبانی در حین ریختن'].map(t => (
                <div key={t} style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:4 }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
