/**
 * 统一的 Prettier 配置
 * 用于 keru_blog 项目的代码格式化
 */

/**
 * 项目格式化配置
 */
const FORMAT_CONFIGS = {
  frontend: {
    name: 'frontEnd',
    displayName: 'Frontend 项目',
    path: 'frontEnd',
    patterns: [
      'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}',
      '*.{js,ts,json,md}',
      'vite.config.ts',
      'uno.config.ts'
    ],
    formatCommand: 'cd frontEnd && npx prettier --write',
    checkCommand: 'cd frontEnd && npx prettier --check',
    type: 'react-vite'
  },
  management: {
    name: 'management',
    displayName: 'Management 项目',
    path: 'management',
    patterns: [
      'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}',
      '*.{js,ts,json,md}',
      'vite.config.ts',
      'uno.config.ts'
    ],
    formatCommand: 'cd management && npx prettier --write',
    checkCommand: 'cd management && npx prettier --check',
    type: 'react-vite'
  },
  server: {
    name: 'server',
    displayName: 'Server 项目',
    path: 'server',
    patterns: [
      'src/**/*.{js,ts,json}',
      '*.{js,ts,json}',
      'scripts/**/*.{js,ts}'
    ],
    formatCommand: 'cd server && npx prettier --write',
    checkCommand: 'cd server && npx prettier --check',
    type: 'node-express'
  }
};

/**
 * 统一的 Prettier 配置选项
 */
const PRETTIER_CONFIG = {
  // 基础配置
  printWidth: 100,           // 每行最大字符数
  tabWidth: 2,               // 缩进空格数
  useTabs: false,            // 使用空格而不是制表符
  semi: true,                // 语句末尾添加分号
  singleQuote: true,         // 使用单引号
  quoteProps: 'as-needed',   // 对象属性引号策略

  // JSX 配置
  jsxSingleQuote: true,      // JSX 中使用单引号
  jsxBracketSameLine: false, // JSX 标签的右括号另起一行

  // 尾随逗号
  trailingComma: 'es5',      // 在 ES5 中有效的地方添加尾随逗号

  // 括号空格
  bracketSpacing: true,      // 对象字面量的括号间添加空格

  // 箭头函数参数括号
  arrowParens: 'avoid',      // 单参数箭头函数省略括号

  // 换行符
  endOfLine: 'lf',           // 使用 LF 换行符

  // HTML 空格敏感性
  htmlWhitespaceSensitivity: 'css',

  // Vue 文件中的脚本和样式标签缩进
  vueIndentScriptAndStyle: false,

  // 嵌入式语言格式化
  embeddedLanguageFormatting: 'auto'
};

/**
 * 根据文件类型获取特定配置
 * @param {string} fileType - 文件类型
 * @returns {Object} 配置对象
 */
function getConfigForFileType(fileType) {
  const baseConfig = { ...PRETTIER_CONFIG };

  switch (fileType) {
    case 'json':
      return {
        ...baseConfig,
        parser: 'json',
        trailingComma: 'none' // JSON 不支持尾随逗号
      };

    case 'markdown':
      return {
        ...baseConfig,
        parser: 'markdown',
        printWidth: 80,        // Markdown 建议较短的行长度
        proseWrap: 'preserve'  // 保持原有的换行
      };

    case 'css':
    case 'scss':
      return {
        ...baseConfig,
        parser: fileType,
        singleQuote: false     // CSS 中通常使用双引号
      };

    case 'typescript':
    case 'javascript':
      return {
        ...baseConfig,
        parser: fileType === 'typescript' ? 'typescript' : 'babel'
      };

    case 'tsx':
    case 'jsx':
      return {
        ...baseConfig,
        parser: fileType === 'tsx' ? 'typescript' : 'babel-ts'
      };

    default:
      return baseConfig;
  }
}

/**
 * 生成 .prettierrc 配置文件内容
 * @param {string} projectType - 项目类型
 * @returns {string} 配置文件内容
 */
function generatePrettierRC(projectType = 'default') {
  let config = { ...PRETTIER_CONFIG };

  // 根据项目类型调整配置
  if (projectType === 'react-vite') {
    config = {
      ...config,
      // React 项目特定配置
      jsxSingleQuote: true,
      jsxBracketSameLine: false
    };
  } else if (projectType === 'node-express') {
    config = {
      ...config,
      // Node.js 项目特定配置
      printWidth: 120,  // 服务端代码可以稍长一些
      semi: true
    };
  }

  return JSON.stringify(config, null, 2);
}

/**
 * 生成 .prettierignore 文件内容
 * @param {string} projectType - 项目类型
 * @returns {string} 忽略文件内容
 */
function generatePrettierIgnore(projectType = 'default') {
  const commonIgnores = [
    '# 依赖目录',
    'node_modules/',
    '',
    '# 构建输出',
    'dist/',
    'build/',
    '',
    '# 日志文件',
    '*.log',
    'logs/',
    '',
    '# 临时文件',
    '.tmp/',
    'temp/',
    '',
    '# 版本控制',
    '.git/',
    '',
    '# IDE 配置',
    '.vscode/',
    '.idea/',
    '',
    '# 系统文件',
    '.DS_Store',
    'Thumbs.db'
  ];

  if (projectType === 'react-vite') {
    return [
      ...commonIgnores,
      '',
      '# Vite 特定',
      '.vite/',
      'vite.config.ts.timestamp-*',
      '',
      '# 静态资源',
      'public/',
      '',
      '# 类型声明文件',
      '*.d.ts'
    ].join('\n');
  } else if (projectType === 'node-express') {
    return [
      ...commonIgnores,
      '',
      '# Prisma 生成文件',
      'prisma/migrations/',
      '',
      '# 静态文件',
      'static/',
      '',
      '# 数据库文件',
      '*.db',
      '*.sqlite'
    ].join('\n');
  }

  return commonIgnores.join('\n');
}

export {
  FORMAT_CONFIGS,
  PRETTIER_CONFIG,
  getConfigForFileType,
  generatePrettierRC,
  generatePrettierIgnore
};
