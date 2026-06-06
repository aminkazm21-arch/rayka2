'use client';
import { useState, useEffect } from 'react';

const PRICES = [
  { name: 'بتن C20', price: '۱۸٬۰۰۰٬۰۰۰', unit: 'm³', change: '+۲.۱٪', up: true },
  { name: 'بتن C25', price: '۱۹٬۵۰۰٬۰۰۰', unit: 'm³', change: '—', up: null },
  { name: 'بتن C30', price: '۲۱٬۰۰۰٬۰۰۰', unit: 'm³', change: '+۱.۵٪', up: true },
  { name: 'شن درشت', price: '۴٬۵۰۰٬۰۰۰', unit: 'm³', change: '-۰.۸٪', up: false },
  { name: 'ماسه شسته', price: '۳٬۸۰۰٬۰۰۰', unit: 'm³', change: '—', up: null },
  { name: 'سنگ شکسته', price: '۵٬۵۰۰٬۰۰۰', unit: 'تن', change: '+۳.۰٪', up: true },
];

const SERVICES = [
  { icon: '🏗️', title: 'بتن آماده', desc: 'رده C15 تا C40، تحویل درب پروژه', href: '/order/concrete' },
  { icon: '⛏️', title: 'سنگ‌شکن', desc: 'شکست و دانه‌بندی انواع سنگ', href: '/order/stone' },
  { icon: '🪨', title: 'شن و ماسه', desc: 'شسته و طبیعی، گواهی آزمایشگاه', href: '/order/sand' },
  { icon: '🚛', title: 'حمل مصالح', desc: 'ناوگان مجهز، پوشش ۱۵۰ کیلومتر', href: '/transport' },
  { icon: '🧮', title: 'محاسبه‌گر', desc: 'برآورد دقیق حجم و هزینه', href: '/calculator' },
  { icon: '📊', title: 'مشاوره فنی', desc: 'کارشناسان مجرب در کنار شما', href: '/consult' },
];

