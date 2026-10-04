import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qsyesrmjddqcsledxtva.supabase.co';
// Yahan wo lambi wali key (eyJ...) paste karo
const supabaseAnonKey = 'sb_publishable_uhzhKdRqKdB5gcXdnxgFsg_tsP875JG';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);