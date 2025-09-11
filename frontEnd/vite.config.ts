import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createViteProxy } from './src/build/proxy'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        UnoCSS(),
        createSvgIconsPlugin({
            // Specify the icon folder to be cached
            iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
            // Specify symbolId format
            symbolId: '[name]',
        }),
    ],
    server: {
        port: 9394, // 你可以根据需要更改端口
        proxy: createViteProxy(true, 'dev', '/dev-api'),
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            // 跨项目组件引用别名 - 支持引用 management 项目组件
            '@management': resolve(__dirname, '../management/src'),
            '@management-components': resolve(__dirname, '../management/src/components'),
            '@management-utils': resolve(__dirname, '../management/src/utils'),
            '@management-types': resolve(__dirname, '../management/src/types'),
        },
        mainFields: ['module', 'main'],
    },
})
