import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types';

// Types for our Supabase tables
export type Image = Database['public']['Tables']['images']['Row'];
export type Collection = Database['public']['Tables']['collections']['Row'];
export type Prompt = Database['public']['Tables']['prompts']['Row'];

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations

export async function getImages(limit: number = 20, offset: number = 0) {
  const { data, error } = await supabase
    .from('images')
    .select('*')
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching images:', error);
    return { data: [], error };
  }
  
  return { data, error: null };
}

export async function getCollections() {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching collections:', error);
    return { data: [], error };
  }
  
  return { data, error: null };
}

export async function getPrompts(limit: number = 10) {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .limit(limit)
    .order('popularity', { ascending: false });
  
  if (error) {
    console.error('Error fetching prompts:', error);
    return { data: [], error };
  }
  
  return { data, error: null };
}

export async function searchImages(query: string, category?: string) {
  let supabaseQuery = supabase
    .from('images')
    .select('*')
    .ilike('prompt', `%${query}%`);
  
  if (category && category !== 'All') {
    supabaseQuery = supabaseQuery.eq('category', category);
  }
  
  const { data, error } = await supabaseQuery
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error searching images:', error);
    return { data: [], error };
  }
  
  return { data, error: null };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function insertImage(imageData: any) {
  const { data, error } = await supabase
    .from('images')
    .insert([imageData])
    .select()
    .single();
  
  if (error) {
    console.error('Error inserting image:', error);
    return { data: null, error };
  }
  
  return { data, error: null };
}