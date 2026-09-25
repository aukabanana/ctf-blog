import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  integrations: [tailwind(), react()],
  markdown: {
    shikiConfig: {
      theme: 'tokyo-night',
      wrap: true,
    },
  },
});
