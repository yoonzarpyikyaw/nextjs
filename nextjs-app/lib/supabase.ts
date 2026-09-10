import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Only construct the client when credentials exist. Creating it with an empty
// URL throws synchronously and would crash the whole route render during SSR.
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface MovieRecord {
  id: string;
  slug: string;
  tmdb_id: number | null;
  title: string;
  original_title: string | null;
  year: number;
  tg_link: string;
  type: string;
  category: string;
  pin: boolean;
  trending: boolean;
  quality: string;
  language: string;
  overview: string | null;
  synopsis: string | null;
  poster_url: string;
  backdrop_url: string | null;
  rating: number | null;
  genres: string[];
  duration: number | null;
  release_date: string | null;
  original_language: string | null;
  age_rating: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}
