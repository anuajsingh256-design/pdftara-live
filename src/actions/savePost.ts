"use server"

// @/lib/... ki jagah ../lib/... use karein taaki rasta sahi mil jaye
import { supabase } from '../lib/supabase'; 
import { revalidatePath } from 'next/cache';

export async function savePostAction(formData: FormData) { // Name match kar diya hai component se
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const originalSlug = formData.get('id') as string; // Hum frontend se 'id' ya 'slug' bhejenge identify karne ke liye

    if (!title || !content) {
      throw new Error("Title and Content are required bhai!");
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
      // ==========================================
      // UPDATE LOGIC: Agar purana slug/id mil raha hai
      // ==========================================
      result = await supabase
        .from('posts')
        .update({ 
            title, 
            content, 
            slug: newSlug,
            // yahan aap date ya image update ka logic bhi daal sakte ho agar zaroorat ho
        })
        .eq('slug', originalSlug); // Purane slug se match karke update karo

      console.log("✅ Article Update ho gaya!");
    } else {
      // ==========================================
      // INSERT LOGIC: Naya post
      // ==========================================
      result = await supabase
        .from('posts')
        .insert([{ title, content, slug: newSlug }]);

      console.log("🚀 Naya Article Publish ho gaya!");
    }

    if (result.error) {
      console.error("Supabase Error:", result.error.message);
      return { success: false, error: result.error.message };
    }

    // Sab refresh karo
    revalidatePath('/blog'); 
    revalidatePath('/en/blog');
    revalidatePath('/admin'); 
    
    return { success: true };
  } catch (err: any) {
    console.error("❌ Action Error:", err.message);
    return { success: false, error: err.message };
  }
}