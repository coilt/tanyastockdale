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
  outDir: "./dist", // Make sure this is explicitly set
  publicDir: "./public", // Make sure this is explicitly set
  integrations: [
    tailwind(),
    vue(),
    tunnel({
      // You can specify host here if needed for the tunnel
    }),
    lenis(),
    react(),
  ],
  // Add this to ensure TinaCMS admin routes are handled correctly
  server: {
    host: '0.0.0.0',
  },
});
