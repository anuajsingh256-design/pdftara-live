'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MessageSquare, 
  Send, 
  CheckCircle, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Users, 
  ShieldCheck, 
  Briefcase,
  UserCheck,
  Award,
  BadgeCheck
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { type Locale } from '@/lib/i18n/config';

interface ContactPageClientProps {
  locale: Locale;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPageClient({ locale }: ContactPageClientProps) {
  const t = useTranslations('contactPage');
  const tCommon = useTranslations('common');
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulating form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[hsl(var(--color-primary)/0.05)] to-transparent py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--color-foreground))] mb-6">
                Get in Touch
              </h1>
              <p className="text-lg text-[hsl(var(--color-muted-foreground))]">
                Have questions regarding our PDF tools, privacy policy, or need technical support? 
                We are here to help. Reach out to our professional team directly.
              </p>
            </div>
          </div>
        </section>

        {/* --- TEAM & CONTACT DETAILS SECTION --- */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              
              {/* 1. CEO Section */}
              <Card className="p-8 text-center flex flex-col items-center hover:shadow-lg transition-shadow border-t-4 border-t-blue-600">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-600 border-2 border-blue-100">
                  <UserCheck className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--color-foreground))] mb-4">CEO</h3>
                <div>
                  <p className="text-[hsl(var(--color-foreground))] font-bold text-lg">Mr. Amar Singh</p>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">CEO of PDFTara</p>
                </div>
              </Card>

              {/* 2. Owner & Developer (Manish Singh) */}
              <Card className="p-8 text-center flex flex-col items-center hover:shadow-lg transition-shadow border-t-4 border-t-indigo-500">
                <div className="relative w-24 h-24 mb-4">
                  <Image 
                    src="/images/manish.jpg" 
                    alt="Mr. Manish Singh - Owner "
                    fill
                    className="rounded-full object-cover border-2 border-indigo-200 shadow-md"
                  />
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--color-foreground))] mb-4">Owner </h3>
                <div>
                  <p className="text-[hsl(var(--color-foreground))] font-bold text-lg">Mr. Manish Singh</p>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] mt-1">Owner,  & Shareholder</p>
                </div>
              </Card>

              {/* 3. Directors Section */}
              <Card className="p-8 text-center flex flex-col items-center hover:shadow-lg transition-shadow border-t-4 border-t-cyan-500">
                <div className="w-20 h-20 rounded-full bg-cyan-50 flex items-center justify-center mb-4 text-cyan-600 border-2 border-cyan-100">
                  <Users className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--color-foreground))] mb-4">PDFTara Directors</h3>
                <div className="space-y-2">
                  <p className="text-[hsl(var(--color-foreground))] font-bold text-base">Mrs. Sarita Devi</p>
                  <div className="w-8 h-px bg-slate-200 mx-auto"></div>
                  <p className="text-[hsl(var(--color-foreground))] font-bold text-base">Mr. Arjun Singh</p>
                  <p className="text-xs text-[hsl(var(--color-muted-foreground))]">Company Directors</p>
                </div>
              </Card>

              {/* 4. CMO Section */}
              <Card className="p-8 text-center flex flex-col items-center hover:shadow-lg transition-shadow border-t-4 border-t-orange-500">
                <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-orange-600 border-2 border-orange-100">
                  <ShieldCheck className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--color-foreground))] mb-4">CMO</h3>
                <div>
                  <p className="text-[hsl(var(--color-foreground))] font-bold text-lg">Mr. Anek Singh</p>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">CMO of PDFTara</p>
                </div>
              </Card>

              {/* 5. HR Managers Section */}
              <Card className="p-8 text-center flex flex-col items-center hover:shadow-lg transition-shadow border-t-4 border-t-pink-500">
                <div className="flex -space-x-4 mb-4">
                  <div className="relative w-20 h-20">
                    <Image 
                      src="/images/neeraj.jpg" 
                      alt="Mr. Neeraj Singh" 
                      fill 
                      className="rounded-full object-cover border-4 border-white shadow-sm" 
                    />
                  </div>
                  <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 border-4 border-white shadow-sm">
                    <User className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--color-foreground))] mb-4">HR Managers</h3>
                <div className="space-y-2">
                  <p className="text-[hsl(var(--color-foreground))] font-bold text-base">Mr. Neeraj Singh</p>
                  <div className="w-8 h-px bg-slate-200 mx-auto"></div>
                  <p className="text-[hsl(var(--color-foreground))] font-bold text-base">Mr. Anuj Singh</p>
                  <p className="text-xs text-[hsl(var(--color-muted-foreground))]">HR Management Team</p>
                </div>
              </Card>

              {/* 6. NEW: LEGAL REGISTRATION SECTION (For Google Trust & Branding) */}
              <Card className="p-8 text-center flex flex-col items-center hover:shadow-lg transition-shadow border-t-4 border-t-[#E67E22] bg-orange-50/20">
                <div className="w-20 h-20 rounded-full bg-[#E67E22]/10 flex items-center justify-center mb-4 text-[#E67E22] border-2 border-[#E67E22]/20">
                  <Award className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--color-foreground))] mb-4 uppercase tracking-tight">Legal Registration</h3>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 mb-2 bg-[#E67E22] text-white px-3 py-1 rounded-full">
                    <BadgeCheck className="w-4 h-4" />
                    <span className="text-[10px] font-black tracking-widest uppercase">Registered MSME</span>
                  </div>
                  <p className="text-[hsl(var(--color-foreground))] font-bold text-base mb-1">PDFTARA</p>
                  <p className="text-xs font-mono font-bold text-[#A04000] bg-orange-100/50 px-2 py-1 rounded border border-[#E67E22]/30">
                    UDYAM-UP-69-0015414
                  </p>
                  <p className="text-[10px] text-[hsl(var(--color-muted-foreground))] mt-2 font-medium">Govt. of India Certified Unit</p>
                </div>
              </Card>

              {/* 7. Office Address */}
              <Card className="p-8 text-center flex flex-col items-center hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4 text-green-600">
                  <MapPin className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--color-foreground))] mb-2">Office Address</h3>
                <p className="text-[hsl(var(--color-muted-foreground))] text-sm leading-relaxed">
                  Raja Habeli, Chotikothi Peeche<br />
                  Mo. Kotriyast, Bhinga<br />
                  Shrawasti, Uttar Pradesh<br />
                  Pin 271831, India
                </p>
              </Card>

              {/* 8. Contact Details (Number & Email) */}
              <Card className="p-8 text-center flex flex-col items-center hover:shadow-lg transition-shadow border-t-4 border-t-purple-500">
                <div className="flex gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <Phone className="h-7 w-7" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <Mail className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--color-foreground))] mb-2">Connect Directly</h3>
                <p className="text-[hsl(var(--color-muted-foreground))] font-bold text-lg">+91 9451091583</p>
                <p className="text-[hsl(var(--color-muted-foreground))] font-medium text-base mt-1">contactpdftara@gmail.com</p>
                <p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">Mon-Fri (10 AM - 6 PM IST)</p>
              </Card>

            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-[hsl(var(--color-muted)/0.3)]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-[hsl(var(--color-foreground))] mb-3">
                  Send us a Message
                </h2>
                <p className="text-[hsl(var(--color-muted-foreground))]">
                  Prefer email? Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              {formStatus === 'success' ? (
                <Card className="p-10 text-center border-green-200 bg-green-50/50">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-[hsl(var(--color-muted-foreground))] mb-8">
                    Thank you for contacting us. We have received your message and will respond shortly.
                  </p>
                  <Button variant="outline" onClick={() => setFormStatus('idle')}>
                    Send Another Message
                  </Button>
                </Card>
              ) : (
                <Card className="p-8 md:p-10 shadow-xl">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-[hsl(var(--color-foreground))] mb-2">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))]"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[hsl(var(--color-foreground))] mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))]"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[hsl(var(--color-foreground))] mb-2">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))]"
                      >
                        <option value="">Select a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="business">Business / Partnership</option>
                        <option value="feedback">Feedback & Suggestions</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[hsl(var(--color-foreground))] mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))] resize-none"
                        placeholder="How can we help you today?"
                      />
                    </div>
                    <Button type="submit" variant="primary" className="w-full py-4 text-lg font-bold" loading={formStatus === 'submitting'} disabled={formStatus === 'submitting'}>
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                      {formStatus !== 'submitting' && <Send className="ml-2 h-5 w-5" />}
                    </Button>
                  </form>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Link Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-[hsl(var(--color-muted-foreground))]" />
              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-4">Looking for quick answers?</h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-8">Check out our FAQ for immediate help regarding our secure PDF services.</p>
              <Link href={`/${locale}/faq`}>
                <Button variant="outline" className="px-8 py-3">Visit FAQ Center</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}