export default function HomePage() {
  const [tickerPos, setTickerPos] = useState(0);
  const [form, setForm] = useState({ type: '', volume: '', city: '', phone: '' });
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'سلام! من دستیار هوشمند هستم. چطور می‌تونم کمکتون کنم؟ 🏗️' }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerPos(p => p - 1);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleQuote = (e) => {
    e.preventDefault();
    alert(`درخواست استعلام ثبت شد!\nنوع: ${form.type}\nحجم: ${form.volume} m³\nشهر: ${form.city}\nشماره: ${form.phone}\n\nکارشناس ما در کمتر از ۳۰ دقیقه با شما تماس خواهد گرفت.`);
  };

  const sendChat = async () => {
    if (!chatMsg.trim()) return;
    const userMsg = chatMsg;
    setMessages(m => [...m, { role: 'user', text: userMsg }]);
    setChatMsg('');
    setLoading(true);
    try {
      const res = await fetch('/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, user_id: 'web_' + Date.now(), channel: 'web' })
      });
      const data = await res.json();
      setMessages(m => [...m, { role: 'ai', text: data.reply }]);
    } catch {
      setMessages(m => [...m, { role: 'ai', text: 'متأسفم، مشکل فنی پیش آمد. لطفاً دوباره امتحان کنید.' }]);
    }
    setLoading(false);
  };

  const tickerWidth = PRICES.length * 280;

  return (
    <div style={{ fontFamily: 'Vazirmatn, sans-serif', direction: 'rtl', background: '#0D1117', color: '#E6EDF3', minHeight: '100vh' }}>

      {/* فونت */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D1117; }
        .btn-primary { background: linear-gradient(135deg, #F59E0B, #D97706); color: #000; border: none; padding: 12px 28px; border-radius: 8px; font-family: Vazirmatn, sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.2s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(245,158,11,0.4); }
        .btn-ghost { background: transparent; color: #F59E0B; border: 1.5px solid #F59E0B; padding: 10px 22px; border-radius: 8px; font-family: Vazirmatn, sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s; }
        .btn-ghost:hover { background: rgba(245,158,11,0.1); }
        .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; transition: all 0.3s; }
        .card:hover { background: rgba(255,255,255,0.07); border-color: rgba(245,158,11,0.3); transform: translateY(-4px); }
        input, select { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; padding: 11px 14px; color: #E6EDF3; font-family: Vazirmatn, sans-serif; font-size: 14px; width: 100%; outline: none; transition: border 0.2s; }
        input:focus, select:focus { border-color: #F59E0B; }
        input::placeholder { color: rgba(255,255,255,0.3); }
        select option { background: #1C2333; }
        .ticker-wrap { overflow: hidden; background: rgba(245,158,11,0.08); border-top: 1px solid rgba(245,158,11,0.2); border-bottom: 1px solid rgba(245,158,11,0.2); padding: 10px 0; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fade-in { animation: fadeInUp 0.6s ease forwards; }
      `}</style>

      {/* HEADER */}
      <header style={{ background: 'rgba(13,17,23,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#F59E0B,#D97706)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏗️</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#F59E0B' }}>پارسیان مصالح</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>مرجع آنلاین مصالح ساختمانی</div>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 28, fontSize: 14 }}>
          {[['قیمت‌ها','/prices'],['سفارش','/order/concrete'],['محاسبه‌گر','/calculator'],['پروژه‌ها','/projects'],['تماس','/contact']].map(([t,h]) => (
            <a key={h} href={h} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}
               onMouseEnter={e=>e.target.style.color='#F59E0B'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.7)'}>{t}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="tel:02100000000" style={{ color: '#F59E0B', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>📞 ۰۲۱-۰۰۰۰۰۰۰۰</a>
          <button className="btn-primary" onClick={()=>location.href='/order/concrete'}>سفارش سریع</button>
        </div>
      </header>

      {/* PRICE TICKER */}
      <div className="ticker-wrap">
        <div style={{ display: 'flex', width: `${tickerWidth * 2}px`, transform: `translateX(${tickerPos % tickerWidth}px)`, transition: 'none', gap: 0 }}>
          {[...PRICES, ...PRICES].map((p, i) => (
            <div key={i} style={{ width: 280, display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px', borderRight: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{p.name}</span>
              <span style={{ fontWeight: 700, fontSize: 13, color: '#E6EDF3' }}>{p.price}</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>ریال/{p.unit}</span>
              {p.up !== null && <span style={{ fontSize: 11, color: p.up ? '#10B981' : '#EF4444' }}>{p.change}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section style={{ padding: '80px 5%', display: 'flex', alignItems: 'center', gap: 60, minHeight: '80vh', position: 'relative', overflow: 'hidden' }}>
        {/* Background decoration */}
        <div style={{ position: 'absolute', top: -100, left: -100, width: 600, height: 600, background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -200, right: -200, width: 800, height: 800, background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Hero Text */}
        <div style={{ flex: 1, maxWidth: 560 }} className="fade-in">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, color: '#F59E0B', fontWeight: 500 }}>آنلاین — تحویل در ۲۴ ساعت</span>
          </div>

          <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.3, marginBottom: 20 }}>
            مرجع آنلاین<br />
            <span style={{ color: '#F59E0B' }}>مصالح ساختمانی</span><br />
            <span style={{ fontSize: 32, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>در منطقه شما</span>
          </h1>

          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 36 }}>
            بتن آماده، شن و ماسه، سنگ‌شکن و حمل مصالح با قیمت شفاف،<br />کیفیت تضمین‌شده و تحویل سریع به درب پروژه شما.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }} onClick={()=>location.href='/order/concrete'}>
              ثبت سفارش آنلاین ←
            </button>
            <button className="btn-ghost" onClick={()=>location.href='/calculator'}>
              🧮 محاسبه هزینه
            </button>
            <a href="https://t.me/YOUR_BOT" style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(0,136,204,0.15)', border:'1px solid rgba(0,136,204,0.3)', color:'#39C0ED', padding:'12px 22px', borderRadius:8, textDecoration:'none', fontSize:14, fontWeight:600 }}>
              🤖 ربات تلگرام
            </a>
          </div>

          <div style={{ display: 'flex', gap: 40, marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[['۵۰۰+','مشتری راضی'],['۱۲۰+','پروژه تکمیل‌شده'],['۸','سال تجربه']].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#F59E0B' }}>{n}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Form */}
        <div style={{ flex: '0 0 380px' }}>
          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>استعلام قیمت فوری</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>در کمتر از ۳۰ دقیقه پاسخ دریافت کنید</p>

            <form onSubmit={handleQuote} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>نوع مصالح</label>
                <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} required>
                  <option value="">انتخاب کنید...</option>
                  <option>بتن آماده C20</option>
                  <option>بتن آماده C25</option>
                  <option>بتن آماده C30</option>
                  <option>شن و ماسه</option>
                  <option>سنگ شکسته</option>
                  <option>حمل مصالح</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>حجم (متر مکعب)</label>
                <input type="number" placeholder="مثال: ۲۰" value={form.volume} onChange={e=>setForm({...form,volume:e.target.value})} required min="1" />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>شهر / منطقه</label>
                <input type="text" placeholder="مثال: تهران، کرج" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} required />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>شماره موبایل</label>
                <input type="tel" placeholder="۰۹۱۲..." value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required pattern="09[0-9]{9}" />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: 8, padding: '14px', fontSize: 15 }}>
                دریافت قیمت رایگان ←
              </button>
            </form>

            <div style={{ display: 'flex', gap: 16, marginTop: 20, padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.06)', justifyContent: 'center' }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 4 }}>
                ✅ بدون تعهد
              </span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 4 }}>
                🔒 اطلاعات محفوظ
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: '80px 5%', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>خدمات ما</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>همه چیز برای پروژه ساختمانی شما، در یک مکان</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {SERVICES.map(s => (
            <a key={s.title} href={s.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card" style={{ padding: 28, cursor: 'pointer' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{s.desc}</p>
                <div style={{ marginTop: 20, color: '#F59E0B', fontSize: 13, fontWeight: 600 }}>سفارش ←</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* PRICES TABLE */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>قیمت روز مصالح</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>بروزرسانی: {new Date().toLocaleDateString('fa-IR')}</p>
          </div>
          <a href="/prices" style={{ color: '#F59E0B', textDecoration: 'none', fontSize: 14, fontWeight: 600, border: '1px solid rgba(245,158,11,0.3)', padding: '8px 20px', borderRadius: 8 }}>مشاهده همه قیمت‌ها</a>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(245,158,11,0.08)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {['محصول','قیمت (ریال)','واحد','تغییر','سفارش'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'right', fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRICES.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                    onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.02)'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{ padding: '16px 20px', fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: '16px 20px', color: '#F59E0B', fontWeight: 700, fontSize: 15 }}>{p.price}</td>
                  <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>هر {p.unit}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ color: p.up === true ? '#10B981' : p.up === false ? '#EF4444' : 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 600 }}>{p.change}</span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <button className="btn-primary" style={{ padding: '7px 18px', fontSize: 13 }} onClick={()=>location.href='/order/concrete'}>سفارش</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 12, textAlign: 'center' }}>
          ⚠️ قیمت‌ها تخمینی است. قیمت نهایی پس از بررسی پروژه تأیید می‌شود.
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0A0D13', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '48px 5% 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#F59E0B,#D97706)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏗️</div>
              <span style={{ fontWeight: 800, color: '#F59E0B' }}>پارسیان مصالح</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>مرجع آنلاین سفارش مصالح ساختمانی. بتن آماده، شن و ماسه، سنگ‌شکن و حمل مصالح با کیفیت تضمین‌شده.</p>
          </div>
          {[
            ['خدمات', ['بتن آماده','شن و ماسه','سنگ‌شکن','حمل مصالح','مشاوره']],
            ['لینک‌ها', ['قیمت روز','محاسبه‌گر','ثبت سفارش','پروژه‌ها','بلاگ']],
            ['تماس', ['📞 ۰۲۱-۰۰۰۰۰۰۰۰','📱 واتساپ','🤖 تلگرام','📧 info@site.ir','📍 تهران، ایران']],
          ].map(([title, items]) => (
            <div key={title}>
              <h4 style={{ fontWeight: 700, marginBottom: 16, color: 'rgba(255,255,255,0.8)' }}>{title}</h4>
              <ul style={{ listStyle: 'none' }}>
                {items.map(item => (
                  <li key={item} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}
                       onMouseEnter={e=>e.target.style.color='#F59E0B'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.4)'}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>© ۱۴۰۴ پارسیان مصالح — تمام حقوق محفوظ است</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>طراحی و توسعه: سیستم هوشمند فروش</span>
        </div>
      </footer>

      {/* AI CHAT WIDGET */}
      <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 999 }}>
        {chatOpen && (
          <div style={{ position: 'absolute', bottom: 70, left: 0, width: 340, background: '#161B22', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
            <div style={{ background: 'linear-gradient(135deg,#1C2333,#161B22)', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#F59E0B,#D97706)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🤖</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>دستیار هوشمند</div>
                <div style={{ fontSize: 11, color: '#10B981' }}>● آنلاین</div>
              </div>
              <button onClick={()=>setChatOpen(false)} style={{ marginRight: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>
            <div style={{ height: 280, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-start' : 'flex-end' }}>
                  <div style={{ maxWidth: '80%', background: m.role === 'user' ? 'rgba(255,255,255,0.06)' : 'rgba(245,158,11,0.15)', border: `1px solid ${m.role === 'user' ? 'rgba(255,255,255,0.08)' : 'rgba(245,158,11,0.2)'}`, borderRadius: 12, padding: '10px 14px', fontSize: 13, lineHeight: 1.6 }}>{m.text}</div>
                </div>
              ))}
              {loading && <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>در حال تایپ...</div>}
            </div>
            <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8 }}>
              <input type="text" placeholder="سوال خود را بنویسید..." value={chatMsg} onChange={e=>setChatMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendChat()} style={{ flex: 1, padding: '10px 14px', fontSize: 13 }} />
              <button onClick={sendChat} className="btn-primary" style={{ padding: '10px 16px', flexShrink: 0 }}>ارسال</button>
            </div>
          </div>
        )}
        <button onClick={()=>setChatOpen(o=>!o)} style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#F59E0B,#D97706)', border: 'none', cursor: 'pointer', fontSize: 24, boxShadow: '0 4px 20px rgba(245,158,11,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }}
           onMouseEnter={e=>e.target.style.transform='scale(1.1)'} onMouseLeave={e=>e.target.style.transform='scale(1)'}>
          🤖
        </button>
      </div>

      {/* WhatsApp Button */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999 }}>
        <a href="https://wa.me/989120000000" target="_blank" rel="noopener noreferrer"
           style={{ width: 56, height: 56, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 26, boxShadow: '0 4px 20px rgba(37,211,102,0.4)', transition: 'transform 0.2s' }}
           onMouseEnter={e=>e.currentTarget.style.transform='scale(1.1)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
          💬
        </a>
      </div>
    </div>
  );
}
