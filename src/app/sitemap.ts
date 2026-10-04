/**
 * PDFTARA SITEMAP - VERSION 8.0 (TRAILING SLASH FIX - FINAL)
 * Purpose: Ensure all URLs end with '/' to match live site and fix GSC errors.
 */

import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { getAllTools } from '@/config/tools';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qsyesrmjddqcsledxtva.supabase.co';
const supabaseAnonKey = 'sb_publishable_uhzhKdRqKdB5gcXdnxgFsg_tsP875JG';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Har 1 ghante mein update hoga
export const revalidate = 3600; 

const BASE_URL = 'https://www.pdftara.com';

const PRIORITY = {
  home: 1.0,
  tools: 0.9,
  toolPage: 0.8,
  blogPost: 0.9, 
  blogHome: 0.7,
  static: 0.5,
} as const;

const STATIC_PAGES = [
  { path: '', priority: PRIORITY.home, changeFreq: 'daily' },
  { path: 'tools', priority: PRIORITY.tools, changeFreq: 'weekly' },
  { path: 'blog', priority: PRIORITY.blogHome, changeFreq: 'daily' },
  { path: 'about', priority: PRIORITY.static, changeFreq: 'monthly' },
  { path: 'faq', priority: PRIORITY.static, changeFreq: 'monthly' },
  { path: 'contact', priority: PRIORITY.static, changeFreq: 'monthly' },
  { path: 'privacy', priority: PRIORITY.static, changeFreq: 'monthly' },
  { path: 'terms', priority: PRIORITY.static, changeFreq: 'monthly' },
  { path: 'disclaimer', priority: PRIORITY.static, changeFreq: 'monthly' },
];

// ✅ FIXED: Asli Chor yahi tha. Ab ye hamesha slash (/) ke saath URL banayega.
const buildUrl = (locale: string, path: string) => {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  // Path ho ya na ho, end mein '/' pakka lagega
  return cleanPath ? `${BASE_URL}/${locale}/${cleanPath}/` : `${BASE_URL}/${locale}/`;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const allEntries: MetadataRoute.Sitemap = [];

  // PHASE 1: STATIC PAGES (Home, Tools, Contact etc.)
  for (const page of STATIC_PAGES) {
    for (const locale of locales) {
      const url = buildUrl(locale, page.path);
      allEntries.push({
        url: url,
        lastModified,
        changeFrequency: page.changeFreq as any,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, buildUrl(l, page.path)])),
        },
      });
    }
  }

  // PHASE 2: TOOLS (PDF Converter, Split etc.)
  const tools = getAllTools();
  for (const tool of tools) {
    for (const locale of locales) {
      const toolField = `tools/${tool.slug}`;
      const url = buildUrl(locale, toolField);
      allEntries.push({
        url: url,
        lastModified,
        changeFrequency: 'weekly',
        priority: PRIORITY.toolPage,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, buildUrl(l, toolField)])),
        },
      });
    }
  }

  // PHASE 3: DYNAMIC BLOG POSTS
  const { data: posts } = await supabase.from('posts').select('slug'); 

  if (posts) {
    for (const post of posts) {
      if (!post.slug) continue; 
      for (const locale of locales) {
        const blogField = `blog/${post.slug}`;
        const url = buildUrl(locale, blogField);
        allEntries.push({
          url: url,
          lastModified,
          changeFrequency: 'daily',
          priority: PRIORITY.blogPost,
          alternates: {
            languages: Object.fromEntries(locales.map((l) => [l, buildUrl(l, blogField)])),
          },
        });
      }
    }
  }

  return allEntries;
}