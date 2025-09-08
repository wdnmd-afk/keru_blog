#!/usr/bin/env node

/**
 * TypeScript配置测试脚本
 * 
 * 功能：
 * 1. 验证TypeScript配置是否正确
 * 2. 检查JSON文件是否被正确包含
 * 3. 测试国际化文件的导入
 * 4. 验证类型定义是否正确
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TypeScriptConfigTester {
    constructor() {
        this.frontEndDir = path.resolve(__dirname, '../frontEnd');
        this.issues = [];
        this.fixes = [];
    }

    /**
     * 运行测试
     */
    async run() {
        console.log('🔍 TypeScript配置测试开始');
        console.log('='.repeat(50));

        await this.checkTsConfig();
        await this.checkJsonFiles();
        await this.checkTypeDefinitions();
        await this.testCompilation();
        
        this.printSummary();
    }

    /**
     * 检查tsconfig.json配置
     */
    async checkTsConfig() {
        console.log('\n📋 检查tsconfig.json配置...');
        
        try {
            const tsconfigPath = path.join(this.frontEndDir, 'tsconfig.json');
            const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
            
            // 检查include配置
            if (tsconfig.include && tsconfig.include.includes('src/**/*.json')) {
                console.log('   ✅ JSON文件已包含在include配置中');
                this.fixes.push('JSON文件包含配置正确');
            } else {
                console.log('   ❌ JSON文件未包含在include配置中');
                this.issues.push('tsconfig.json缺少JSON文件包含配置');
            }
            
            // 检查resolveJsonModule选项
            if (tsconfig.compilerOptions && tsconfig.compilerOptions.resolveJsonModule) {
                console.log('   ✅ resolveJsonModule选项已启用');
                this.fixes.push('resolveJsonModule配置正确');
            } else {
                console.log('   ❌ resolveJsonModule选项未启用');
                this.issues.push('缺少resolveJsonModule配置');
            }
            
            // 检查路径别名
            if (tsconfig.compilerOptions && tsconfig.compilerOptions.paths) {
                console.log('   ✅ 路径别名配置存在');
                console.log(`      @: ${JSON.stringify(tsconfig.compilerOptions.paths['@'])}`);
                console.log(`      @/*: ${JSON.stringify(tsconfig.compilerOptions.paths['@/*'])}`);
                this.fixes.push('路径别名配置正确');
            } else {
                console.log('   ⚠️  路径别名配置缺失');
                this.issues.push('缺少路径别名配置');
            }

        } catch (error) {
            console.log(`   ❌ 读取tsconfig.json失败: ${error.message}`);
            this.issues.push(`tsconfig.json读取错误: ${error.message}`);
        }
    }

    /**
     * 检查JSON文件
     */
    async checkJsonFiles() {
        console.log('\n📄 检查国际化JSON文件...');
        
        const i18nDir = path.join(this.frontEndDir, 'src/i18n/locales');
        
        if (!fs.existsSync(i18nDir)) {
            console.log('   ❌ 国际化目录不存在');
            this.issues.push('国际化目录缺失');
            return;
        }

        const languages = ['zh', 'en'];
        const namespaces = ['common', 'layout', 'technology', 'books', 'files'];
        
        for (const lang of languages) {
            console.log(`   📂 检查${lang}语言文件:`);
            const langDir = path.join(i18nDir, lang);
            
            if (!fs.existsSync(langDir)) {
                console.log(`      ❌ ${lang}目录不存在`);
                this.issues.push(`${lang}语言目录缺失`);
                continue;
            }
            
            for (const namespace of namespaces) {
                const jsonFile = path.join(langDir, `${namespace}.json`);
                if (fs.existsSync(jsonFile)) {
                    try {
                        const content = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
                        console.log(`      ✅ ${namespace}.json (${Object.keys(content).length} 个键)`);
                        this.fixes.push(`${lang}/${namespace}.json文件正常`);
                    } catch (error) {
                        console.log(`      ❌ ${namespace}.json 格式错误: ${error.message}`);
                        this.issues.push(`${lang}/${namespace}.json格式错误`);
                    }
                } else {
                    console.log(`      ⚠️  ${namespace}.json 不存在`);
                    this.issues.push(`${lang}/${namespace}.json文件缺失`);
                }
            }
        }
    }

    /**
     * 检查类型定义
     */
    async checkTypeDefinitions() {
        console.log('\n🔧 检查类型定义文件...');
        
        const typesDir = path.join(this.frontEndDir, 'src/types');
        
        const requiredTypes = [
            'i18n.d.ts',
            'json-modules.d.ts',
            'common.d.ts'
        ];
        
        for (const typeFile of requiredTypes) {
            const typePath = path.join(typesDir, typeFile);
            if (fs.existsSync(typePath)) {
                console.log(`   ✅ ${typeFile} 存在`);
                this.fixes.push(`${typeFile}类型定义正常`);
                
                // 检查文件内容
                const content = fs.readFileSync(typePath, 'utf-8');
                if (typeFile === 'json-modules.d.ts') {
                    if (content.includes('declare module \'*.json\'')) {
                        console.log(`      ✅ JSON模块声明正确`);
                    } else {
                        console.log(`      ❌ JSON模块声明缺失`);
                        this.issues.push('JSON模块声明不完整');
                    }
                }
            } else {
                console.log(`   ❌ ${typeFile} 不存在`);
                this.issues.push(`${typeFile}类型定义缺失`);
            }
        }
    }

    /**
     * 测试编译
     */
    async testCompilation() {
        console.log('\n🧪 测试TypeScript编译...');
        
        try {
            // 切换到前端目录
            process.chdir(this.frontEndDir);
            
            // 运行TypeScript检查
            console.log('   🔄 运行 tsc --noEmit 检查...');
            const result = execSync('npx tsc --noEmit', { 
                encoding: 'utf-8',
                timeout: 30000 
            });
            
            console.log('   ✅ TypeScript编译检查通过');
            this.fixes.push('TypeScript编译无错误');
            
        } catch (error) {
            console.log('   ❌ TypeScript编译检查失败');
            console.log(`      错误信息: ${error.message}`);
            
            // 检查是否是TS6307错误
            if (error.message.includes('TS6307')) {
                console.log('      🎯 检测到TS6307错误 - JSON文件未包含在项目中');
                this.issues.push('TS6307: JSON文件未包含在项目配置中');
            } else {
                this.issues.push(`TypeScript编译错误: ${error.message.substring(0, 200)}`);
            }
        }
    }

    /**
     * 打印总结
     */
    printSummary() {
        console.log('\n📊 TypeScript配置测试总结');
        console.log('='.repeat(50));
        
        console.log(`✅ 修复项目: ${this.fixes.length}`);
        console.log(`❌ 待解决问题: ${this.issues.length}`);
        
        if (this.fixes.length > 0) {
            console.log('\n🎉 正常的配置:');
            this.fixes.forEach(fix => {
                console.log(`   ✅ ${fix}`);
            });
        }
        
        if (this.issues.length > 0) {
            console.log('\n⚠️  需要解决的问题:');
            this.issues.forEach(issue => {
                console.log(`   ❌ ${issue}`);
            });
            
            console.log('\n💡 建议的解决步骤:');
            if (this.issues.some(issue => issue.includes('TS6307'))) {
                console.log('   1. 确认tsconfig.json的include配置包含"src/**/*.json"');
                console.log('   2. 确认resolveJsonModule选项已启用');
                console.log('   3. 重新运行TypeScript编译检查');
            }
            if (this.issues.some(issue => issue.includes('类型定义'))) {
                console.log('   4. 检查src/types/目录下的类型定义文件');
                console.log('   5. 确保json-modules.d.ts文件存在且正确');
            }
            if (this.issues.some(issue => issue.includes('JSON文件'))) {
                console.log('   6. 检查国际化JSON文件是否存在且格式正确');
                console.log('   7. 运行国际化工具生成缺失的文件');
            }
        }
        
        if (this.issues.length === 0) {
            console.log('\n🎉 所有TypeScript配置检查通过！');
            console.log('现在可以正常使用国际化功能了。');
        } else {
            console.log('\n⚠️  建议解决所有问题后再进行开发');
        }
    }
}

// 运行测试
if (require.main === module) {
    const tester = new TypeScriptConfigTester();
    tester.run().catch(console.error);
}

module.exports = TypeScriptConfigTester;
