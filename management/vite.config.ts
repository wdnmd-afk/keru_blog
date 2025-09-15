import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path, { resolve } from "path";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    react(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [
        path.resolve(process.cwd(), "src/assets/svgs"),
        // 支持引用 frontEnd 项目的图标
        path.resolve(process.cwd(), "../frontEnd/src/assets/svgs"),
      ],
      // 指定 symbolId 格式
      symbolId: "[name]",
    }),
  ],
  server: {
    port: 9395, // 使用不同的端口避免冲突
    proxy: {
      // 管理系统专用 API 代理
      "/management-api": {
        target: "http://127.0.0.1:5566",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/management-api/, "/api"),
      },
    },
  },
  resolve: {
    alias: {
      // 当前项目的别名
      "@": resolve(__dirname, "./src"),
      // 共享代码别名
      shared: resolve(__dirname, "../shared/src"),
      "shared/components": resolve(__dirname, "../shared/src/components"),
      "shared/utils": resolve(__dirname, "../shared/src/utils"),
      "shared/types": resolve(__dirname, "../shared/src/types"),
      "shared/styles": resolve(__dirname, "../shared/src/styles"),
      // 跨项目组件引用别名（保留兼容性）
      "@frontend": resolve(__dirname, "../frontEnd/src"),
      "@frontend-components": resolve(__dirname, "../frontEnd/src/components"),
      "@frontend-utils": resolve(__dirname, "../frontEnd/src/utils"),
      "@frontend-types": resolve(__dirname, "../frontEnd/src/types"),
      "@frontend-hooks": resolve(__dirname, "../frontEnd/src/hooks"),
      "@frontend-stores": resolve(__dirname, "../frontEnd/src/stores"),
      "@frontend-api": resolve(__dirname, "../frontEnd/src/api"),
    },
    mainFields: ["module", "main"],
  },
  // 构建配置
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          antd: ["antd", "@ant-design/icons"],
        },
      },
    },
  },
});
