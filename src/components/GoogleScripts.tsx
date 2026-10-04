"use client";

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export function GoogleScripts() {
  const pathname = usePathname();
  
  // एडमिन या डैशबोर्ड पेज पर स्क्रिप्ट लोड करने की ज़रूरत नहीं है
  const isAdmin = pathname.includes('/admin') || pathname.includes('/dashboard') || pathname.includes('/login');

  if (isAdmin) return null;

  return (
    <>
      {/* --- GOOGLE ANALYTICS --- */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-E215JB8PYT"
        strategy="afterInteractive"
        // 🚀 ब्रह्मास्त्र टिप: एनालिटिक्स को भी 'anonymous' मोड में लोड करें 
        // ताकि वो Isolation Headers से न टकराए
        crossOrigin="anonymous" 
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-E215JB8PYT');
        `}
      </Script>
      
      {/* 🚀 AdSense यहाँ से हट चुका है और layout.tsx में जा चुका है, यह एकदम सही फैसला है! */}
    </>
  );
}