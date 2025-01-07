// uno.config.ts
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    transformerAttributifyJsx,
} from 'unocss'

export default defineConfig({
    theme: {},
    shortcuts: [
        // 这里可以放全局公共样式
        ['h-btn', 'h-48px w-100% bg-#5C33BE b-none text-white rounded-8px'],
        ['wh-full', 'w-full h-full'],
        ['f-ic', 'flex items-center'],
        ['f-c-c', 'flex justify-center items-center'],
        ['flex-col', 'flex flex-col'],
    ],
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            extraProperties: { display: 'inline-block', 'vertical-align': 'middle' },
        }),
        presetTypography(),
    ],
    transformers: [transformerAttributifyJsx()],
})
