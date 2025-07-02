// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import tunnel from "astro-tunnel";
import lenis from "astro-lenis";
import react from "@astrojs/react";

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  srcDir: "./src",
  outDir: "./dist",
  publicDir: "./public",
  integrations: [tailwind(), vue(), tunnel({}), lenis(), react()],

  server: {
    host: "0.0.0.0",
  },
});
