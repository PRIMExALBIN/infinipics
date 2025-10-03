export interface Image {
  id: string;
  url: string;
  prompt: string;
  category: string;
  tags: string[];
  created_at: string;
  width: number;
  height: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  cover_image: string;
  category: string;
  is_featured: boolean;
  created_at: string;
}

export interface Prompt {
  id: string;
  text: string;
  category: string;
  style: string;
  popularity: number;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  created_at: string;
}

// Database schema types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      images: {
        Row: Image
        Insert: Partial<Image>
        Update: Partial<Image>
      }
      collections: {
        Row: Collection
        Insert: Partial<Collection>
        Update: Partial<Collection>
      }
      prompts: {
        Row: Prompt
        Insert: Partial<Prompt>
        Update: Partial<Prompt>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}