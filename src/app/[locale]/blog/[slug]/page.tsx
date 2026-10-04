import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommentSection } from "@/components/blog/CommentSection";
import { locales, type Locale } from '@/lib/i18n/config';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

// --- 0. STATIC EXPORT FIX: build ke time saare blog pages banao ---
export const dynamicParams = false;

export async function generateStaticParams() {
  const { data } = await supabase.from('posts').select('slug');
  const slugs = (data ?? []).map((p: { slug: string }) => p.slug);

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

// --- 1. SEO: Generate Metadata ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!post) {
    return {
      title: "Article Not Found",
      description: "This article is no longer available."
    };
  }

  const p = post as any;
  const content = p.content || "";
  const plain = content.replace(/<[^>]*>/g, '').trim();
  const description = plain.length > 155 ? plain.substring(0, 155) + "..." : plain;
  const imageUrl = p.image || "https://www.pdftara.com/og-default.jpg";

  return {
    title: p.title,
    description: description,
    alternates: {
      canonical: `https://www.pdftara.com/${resolvedParams.locale}/blog/${slug}/`,
    },
    openGraph: {
      title: p.title,
      description: description,
      type: 'article',
      publishedTime: p.date,
      authors: ['PDFTara Team'],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: p.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: description,
      images: [imageUrl],
    },
  };
}

// --- 2. MAIN PAGE COMPONENT ---
export default async function ArticleView(props: Props) {
  const resolvedParams = await props.params;
  const slug = decodeURIComponent(resolvedParams.slug);

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  const currentLocale = resolvedParams.locale as Locale;

  if (!post) {
    return notFound();
  }

  const p = post as any;
  const shareUrl = `https://www.pdftara.com/${resolvedParams.locale}/blog/${slug}/`;
  const safeContent = p.content || "";

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    image: p.image || "https://www.pdftara.com/logo.png",
    datePublished: p.date,
    author: {
      '@type': 'Organization',
      name: 'PDFTara Team',
    },
    description: safeContent.replace(/<[^>]*>/g, '').substring(0, 160),
  };

  const safeComments = Array.isArray(p.comments) ? p.comments : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">

      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header locale={currentLocale} />

      <main className="flex-1 text-slate-900 pb-24 selection:bg-blue-100">
        <div className="max-w-4xl mx-auto pt-16 px-6">

          {/* Article Header */}
          <header className="mb-12 border-b border-slate-100 pb-10">
            <div className="mb-6">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-sm font-black text-[10px] uppercase tracking-[0.3em]">
                Premium Article
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-[1000] mb-6 leading-[1.1] text-[#0f172a] tracking-tight">
              {p.title}
            </h1>
            <div className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-3">
              <span className="w-12 h-[1px] bg-slate-200"></span>
              Published on {new Date(p.date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </div>
          </header>

          {/* Article Content */}
          <div
            className="prose prose-xl md:prose-2xl prose-slate max-w-none 
            prose-headings:text-[#0f172a] prose-headings:font-black prose-headings:tracking-tighter
            prose-p:text-slate-700 prose-p:leading-[1.9]
            prose-strong:text-black prose-strong:font-black
            prose-a:text-blue-700 prose-a:font-extrabold prose-a:underline decoration-blue-300 decoration-2 underline-offset-4 hover:prose-a:text-blue-900 transition-all
            prose-img:w-full prose-img:rounded-[2.5rem] prose-img:shadow-2xl 
            prose-img:mx-auto prose-img:my-20 prose-img:border-[12px] prose-img:border-white 
            prose-img:ring-1 prose-img:ring-slate-200"
            dangerouslySetInnerHTML={{ __html: safeContent }}
          />

          {/* Share Section */}
          <div className="mt-28 py-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="font-black text-[#0f172a] text-xl uppercase tracking-tighter italic underline decoration-blue-600 decoration-4">Share this story:</p>
            <div className="flex flex-wrap gap-4 font-black">
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(p.title + ' - ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-8 py-3 rounded-xl text-xs hover:translate-y-[-4px] transition-all shadow-xl shadow-green-100">WHATSAPP</a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] text-white px-8 py-3 rounded-xl text-xs hover:translate-y-[-4px] transition-all shadow-xl shadow-blue-100">FACEBOOK</a>
            </div>
          </div>

          {/* Comments Section (client component) */}
          <CommentSection slug={slug} initialComments={safeComments} />

        </div>
      </main>

      <Footer locale={currentLocale} />
    </div>
  );
}
