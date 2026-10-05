import { supabase } from '../lib/supabase';

export async function savePostAction(formData: FormData) {
  try {
    const originalId = formData.get('id') as string;
    const title = formData.get('title') as string;
    const tags = formData.get('tags') as string;
    const content = formData.get('content') as string;
    const bannerFile = formData.get('banner') as File | null;

    if (!title || !content) {
      return { success: false, error: 'Title and Content are required!' };
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    let bannerUrl: string | null = null;

    if (bannerFile && bannerFile.size > 0) {
      const fileName = `${Date.now()}-${bannerFile.name.replaceAll(' ', '_')}`;
      const { error: uploadError } = await supabase.storage
        .from('banners')
        .upload(fileName, bannerFile);

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('banners')
          .getPublicUrl(fileName);
        bannerUrl = publicUrlData.publicUrl;
      }
    }

    const tagList = tags ? tags.split(',').map((t) => t.trim()) : ['General'];

    if (originalId) {
      const updateData: any = { title, tags: tagList, content, slug };
      if (bannerUrl) updateData.image = bannerUrl;

      const { error: dbError } = await supabase
        .from('posts')
        .update(updateData)
        .eq('slug', originalId);

      if (dbError) throw dbError;
    } else {
      const newPost = {
        slug,
        title,
        tags: tagList,
        image: bannerUrl || 'https://placehold.co/600x400/e2e8f0/1e293b?text=Article',
        content,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        comments: [],
      };

      const { error: dbError } = await supabase.from('posts').insert([newPost]);
      if (dbError) throw dbError;
    }

    return { success: true };
  } catch (e: any) {
    console.error('Save Error:', e.message);
    return { success: false, error: e.message };
  }
}

export async function deletePostAction(slug: string) {
  try {
    const { data: post } = await supabase
      .from('posts')
      .select('image')
      .eq('slug', slug)
      .single();

    if (post?.image && post.image.includes('banners/')) {
      const fileName = post.image.split('/').pop();
      if (fileName) await supabase.storage.from('banners').remove([fileName]);
    }

    const { error } = await supabase.from('posts').delete().eq('slug', slug);
    if (error) throw error;

    return { success: true };
  } catch (e: any) {
    return { success: false };
  }
}
