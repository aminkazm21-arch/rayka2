// این فایل template برای صفحات SEO محلی است
// برای هر شهر یک پوشه بسازید: app/beton-[city]/page.jsx

const CITIES = ['tehran','karaj','shahriar','eslamshahr','varamin','pakdasht'];
const CITIES_FA = { tehran:'تهران', karaj:'کرج', shahriar:'شهریار', eslamshahr:'اسلامشهر', varamin:'ورامین', pakdasht:'پاکدشت' };

// ===== app/beton-tehran/page.jsx =====
// export const metadata = {
//   title: 'بتن آماده تهران | قیمت و سفارش آنلاین — پارسیان مصالح',
//   description: 'خرید و سفارش آنلاین بتن آماده در تهران. بتن C20، C25، C30 با تحویل سریع. استعلام قیمت رایگان.',
//   keywords: 'بتن آماده تهران، قیمت بتن تهران، سفارش بتن تهران، بتن C25 تهران',
// };

export default function ConcreteTeheranPage() {
  const city = 'تهران';
  const citySlug = 'tehran';

  return (
    <div style={{ fontFamily:'Vazirmatn,sans-serif', direction:'rtl', background:'#0D1117', color:'#E6EDF3', padding:'60px 5%', minHeight:'100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800;900&display=swap');`}</style>

      {/* H1 با کلمه کلیدی اصلی */}
      <h1 style={{ fontSize:38, fontWeight:900, marginBottom:12 }}>
        بتن آماده <span style={{ color:'#F59E0B' }}>{city}</span>
      </h1>
      <p style={{ fontSize:17, color:'rgba(255,255,255,0.6)', marginBottom:40, lineHeight:1.8 }}>
        سفارش آنلاین بتن آماده در {city} با قیمت مناسب، کیفیت تضمین‌شده و تحویل سریع به درب پروژه. 
        تمام رده‌های بتن C15 تا C40 موجود است.
      </p>

      {/* قیمت‌ها */}
      <section style={{ marginBottom:48 }}>
        <h2 style={{ fontSize:26, fontWeight:800, marginBottom:20 }}>
          قیمت بتن در {city} — امروز
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:14 }}>
          {[
            { grade:'C20', price:'۱٬۸۰۰٬۰۰۰', use:'پی‌سازی معمولی' },
            { grade:'C25', price:'۱٬۹۵۰٬۰۰۰', use:'سازه‌های متداول' },
            { grade:'C30', price:'۲٬۱۰۰٬۰۰۰', use:'سازه‌های مهم' },
          ].map(g => (
            <div key={g.grade} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:14, padding:20 }}>
              <div style={{ fontWeight:900, fontSize:20, color:'#F59E0B' }}>بتن {g.grade}</div>
              <div style={{ fontSize:22, fontWeight:800, margin:'8px 0' }}>{g.price}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)' }}>تومان/m³ — {g.use}</div>
              <button onClick={()=>location.href='/order/concrete'} style={{ marginTop:14, padding:'9px 20px', background:'linear-gradient(135deg,#F59E0B,#D97706)', border:'none', borderRadius:7, fontFamily:'Vazirmatn,sans-serif', fontWeight:700, fontSize:13, color:'#000', cursor:'pointer', width:'100%' }}>
                سفارش ←
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* محتوای سئو */}
      <section style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:32, marginBottom:40 }}>
        <h2 style={{ fontSize:22, fontWeight:700, marginBottom:16 }}>بتن آماده در {city} — راهنمای کامل خرید</h2>
        <div style={{ color:'rgba(255,255,255,0.6)', lineHeight:1.9, fontSize:15 }}>
          <p style={{ marginBottom:16 }}>
            بتن آماده یکی از اساسی‌ترین مصالح ساختمانی در پروژه‌های عمرانی {city} است. 
            انتخاب رده مناسب بتن تأثیر مستقیمی بر کیفیت و دوام سازه دارد.
          </p>
          <h3 style={{ color:'#E6EDF3', fontWeight:700, marginBottom:10, fontSize:17 }}>چه رده بتنی انتخاب کنیم؟</h3>
          <ul style={{ paddingRight:20, marginBottom:16 }}>
            <li style={{ marginBottom:8 }}><strong style={{ color:'#F59E0B' }}>بتن C20:</strong> مناسب برای پی‌ها و دیوارهای غیرسازه‌ای</li>
            <li style={{ marginBottom:8 }}><strong style={{ color:'#F59E0B' }}>بتن C25:</strong> رایج‌ترین رده برای ساختمان‌های مسکونی</li>
            <li style={{ marginBottom:8 }}><strong style={{ color:'#F59E0B' }}>بتن C30:</strong> برای سازه‌های مهم و طبقات بالا</li>
          </ul>
          <h3 style={{ color:'#E6EDF3', fontWeight:700, marginBottom:10, fontSize:17 }}>هزینه تحویل بتن در {city}</h3>
          <p>
            هزینه حمل بتن در {city} بسته به منطقه، بین ۱۵۰٬۰۰۰ تا ۵۰۰٬۰۰۰ تومان به ازای هر سرویس (۷ m³) است.
          </p>
        </div>
      </section>

      {/* FAQ — Schema markup */}
      <section style={{ marginBottom:40 }}>
        <h2 style={{ fontSize:22, fontWeight:700, marginBottom:20 }}>سوالات متداول</h2>
        {[
          ['قیمت بتن C25 در تهران چقدر است؟', 'قیمت بتن C25 در تهران حدود ۱٬۹۵۰٬۰۰۰ تومان به ازای هر متر مکعب است. این قیمت روزانه ممکن است تغییر کند.'],
          ['حداقل سفارش بتن آماده چقدر است؟', 'حداقل سفارش ما ۵ متر مکعب (یک سرویس) است.'],
          ['آیا بتن با آزمایش و گواهی کیفیت تحویل داده می‌شود؟', 'بله، تمام بتن‌ها با گواهی آزمایشگاه معتبر و مطابق با استاندارد ملی ایران تحویل داده می‌شوند.'],
        ].map(([q, a], i) => (
          <div key={i} style={{ marginBottom:14, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, padding:'18px 22px' }}>
            <div style={{ fontWeight:700, marginBottom:8, fontSize:15 }}>❓ {q}</div>
            <div style={{ color:'rgba(255,255,255,0.6)', fontSize:14, lineHeight:1.7 }}>{a}</div>
          </div>
        ))}
      </section>

      <div style={{ textAlign:'center' }}>
        <button onClick={()=>location.href='/order/concrete'} style={{ padding:'16px 48px', background:'linear-gradient(135deg,#F59E0B,#D97706)', border:'none', borderRadius:10, fontFamily:'Vazirmatn,sans-serif', fontWeight:800, fontSize:17, color:'#000', cursor:'pointer' }}>
          🏗️ سفارش بتن در {city} ←
        </button>
      </div>

      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `بتن آماده ${city}`,
        "description": `سفارش آنلاین بتن آماده در ${city}`,
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "1800000",
          "highPrice": "2500000",
          "priceCurrency": "IRR",
          "availability": "https://schema.org/InStock"
        },
        "areaServed": { "@type": "City", "name": city }
      })}} />
    </div>
  );
}
