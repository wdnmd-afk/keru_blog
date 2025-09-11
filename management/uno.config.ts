// uno.config.ts - Management 项目 UnoCSS 配置
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerAttributifyJsx,
} from "unocss";

export default defineConfig({
  theme: {
    // 管理系统主题配置
    colors: {
      primary: "#1890ff",
      success: "#52c41a",
      warning: "#faad14",
      error: "#f5222d",
      info: "#1890ff",
    },
  },
  shortcuts: [
    // 继承 frontEnd 项目的公共样式
    ["h-btn", "h-48px w-100% bg-#5C33BE b-none text-white rounded-8px"],
    ["wh-full", "w-full h-full"],
    ["f-ic", "flex items-center"],
    ["f-c-c", "flex justify-center items-center"],
    ["flex-col", "flex flex-col"],

    // 管理系统特有的样式快捷方式
    [
      "management-card",
      "bg-white rounded-lg shadow-md p-6 border border-gray-200",
    ],
    [
      "management-header",
      "bg-white shadow-sm border-b border-gray-200 px-6 py-4",
    ],
    ["management-sidebar", "bg-gray-50 border-r border-gray-200 w-64 h-full"],
    ["management-content", "flex-1 p-6 bg-gray-50 min-h-screen"],
    [
      "management-btn-primary",
      "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors",
    ],
    [
      "management-btn-secondary",
      "bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors",
    ],
    [
      "management-input",
      "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
    ],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { display: "inline-block", "vertical-align": "middle" },
    }),
    presetTypography(),
  ],
  transformers: [transformerAttributifyJsx()],
  // 安全列表，确保管理系统常用的样式类不被清除
  safelist: [
    "management-card",
    "management-header",
    "management-sidebar",
    "management-content",
    "management-btn-primary",
    "management-btn-secondary",
    "management-input",
  ],
});
