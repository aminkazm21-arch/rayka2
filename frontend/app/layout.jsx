import './globals.css';

export const metadata = {
  title: 'پارسیان مصالح — مرجع آنلاین مصالح ساختمانی',
  description: 'سفارش آنلاین بتن آماده، شن و ماسه، سنگ‌شکن و حمل مصالح با قیمت شفاف',
  keywords: 'بتن آماده، شن و ماسه، مصالح ساختمانی، سفارش آنلاین بتن',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ fontFamily: 'Vazirmatn, sans-serif', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
