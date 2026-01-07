import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

// Lazy initialization of Supabase client
// This prevents errors during static build when env vars might not be available
export function getSupabaseClient(): SupabaseClient {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  // During build, env vars might not be available
  // Create a placeholder client that will be replaced at runtime
  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window === 'undefined') {
      // Server-side/build time: create a dummy client
      // This allows the build to complete without errors
      supabaseClient = createClient('https://placeholder.supabase.co', 'placeholder-key');
      return supabaseClient;
    } else {
      // Client-side: throw error if vars are missing
      throw new Error(
        'Missing Supabase environment variables. Please set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY'
      );
    }
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}

// Export supabase as a getter that calls getSupabaseClient
export const supabase = {
  get from() {
    return getSupabaseClient().from.bind(getSupabaseClient());
  },
  // Add other methods as needed, or use getSupabaseClient() directly in api.ts
};
