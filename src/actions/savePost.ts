import { supabase } from '../lib/supabase';

export async function savePostAction(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const originalSlug = formData.get('id') as string;

    if (!title || !content) {
      return { success: false, error: 'Title and Content are required!' };
    }

    // Naya slug banao (SEO ke liye)
    const newSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    let result;

    if (originalSlug) {
      // UPDATE: purane slug se match karke update
      result = await supabase
        .from('posts')
        .update({ title, content, slug: newSlug })
        .eq('slug', originalSlug);
    } else {
      // INSERT: naya post
      result = await supabase
        .from('posts')
        .insert([
          {
            title,
            content,
            slug: newSlug,
            date: new Date().toISOString(),
            comments: [],
          },
        ]);
    }

    if (result.error) {
      console.error('Supabase Error:', result.error.message);
      return { success: false, error: result.error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Action Error:', err.message);
    return { success: false, error: err.message };
  }
}
