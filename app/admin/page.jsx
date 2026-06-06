'use client';
import { useState, useEffect } from 'react';

const MOCK_STATS = {
  todayOrders: 12, weekOrders: 67, monthRevenue: '۴۸۵٬۰۰۰٬۰۰۰', totalCustomers: 534,
  pendingOrders: 4, inDelivery: 3, completedToday: 5,
};

const MOCK_ORDERS = [
  { id:'ORD-1404-0142', customer:'احمد رضایی', product:'بتن C25 — 20m³', city:'تهران', status:'pending', amount:'۳۹٬۰۰۰٬۰۰۰', time:'۲ ساعت پیش' },
  { id:'ORD-1404-0141', customer:'محمد کریمی', product:'شن درشت — 15m³', city:'کرج', status:'dispatched', amount:'۶٬۷۵۰٬۰۰۰', time:'۴ ساعت پیش' },
  { id:'ORD-1404-0140', customer:'شرکت عمران سازه', product:'بتن C30 — 50m³', city:'تهران', status:'delivered', amount:'۱۰۵٬۰۰۰٬۰۰۰', time:'۶ ساعت پیش' },
  { id:'ORD-1404-0139', customer:'حسین نوری', product:'ماسه شسته — 8m³', city:'شهریار', status:'confirmed', amount:'۳٬۰۴۰٬۰۰۰', time:'دیروز' },
  { id:'ORD-1404-0138', customer:'پیمانکار البرز', product:'بتن C25 — 35m³', city:'کرج', status:'in_production', amount:'۶۸٬۲۵۰٬۰۰۰', time:'دیروز' },
];

const STATUS_LABELS = { pending:'در انتظار', confirmed:'تأیید شده', in_production:'در تولید', dispatched:'ارسال شده', delivered:'تحویل داده شده', cancelled:'لغو شده' };
const STATUS_COLORS = { pending:'#F59E0B', confirmed:'#3B82F6', in_production:'#8B5CF6', dispatched:'#06B6D4', delivered:'#10B981', cancelled:'#EF4444' };

const MOCK_CUSTOMERS = [
  { name:'شرکت عمران سازه', phone:'021-88001234', city:'تهران', segment:'vip', orders:23, total:'۸۵۰٬۰۰۰٬۰۰۰', lastOrder:'۲ روز پیش' },
  { name:'پیمانکار البرز', phone:'026-33002345', city:'کرج', segment:'loyal', orders:15, total:'۴۲۰٬۰۰۰٬۰۰۰', lastOrder:'دیروز' },
  { name:'احمد رضایی', phone:'09121234567', city:'تهران', segment:'active', orders:7, total:'۱۸۰٬۰۰۰٬۰۰۰', lastOrder:'امروز' },
  { name:'محمد کریمی', phone:'09351234567', city:'کرج', segment:'prospect', orders:2, total:'۲۵٬۰۰۰٬۰۰۰', lastOrder:'یک هفته پیش' },
];

const SEG_COLOR = { vip:'#F59E0B', loyal:'#10B981', active:'#3B82F6', prospect:'#6B7280', at_risk:'#EF4444' };
const SEG_LABEL = { vip:'VIP', loyal:'وفادار', active:'فعال', prospect:'احتمالی', at_risk:'در خطر' };

