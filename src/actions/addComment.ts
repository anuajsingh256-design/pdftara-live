import { supabase } from '../lib/supabase';

export type PostComment = {
  text: string;
  date: string;
  user: string;
};

export async function addCommentAction(
  slug: string,
  commentText: string
): Promise<{ success: boolean; comments?: PostComment[] }> {
  try {
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('comments')
      .eq('slug', slug)
      .single();

    if (fetchError || !post) {
      console.error('Post nahi mili:', fetchError);
      return { success: false };
    }

    const newComment: PostComment = {
      text: commentText,
      date: new Date().toISOString(),
      user: 'Guest User',
    };

    const existingComments: PostComment[] = Array.isArray(post.comments)
      ? post.comments
      : [];
    const updatedComments = [...existingComments, newComment];

    const { error: updateError } = await supabase
      .from('posts')
      .update({ comments: updatedComments })
      .eq('slug', slug);

    if (updateError) {
      console.error('Comment save karne mein galti:', updateError.message);
      return { success: false };
    }

    return { success: true, comments: updatedComments };
  } catch (error) {
    console.error('Error saving comment:', error);
    return { success: false };
  }
}
