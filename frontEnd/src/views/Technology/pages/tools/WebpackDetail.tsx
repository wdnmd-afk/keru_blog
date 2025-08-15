import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    BuildOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const WebpackDetail: React.FC = () => {
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
                    <BuildOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Webpack 构建工具详解</h1>
                    <p>掌握现代前端项目的模块打包与构建优化技术</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">Webpack</Tag>
                        <Tag color="green">模块打包</Tag>
                        <Tag color="orange">构建工具</Tag>
                        <Tag color="purple">性能优化</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* Webpack基础 */}
                <Card title="📚 Webpack 核心概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Webpack？</h3>
                        <p>Webpack是一个现代JavaScript应用程序的静态模块打包器。当webpack处理应用程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle。</p>
                        
                        <h3>核心概念</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>📥 入口 (Entry)</h4>
                                <p>指示webpack应该使用哪个模块来作为构建其内部依赖图的开始</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📤 输出 (Output)</h4>
                                <p>告诉webpack在哪里输出它所创建的bundles，以及如何命名这些文件</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔄 加载器 (Loaders)</h4>
                                <p>让webpack能够去处理那些非JavaScript文件</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔌 插件 (Plugins)</h4>
                                <p>用于执行范围更广的任务，从打包优化到资源管理</p>
                            </div>
                        </div>
                        
                        <h3>基本配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// webpack.config.js
const path = require('path')

module.exports = {
  // 入口文件
  entry: './src/index.js',
  
  // 输出配置
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  
  // 模式：development | production | none
  mode: 'development',
  
  // 模块规则
  module: {
    rules: [
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 加载器配置 */}
                <Card title="🔄 加载器 (Loaders) 详解" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 样式加载器</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 安装样式相关加载器
npm install --save-dev css-loader style-loader sass-loader node-sass

// webpack.config.js
module.exports = {
  module: {
    rules: [
      // CSS文件
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader']
      },
      
      // SCSS/SASS文件
      {
        test: /\\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      
      // 带CSS模块的配置
      {
        test: /\\.module\\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            }
          }
        ]
      }
    ]
  }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 文件加载器</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 安装文件处理加载器
npm install --save-dev file-loader url-loader

module.exports = {
  module: {
    rules: [
      // 图片文件
      {
        test: /\\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      
      // 小图片转base64
      {
        test: /\\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 8KB以下转base64
              name: '[name].[hash].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      
      // 字体文件
      {
        test: /\\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. JavaScript加载器</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 安装JavaScript相关加载器
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react

module.exports = {
  module: {
    rules: [
      // JavaScript/JSX
      {
        test: /\\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      
      // TypeScript
      {
        test: /\\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      
      // ESLint检查
      {
        test: /\\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: {
            failOnError: true
          }
        }
      }
    ]
  }
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 插件系统 */}
                <Card title="🔌 插件 (Plugins) 系统" className={styles.content_card}>
                    <div className={styles.plugins_section}>
                        <h3>常用插件配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  plugins: [
    // 清理输出目录
    new CleanWebpackPlugin(),
    
    // 生成HTML文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true
      }
    }),
    
    // 提取CSS到单独文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css'
    }),
    
    // 定义环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_URL': JSON.stringify(process.env.API_URL)
    }),
    
    // 热模块替换
    new webpack.HotModuleReplacementPlugin(),
    
    // 提供全局变量
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}`}
                            </pre>
                        </div>
                        
                        <h3>生产环境优化插件</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  optimization: {
    minimizer: [
      // JavaScript压缩
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 移除console
            drop_debugger: true // 移除debugger
          }
        }
      }),
      
      // CSS压缩
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true,
          discardComments: {
            removeAll: true
          }
        }
      })
    ]
  },
  
  plugins: [
    // Gzip压缩
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    }),
    
    // 包分析器
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html'
    })
  ]
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 代码分割 */}
                <Card title="✂️ 代码分割与优化" className={styles.content_card}>
                    <div className={styles.optimization_section}>
                        <h3>代码分割配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 第三方库
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        },
        
        // 公共代码
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true
        },
        
        // CSS文件
        styles: {
          name: 'styles',
          test: /\\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    
    // 运行时代码单独提取
    runtimeChunk: {
      name: 'runtime'
    }
  },
  
  // 多入口配置
  entry: {
    main: './src/index.js',
    admin: './src/admin.js'
  },
  
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js'
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>动态导入</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 动态导入组件
const LazyComponent = React.lazy(() => import('./LazyComponent'))

// 动态导入模块
async function loadModule() {
  const module = await import('./heavyModule')
  return module.default
}

// 条件加载
if (condition) {
  import('./conditionalModule').then(module => {
    module.init()
  })
}

// 预加载
import(
  /* webpackPreload: true */
  './PreloadedComponent'
)

// 预获取
import(
  /* webpackPrefetch: true */
  './PrefetchedComponent'
)

// 自定义chunk名称
import(
  /* webpackChunkName: "my-chunk-name" */
  './MyComponent'
)`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 开发环境配置 */}
                <Card title="🛠️ 开发环境配置" className={styles.content_card}>
                    <div className={styles.dev_section}>
                        <h3>开发服务器配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`module.exports = {
  mode: 'development',
  
  // 开发工具
  devtool: 'eval-source-map',
  
  // 开发服务器
  devServer: {
    contentBase: './dist',
    hot: true,
    open: true,
    port: 3000,
    host: 'localhost',
    
    // 代理API请求
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    
    // 历史路由支持
    historyApiFallback: {
      rewrites: [
        { from: /^\\/admin/, to: '/admin.html' },
        { from: /./, to: '/index.html' }
      ]
    },
    
    // 覆盖配置
    overlay: {
      warnings: true,
      errors: true
    }
  },
  
  // 监听配置
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>环境变量配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// webpack.config.js
const webpack = require('webpack')
const dotenv = require('dotenv')

// 加载环境变量
const env = dotenv.config().parsed || {}

// 转换为webpack可用的格式
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[\`process.env.\${next}\`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = {
  plugins: [
    new webpack.DefinePlugin(envKeys)
  ]
}

// .env 文件
API_URL=http://localhost:8080
DEBUG=true
VERSION=1.0.0

// 在代码中使用
console.log(process.env.API_URL)
console.log(process.env.DEBUG)`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ Webpack 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 配置文件分离</h4>
                                <p>根据环境分离配置文件，提高可维护性</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// webpack.common.js - 公共配置
// webpack.dev.js - 开发环境配置
// webpack.prod.js - 生产环境配置

// webpack.dev.js
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
})`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 性能优化策略</h4>
                                <p>采用多种策略优化构建性能</p>
                                <ul>
                                    <li>使用缓存加速构建</li>
                                    <li>合理配置resolve.modules</li>
                                    <li>使用DllPlugin预构建第三方库</li>
                                    <li>开启多进程构建</li>
                                    <li>优化loader配置</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 包大小优化</h4>
                                <p>减少最终包的大小，提升加载性能</p>
                                <ul>
                                    <li>启用Tree Shaking</li>
                                    <li>使用代码分割</li>
                                    <li>压缩代码和资源</li>
                                    <li>移除未使用的代码</li>
                                    <li>使用CDN加载第三方库</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 调试和监控</h4>
                                <p>配置适当的调试工具和监控</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 生产环境source map
module.exports = {
  devtool: 'source-map', // 生成独立的source map文件
  
  // 或者使用hidden-source-map（不在bundle中引用）
  devtool: 'hidden-source-map'
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default WebpackDetail
