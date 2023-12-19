import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
  },
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    alias: {
      "@": resolve(__dirname, "./src"),
      "@img": resolve(__dirname, "./src/assets/img"),
      "@components": resolve(__dirname, "./src/components/"),
    },
  },
});
