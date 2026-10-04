import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';

export const metadata = {
  title: "Disclaimer -PDFTara",
  description: "Disclaimer regarding the use ofPDFTara tools and services.",
};

// Next.js 15: Params ab Promise hote hain
export default async function DisclaimerPage({ params }: { params: Promise<{ locale: string }> }) {
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
              Legal Notice
            </div>
            <h1 className="text-4xl md:text-7xl font-[1000] text-[#0f172a] mb-6 tracking-tighter leading-tight">
              Disclaimer.
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              Last Updated: <span className="text-slate-900 font-bold">January 18, 2026</span>
            </p>
          </header>

          {/* --- CONTENT SECTION --- */}
          <div className="text-lg leading-relaxed text-slate-600">
            
            <p className="mb-10 text-xl font-medium text-slate-700">
              The information provided byPDFTara ("we," "us," or "our") on this website is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
            </p>

            {/* 1. General Disclaimer */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">01.</span> General Disclaimer
              </h2>
              <p>
                The use of our PDF tools is at your own risk. While we strive to ensure that our tools function correctly and accurately, software bugs or errors can occur.PDFTara shall not be held liable for any loss of data, corruption of files, or any other damage resulting from the use of our services.
              </p>
            </div>

            {/* 2. No Professional Advice */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">02.</span> No Professional Advice
              </h2>
              <p>
                The tools and content onPDFTara are not intended to be a substitute for professional legal, financial, or technical advice. Always seek the advice of a qualified professional with any questions you may have regarding your specific documents. We do not guarantee that the converted or processed documents will be legally binding or compliant with specific regional standards.
              </p>
            </div>

            {/* 3. External Links Disclaimer */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">03.</span> External Links & Ads
              </h2>
              <p className="mb-4">
                The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties (including Google AdSense advertisements). Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
              </p>
              <div className="bg-orange-50 p-6 rounded-2xl border-l-4 border-orange-300 text-orange-900 text-base">
                <strong>Important:</strong> We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site or any website or feature linked in any banner or other advertising.
              </div>
            </div>

            {/* 4. Earnings Disclaimer */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">04.</span> Earnings Disclaimer
              </h2>
              <p>
               PDFTara may participate in affiliate marketing programs or display advertisements (via Google AdSense) for which we receive a commission or revenue. This does not affect the price you pay for any third-party services, nor does it influence our editorial content or tool functionality.
              </p>
            </div>

            {/* 5. Errors and Omissions */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">05.</span> Errors and Omissions
              </h2>
              <p>
                While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources,PDFTara is not responsible for any errors or omissions, or for the results obtained from the use of this information. All information in this site is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information.
              </p>
            </div>

            {/* 6. Contact */}
            <div className="mb-0 border-t border-slate-100 pt-10">
              <h2 className="text-2xl md:text-3xl font-[900] text-[#0f172a] mb-4 flex items-center gap-3">
                <span className="text-blue-600 opacity-30">06.</span> Contact Us
              </h2>
              <p>
                Should you have any feedback, comments, requests for technical support, or other inquiries, please contact us by visiting our Contact page.
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