export default function AdminPanel() {
  const [tab, setTab] = useState('dashboard');
  const [prices, setPrices] = useState({ 'بتن C20':'18000000','بتن C25':'19500000','بتن C30':'21000000','شن درشت':'4500000','ماسه شسته':'3800000' });
  const [smsTemplate, setSmsTemplate] = useState('سلام {name} عزیز\nقیمت بتن در {city} بروز شد.\nجزئیات: https://yoursite.ir/prices');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ user:'', pass:'' });

  if (!loggedIn) return (
    <div style={{ fontFamily:'Vazirmatn,sans-serif', direction:'rtl', background:'#0D1117', color:'#E6EDF3', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap'); input{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:12px 14px;color:#E6EDF3;font-family:Vazirmatn,sans-serif;font-size:14px;width:100%;outline:none;margin-bottom:14px} input:focus{border-color:#F59E0B!important}`}</style>
      <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, padding:48, width:360, textAlign:'center' }}>
        <div style={{ fontSize:40, marginBottom:16 }}>🏗️</div>
        <h2 style={{ fontSize:22, fontWeight:800, marginBottom:8 }}>پنل مدیریت</h2>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, marginBottom:28 }}>پارسیان مصالح</p>
        <input placeholder="نام کاربری" value={loginForm.user} onChange={e=>setLoginForm({...loginForm,user:e.target.value})} />
        <input type="password" placeholder="رمز عبور" value={loginForm.pass} onChange={e=>setLoginForm({...loginForm,pass:e.target.value})} onKeyDown={e=>e.key==='Enter'&&(loginForm.user&&loginForm.pass?setLoggedIn(true):alert('اطلاعات را وارد کنید'))} />
        <button onClick={()=>loginForm.user&&loginForm.pass?setLoggedIn(true):alert('اطلاعات را وارد کنید')}
          style={{ background:'linear-gradient(135deg,#F59E0B,#D97706)', color:'#000', border:'none', padding:'13px', borderRadius:8, fontFamily:'Vazirmatn,sans-serif', fontWeight:700, fontSize:15, cursor:'pointer', width:'100%' }}>
          ورود به پنل
        </button>
      </div>
    </div>
  );

  const s = { fontFamily:'Vazirmatn,sans-serif', direction:'rtl', background:'#0D1117', color:'#E6EDF3', minHeight:'100vh', display:'flex' };
  const tabBtn = (t, label, icon) => (
    <button onClick={()=>setTab(t)} style={{ display:'flex', alignItems:'center', gap:10, width:'100%', padding:'11px 16px', background: tab===t?'rgba(245,158,11,0.12)':'transparent', border:'none', borderRadius:8, color: tab===t?'#F59E0B':'rgba(255,255,255,0.5)', fontFamily:'Vazirmatn,sans-serif', fontWeight: tab===t?700:400, fontSize:14, cursor:'pointer', textAlign:'right', transition:'all 0.2s', marginBottom:2 }}>
      <span style={{ fontSize:16 }}>{icon}</span>{label}
    </button>
  );

  return (
    <div style={s}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap'); input,select,textarea{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:10px 14px;color:#E6EDF3;font-family:Vazirmatn,sans-serif;font-size:13px;outline:none} input:focus,select:focus,textarea:focus{border-color:#F59E0B!important} select option{background:#1C2333}`}</style>

      {/* Sidebar */}
      <div style={{ width:220, background:'#0A0D13', borderLeft:'1px solid rgba(255,255,255,0.07)', padding:'20px 12px', flexShrink:0, display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 8px 24px' }}>
          <div style={{ width:32, height:32, background:'linear-gradient(135deg,#F59E0B,#D97706)', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🏗️</div>
          <div>
            <div style={{ fontWeight:800, fontSize:13, color:'#F59E0B' }}>پارسیان</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.3)' }}>پنل مدیریت</div>
          </div>
        </div>
        {tabBtn('dashboard','داشبورد','📊')}
        {tabBtn('orders','سفارش‌ها','📋')}
        {tabBtn('customers','مشتریان','👥')}
        {tabBtn('prices','مدیریت قیمت','💰')}
        {tabBtn('sms','کمپین پیامک','📱')}
        {tabBtn('drivers','رانندگان','🚛')}
        {tabBtn('reports','گزارشات','📈')}
        <div style={{ flex:1 }} />
        <button onClick={()=>setLoggedIn(false)} style={{ display:'flex', alignItems:'center', gap:10, width:'100%', padding:'10px 16px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:8, color:'#EF4444', fontFamily:'Vazirmatn,sans-serif', fontSize:13, cursor:'pointer' }}>
          🚪 خروج
        </button>
      </div>

      {/* Main */}
      <div style={{ flex:1, padding:'28px 32px', overflowY:'auto' }}>

        {/* Dashboard */}
        {tab === 'dashboard' && (
          <div>
            <h1 style={{ fontSize:24, fontWeight:800, marginBottom:6 }}>داشبورد</h1>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, marginBottom:28 }}>خلاصه عملکرد امروز</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:32 }}>
              {[
                { label:'سفارش امروز', val:MOCK_STATS.todayOrders, icon:'📋', color:'#3B82F6' },
                { label:'درآمد ماه', val:MOCK_STATS.monthRevenue, icon:'💰', color:'#10B981', small:true },
                { label:'در انتظار', val:MOCK_STATS.pendingOrders, icon:'⏳', color:'#F59E0B' },
                { label:'مشتریان', val:MOCK_STATS.totalCustomers, icon:'👥', color:'#8B5CF6' },
              ].map(c=>(
                <div key={c.label} style={{ background:'rgba(255,255,255,0.04)', border:`1px solid rgba(255,255,255,0.07)`, borderRadius:14, padding:'20px 22px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div>
                      <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', marginBottom:8 }}>{c.label}</div>
                      <div style={{ fontSize: c.small?18:28, fontWeight:800, color:c.color }}>{c.val}</div>
                    </div>
                    <div style={{ fontSize:24 }}>{c.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize:17, fontWeight:700, marginBottom:16 }}>آخرین سفارش‌ها</h2>
            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, overflow:'hidden' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ background:'rgba(255,255,255,0.04)' }}>
                    {['شماره','مشتری','محصول','شهر','وضعیت','مبلغ (تومان)','زمان'].map(h=>(
                      <th key={h} style={{ padding:'12px 16px', textAlign:'right', fontSize:12, color:'rgba(255,255,255,0.4)', fontWeight:600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ORDERS.map((o,i)=>(
                    <tr key={i} style={{ borderTop:'1px solid rgba(255,255,255,0.04)' }}
                        onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.02)'}
                        onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <td style={{ padding:'13px 16px', fontSize:12, color:'rgba(255,255,255,0.5)', fontFamily:'monospace' }}>{o.id}</td>
                      <td style={{ padding:'13px 16px', fontSize:13, fontWeight:600 }}>{o.customer}</td>
                      <td style={{ padding:'13px 16px', fontSize:12, color:'rgba(255,255,255,0.6)' }}>{o.product}</td>
                      <td style={{ padding:'13px 16px', fontSize:13 }}>{o.city}</td>
                      <td style={{ padding:'13px 16px' }}>
                        <span style={{ background:`${STATUS_COLORS[o.status]}20`, color:STATUS_COLORS[o.status], padding:'4px 10px', borderRadius:20, fontSize:11, fontWeight:600 }}>{STATUS_LABELS[o.status]}</span>
                      </td>
                      <td style={{ padding:'13px 16px', color:'#F59E0B', fontWeight:700, fontSize:13 }}>{o.amount}</td>
                      <td style={{ padding:'13px 16px', fontSize:12, color:'rgba(255,255,255,0.4)' }}>{o.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders */}
        {tab === 'orders' && (
          <div>
            <h1 style={{ fontSize:24, fontWeight:800, marginBottom:24 }}>مدیریت سفارش‌ها</h1>
            <div style={{ display:'flex', gap:10, marginBottom:20 }}>
              {['همه','در انتظار','تأیید شده','در تولید','ارسال شده','تحویل داده شده'].map(f=>(
                <button key={f} style={{ padding:'7px 16px', borderRadius:20, border:'1px solid rgba(255,255,255,0.12)', background:'transparent', color:'rgba(255,255,255,0.6)', fontFamily:'Vazirmatn,sans-serif', fontSize:12, cursor:'pointer' }}>{f}</button>
              ))}
            </div>
            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, overflow:'hidden' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ background:'rgba(255,255,255,0.04)' }}>
                    {['شماره','مشتری','محصول','شهر','وضعیت','مبلغ','اقدام'].map(h=>(
                      <th key={h} style={{ padding:'12px 16px', textAlign:'right', fontSize:12, color:'rgba(255,255,255,0.4)', fontWeight:600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ORDERS.map((o,i)=>(
                    <tr key={i} style={{ borderTop:'1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding:'13px 16px', fontSize:12, color:'rgba(255,255,255,0.5)', fontFamily:'monospace' }}>{o.id}</td>
                      <td style={{ padding:'13px 16px', fontWeight:600 }}>{o.customer}</td>
                      <td style={{ padding:'13px 16px', fontSize:12, color:'rgba(255,255,255,0.6)' }}>{o.product}</td>
                      <td style={{ padding:'13px 16px' }}>{o.city}</td>
                      <td style={{ padding:'13px 16px' }}>
                        <span style={{ background:`${STATUS_COLORS[o.status]}20`, color:STATUS_COLORS[o.status], padding:'4px 10px', borderRadius:20, fontSize:11, fontWeight:600 }}>{STATUS_LABELS[o.status]}</span>
                      </td>
                      <td style={{ padding:'13px 16px', color:'#F59E0B', fontWeight:700 }}>{o.amount}</td>
                      <td style={{ padding:'13px 16px' }}>
                        <button style={{ padding:'5px 12px', background:'rgba(59,130,246,0.2)', border:'1px solid rgba(59,130,246,0.3)', color:'#60A5FA', borderRadius:6, fontSize:11, cursor:'pointer', fontFamily:'Vazirmatn,sans-serif', marginLeft:6 }}>مشاهده</button>
                        <button style={{ padding:'5px 12px', background:'rgba(16,185,129,0.2)', border:'1px solid rgba(16,185,129,0.3)', color:'#34D399', borderRadius:6, fontSize:11, cursor:'pointer', fontFamily:'Vazirmatn,sans-serif' }}>تأیید</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers */}
        {tab === 'customers' && (
          <div>
            <h1 style={{ fontSize:24, fontWeight:800, marginBottom:24 }}>مدیریت مشتریان</h1>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:16 }}>
              {MOCK_CUSTOMERS.map((c,i)=>(
                <div key={i} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:22 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:15 }}>{c.name}</div>
                      <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', marginTop:3 }}>{c.phone}</div>
                    </div>
                    <span style={{ background:`${SEG_COLOR[c.segment]}20`, color:SEG_COLOR[c.segment], padding:'4px 10px', borderRadius:20, fontSize:11, fontWeight:700 }}>{SEG_LABEL[c.segment]}</span>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    {[['📍 شهر',c.city],['📋 سفارشات',c.orders+' سفارش'],['💰 کل خرید',c.total+' ت'],['🕐 آخرین',c.lastOrder]].map(([k,v])=>(
                      <div key={k} style={{ fontSize:12 }}>
                        <div style={{ color:'rgba(255,255,255,0.4)', marginBottom:2 }}>{k}</div>
                        <div style={{ fontWeight:600 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:'flex', gap:8, marginTop:16 }}>
                    <button style={{ flex:1, padding:'8px', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', color:'#F59E0B', borderRadius:7, fontSize:12, cursor:'pointer', fontFamily:'Vazirmatn,sans-serif' }}>پروفایل</button>
                    <button style={{ flex:1, padding:'8px', background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.2)', color:'#60A5FA', borderRadius:7, fontSize:12, cursor:'pointer', fontFamily:'Vazirmatn,sans-serif' }}>ارسال پیام</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prices */}
        {tab === 'prices' && (
          <div>
            <h1 style={{ fontSize:24, fontWeight:800, marginBottom:8 }}>مدیریت قیمت‌ها</h1>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, marginBottom:28 }}>تغییرات بلافاصله در سایت و ربات اعمال می‌شوند</p>
            <div style={{ maxWidth:500 }}>
              {Object.entries(prices).map(([name, price])=>(
                <div key={name} style={{ display:'flex', alignItems:'center', gap:16, marginBottom:14, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, padding:'16px 20px' }}>
                  <div style={{ flex:1, fontWeight:600 }}>{name}</div>
                  <input type="number" value={price} onChange={e=>setPrices(p=>({...p,[name]:e.target.value}))} style={{ width:150, textAlign:'center' }} />
                  <span style={{ fontSize:12, color:'rgba(255,255,255,0.4)' }}>ریال/m³</span>
                </div>
              ))}
              <button onClick={()=>alert('قیمت‌ها ذخیره شدند!')}
                style={{ background:'linear-gradient(135deg,#F59E0B,#D97706)', color:'#000', border:'none', padding:'13px 32px', borderRadius:8, fontFamily:'Vazirmatn,sans-serif', fontWeight:700, fontSize:15, cursor:'pointer', marginTop:8 }}>
                💾 ذخیره قیمت‌ها
              </button>
            </div>
          </div>
        )}

        {/* SMS Campaign */}
        {tab === 'sms' && (
          <div>
            <h1 style={{ fontSize:24, fontWeight:800, marginBottom:8 }}>کمپین پیامک</h1>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, marginBottom:28 }}>ارسال انبوه پیامک به مشتریان</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
              <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:24 }}>
                <h3 style={{ fontSize:16, fontWeight:700, marginBottom:18 }}>تنظیم کمپین</h3>
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:13, color:'rgba(255,255,255,0.5)', display:'block', marginBottom:6 }}>نام کمپین</label>
                  <input style={{ width:'100%' }} placeholder="مثال: بروزرسانی قیمت تیر ماه" />
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:13, color:'rgba(255,255,255,0.5)', display:'block', marginBottom:6 }}>فیلتر مخاطبین</label>
                  <select style={{ width:'100%', marginBottom:8 }}>
                    <option>همه مشتریان</option><option>VIP</option><option>وفادار</option><option>فعال</option><option>بدون خرید ۴۵+ روز</option>
                  </select>
                  <select style={{ width:'100%' }}>
                    <option>همه شهرها</option><option>تهران</option><option>کرج</option><option>شهریار</option>
                  </select>
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:13, color:'rgba(255,255,255,0.5)', display:'block', marginBottom:6 }}>متن پیامک <span style={{ color:'rgba(255,255,255,0.3)' }}>(از {'{name}'} و {'{city}'} استفاده کنید)</span></label>
                  <textarea rows={5} value={smsTemplate} onChange={e=>setSmsTemplate(e.target.value)} style={{ width:'100%', resize:'vertical', lineHeight:1.7 }} />
                  <div style={{ fontSize:11, color: smsTemplate.length > 160?'#EF4444':'rgba(255,255,255,0.3)', marginTop:4 }}>{smsTemplate.length} / ۱۶۰ کاراکتر</div>
                </div>
                <div style={{ marginBottom:20 }}>
                  <label style={{ fontSize:13, color:'rgba(255,255,255,0.5)', display:'block', marginBottom:6 }}>زمان ارسال</label>
                  <select style={{ width:'100%' }}>
                    <option>همین الان</option><option>فردا ساعت ۹ صبح</option><option>زمان دلخواه</option>
                  </select>
                </div>
                <div style={{ display:'flex', gap:10 }}>
                  <button onClick={()=>alert('پیش‌نمایش به شماره شما ارسال شد')} style={{ flex:1, padding:'11px', background:'transparent', border:'1px solid rgba(245,158,11,0.3)', color:'#F59E0B', borderRadius:8, fontFamily:'Vazirmatn,sans-serif', fontSize:13, cursor:'pointer' }}>آزمایش</button>
                  <button onClick={()=>alert('کمپین تنظیم شد!')} style={{ flex:2, padding:'11px', background:'linear-gradient(135deg,#F59E0B,#D97706)', color:'#000', border:'none', borderRadius:8, fontFamily:'Vazirmatn,sans-serif', fontWeight:700, fontSize:14, cursor:'pointer' }}>🚀 ارسال کمپین</button>
                </div>
              </div>
              <div>
                <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:24, marginBottom:16 }}>
                  <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>پیش‌نمایش پیامک</h3>
                  <div style={{ background:'rgba(0,0,0,0.3)', borderRadius:12, padding:20, fontFamily:'Vazirmatn,sans-serif', fontSize:14, lineHeight:1.8, color:'rgba(255,255,255,0.8)', border:'1px solid rgba(255,255,255,0.06)', whiteSpace:'pre-wrap' }}>
                    {smsTemplate.replace('{name}','علی رضایی').replace('{city}','تهران')}
                  </div>
                </div>
                <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:24 }}>
                  <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>آمار آخرین کمپین</h3>
                  {[['ارسال شده','۱٬۱۴۰','#3B82F6'],['تحویل داده شده','۱٬۰۸۰','#10B981'],['خطا در ارسال','۶۰','#EF4444']].map(([l,v,c])=>(
                    <div key={l} style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                      <span style={{ fontSize:13, color:'rgba(255,255,255,0.5)' }}>{l}</span>
                      <span style={{ fontWeight:700, color:c }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports */}
        {tab === 'reports' && (
          <div>
            <h1 style={{ fontSize:24, fontWeight:800, marginBottom:24 }}>گزارشات</h1>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
              {[
                { title:'گزارش فروش هفتگی', desc:'فروش ۷ روز گذشته به تفکیک محصول', icon:'📊' },
                { title:'مشتریان جدید', desc:'مشتریان ثبت‌نام‌شده این ماه', icon:'👥' },
                { title:'عملکرد رانندگان', desc:'تحویل‌های انجام‌شده توسط هر راننده', icon:'🚛' },
                { title:'محصولات پرفروش', desc:'رتبه‌بندی محصولات بر اساس درآمد', icon:'🏆' },
                { title:'نرخ تبدیل', desc:'درصد استعلام‌هایی که به سفارش تبدیل شدند', icon:'📈' },
                { title:'گزارش پیامک', desc:'نرخ تحویل و تبدیل کمپین‌های پیامک', icon:'📱' },
              ].map(r=>(
                <div key={r.title} onClick={()=>alert('گزارش در حال آماده‌سازی...')} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:24, cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(245,158,11,0.3)'; e.currentTarget.style.background='rgba(255,255,255,0.05)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.background='rgba(255,255,255,0.03)'}}>
                  <div style={{ fontSize:28, marginBottom:12 }}>{r.icon}</div>
                  <div style={{ fontWeight:700, marginBottom:6 }}>{r.title}</div>
                  <div style={{ fontSize:13, color:'rgba(255,255,255,0.4)' }}>{r.desc}</div>
                  <div style={{ fontSize:12, color:'#F59E0B', marginTop:14 }}>مشاهده گزارش ←</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(tab === 'drivers') && (
          <div>
            <h1 style={{ fontSize:24, fontWeight:800, marginBottom:24 }}>مدیریت رانندگان</h1>
            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:24, textAlign:'center', color:'rgba(255,255,255,0.3)' }}>
              اطلاعات رانندگان از API بارگذاری می‌شود
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
