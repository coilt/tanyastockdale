// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import tunnel from "astro-tunnel";
import lenis from "astro-lenis";
import react from "@astrojs/react";

export default defineConfig({
  output: 'server',
  srcDir: "./src",
  integrations: [
    tailwind(),
    vue(),
    tunnel(),
    lenis(),
    react(),
  ],
});
