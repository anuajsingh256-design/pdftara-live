"use server"

import { supabase } from '../lib/supabase';
import { revalidatePath } from 'next/cache';

export async function savePostAction(formData: FormData) {
  try {
    // 1. Pehle saara data nikalein
    const originalId = formData.get('id') as string; // Ye edit ke waqt aayega
    const title = formData.get('title') as string;
    const tags = formData.get('tags') as string;
    const content = formData.get('content') as string;
    const bannerFile = formData.get('banner') as File;

    if (!title || !content) {
      return { success: false, error: "Title and Content are required!" };
    }

    // 2. Slug taiyaar karein
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    let bannerUrl = null;

    // 3. IMAGE UPLOAD LOGIC
    if (bannerFile && bannerFile.size > 0) {
      const fileName = `${Date.now()}-${bannerFile.name.replaceAll(" ", "_")}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('banners')
        .upload(fileName, bannerFile);

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('banners')
          .getPublicUrl(fileName);
        bannerUrl = publicUrlData.publicUrl;
      }
    }

    // 4. Update ya Insert ka faisla
    if (originalId) {
      // --- UPDATE LOGIC ---
      const updateData: any = {
        title,
        tags: tags ? tags.split(',').map(t => t.trim()) : ["General"],
        content,
        slug // Naya title toh naya slug
      };

      // Agar nayi image upload ki hai tabhi photo badlo
      if (bannerUrl) {
        updateData.image = bannerUrl;
      }

      const { error: dbError } = await supabase
        .from('posts')
        .update(updateData)
        .eq('slug', originalId); // Purane slug se match karke update karo

      if (dbError) throw dbError;
      console.log("✅ Article Updated!");

    } else {
      // --- INSERT LOGIC (Naya Post) ---
      const newPost = {
        slug,
        title,
        tags: tags ? tags.split(',').map(t => t.trim()) : ["General"],
        image: bannerUrl || "https://placehold.co/600x400/e2e8f0/1e293b?text=Article",
        content,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        comments: []
      };

      const { error: dbError } = await supabase
        .from('posts')
        .insert([newPost]);

      if (dbError) throw dbError;
      console.log("🚀 New Article Saved!");
    }

    // Cache clear karein taaki badlav turant dikhe
    revalidatePath('/blog');
    revalidatePath('/en/blog');
    revalidatePath('/admin');
    
    return { success: true };
  } catch (e: any) {
    console.error("Save Error:", e.message);
    return { success: false, error: e.message };
  }
}

// DELETE ACTION (Sahi hai, isme koi badlav nahi)
export async function deletePostAction(slug: string) {
  try {
    const { data: post } = await supabase.from('posts').select('image').eq('slug', slug).single();
    if (post?.image && post.image.includes('banners/')) {
        const fileName = post.image.split('/').pop();
        if (fileName) await supabase.storage.from('banners').remove([fileName]);
    }
    const { error } = await supabase.from('posts').delete().eq('slug', slug);
    if (error) throw error;

    revalidatePath('/blog');
    revalidatePath('/en/blog');
    revalidatePath('/admin');
    return { success: true };
  } catch (e: any) {
    return { success: false };
  }
}
