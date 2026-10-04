import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

// Required for static export
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 🛑 ADSENSE BOT KO ROKO (Bandwidth Bachao)
      {
        // Google AdSense bot ka asli naam yahi hai
        userAgent: 'Mediapartners-Google',
        disallow: [
          '/libreoffice-wasm/', 
          '/pymupdf-wasm/', 
          '/fonts/',           // Fonts bhi bandwidth khaate hain
          '/pdfjs-annotation-viewer/' // Extra assets
        ],
      },
      // ✅ BAKI SAB KE LIYE (Googlebot, Bingbot, etc. allowed hain)
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', 
          '/admin/',
          // Hum chahte hain ki search bots WASM na crawl karein (SEO mein kaam nahi aate)
          '/libreoffice-wasm/',
          '/pymupdf-wasm/'
        ],
      },
    ],
    // Ensure siteConfig.url is "https://www.pdftara.com"
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}