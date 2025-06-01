import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock Supabase client that shows a user-friendly error
const createMockClient = () => {
  const errorMessage = 'Supabase configuration is missing. Please set up your .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.';
  
  // Display a visible error message on the page
  setTimeout(() => {
    const appRoot = document.getElementById('root');
    if (appRoot) {
      // Create error container
      const errorContainer = document.createElement('div');
      errorContainer.style.position = 'fixed';
      errorContainer.style.top = '0';
      errorContainer.style.left = '0';
      errorContainer.style.width = '100%';
      errorContainer.style.padding = '20px';
      errorContainer.style.backgroundColor = '#f44336';
      errorContainer.style.color = 'white';
      errorContainer.style.zIndex = '9999';
      errorContainer.style.textAlign = 'center';
      errorContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      
      // Add error message
      const message = document.createElement('p');
      message.style.margin = '0';
      message.style.fontSize = '16px';
      message.textContent = errorMessage;
      
      // Add setup instructions
      const instructions = document.createElement('p');
      instructions.style.margin = '10px 0 0 0';
      instructions.style.fontSize = '14px';
      instructions.innerHTML = 'Please copy <code>.env.example</code> to <code>.env</code> and add your Supabase credentials.';
      
      errorContainer.appendChild(message);
      errorContainer.appendChild(instructions);
      appRoot.prepend(errorContainer);
    }
  }, 1000);
  
  // Log to console as well
  console.error(errorMessage);
  
  // Return a mock client that throws friendly errors when methods are called
  const handler = {
    get: function(target: any, prop: string) {
      if (typeof prop === 'string') {
        return new Proxy(() => {}, {
          get: () => handler.get(target, prop),
          apply: function() {
            console.error(errorMessage);
            return Promise.resolve({ data: null, error: new Error(errorMessage) });
          }
        });
      }
      return handler.get(target, prop);
    }
  };
  
  return new Proxy({}, handler);
};

// DB client - use with: import { supabase } from '@/integrations/supabase/client';
export const supabase = (!supabaseUrl || !supabaseAnonKey) 
  ? createMockClient() as any 
  : createClient<Database>(supabaseUrl, supabaseAnonKey);