import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://codebykriss.fr',
  output: 'static',
  integrations: [tailwind()],
});
