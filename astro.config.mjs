// @ts-check
import { defineConfig } from "astro/config";
import node from '@astrojs/node';
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import tunnel from "astro-tunnel";
import lenis from "astro-lenis";
import react from "@astrojs/react";

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone' // This is important for Coolify deployments
  }),
  srcDir: "./src",
  integrations: [
    tailwind(),
    vue(),
    tunnel(),
    lenis(),
    react(),
  ],
});
