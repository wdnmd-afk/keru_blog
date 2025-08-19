import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    SettingOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const ConfigurationDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/typescript')
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
                    返回TypeScript技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <SettingOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>TypeScript 配置与工具链详解</h1>
                    <p>掌握TypeScript项目配置与开发工具链</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">tsconfig.json</Tag>
                        <Tag color="green">编译配置</Tag>
                        <Tag color="orange">开发工具</Tag>
                        <Tag color="purple">构建优化</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* tsconfig.json详解 */}
                <Card title="⚙️ tsconfig.json 配置详解" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>配置文件结构</h3>
                        <p>tsconfig.json是TypeScript项目的配置文件，定义了编译选项、文件包含规则和项目设置。</p>
                        
                        <h3>基础配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// tsconfig.json 基础配置
{
  "compilerOptions": {
    // 编译目标
    "target": "ES2020",                    // 编译目标版本
    "module": "ESNext",                    // 模块系统
    "lib": ["ES2020", "DOM", "DOM.Iterable"], // 包含的库
    
    // 模块解析
    "moduleResolution": "node",            // 模块解析策略
    "baseUrl": "./",                       // 基础路径
    "paths": {                             // 路径映射
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    },
    
    // 输出配置
    "outDir": "./dist",                    // 输出目录
    "rootDir": "./src",                    // 根目录
    "declaration": true,                   // 生成声明文件
    "declarationMap": true,                // 生成声明映射
    "sourceMap": true,                     // 生成源映射
    
    // 类型检查
    "strict": true,                        // 启用所有严格检查
    "noImplicitAny": true,                // 禁止隐式any
    "strictNullChecks": true,             // 严格空值检查
    "strictFunctionTypes": true,          // 严格函数类型
    "noImplicitReturns": true,            // 禁止隐式返回
    "noUnusedLocals": true,               // 检查未使用的局部变量
    "noUnusedParameters": true,           // 检查未使用的参数
    
    // 其他选项
    "esModuleInterop": true,              // ES模块互操作
    "allowSyntheticDefaultImports": true, // 允许合成默认导入
    "skipLibCheck": true,                 // 跳过库文件检查
    "forceConsistentCasingInFileNames": true // 强制文件名大小写一致
  },
  
  // 包含的文件
  "include": [
    "src/**/*",
    "types/**/*"
  ],
  
  // 排除的文件
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts"
  ],
  
  // 引用的项目
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/utils" }
  ]
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 编译选项详解 */}
                <Card title="🔧 编译选项详解" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 目标与模块配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 目标版本配置
{
  "compilerOptions": {
    // 编译目标 (ES3, ES5, ES2015, ES2017, ES2018, ES2019, ES2020, ESNext)
    "target": "ES2020",
    
    // 模块系统 (CommonJS, AMD, System, UMD, ES6, ES2015, ES2020, ESNext)
    "module": "ESNext",
    
    // 包含的库文件
    "lib": [
      "ES2020",           // ES2020 语法支持
      "DOM",              // DOM API
      "DOM.Iterable",     // DOM 迭代器
      "WebWorker"         // Web Worker API
    ],
    
    // JSX 配置
    "jsx": "react-jsx",   // react-jsx, react, preserve
    "jsxFactory": "React.createElement",
    "jsxFragmentFactory": "React.Fragment",
    
    // 实验性功能
    "experimentalDecorators": true,    // 装饰器支持
    "emitDecoratorMetadata": true,     // 装饰器元数据
    "useDefineForClassFields": true    // 类字段定义
  }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 严格模式配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 严格模式选项
{
  "compilerOptions": {
    // 启用所有严格检查 (推荐)
    "strict": true,
    
    // 或者单独配置
    "noImplicitAny": true,              // 禁止隐式any类型
    "strictNullChecks": true,           // 严格空值检查
    "strictFunctionTypes": true,        // 严格函数类型检查
    "strictBindCallApply": true,        // 严格bind/call/apply检查
    "strictPropertyInitialization": true, // 严格属性初始化检查
    "noImplicitThis": true,             // 禁止隐式this
    "alwaysStrict": true,               // 总是以严格模式解析
    
    // 额外检查
    "noUnusedLocals": true,             // 检查未使用的局部变量
    "noUnusedParameters": true,         // 检查未使用的参数
    "exactOptionalPropertyTypes": true, // 精确可选属性类型
    "noImplicitReturns": true,          // 禁止隐式返回
    "noFallthroughCasesInSwitch": true, // 禁止switch穿透
    "noUncheckedIndexedAccess": true,   // 检查索引访问
    "noImplicitOverride": true,         // 需要显式override
    "noPropertyAccessFromIndexSignature": true // 禁止从索引签名访问属性
  }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 模块解析配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 模块解析配置
{
  "compilerOptions": {
    "moduleResolution": "node",         // node 或 classic
    "baseUrl": "./src",                 // 基础URL
    
    // 路径映射
    "paths": {
      "@/*": ["*"],
      "@components/*": ["components/*"],
      "@utils/*": ["utils/*"],
      "@types/*": ["../types/*"],
      "~/*": ["../node_modules/*"]
    },
    
    // 根目录
    "rootDirs": ["src", "generated"],
    
    // 类型根目录
    "typeRoots": [
      "./node_modules/@types",
      "./src/types"
    ],
    
    // 包含的类型包
    "types": ["node", "jest", "react"],
    
    // 模块后缀
    "resolveJsonModule": true,          // 解析JSON模块
    "allowJs": true,                    // 允许JS文件
    "checkJs": true,                    // 检查JS文件
    
    // 互操作性
    "esModuleInterop": true,            // ES模块互操作
    "allowSyntheticDefaultImports": true, // 允许合成默认导入
    "isolatedModules": true             // 隔离模块
  }
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 项目配置策略 */}
                <Card title="📁 项目配置策略" className={styles.content_card}>
                    <div className={styles.project_section}>
                        <h3>多项目配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 根目录 tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/ui" },
    { "path": "./packages/utils" },
    { "path": "./apps/web" },
    { "path": "./apps/mobile" }
  ]
}

