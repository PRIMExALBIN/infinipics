import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types';

// Types for our Supabase tables
export type Image = Database['public']['Tables']['images']['Row'];
export type Collection = Database['public']['Tables']['collections']['Row'];
export type Prompt = Database['public']['Tables']['prompts']['Row'];

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create the client if we have a URL
export const supabase = supabaseUrl ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Helper functions for common operations
// Only export these functions if supabase client is available
export const getImages = async (limit: number = 20, offset: number = 0) => {
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return { data: [], error: new Error('Supabase not initialized') };
  }
  
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
};

export const getCollections = async () => {
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return { data: [], error: new Error('Supabase not initialized') };
  }
  
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching collections:', error);
    return { data: [], error };
  }
  
  return { data, error: null };
};

export const getPrompts = async (limit: number = 10) => {
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return { data: [], error: new Error('Supabase not initialized') };
  }
  
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
};

export const searchImages = async (query: string, category?: string) => {
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return { data: [], error: new Error('Supabase not initialized') };
  }
  
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
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const insertImage = async (imageData: any) => {
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return { data: null, error: new Error('Supabase not initialized') };
  }
  
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
};