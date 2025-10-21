// vite.config.ts
import { defineConfig } from "file:///E:/github/keru_blog/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.1_sass@1.92.1/node_modules/vite/dist/node/index.js";
import react from "file:///E:/github/keru_blog/node_modules/.pnpm/@vitejs+plugin-react@4.7.0_vite@4.5.14_@types+node@22.18.1_sass@1.92.1_/node_modules/@vitejs/plugin-react/dist/index.js";
import dts from "file:///E:/github/keru_blog/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@22.18.1_rollup@4.50.1_typescript@5.9.2_vite@4.5.14_@types+node@22.18.1_sass@1.92.1_/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "E:\\github\\keru_blog\\shared";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: "dist",
      include: ["src/**/*"],
      exclude: ["**/*.test.*", "**/*.spec.*"]
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__vite_injected_original_dirname, "src/index.ts"),
        components: resolve(__vite_injected_original_dirname, "src/components/index.ts"),
        utils: resolve(__vite_injected_original_dirname, "src/utils/index.ts"),
        types: resolve(__vite_injected_original_dirname, "src/types/index.ts"),
        styles: resolve(__vite_injected_original_dirname, "src/styles/index.ts")
      },
      formats: ["es"],
      fileName: (format, entryName) => `${entryName}.js`
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "antd",
        "@ant-design/icons"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          antd: "antd"
        }
      }
    },
    sourcemap: true,
    minify: false
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxnaXRodWJcXFxca2VydV9ibG9nXFxcXHNoYXJlZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcZ2l0aHViXFxcXGtlcnVfYmxvZ1xcXFxzaGFyZWRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2dpdGh1Yi9rZXJ1X2Jsb2cvc2hhcmVkL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBkdHMoe1xuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxuICAgICAgaW5jbHVkZTogWydzcmMvKiovKiddLFxuICAgICAgZXhjbHVkZTogWycqKi8qLnRlc3QuKicsICcqKi8qLnNwZWMuKiddXG4gICAgfSlcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiB7XG4gICAgICAgIGluZGV4OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgICBjb21wb25lbnRzOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzL2luZGV4LnRzJyksXG4gICAgICAgIHV0aWxzOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy91dGlscy9pbmRleC50cycpLFxuICAgICAgICB0eXBlczogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdHlwZXMvaW5kZXgudHMnKSxcbiAgICAgICAgc3R5bGVzOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9zdHlsZXMvaW5kZXgudHMnKVxuICAgICAgfSxcbiAgICAgIGZvcm1hdHM6IFsnZXMnXSxcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0LCBlbnRyeU5hbWUpID0+IGAke2VudHJ5TmFtZX0uanNgXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICAncmVhY3QnLFxuICAgICAgICAncmVhY3QtZG9tJyxcbiAgICAgICAgJ2FudGQnLFxuICAgICAgICAnQGFudC1kZXNpZ24vaWNvbnMnXG4gICAgICBdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICByZWFjdDogJ1JlYWN0JyxcbiAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJyxcbiAgICAgICAgICBhbnRkOiAnYW50ZCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIG1pbmlmeTogZmFsc2VcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJylcbiAgICB9XG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3USxTQUFTLG9CQUFvQjtBQUNyUyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUh4QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixrQkFBa0I7QUFBQSxNQUNsQixRQUFRO0FBQUEsTUFDUixTQUFTLENBQUMsVUFBVTtBQUFBLE1BQ3BCLFNBQVMsQ0FBQyxlQUFlLGFBQWE7QUFBQSxJQUN4QyxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLFFBQ0wsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxRQUN4QyxZQUFZLFFBQVEsa0NBQVcseUJBQXlCO0FBQUEsUUFDeEQsT0FBTyxRQUFRLGtDQUFXLG9CQUFvQjtBQUFBLFFBQzlDLE9BQU8sUUFBUSxrQ0FBVyxvQkFBb0I7QUFBQSxRQUM5QyxRQUFRLFFBQVEsa0NBQVcscUJBQXFCO0FBQUEsTUFDbEQ7QUFBQSxNQUNBLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDZCxVQUFVLENBQUMsUUFBUSxjQUFjLEdBQUcsU0FBUztBQUFBLElBQy9DO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxVQUNiLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
