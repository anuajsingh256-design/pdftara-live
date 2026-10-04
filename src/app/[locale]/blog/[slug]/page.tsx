// JSON import hata diya aur Supabase import kiya
import { supabase } from "../../../../lib/supabase";
import { notFound } from "next/navigation";
import { addCommentAction } from "@/actions/addComment";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { type Locale } from '@/lib/i18n/config';

// Types define kiye
type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

// --- 1. SEO MAGIC: Generate Metadata ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  
  // Supabase se metadata fetch karna
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  // SAFETY CHECK
  if (!post) {
    return {
      title: "Article Not Found",
      description: "This article is no longer available."
    };
  }

  const p = post as any;
  const content = p.content || ""; 
  const description = content.replace(/<[^>]*>/g, '').substring(0, 160) + "...";
  const imageUrl = p.image || "https://www.pdftara.com/og-default.jpg";

  return {
    title: p.title,
    description: description,
    alternates: {
      canonical: `https://www.pdftara.com/${resolvedParams.locale}/blog/${slug}`,
    },
    openGraph: {
      title: p.title,
      description: description,
      type: 'article',
      publishedTime: p.date,
      authors: ['PDFTara Team'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: p.title,
        }
      ],
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
export default async function ArticleView(props: { params: Promise<{ slug: string; locale: string }> }) {
  
  const resolvedParams = await props.params;
  const slug = decodeURIComponent(resolvedParams.slug);
  
  // Supabase se article fetch karna
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  const currentLocale = resolvedParams.locale as Locale;

  if (!post) {
    console.log("❌ Post nahi mila -> 404 Triggered");
    return notFound();
  }

  const p = post as any;
  const shareUrl = `https://www.pdftara.com/${resolvedParams.locale}/blog/${slug}`;
  const safeContent = p.content || "";

  // Schema Markup
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

  async function handleCommentSubmit(formData: FormData) {
    'use server'
    const text = formData.get('comment') as string;
    if (text && text.trim() !== "") {
      await addCommentAction(slug, text);
    }
  }

  // --- SAFETY FOR COMMENTS ---
  // Agar p.comments null ya undefined hai, toh usey empty array [] maan lo
  const safeComments = Array.isArray(p.comments) ? p.comments : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- HEADER --- */}
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

          {/* --- ARTICLE CONTENT --- */}
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
               <a href={`https://api.whatsapp.com/send?text=${p.title} - ${shareUrl}`} target="_blank" className="bg-[#25D366] text-white px-8 py-3 rounded-xl text-xs hover:translate-y-[-4px] transition-all shadow-xl shadow-green-100">WHATSAPP</a>
               <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" className="bg-[#1877F2] text-white px-8 py-3 rounded-xl text-xs hover:translate-y-[-4px] transition-all shadow-xl shadow-blue-100">FACEBOOK</a>
             </div>
          </div>

          {/* Comments Section */}
          <div className="mt-28">
             <div className="flex items-center gap-4 mb-10">
                <h3 className="text-3xl font-[1000] text-[#0f172a] tracking-tight">Discussion ({safeComments.length})</h3>
                <div className="flex-1 h-[1px] bg-slate-100"></div>
             </div>
             
             <form action={handleCommentSubmit} className="bg-slate-50 p-8 md:p-14 rounded-[3.5rem] border border-slate-100 shadow-inner mb-16">
               <textarea 
                 name="comment"
                 required
                 placeholder="Write your comment here..." 
                 className="w-full p-8 rounded-[2rem] border-2 border-slate-200 bg-white h-48 mb-8 outline-none focus:border-blue-500 transition-all text-xl resize-none shadow-sm"
               ></textarea>
               
               <div className="flex justify-end">
                 <button type="submit" className="bg-[#0f172a] text-white px-16 py-5 rounded-full font-black hover:bg-blue-600 transition-all hover:shadow-2xl active:scale-95 uppercase tracking-widest text-[10px]">
                   Post Comment 🚀
                 </button>
               </div>
             </form>

             <div className="space-y-6">
               {safeComments.length > 0 ? (
                 safeComments.slice().reverse().map((c: any, i: number) => (
                   <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
                     <div className="flex justify-between items-center mb-4">
                        <span className="font-black text-blue-600 text-sm italic">@Guest_User</span>
                        <span className="text-[10px] text-slate-300 font-bold uppercase">
                          {c.date ? new Date(c.date).toLocaleString('en-US', {
                             year: 'numeric',
                             month: 'short',
                             day: 'numeric',
                             hour: '2-digit',
                             minute: '2-digit'
                          }) : 'Just now'}
                        </span>
                     </div>
                     <p className="text-lg text-slate-700 leading-relaxed font-medium">"{c.text}"</p>
                   </div>
                 ))
               ) : (
                 <p className="text-center text-slate-300 italic py-10">Be the first to share your thoughts!</p>
               )}
             </div>
          </div>

        </div>
      </main>

      {/* --- FOOTER --- */}
      <Footer locale={currentLocale} />
    </div>
  );
}