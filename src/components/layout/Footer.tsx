'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { 
  Shield, 
  Lock, 
  FileCheck, 
  Globe, 
  Share2, 
  Send, 
  Star, 
  Award, 
  CheckCircle2,
  TrendingUp,
  Youtube,
  ExternalLink
} from 'lucide-react';
import { type Locale, locales, localeConfig, getLocalizedPath } from '@/lib/i18n/config';
import { saveLanguagePreference } from './LanguageSelector';

export interface FooterProps {
  locale: Locale;
}

// Star Rating Helper Component
const FiveStars = () => (
  <div className="flex gap-0.5 mt-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-[#FFB400] text-[#FFB400]" />
    ))}
  </div>
);

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = useTranslations('common');
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();

  // Updated with your specific image paths for SEO and visual consistency
  const reviewPlatforms = [
    {
      name: "Capterra",
      url: "https://www.capterra.in/software/1106945/PDFTara",
      logo: "/images/captara.png",
      alt: "PDFTara Capterra Reviews - Trusted PDF Tools"
    },
    {
      name: "GetApp",
      url: "https://www.getapp.com/all-software/a/pdftara/",
      logo: "/images/getapp.png",
      alt: "PDFTara GetApp Ratings - Professional PDF Software"
    },
    {
      name: "Software Advice",
      url: "https://www.softwareadvice.com/product/559122-PDFTara/",
      logo: "/images/software_advice.png",
      alt: "PDFTara Software Advice - Top Rated PDF Utility"
    }
  ];

  const footerLinks = [
    { href: `/${locale}/about`, label: t('navigation.about') },
    { href: `/${locale}/faq`, label: t('navigation.faq') },
    { href: `/${locale}/privacy`, label: t('navigation.privacy') },
    { href: `/${locale}/contact`, label: t('navigation.contact') },
  ];

  const communityLinks = [
    { 
      href: "https://t.me/pdftara", 
      label: "Official Telegram", 
      color: "bg-[#229ED9] hover:bg-[#1c86ba]",
      icon: <Send className="w-4 h-4" />
    },
    { 
      href: "https://www.youtube.com/@PDFtara/shorts", 
      label: "YouTube Shorts", 
      color: "bg-[#FF0000] hover:bg-[#cc0000]",
      icon: <Youtube className="w-4 h-4" />
    },
    { 
      href: "https://www.producthunt.com/products/pdftara-secure-free", 
      label: "Product Hunt", 
      color: "bg-[#DA552F] hover:bg-[#bd4828]",
      icon: <Award className="w-4 h-4" />
    },
    { 
      href: "https://www.trustpilot.com/review/pdftara.com", 
      label: "Trustpilot", 
      color: "bg-[#00B67A] hover:bg-[#009e6a]",
      icon: <Star className="w-4 h-4" />
    },
  ];

  const handleLanguageChange = (newLocale: Locale) => {
    saveLanguagePreference(newLocale);
    const newPath = getLocalizedPath(pathname, newLocale);
    router.push(newPath);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'PDFTara',
      text: 'Check out these professional PDF tools - Free & Private!',
      url: typeof window !== 'undefined' ? window.location.origin : '',
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.log('Error sharing', err); }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <footer className="w-full border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] pt-16 pb-8" role="contentinfo">
      <div className="container mx-auto px-4">
        
        {/* NEW: Global Review Section - International Look */}
        <div className="mb-16 py-8 px-6 rounded-3xl bg-gradient-to-r from-[hsl(var(--color-muted)/0.3)] to-[hsl(var(--color-background))] border border-[hsl(var(--color-border))] shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-black text-[hsl(var(--color-foreground))] tracking-tight mb-2 uppercase">Trusted by Thousands Worldwide</h2>
              <p className="text-sm text-[hsl(var(--color-muted-foreground))]">Share your experience and help us grow on global platforms.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full lg:w-auto">
              {reviewPlatforms.map((platform) => (
                <a 
                  key={platform.name}
                  href={platform.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title={`Review PDFTara on ${platform.name}`}
                  className="group flex flex-col items-center p-5 rounded-2xl bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-primary))] transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
                      <img 
                        src={platform.logo} 
                        alt={platform.alt}
                        className="object-contain w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <span className="font-bold text-sm text-[hsl(var(--color-foreground))]">{platform.name}</span>
                  </div>
                  <FiveStars />
                  <span className="mt-3 text-[10px] font-extrabold uppercase tracking-widest text-[hsl(var(--color-primary))] group-hover:underline flex items-center gap-1">
                    Review us <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 flex flex-col gap-6">
            <Link href={`/${locale}`} className="group flex items-center gap-2.5 text-xl font-bold text-[hsl(var(--color-foreground))]" title="PDFTara Home">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--color-primary))] text-white shadow-md transition-transform group-hover:scale-105">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <span>{t('brand')}</span>
            </Link>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed max-w-xs">
              {t('tagline') || 'Professional, secure, and free PDF tools for everyone. No installation required.'}
            </p>
            <div className="mt-2">
              <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(var(--color-border))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-primary))] hover:text-white transition-all text-xs font-bold uppercase tracking-wider">
                <Share2 className="w-4 h-4" />
                <span>Share App</span>
              </button>
            </div>
          </div>

          {/* Resources & Community Section */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-6">Resources</h3>
            <ul className="flex flex-col gap-3 mb-10">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-primary))] transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[hsl(var(--color-muted-foreground))] group-hover:bg-[hsl(var(--color-primary))] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-4">Follow Us</h3>
            <div className="grid grid-cols-2 gap-2">
              {communityLinks.map((item, index) => (
                <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" title={item.label} className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white transition-all text-[11px] font-bold shadow-sm ${item.color}`}>
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Legal Company Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-6 w-full">
              Verification
            </h3>
            <div className="flex flex-col gap-4 w-full max-w-[240px]">
              {/* MSME Badge */}
              <div className="flex flex-col items-center justify-center gap-1 px-5 py-3 rounded-xl text-white bg-[#E67E22] shadow-md border-b-4 border-[#A04000]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-tighter">Registered MSME</span>
                </div>
                <span className="text-[11px] font-bold opacity-90">UDYAM-UP-69-0015414</span>
              </div>

              {/* Crunchbase Badge */}
              <a href="https://www.crunchbase.com/organization/pdftara" target="_blank" rel="noopener noreferrer" title="View PDFTara on Crunchbase" className="flex flex-col items-center justify-center gap-1 px-5 py-3 rounded-xl text-white bg-[#0284c7] hover:bg-[#0369a1] transition-all shadow-md border-b-4 border-[#075985]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-white fill-white/20" />
                  <span className="text-xs font-black uppercase tracking-tighter">Verified Software Co.</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-90">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-[10px] font-bold">CB Rank: #5328545</span>
                </div>
              </a>

              <div className="mt-4 w-full text-left">
                <h4 className="text-xs font-bold text-[hsl(var(--color-muted-foreground))] uppercase mb-3">Compliance</h4>
                <div className="flex items-center gap-3 p-3 bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] rounded-xl shadow-sm">
                  <div className="h-8 w-8 rounded-full bg-[hsl(var(--color-success)/0.1)] flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-[hsl(var(--color-success))]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[hsl(var(--color-foreground))] leading-none">GDPR Compliant</div>
                    <div className="text-[10px] text-[hsl(var(--color-muted-foreground))] mt-1">100% Private Data</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-6">Security</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded bg-[hsl(var(--color-success)/0.1)] text-[hsl(var(--color-success))]">
                  <Lock className="h-3 w-3" />
                </div>
                <div>
                  <span className="block text-sm font-medium text-[hsl(var(--color-foreground))]">Client-side processing</span>
                  <span className="text-xs text-[hsl(var(--color-muted-foreground))]">Files never leave your device</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))]">
                  <FileCheck className="h-3 w-3" />
                </div>
                <div>
                  <span className="block text-sm font-medium text-[hsl(var(--color-foreground))]">No file uploads</span>
                  <span className="text-xs text-[hsl(var(--color-muted-foreground))]">100% private & secure</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="py-6 border-t border-[hsl(var(--color-border))]">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
            <span className="text-sm font-medium text-[hsl(var(--color-foreground))]">{t('buttons.selectLanguage')}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {locales.map((loc) => {
              const config = localeConfig[loc];
              const isActive = loc === locale;
              return (
                <button key={loc} onClick={() => handleLanguageChange(loc)} className={`px-3 py-1.5 text-sm rounded-full transition-all ${isActive ? 'bg-[hsl(var(--color-primary))] text-white font-medium' : 'bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-primary)/0.1)] hover:text-[hsl(var(--color-primary))]'}`} aria-current={isActive ? 'true' : undefined}>
                  {config.nativeName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Copyright & Legal Links */}
        <div className="pt-8 border-t border-[hsl(var(--color-border))] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[hsl(var(--color-muted-foreground))]">&copy; {currentYear} PDFTara. All rights reserved.</p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <Link href={`/${locale}/terms`} className="text-xs text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]">Terms</Link>
            <Link href={`/${locale}/privacy`} className="text-xs text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]">Privacy</Link>
            <Link href={`/${locale}/cookies`} className="text-xs text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]">Cookies</Link>
            <Link href={`/${locale}/disclaimer`} className="text-xs text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;