// packages/core/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true,              // 启用项目引用
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.test.ts"]
}

// tsconfig.base.json (共享配置)
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>环境特定配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// tsconfig.json (开发环境)
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "sourceMap": true,
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  },
  "include": ["src/**/*", "tests/**/*"]
}

// tsconfig.prod.json (生产环境)
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "sourceMap": false,
    "removeComments": true,
    "declaration": true,
    "declarationMap": false
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.test.ts", "**/*.spec.ts"]
}

// package.json 脚本
{
  "scripts": {
    "build": "tsc -p tsconfig.prod.json",
    "build:dev": "tsc -p tsconfig.json",
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch"
  }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 开发工具集成 */}
                <Card title="🛠️ 开发工具集成" className={styles.content_card}>
                    <div className={styles.tools_section}>
                        <h3>VS Code配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// .vscode/settings.json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.inlayHints.parameterNames.enabled": "all",
  "typescript.inlayHints.variableTypes.enabled": true,
  "typescript.inlayHints.functionLikeReturnTypes.enabled": true,
  
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll.eslint": true
  },
  
  "files.associations": {
    "*.json": "jsonc"
  }
}

// .vscode/extensions.json (推荐扩展)
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-json"
  ]
}`}
                            </pre>
                        </div>
                        
                        <h3>ESLint集成</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    '@typescript-eslint/recommended-requiring-type-checking'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/prefer-const': 'error',
    '@typescript-eslint/no-inferrable-types': 'off'
  }
}

// package.json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix"
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>构建工具集成</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Webpack配置
const path = require('path')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components')
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}

// Vite配置
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyLib',
      fileName: 'my-lib'
    }
  }
})

// Rollup配置
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.json'
    })
  ]
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 配置最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 配置管理</h4>
                                <p>合理组织TypeScript配置</p>
                                <ul>
                                    <li>使用extends继承基础配置</li>
                                    <li>为不同环境创建专门配置</li>
                                    <li>启用严格模式提高代码质量</li>
                                    <li>合理配置路径映射</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 编译优化</h4>
                                <p>优化TypeScript编译性能</p>
                                <ul>
                                    <li>启用增量编译</li>
                                    <li>使用项目引用管理大型项目</li>
                                    <li>合理配置include和exclude</li>
                                    <li>跳过不必要的库文件检查</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 工具集成</h4>
                                <p>充分利用开发工具</p>
                                <ul>
                                    <li>配置IDE获得最佳开发体验</li>
                                    <li>集成ESLint进行代码检查</li>
                                    <li>使用Prettier统一代码格式</li>
                                    <li>配置自动化构建流程</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 团队协作</h4>
                                <p>建立团队开发规范</p>
                                <ul>
                                    <li>统一团队TypeScript配置</li>
                                    <li>建立代码审查流程</li>
                                    <li>文档化配置选择原因</li>
                                    <li>定期更新工具链版本</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ConfigurationDetail
