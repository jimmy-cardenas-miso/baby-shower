import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static', // Ensure static site generation (SSG)
  integrations: [react(), tailwind()],
  build: {
    inlineStylesheets: 'auto', // Optimize CSS loading
  },
});

