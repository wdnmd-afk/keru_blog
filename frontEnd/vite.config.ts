import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path, { resolve } from 'path'
import UnoCSS from 'unocss/vite'
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
            symbolId: '[name]'
        })
    ],
    server: {
        port: 8080, // 你可以根据需要更改端口
        proxy: createViteProxy(true, 'dev', '/dev-api')
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    }
})
