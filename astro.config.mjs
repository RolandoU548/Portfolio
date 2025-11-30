import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel/server";

export default defineConfig({
  output: "hybrid",
  adapter: vercel(),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
