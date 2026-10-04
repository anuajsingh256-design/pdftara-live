import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import FAQPageClient from './FAQPageClient';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

// --- 🏆 SEO MAGIC: Har language ke liye unique FAQ Title ---
export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;

  // 9 Bhashayon ke liye Unique Titles
  const seoData: Record<string, { title: string; desc: string }> = {
    en: { title: "FAQ - Help Center", desc: "Find answers to common questions about PDFTara features, security, and usage." },
    ja: { title: "よくある質問 - ヘルプセンター", desc: "PDFTaraの機能、セキュリティ、使用方法に関するよくある質問への回答をご覧ください。" },
    ko: { title: "자주 묻는 질문 - 도움말 센터", desc: "PDFTara 기능, 보안 및 사용법에 대한 질문과 답변을 확인하세요." },
    es: { title: "Preguntas frecuentes - Centro de ayuda", desc: "Encuentre respuestas a preguntas comunes sobre las funciones, la seguridad y el uso de PDFTara." },
    fr: { title: "FAQ - Centre d'aide", desc: "Trouvez des réponses aux questions courantes sur les fonctionnalités, la sécurité et l'utilisation de PDFTara." },
    de: { title: "FAQ - Hilfe-Center", desc: "Finden Sie Antworten auf häufig gestellte Fragen zu den Funktionen, der Sicherheit und der Nutzung von PDFTara." },
    zh: { title: "常见问题解答 - 帮助中心", desc: "查找有关 PDFTara 功能、安全和使用的常见问题的解答。" },
    pt: { title: "FAQ - Central de Ajuda", desc: "Encontre respostas para perguntas comuns sobre os recursos, segurança e uso do PDFTara." },
    // Agar koi locale reh jaye toh English wala template use hoga
  };

  const currentSeo = seoData[locale] || seoData['en'];

  return {
    title: `${currentSeo.title} | PDFTara`,
    description: currentSeo.desc,
    alternates: {
      canonical: `https://www.pdftara.com/${locale}/faq/`,
    }
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <FAQPageClient locale={locale as Locale} />;
}