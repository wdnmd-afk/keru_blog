// vite.config.ts
import { defineConfig } from 'file:///F:/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/NODE/blog/frontEnd/node_modules/.pnpm/vite@5.3.4_@types+node@22.1.0_sass@1.77.8/node_modules/vite/dist/node/index.js'
import react from 'file:///F:/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/NODE/blog/frontEnd/node_modules/.pnpm/@vitejs+plugin-react@4.3.1_vite@5.3.4_@types+node@22.1.0_sass@1.77.8_/node_modules/@vitejs/plugin-react/dist/index.mjs'
import { createSvgIconsPlugin } from 'file:///F:/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/NODE/blog/frontEnd/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.3.4_@types+node@22.1.0_sass@1.77.8_/node_modules/vite-plugin-svg-icons/dist/index.mjs'
import path, { resolve } from 'path'
import UnoCSS from 'file:///F:/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/NODE/blog/frontEnd/node_modules/.pnpm/unocss@0.62.1_postcss@8.4.21_rollup@4.19.1_vite@5.3.4_@types+node@22.1.0_sass@1.77.8_/node_modules/unocss/dist/vite.mjs'

// src/build/proxy.ts
var proxyConfigMappings = {
    // 开发环境调用的接口
    dev: {
        prefix: '/dev-api',
        target: 'http://127.0.0.1:3000'
    },
    // 生产环境调用的接口
    prod: {
        prefix: '/prod-api',
        target: 'http://127.0.0.1:3000'
    }
}
function getProxyConfig(envType = 'dev') {
    return proxyConfigMappings[envType]
}
function createViteProxy(isUseProxy = true, proxyType, basePath) {
    if (!isUseProxy) return void 0
    const proxyConfig = getProxyConfig(proxyType)
    const proxy = {
        [proxyConfig.prefix]: {
            target: proxyConfig.target,
            changeOrigin: true,
            rewrite: path2 => path2.replace(new RegExp('^' + basePath), '')
        }
    }
    return proxy
}

