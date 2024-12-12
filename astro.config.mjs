// @ts-check
import { defineConfig } from 'astro/config';

import vue from "@astrojs/vue";
import tailwind from '@astrojs/tailwind';



import tunnel from 'astro-tunnel';



// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue(), tunnel()]}


);