import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config'; // Ye line add ki hai

export const metadata = {
  title: "Terms of Service -PDFTara",
  description: "Read our Terms and Conditions regarding the use ofPDFTara services.",
};

// Next.js 15: Params ab Promise hote hain
export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // TypeScript fix: String ko Locale type mein convert kiya
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
              Legal Agreement
            </div>
            <h1 className="text-4xl md:text-7xl font-[1000] text-[#0f172a] mb-6 tracking-tighter leading-tight">
              Terms of Service.
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              Effective Date: <span className="text-slate-900 font-bold">January 18, 2026</span>
            </p>
          </header>

          {/* --- CONTENT SECTION --- */}
          <div className="text-lg leading-relaxed text-slate-600">
            
            <p className="mb-10 text-xl font-medium text-slate-700">
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using thePDFTara website (the "Service") operated byPDFTara ("us", "we", or "our").
            </p>

            {/* 1. Acceptance */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">01.</span> Acceptance of Terms
              </h2>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </div>

            {/* 2. Description */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">02.</span> Service Description
              </h2>
              <p>
               PDFTara provides web-based PDF manipulation tools (such as merging, splitting, compressing, and converting) that operate primarily client-side via WebAssembly technology. We strive to provide accurate and efficient tools, but we do not guarantee that the Service will meet your specific requirements or be uninterrupted.
              </p>
            </div>

            {/* 3. Privacy (Highlighted) */}
            <div className="mb-12 bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">03.</span> Privacy & Security
              </h2>
              <p className="mb-4">
                Your privacy is paramount. Unlike traditional PDF tools, we operate with a strict <strong>Client-Side First</strong> policy:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
                <li>We do <strong>not</strong> upload your files to our servers for processing.</li>
                <li>All document processing happens locally within your browser using your device's resources.</li>
                <li>We do not claim any ownership over the files you process using our tools.</li>
              </ul>
            </div>

            {/* 4. User Conduct */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">04.</span> User Conduct
              </h2>
              <p className="mb-4">
                You agree to use the Service only for lawful purposes. You are strictly prohibited from:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
                <li>Using the Service to process illegal, harmful, or malicious content.</li>
                <li>Attempting to reverse engineer, decompile, or hack any part of the Service.</li>
                <li>Overloading our infrastructure (e.g., DDoS attacks) or interfering with the proper working of the Service.</li>
              </ul>
            </div>

            {/* 5. Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">05.</span> Intellectual Property
              </h2>
              <p>
                The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property ofPDFTara. ThePDFTara logo, visual design, and code are protected by copyright and other intellectual property laws.
              </p>
            </div>

            {/* 6. Third Party Ads */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">06.</span> Third-Party Ads
              </h2>
              <p className="mb-4">
                Our Service may contain links to third-party web sites or services, including advertisements served by <strong>Google AdSense</strong>, that are not owned or controlled byPDFTara.
              </p>
              <p>
                We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You acknowledge and agree thatPDFTara shall not be responsible or liable for any damage or loss caused by or in connection with the use of such content.
              </p>
            </div>

            {/* 7. Disclaimer */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">07.</span> Disclaimer
              </h2>
              <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-slate-300 italic text-slate-600">
                "The Service is provided on an 'AS IS' and 'AS AVAILABLE' basis.PDFTara makes no warranties, expressed or implied, regarding the reliability, accuracy, or availability of the Service. We disclaim all warranties of merchantability or fitness for a particular purpose."
              </div>
            </div>

            {/* 8. Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">08.</span> Limitation of Liability
              </h2>
              <p>
                In no event shallPDFTara, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </div>

            {/* 9. Changes */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">09.</span> Changes to Terms
              </h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </div>

            {/* 10. Contact */}
            <div className="mb-0 border-t border-slate-100 pt-10">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">10.</span> Contact Us
              </h2>
              <p>
                If you have any questions about these Terms, please contact us via our Contact Page.
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