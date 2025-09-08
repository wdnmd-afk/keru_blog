#!/usr/bin/env node

/**
 * 路径诊断工具
 * 
 * 功能：
 * 1. 检查项目目录结构
 * 2. 验证扫描工具的路径配置
 * 3. 列出可扫描的文件
 * 4. 提供配置建议
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class PathDiagnostic {
    constructor() {
        this.currentDir = process.cwd();
        this.projectRoot = path.resolve(this.currentDir, '..');
    }

    /**
     * 运行诊断
     */
    async run() {
        console.log('🔍 路径配置诊断工具');
        console.log('='.repeat(50));
        
        this.checkCurrentDirectory();
        this.checkProjectStructure();
        this.checkFrontendDirectory();
        this.testScanPaths();
        this.provideSuggestions();
    }

    /**
     * 检查当前目录
     */
    checkCurrentDirectory() {
        console.log('\n📍 当前工作目录信息:');
        console.log(`   当前目录: ${this.currentDir}`);
        console.log(`   项目根目录: ${this.projectRoot}`);
        
        // 检查是否在scripts目录下
        if (path.basename(this.currentDir) === 'scripts') {
            console.log('   ✅ 正确在scripts目录下运行');
        } else {
            console.log('   ⚠️  不在scripts目录下，可能影响相对路径解析');
        }
    }

    /**
     * 检查项目结构
     */
    checkProjectStructure() {
        console.log('\n📁 项目目录结构检查:');
        
        const commonPaths = [
            '../frontEnd',
            '../frontEnd/src',
            '../frontEnd/src/components',
            '../frontEnd/src/views',
            '../frontEnd/src/i18n',
            '../src',
            '../app',
            './frontEnd',
            './frontEnd/src'
        ];

        commonPaths.forEach(pathToCheck => {
            const fullPath = path.resolve(this.currentDir, pathToCheck);
            const exists = fs.existsSync(fullPath);
            const status = exists ? '✅' : '❌';
            console.log(`   ${status} ${pathToCheck} -> ${exists ? '存在' : '不存在'}`);
            
            if (exists && fs.statSync(fullPath).isDirectory()) {
                const files = fs.readdirSync(fullPath);
                const reactFiles = files.filter(f => f.endsWith('.tsx') || f.endsWith('.jsx'));
                if (reactFiles.length > 0) {
                    console.log(`      📄 包含 ${reactFiles.length} 个React文件`);
                }
            }
        });
    }

    /**
     * 检查前端目录
     */
    checkFrontendDirectory() {
        console.log('\n🎯 前端源码目录分析:');
        
        const possibleSrcDirs = [
            '../frontEnd/src',
            '../src',
            '../app',
            './frontEnd/src'
        ];

        let bestMatch = null;
        let maxFiles = 0;

        possibleSrcDirs.forEach(srcDir => {
            const fullPath = path.resolve(this.currentDir, srcDir);
            if (fs.existsSync(fullPath)) {
                try {
                    const pattern = `${fullPath}/**/*.{tsx,ts,jsx,js}`;
                    const files = glob.sync(pattern, {
                        ignore: ['**/node_modules/**', '**/dist/**', '**/build/**']
                    });
                    
                    console.log(`   📂 ${srcDir}:`);
                    console.log(`      文件数量: ${files.length}`);
                    
                    if (files.length > 0) {
                        const extensions = {};
                        files.forEach(file => {
                            const ext = path.extname(file);
                            extensions[ext] = (extensions[ext] || 0) + 1;
                        });
                        
                        console.log(`      文件类型分布:`);
                        Object.entries(extensions).forEach(([ext, count]) => {
                            console.log(`        ${ext}: ${count} 个`);
                        });
                        
                        // 检查是否包含中文文本
                        const sampleFiles = files.slice(0, 5);
                        let chineseCount = 0;
                        sampleFiles.forEach(file => {
                            try {
                                const content = fs.readFileSync(file, 'utf-8');
                                if (/[\u4e00-\u9fa5]/.test(content)) {
                                    chineseCount++;
                                }
                            } catch (e) {
                                // 忽略读取错误
                            }
                        });
                        
                        if (chineseCount > 0) {
                            console.log(`      🈶 样本文件中 ${chineseCount}/${sampleFiles.length} 包含中文`);
                        }
                    }
                    
                    if (files.length > maxFiles) {
                        maxFiles = files.length;
                        bestMatch = srcDir;
                    }
                    
                } catch (error) {
                    console.log(`      ❌ 扫描失败: ${error.message}`);
                }
            }
        });

        if (bestMatch) {
            console.log(`\n🎯 推荐的源码目录: ${bestMatch}`);
        }
    }

    /**
     * 测试扫描路径
     */
    testScanPaths() {
        console.log('\n🧪 扫描路径测试:');
        
        const testConfigs = [
            { srcDir: '../frontEnd/src', name: '默认配置' },
            { srcDir: '../src', name: '简化路径' },
            { srcDir: './frontEnd/src', name: '当前目录' },
            { srcDir: 'frontEnd/src', name: '相对路径' }
        ];

        testConfigs.forEach(config => {
            console.log(`\n   📋 测试 ${config.name} (${config.srcDir}):`);
            
            const fullPath = path.resolve(this.currentDir, config.srcDir);
            if (!fs.existsSync(fullPath)) {
                console.log(`      ❌ 目录不存在: ${fullPath}`);
                return;
            }

            try {
                const pattern = `${config.srcDir}/**/*.{tsx,ts,jsx,js}`;
                const files = glob.sync(pattern, {
                    ignore: ['**/node_modules/**', '**/dist/**', '**/build/**'],
                    cwd: this.currentDir
                });

                console.log(`      📄 找到文件: ${files.length} 个`);
                
                if (files.length > 0) {
                    console.log(`      📝 示例文件:`);
                    files.slice(0, 3).forEach(file => {
                        console.log(`        - ${file}`);
                    });
                }
                
                if (files.length === 0) {
                    console.log(`      ⚠️  未找到匹配文件，检查路径和扩展名配置`);
                }
                
            } catch (error) {
                console.log(`      ❌ 扫描失败: ${error.message}`);
            }
        });
    }

    /**
     * 提供配置建议
     */
    provideSuggestions() {
        console.log('\n💡 配置建议:');
        console.log('─'.repeat(30));
        
        // 检查package.json中的scripts配置
        const packageJsonPath = path.join(this.currentDir, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            console.log('\n📦 当前package.json scripts配置:');
            Object.entries(packageJson.scripts || {}).forEach(([name, script]) => {
                if (name.includes('scan') || name.includes('i18n')) {
                    console.log(`   ${name}: ${script}`);
                }
            });
        }

        console.log('\n🔧 推荐的修复步骤:');
        console.log('   1. 确认前端源码目录位置');
        console.log('   2. 更新i18n-scanner.js中的srcDir配置');
        console.log('   3. 检查文件扩展名配置是否完整');
        console.log('   4. 验证排除模式是否过于宽泛');
        console.log('   5. 重新运行扫描命令');

        console.log('\n📝 示例配置:');
        console.log('   如果前端代码在 ../frontEnd/src:');
        console.log('   srcDir: "../frontEnd/src"');
        console.log('   extensions: [".tsx", ".ts", ".jsx", ".js"]');
        
        console.log('\n🚀 测试命令:');
        console.log('   node path-diagnostic.js  # 运行此诊断工具');
        console.log('   node i18n-scanner.js ../frontEnd/src  # 指定源码目录');
        console.log('   pnpm scan  # 使用默认配置');
    }
}

// 运行诊断
if (require.main === module) {
    const diagnostic = new PathDiagnostic();
    diagnostic.run().catch(console.error);
}

module.exports = PathDiagnostic;
