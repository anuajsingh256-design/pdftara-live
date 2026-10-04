import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

export const metadata = {
  title: "Cookie Policy -PDFTara",
  description: "Detailed information about howPDFTara uses cookies and third-party advertising.",
};

// Next.js 15: Params ab Promise hote hain
export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = locale as Locale;

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      
      {/* --- HEADER --- */}
      <Header locale={currentLocale} />

      <main className="flex-1 py-16 md:py-24 px-6 text-slate-800 font-sans selection:bg-blue-100">
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-20 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          
          {/* --- PAGE HEADER --- */}
          <header className="mb-16 border-b border-slate-100 pb-10">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
              Privacy & Data
            </div>
            <h1 className="text-4xl md:text-7xl font-[1000] text-[#0f172a] mb-6 tracking-tighter leading-tight">
              Cookie Policy.
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              Last Updated: <span className="text-slate-900 font-bold">January 18, 2026</span>
            </p>
          </header>
          
          {/* --- CONTENT SECTION --- */}
          <div className="text-lg leading-relaxed text-slate-600">
            
            <p className="mb-10 text-xl font-medium text-slate-700">
              AtPDFTara, transparency is key. This policy explains what cookies are, how we use them, and how third-party partners like Google may use them on our service.
            </p>

            {/* 1. What are Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">01.</span> What are Cookies?
              </h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
              </p>
            </div>

            {/* 2. How We Use Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">02.</span> How We Use Cookies
              </h2>
              <p className="mb-4">We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
                <li><strong>Essential Cookies:</strong> These are necessary for the website to function (e.g., remembering your language preference or theme settings).</li>
                <li><strong>Performance Cookies:</strong> These help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
                <li><strong>Advertising Cookies:</strong> These are used to make advertising messages more relevant to you.</li>
              </ul>
            </div>

            {/* 3. ADSENSE SPECIFIC SECTION (Highlighted Box) */}
            <div className="mb-12 bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">03.</span> Advertising & Google AdSense
              </h2>
              <p className="text-slate-700 mb-4 font-medium">
                We use <strong>Google AdSense</strong> to display advertisements on our website. Google uses cookies to serve ads based on your prior visits to our website or other websites on the internet.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 text-base marker:text-blue-500">
                <li>Google uses advertising cookies to enable it and its partners to serve ads to you based on your visit toPDFTara and/or other sites on the Internet.</li>
                <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="nofollow noreferrer" className="font-bold text-blue-600 underline decoration-2 underline-offset-2 hover:text-blue-800">Google Ads Settings</a>.</li>
              </ul>
            </div>

            {/* 4. Third Party */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">04.</span> Third-Party Cookies
              </h2>
              <p>
                In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service and deliver advertisements on and through the Service. These cookies are governed by the respective privacy policies of these third-party services.
              </p>
            </div>

            {/* 5. Managing Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">05.</span> Managing Your Cookies
              </h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
              </p>
            </div>

            {/* 6. Privacy Note */}
            <div className="mb-12 bg-green-50 p-8 rounded-[2rem] border border-green-100">
              <h2 className="text-xl md:text-2xl font-[900] text-green-800 mb-2 flex items-center gap-3">
                <span className="text-green-600">🔒</span> Privacy Note regarding Your Files
              </h2>
              <p className="text-green-900/80">
                It is important to reiterate that <strong>we do not use cookies to track the content of your PDF files</strong>. Your documents are processed locally on your device (Client-Side) and are never uploaded to our servers for analysis. Your file data remains 100% private.
              </p>
            </div>

            {/* 7. Changes */}
            <div className="mb-0 border-t border-slate-100 pt-10">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">07.</span> Changes to This Policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
            </div>

          </div>

        </div>
      </main>

      {/* --- FOOTER --- */}
      <Footer locale={currentLocale} />
    </div>
  );
}