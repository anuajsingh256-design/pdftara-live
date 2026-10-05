/**
 * Site configuration
 */
export const siteConfig = {
  name: 'PDFTara',

  description:
    'Professional PDF Tools - Free, Private & Browser-Based. Merge, split, compress, convert, and edit PDF files online without uploading to servers.',

  url: 'https://www.pdftara.com',

  ogImage: 'https://www.pdftara.com/images/og-image.png',

  links: {},

  creator: 'PDFTara Team',

  keywords: [
    'PDF tools',
    'PDF editor',
    'merge PDF',
    'split PDF',
    'compress PDF',
    'convert PDF',
    'free PDF tools',
    'online PDF editor',
    'browser-based PDF',
    'private PDF processing',
  ],

  /**
   * SEO-related settings
   */
  seo: {
    titleTemplate: '%s | PDFTara',
    defaultTitle: 'PDFTara - Professional PDF Tools',
    locale: 'en_US',
  },
};

/**
 * Navigation configuration
 */
export const navConfig = {
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Tools',
      href: '/tools',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'FAQ',
      href: '/faq',
    },
  ],

  footerNav: [
    {
      title: 'Privacy',
      href: '/privacy',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ],
};
