// vite.config.ts
import { defineConfig } from "file:///E:/github/keru_blog/node_modules/.pnpm/vite@5.4.20_@types+node@22.18.1_sass@1.92.1/node_modules/vite/dist/node/index.js";
import react from "file:///E:/github/keru_blog/node_modules/.pnpm/@vitejs+plugin-react@4.7.0_vite@5.4.20_@types+node@22.18.1_sass@1.92.1_/node_modules/@vitejs/plugin-react/dist/index.js";
import { createSvgIconsPlugin } from "file:///E:/github/keru_blog/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.20_@types+node@22.18.1_sass@1.92.1_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path, { resolve } from "path";
import UnoCSS from "file:///E:/github/keru_blog/node_modules/.pnpm/unocss@0.62.4_postcss@8.4.21_rollup@4.50.1_vite@5.4.20_@types+node@22.18.1_sass@1.92.1_/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_dirname = "E:\\github\\keru_blog\\management";
var vite_config_default = defineConfig({
  plugins: [
    UnoCSS(),
    react(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [
        path.resolve(process.cwd(), "src/assets/svgs"),
        // 支持引用 frontEnd 项目的图标
        path.resolve(process.cwd(), "../frontEnd/src/assets/svgs")
      ],
      // 指定 symbolId 格式
      symbolId: "[name]"
    })
  ],
  server: {
    port: 9395,
    // 使用不同的端口避免冲突
    proxy: {
      // 管理系统专用 API 代理
      "/management-api": {
        target: "http://127.0.0.1:5566",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/management-api/, "/api")
      }
    }
  },
  resolve: {
    alias: {
      // 当前项目的别名
      "@": resolve(__vite_injected_original_dirname, "./src"),
      // 共享代码别名
      shared: resolve(__vite_injected_original_dirname, "../shared/src"),
      "shared/components": resolve(__vite_injected_original_dirname, "../shared/src/components"),
      "shared/utils": resolve(__vite_injected_original_dirname, "../shared/src/utils"),
      "shared/types": resolve(__vite_injected_original_dirname, "../shared/src/types"),
      "shared/styles": resolve(__vite_injected_original_dirname, "../shared/src/styles"),
      // 跨项目组件引用别名（保留兼容性）
      "@frontend": resolve(__vite_injected_original_dirname, "../frontEnd/src"),
      "@frontend-components": resolve(__vite_injected_original_dirname, "../frontEnd/src/components"),
      "@frontend-utils": resolve(__vite_injected_original_dirname, "../frontEnd/src/utils"),
      "@frontend-types": resolve(__vite_injected_original_dirname, "../frontEnd/src/types"),
      "@frontend-hooks": resolve(__vite_injected_original_dirname, "../frontEnd/src/hooks"),
      "@frontend-stores": resolve(__vite_injected_original_dirname, "../frontEnd/src/stores"),
      "@frontend-api": resolve(__vite_injected_original_dirname, "../frontEnd/src/api")
    },
    mainFields: ["module", "main"]
  },
  // 构建配置
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          antd: ["antd", "@ant-design/icons"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxnaXRodWJcXFxca2VydV9ibG9nXFxcXG1hbmFnZW1lbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGdpdGh1YlxcXFxrZXJ1X2Jsb2dcXFxcbWFuYWdlbWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovZ2l0aHViL2tlcnVfYmxvZy9tYW5hZ2VtZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiO1xuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgVW5vQ1NTIGZyb20gXCJ1bm9jc3Mvdml0ZVwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIFVub0NTUygpLFxuICAgIHJlYWN0KCksXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgICBpY29uRGlyczogW1xuICAgICAgICBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmMvYXNzZXRzL3N2Z3NcIiksXG4gICAgICAgIC8vIFx1NjUyRlx1NjMwMVx1NUYxNVx1NzUyOCBmcm9udEVuZCBcdTk4NzlcdTc2RUVcdTc2ODRcdTU2RkVcdTY4MDdcbiAgICAgICAgcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwiLi4vZnJvbnRFbmQvc3JjL2Fzc2V0cy9zdmdzXCIpLFxuICAgICAgXSxcbiAgICAgIC8vIFx1NjMwN1x1NUI5QSBzeW1ib2xJZCBcdTY4M0NcdTVGMEZcbiAgICAgIHN5bWJvbElkOiBcIltuYW1lXVwiLFxuICAgIH0pLFxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA5Mzk1LCAvLyBcdTRGN0ZcdTc1MjhcdTRFMERcdTU0MENcdTc2ODRcdTdBRUZcdTUzRTNcdTkwN0ZcdTUxNERcdTUxQjJcdTdBODFcbiAgICBwcm94eToge1xuICAgICAgLy8gXHU3QkExXHU3NDA2XHU3Q0ZCXHU3RURGXHU0RTEzXHU3NTI4IEFQSSBcdTRFRTNcdTc0MDZcbiAgICAgIFwiL21hbmFnZW1lbnQtYXBpXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly8xMjcuMC4wLjE6NTU2NlwiLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9tYW5hZ2VtZW50LWFwaS8sIFwiL2FwaVwiKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAvLyBcdTVGNTNcdTUyNERcdTk4NzlcdTc2RUVcdTc2ODRcdTUyMkJcdTU0MERcbiAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICAgIC8vIFx1NTE3MVx1NEVBQlx1NEVFM1x1NzgwMVx1NTIyQlx1NTQwRFxuICAgICAgc2hhcmVkOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9zaGFyZWQvc3JjXCIpLFxuICAgICAgXCJzaGFyZWQvY29tcG9uZW50c1wiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9zaGFyZWQvc3JjL2NvbXBvbmVudHNcIiksXG4gICAgICBcInNoYXJlZC91dGlsc1wiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9zaGFyZWQvc3JjL3V0aWxzXCIpLFxuICAgICAgXCJzaGFyZWQvdHlwZXNcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vc2hhcmVkL3NyYy90eXBlc1wiKSxcbiAgICAgIFwic2hhcmVkL3N0eWxlc1wiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9zaGFyZWQvc3JjL3N0eWxlc1wiKSxcbiAgICAgIC8vIFx1OERFOFx1OTg3OVx1NzZFRVx1N0VDNFx1NEVGNlx1NUYxNVx1NzUyOFx1NTIyQlx1NTQwRFx1RkYwOFx1NEZERFx1NzU1OVx1NTE3Q1x1NUJCOVx1NjAyN1x1RkYwOVxuICAgICAgXCJAZnJvbnRlbmRcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vZnJvbnRFbmQvc3JjXCIpLFxuICAgICAgXCJAZnJvbnRlbmQtY29tcG9uZW50c1wiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9mcm9udEVuZC9zcmMvY29tcG9uZW50c1wiKSxcbiAgICAgIFwiQGZyb250ZW5kLXV0aWxzXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4uL2Zyb250RW5kL3NyYy91dGlsc1wiKSxcbiAgICAgIFwiQGZyb250ZW5kLXR5cGVzXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4uL2Zyb250RW5kL3NyYy90eXBlc1wiKSxcbiAgICAgIFwiQGZyb250ZW5kLWhvb2tzXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4uL2Zyb250RW5kL3NyYy9ob29rc1wiKSxcbiAgICAgIFwiQGZyb250ZW5kLXN0b3Jlc1wiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9mcm9udEVuZC9zcmMvc3RvcmVzXCIpLFxuICAgICAgXCJAZnJvbnRlbmQtYXBpXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4uL2Zyb250RW5kL3NyYy9hcGlcIiksXG4gICAgfSxcbiAgICBtYWluRmllbGRzOiBbXCJtb2R1bGVcIiwgXCJtYWluXCJdLFxuICB9LFxuICAvLyBcdTY3ODRcdTVFRkFcdTkxNERcdTdGNkVcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwiZGlzdFwiLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgdmVuZG9yOiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiXSxcbiAgICAgICAgICBhbnRkOiBbXCJhbnRkXCIsIFwiQGFudC1kZXNpZ24vaWNvbnNcIl0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1IsU0FBUyxvQkFBb0I7QUFDalQsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sUUFBUSxlQUFlO0FBQzlCLE9BQU8sWUFBWTtBQUpuQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixxQkFBcUI7QUFBQTtBQUFBLE1BRW5CLFVBQVU7QUFBQSxRQUNSLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxpQkFBaUI7QUFBQTtBQUFBLFFBRTdDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyw2QkFBNkI7QUFBQSxNQUMzRDtBQUFBO0FBQUEsTUFFQSxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFDTixPQUFPO0FBQUE7QUFBQSxNQUVMLG1CQUFtQjtBQUFBLFFBQ2pCLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLHFCQUFxQixNQUFNO0FBQUEsTUFDN0Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBO0FBQUEsTUFFTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBO0FBQUEsTUFFL0IsUUFBUSxRQUFRLGtDQUFXLGVBQWU7QUFBQSxNQUMxQyxxQkFBcUIsUUFBUSxrQ0FBVywwQkFBMEI7QUFBQSxNQUNsRSxnQkFBZ0IsUUFBUSxrQ0FBVyxxQkFBcUI7QUFBQSxNQUN4RCxnQkFBZ0IsUUFBUSxrQ0FBVyxxQkFBcUI7QUFBQSxNQUN4RCxpQkFBaUIsUUFBUSxrQ0FBVyxzQkFBc0I7QUFBQTtBQUFBLE1BRTFELGFBQWEsUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxNQUNqRCx3QkFBd0IsUUFBUSxrQ0FBVyw0QkFBNEI7QUFBQSxNQUN2RSxtQkFBbUIsUUFBUSxrQ0FBVyx1QkFBdUI7QUFBQSxNQUM3RCxtQkFBbUIsUUFBUSxrQ0FBVyx1QkFBdUI7QUFBQSxNQUM3RCxtQkFBbUIsUUFBUSxrQ0FBVyx1QkFBdUI7QUFBQSxNQUM3RCxvQkFBb0IsUUFBUSxrQ0FBVyx3QkFBd0I7QUFBQSxNQUMvRCxpQkFBaUIsUUFBUSxrQ0FBVyxxQkFBcUI7QUFBQSxJQUMzRDtBQUFBLElBQ0EsWUFBWSxDQUFDLFVBQVUsTUFBTTtBQUFBLEVBQy9CO0FBQUE7QUFBQSxFQUVBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQSxVQUM3QixNQUFNLENBQUMsUUFBUSxtQkFBbUI7QUFBQSxRQUNwQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
