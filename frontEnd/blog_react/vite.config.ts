import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import UnoCSS from "unocss/vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],
      // Specify symbolId format
      symbolId: "[name]",
    }),
  ],
  server: {
    port: 3000, // 你可以根据需要更改端口
  },
  resolve: {
    alias: {
      "@": "./src", // 你可以根据需要设置别名
    },
  },
});
