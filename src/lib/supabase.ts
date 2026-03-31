import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Logging for production debugging
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase configuration missing!');
}

// Official fix: Ensure we don't pass empty strings to createClient which causes crashes
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'undefined')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { 
      auth: { 
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null })
      },
      from: () => ({ 
        select: () => ({ 
          order: () => Promise.resolve({ data: [], error: null }),
          eq: () => ({ order: () => Promise.resolve({ data: [], error: null }) }),
          maybeSingle: () => Promise.resolve({ data: null, error: null })
        }),
        insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
        update: () => ({ eq: () => Promise.resolve({ error: null }) }),
        delete: () => ({ eq: () => Promise.resolve({ error: null }) })
      })
    } as any;
