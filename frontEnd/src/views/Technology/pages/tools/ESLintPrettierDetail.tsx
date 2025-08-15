import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    CheckCircleOutlined, 
    WarningOutlined,
    BugOutlined,
    ToolOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const ESLintPrettierDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/tools')
    }
    
    return (
        <div className={styles.topic_detail_container}>
            {/* 返回按钮 */}
            <div className={styles.back_section}>
                <Button 
                    type="text" 
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                    className={styles.back_button}
                >
                    返回开发工具技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ToolOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>ESLint & Prettier 详解</h1>
                    <p>掌握代码质量检查与格式化工具的配置与使用</p>
                    <div className={styles.topic_tags}>
                        <Tag color="red">ESLint</Tag>
                        <Tag color="blue">Prettier</Tag>
                        <Tag color="green">代码质量</Tag>
                        <Tag color="orange">代码格式化</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* ESLint基础 */}
                <Card title="🔍 ESLint 代码检查" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是ESLint？</h3>
                        <p>ESLint是一个开源的JavaScript代码检查工具，用于识别和报告代码中的模式匹配问题，帮助开发者编写更一致、更少bug的代码。</p>
                        
                        <h3>核心功能</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🐛 错误检测</h4>
                                <p>发现代码中的语法错误和逻辑问题</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📏 代码规范</h4>
                                <p>强制执行一致的代码风格</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔧 自动修复</h4>
                                <p>自动修复可修复的问题</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔌 可扩展</h4>
                                <p>支持插件和自定义规则</p>
                            </div>
                        </div>
                        
                        <h3>安装与配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 安装ESLint
npm install eslint --save-dev

# 初始化配置
npx eslint --init

# 或者手动安装配置
npm install --save-dev \
  eslint \
  @eslint/js \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser

# 检查文件
npx eslint src/
npx eslint src/ --fix  # 自动修复

# package.json脚本
{
  "scripts": {
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix"
  }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* ESLint配置 */}
                <Card title="⚙️ ESLint 配置详解" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 基础配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks'
  ],
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'no-unused-vars': 'warn',
    'no-console': 'warn'
  }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. React项目配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// React + TypeScript配置
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jsx-a11y'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. Vue项目配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// Vue 3 + TypeScript配置
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'vue/component-definition-name-casing': ['error', 'PascalCase']
  }
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Prettier配置 */}
                <Card title="🎨 Prettier 代码格式化" className={styles.content_card}>
                    <div className={styles.prettier_section}>
                        <h3>什么是Prettier？</h3>
                        <p>Prettier是一个代码格式化工具，支持多种语言，能够解析代码并使用自己的规则重新打印代码，确保代码风格的一致性。</p>
                        
                        <h3>安装与配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 安装Prettier
npm install --save-dev prettier

# 创建配置文件
echo {}> .prettierrc.json

# 创建忽略文件
echo "node_modules" > .prettierignore

# 格式化代码
npx prettier --write .
npx prettier --check .

# package.json脚本
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>配置选项</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// .prettierrc.json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto"
}

// .prettierignore
node_modules
dist
build
coverage
*.min.js
*.min.css
public/
.next/
.nuxt/`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* ESLint与Prettier集成 */}
                <Card title="🔗 ESLint 与 Prettier 集成" className={styles.content_card}>
                    <div className={styles.integration_section}>
                        <h3>解决冲突</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 安装集成插件
npm install --save-dev \
  eslint-config-prettier \
  eslint-plugin-prettier

# .eslintrc.js配置
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:prettier/recommended'  // 必须放在最后
  ],
  plugins: [
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error'
  }
}

# 或者分离配置
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'prettier'  // 禁用与Prettier冲突的规则
  ]
}`}
                            </pre>
                        </div>
                        
                        <h3>编辑器集成</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// VS Code设置 (.vscode/settings.json)
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ]
}

// VS Code扩展
// - ESLint
// - Prettier - Code formatter
// - Vetur (Vue)
// - ES7+ React/Redux/React-Native snippets`}
                            </pre>
                        </div>
                        
                        <h3>Git Hooks集成</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 安装husky和lint-staged
npm install --save-dev husky lint-staged

# 初始化husky
npx husky install
npm pkg set scripts.prepare="husky install"

# 添加pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# package.json配置
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss,less,html,json,md}": [
      "prettier --write"
    ]
  }
}

# 或者使用commitizen
npm install --save-dev @commitlint/cli @commitlint/config-conventional
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 高级配置 */}
                <Card title="🚀 高级配置与优化" className={styles.content_card}>
                    <div className={styles.advanced_section}>
                        <h3>自定义规则</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 自定义ESLint规则
module.exports = {
  rules: {
    // 禁用console.log
    'no-console': ['error', { allow: ['warn', 'error'] }],
    
    // 强制使用const
    'prefer-const': 'error',
    
    // 禁用var
    'no-var': 'error',
    
    // 强制使用模板字符串
    'prefer-template': 'error',
    
    // 禁用未使用的变量
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' }
    ],
    
    // React特定规则
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    
    // Vue特定规则
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/no-unused-components': 'error'
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>项目特定配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 不同目录不同规则
module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      extends: ['@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error'
      }
    },
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true
      },
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['scripts/**/*.js'],
      env: {
        node: true
      },
      rules: {
        'no-console': 'off'
      }
    }
  ]
}

// 忽略文件 (.eslintignore)
node_modules/
dist/
build/
coverage/
*.min.js
public/
.next/
.nuxt/`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ ESLint & Prettier 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 团队规范</h4>
                                <p>建立统一的代码规范</p>
                                <ul>
                                    <li>制定团队统一的ESLint配置</li>
                                    <li>使用共享配置包</li>
                                    <li>定期更新规则和插件</li>
                                    <li>文档化特殊规则的原因</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 自动化集成</h4>
                                <p>集成到开发工作流</p>
                                <ul>
                                    <li>配置编辑器自动格式化</li>
                                    <li>使用Git Hooks确保代码质量</li>
                                    <li>集成到CI/CD流程</li>
                                    <li>配置代码审查工具</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能优化</h4>
                                <p>优化检查性能</p>
                                <ul>
                                    <li>合理配置忽略文件</li>
                                    <li>使用缓存加速检查</li>
                                    <li>只检查变更的文件</li>
                                    <li>并行执行检查任务</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 渐进式采用</h4>
                                <p>逐步引入和优化</p>
                                <ul>
                                    <li>从基础规则开始</li>
                                    <li>逐步增加严格规则</li>
                                    <li>处理遗留代码问题</li>
                                    <li>培训团队成员</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ESLintPrettierDetail
