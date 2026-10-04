import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { localeConfig, type Locale, locales } from '@/lib/i18n/config';
import { generateHomeMetadata } from '@/lib/seo';
import { fontVariables } from '@/lib/fonts';
import { SkipLink } from '@/components/common/SkipLink';
import { GoogleScripts } from '@/components/GoogleScripts'; 

// CSS Path fix
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

// ✅ Sirf wahi languages jinki messages/*.json file maujood hai
// Title 60 character se kam, description lagbhag 120-155 character
const seoData: Record<string, { title: string; desc: string }> = {
  en: {
    title: 'PDFTara - Free & Private PDF Tools Online',
    desc: 'Merge, split, compress and convert PDFs free in your browser. Files never leave your device, so your documents stay 100% private.',
  },
  es: {
    title: 'PDFTara - Herramientas PDF Gratis y Privadas',
    desc: 'Une, divide, comprime y convierte PDF gratis en tu navegador. Tus archivos nunca salen de tu dispositivo y siempre se mantienen privados.',
  },
  fr: {
    title: 'PDFTara - Outils PDF Gratuits et Privés',
    desc: 'Fusionnez, divisez, compressez et convertissez vos PDF gratuitement dans le navigateur. Vos fichiers ne quittent jamais votre appareil.',
  },
  de: {
    title: 'PDFTara - Kostenlose und private PDF-Tools',
    desc: 'PDFs kostenlos im Browser zusammenführen, teilen, komprimieren und konvertieren. Ihre Dateien verlassen nie Ihr Gerät – 100 % privat.',
  },
  it: {
    title: 'PDFTara - Strumenti PDF Gratuiti e Privati',
    desc: 'Unisci, dividi, comprimi e converti PDF gratis nel browser. I tuoi file non lasciano mai il dispositivo e restano sempre privati.',
  },
  pt: {
    title: 'PDFTara - Ferramentas PDF Grátis e Privadas',
    desc: 'Una, divida, comprima e converta PDFs de graça no navegador. Seus arquivos nunca saem do seu dispositivo e ficam 100% privados.',
  },
  pl: {
    title: 'PDFTara - Darmowe i prywatne narzędzia PDF',
    desc: 'Łącz, dziel, kompresuj i konwertuj pliki PDF za darmo w przeglądarce. Twoje pliki nigdy nie opuszczają urządzenia i pozostają prywatne.',
  },
  ro: {
    title: 'PDFTara - Instrumente PDF Gratuite și Private',
    desc: 'Îmbină, împarte, comprimă și convertește PDF-uri gratuit în browser. Fișierele tale nu părăsesc niciodată dispozitivul și rămân private.',
  },
  vi: {
    title: 'PDFTara - Công cụ PDF miễn phí và riêng tư',
    desc: 'Ghép, tách, nén và chuyển đổi PDF miễn phí ngay trên trình duyệt. Tệp của bạn không rời khỏi thiết bị, luôn riêng tư 100%.',
  },
  id: {
    title: 'PDFTara - Alat PDF Gratis dan Privat',
    desc: 'Gabungkan, pisahkan, kompres, dan konversi PDF gratis di browser. File Anda tidak pernah meninggalkan perangkat dan tetap 100% privat.',
  },
  ja: {
    title: 'PDFTara - 無料でプライベートなPDFツール',
    desc: 'ブラウザでPDFの結合・分割・圧縮・変換が無料で可能。ファイルは端末から外に出ないので、安全でプライバシーも守られます。',
  },
  ko: {
    title: 'PDFTara - 무료 개인정보 보호 PDF 도구',
    desc: '브라우저에서 PDF를 무료로 병합, 분할, 압축, 변환하세요. 파일이 기기 밖으로 나가지 않아 100% 안전합니다.',
  },
  zh: {
    title: 'PDFTara - 免费私密的 PDF 在线工具',
    desc: '在浏览器中免费合并、拆分、压缩和转换 PDF。文件不会离开您的设备,完全保护隐私。',
  },
  'zh-TW': {
    title: 'PDFTara - 免費私密的 PDF 線上工具',
    desc: '在瀏覽器中免費合併、拆分、壓縮和轉換 PDF。檔案不會離開您的裝置,完全保護隱私。',
  },
  ar: {
    title: 'PDFTara - أدوات PDF مجانية وخاصة',
    desc: 'ادمج وقسّم وضغط وحوّل ملفات PDF مجانًا في متصفحك. ملفاتك لا تغادر جهازك أبدًا وتبقى خاصة بالكامل.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const metadata = await generateHomeMetadata(validLocale);

  const currentSeo = seoData[validLocale] || seoData['en'];

  // hreflang: sirf seoData wali languages + x-default
  const languages: Record<string, string> = Object.keys(seoData).reduce(
    (acc, l) => {
      acc[l] = `https://www.pdftara.com/${l}/`;
      return acc;
    },
    {} as Record<string, string>
  );
  languages['x-default'] = 'https://www.pdftara.com/en/';

  return {
    ...metadata,
    metadataBase: new URL('https://www.pdftara.com/'),
    title: { default: currentSeo.title, template: `%s` },
    description: currentSeo.desc,
    alternates: {
      // Individual tool/blog pages apne page.tsx me apna full canonical override karenge
      canonical: `https://www.pdftara.com/${validLocale}/`,
      languages,
    },
    verification: {
      other: {
        'naver-site-verification': 'a7f730f5caea31ec4ce5bcb4ebc46ea1a51d1f5a',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      ...metadata.openGraph,
      type: 'website',
      title: currentSeo.title,
      description: currentSeo.desc,
      url: `https://www.pdftara.com/${validLocale}/`,
      siteName: 'PDFTara',
      images: [{ url: '/og-image-home.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const direction = localeConfig[locale as Locale]?.direction || 'ltr';

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'PDFTara Free PDF Tools',
    'url': 'https://www.pdftara.com/',
    'applicationCategory': 'MultimediaApplication',
    'operatingSystem': 'Web, Windows, macOS, Android, iOS',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '18540', 'bestRating': '5', 'worstRating': '1' }
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'PDFTara',
    'url': 'https://www.pdftara.com/',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://www.pdftara.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang={locale} dir={direction} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* WASM Fix - All multithreading support */}
        <script src="/coi-serviceworker.js"></script>
        
        {/* Google AdSense - Global */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4129411618696895"
          crossOrigin="anonymous"
        ></script>

        {/* AdSense verification */}
        <meta name="google-adsense-account" content="ca-pub-4129411618696895" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <GoogleScripts />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SkipLink targetId="main-content">Skip to main content</SkipLink>
          <div className="relative flex min-h-screen flex-col">
            {/* Main content wrapper */}
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}