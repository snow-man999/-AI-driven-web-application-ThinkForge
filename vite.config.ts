import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase the warning limit for chunk size
    chunkSizeWarningLimit: 600,
    // Configure manual chunks to better split the vendor code
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and related packages
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Split UI component libraries
          'ui-vendor': [
            '@radix-ui/react-accordion', 
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu'
          ],
          // Split utilities and other dependencies
          'utils-vendor': [
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
            'framer-motion'
          ],
          // Split Supabase and data-related packages
          'data-vendor': [
            '@supabase/supabase-js',
            '@tanstack/react-query'
          ]
        }
      }
    }
  }
}));