// vite.config.ts
var __vite_injected_original_dirname = 'F:\\\u524D\u7AEF\u9879\u76EE\\NODE\\blog\\frontEnd'
var vite_config_default = defineConfig({
    plugins: [
        react(),
        UnoCSS(),
        createSvgIconsPlugin({
            // Specify the icon folder to be cached
            iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
            // Specify symbolId format
            symbolId: '[name]'
        })
    ],
    server: {
        port: 8080,
        // 你可以根据需要更改端口
        proxy: createViteProxy(true, 'dev', '/dev-api')
    },
    resolve: {
        alias: {
            '@': resolve(__vite_injected_original_dirname, './src')
        }
    }
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL2J1aWxkL3Byb3h5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcXHU1MjREXHU3QUVGXHU5ODc5XHU3NkVFXFxcXE5PREVcXFxcYmxvZ1xcXFxmcm9udEVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcXHU1MjREXHU3QUVGXHU5ODc5XHU3NkVFXFxcXE5PREVcXFxcYmxvZ1xcXFxmcm9udEVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovJUU1JTg5JThEJUU3JUFCJUFGJUU5JUExJUI5JUU3JTlCJUFFL05PREUvYmxvZy9mcm9udEVuZC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcbmltcG9ydCBwYXRoLCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IFVub0NTUyBmcm9tIFwidW5vY3NzL3ZpdGVcIjtcbmltcG9ydCB7IGNyZWF0ZVZpdGVQcm94eSB9IGZyb20gXCIuL3NyYy9idWlsZC9wcm94eVwiO1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIFVub0NTUygpLFxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgIC8vIFNwZWNpZnkgdGhlIGljb24gZm9sZGVyIHRvIGJlIGNhY2hlZFxuICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmMvYXNzZXRzL3N2Z3NcIildLFxuICAgICAgLy8gU3BlY2lmeSBzeW1ib2xJZCBmb3JtYXRcbiAgICAgIHN5bWJvbElkOiBcIltuYW1lXVwiLFxuICAgIH0pLFxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA4MDgwLCAvLyBcdTRGNjBcdTUzRUZcdTRFRTVcdTY4MzlcdTYzNkVcdTk3MDBcdTg5ODFcdTY2RjRcdTY1MzlcdTdBRUZcdTUzRTNcbiAgICBwcm94eTogY3JlYXRlVml0ZVByb3h5KHRydWUsIFwiZGV2XCIsIFwiL2Rldi1hcGlcIiksXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcXHU1MjREXHU3QUVGXHU5ODc5XHU3NkVFXFxcXE5PREVcXFxcYmxvZ1xcXFxmcm9udEVuZFxcXFxzcmNcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXFx1NTI0RFx1N0FFRlx1OTg3OVx1NzZFRVxcXFxOT0RFXFxcXGJsb2dcXFxcZnJvbnRFbmRcXFxcc3JjXFxcXGJ1aWxkXFxcXHByb3h5LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi8lRTUlODklOEQlRTclQUIlQUYlRTklQTElQjklRTclOUIlQUUvTk9ERS9ibG9nL2Zyb250RW5kL3NyYy9idWlsZC9wcm94eS50c1wiO2ltcG9ydCB0eXBlIHsgUHJveHlPcHRpb25zIH0gZnJvbSBcInZpdGVcIjtcbnR5cGUgUHJveHlUeXBlID0gXCJkZXZcIiB8IFwicHJvZFwiO1xuaW50ZXJmYWNlIFByb3h5Q29uZmlnIHtcbiAgLyoqIFx1NTMzOVx1OTE0RFx1NEVFM1x1NzQwNlx1NzY4NFx1NTI0RFx1N0YwMFx1RkYwQ1x1NjNBNVx1NTNFM1x1NTczMFx1NTc0MFx1NTMzOVx1OTE0RFx1NTIzMFx1NkI2NFx1NTI0RFx1N0YwMFx1NUMwNlx1NEVFM1x1NzQwNlx1NzY4NHRhcmdldFx1NTczMFx1NTc0MCAqL1xuICBwcmVmaXg6IHN0cmluZztcbiAgLyoqIFx1NEVFM1x1NzQwNlx1NzZFRVx1NjgwN1x1NTczMFx1NTc0MFx1RkYwQ1x1NTQwRVx1N0FFRlx1NzcxRlx1NUI5RVx1NjNBNVx1NTNFM1x1NTczMFx1NTc0MCAqL1xuICB0YXJnZXQ6IHN0cmluZztcbn1cbmNvbnN0IHByb3h5Q29uZmlnTWFwcGluZ3M6IFJlY29yZDxQcm94eVR5cGUsIFByb3h5Q29uZmlnPiA9IHtcbiAgLy8gXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU4QzAzXHU3NTI4XHU3Njg0XHU2M0E1XHU1M0UzXG4gIGRldjoge1xuICAgIHByZWZpeDogXCIvZGV2LWFwaVwiLFxuICAgIHRhcmdldDogXCJodHRwOi8vMTI3LjAuMC4xOjMwMDBcIixcbiAgfSxcblxuICAvLyBcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdThDMDNcdTc1MjhcdTc2ODRcdTYzQTVcdTUzRTNcbiAgcHJvZDoge1xuICAgIHByZWZpeDogXCIvcHJvZC1hcGlcIixcbiAgICB0YXJnZXQ6IFwiaHR0cDovLzEyNy4wLjAuMTozMDAwXCIsXG4gIH0sXG59O1xuXG5mdW5jdGlvbiBnZXRQcm94eUNvbmZpZyhlbnZUeXBlOiBQcm94eVR5cGUgPSBcImRldlwiKTogUHJveHlDb25maWcge1xuICByZXR1cm4gcHJveHlDb25maWdNYXBwaW5nc1tlbnZUeXBlXTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVml0ZVByb3h5KFxuICBpc1VzZVByb3h5ID0gdHJ1ZSxcbiAgcHJveHlUeXBlOiBQcm94eVR5cGUsXG4gIGJhc2VQYXRoOiBzdHJpbmcsXG4pIHtcbiAgaWYgKCFpc1VzZVByb3h5KSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIGNvbnN0IHByb3h5Q29uZmlnID0gZ2V0UHJveHlDb25maWcocHJveHlUeXBlKTtcbiAgY29uc3QgcHJveHk6IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IFByb3h5Q29uZmlnPiA9IHtcbiAgICBbcHJveHlDb25maWcucHJlZml4XToge1xuICAgICAgdGFyZ2V0OiBwcm94eUNvbmZpZy50YXJnZXQsXG4gICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoXCJeXCIgKyBiYXNlUGF0aCksIFwiXCIpLFxuICAgIH0sXG4gIH07XG4gIHJldHVybiBwcm94eTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlVml0ZVByb3h5IH07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBTLFNBQVMsb0JBQW9CO0FBQ3ZVLE9BQU8sV0FBVztBQUNsQixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFFBQVEsZUFBZTtBQUM5QixPQUFPLFlBQVk7OztBQ0luQixJQUFNLHNCQUFzRDtBQUFBO0FBQUEsRUFFMUQsS0FBSztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLEVBQ1Y7QUFBQTtBQUFBLEVBR0EsTUFBTTtBQUFBLElBQ0osUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLEVBQ1Y7QUFDRjtBQUVBLFNBQVMsZUFBZSxVQUFxQixPQUFvQjtBQUMvRCxTQUFPLG9CQUFvQixPQUFPO0FBQ3BDO0FBRUEsU0FBUyxnQkFDUCxhQUFhLE1BQ2IsV0FDQSxVQUNBO0FBQ0EsTUFBSSxDQUFDLFdBQVksUUFBTztBQUV4QixRQUFNLGNBQWMsZUFBZSxTQUFTO0FBQzVDLFFBQU0sUUFBOEM7QUFBQSxJQUNsRCxDQUFDLFlBQVksTUFBTSxHQUFHO0FBQUEsTUFDcEIsUUFBUSxZQUFZO0FBQUEsTUFDcEIsY0FBYztBQUFBLE1BQ2QsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sUUFBUSxHQUFHLEVBQUU7QUFBQSxJQUNoRTtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQ1Q7OztBRDFDQSxJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxxQkFBcUI7QUFBQTtBQUFBLE1BRW5CLFVBQVUsQ0FBQyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsaUJBQWlCLENBQUM7QUFBQTtBQUFBLE1BRXpELFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUNOLE9BQU8sZ0JBQWdCLE1BQU0sT0FBTyxVQUFVO0FBQUEsRUFDaEQ7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDakM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
