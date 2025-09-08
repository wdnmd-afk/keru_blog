#!/usr/bin/env node

/**
 * 国际化自动化工作流
 * 
 * 功能：
 * 1. 一键执行完整的国际化流程
 * 2. 集成扫描、替换、验证工具
 * 3. 支持增量更新
 * 4. 提供交互式操作界面
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const I18nScanner = require('./i18n-scanner');
const I18nReplacer = require('./i18n-replacer');
const I18nValidator = require('./i18n-validator');

class I18nWorkflow {
    constructor(options = {}) {
        this.options = {
            srcDir: '../frontEnd/src',
            outputDir: './i18n-output',
            interactive: true,
            ...options
        };
        
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    /**
     * 执行完整工作流
     */
    async run() {
        console.log('🚀 国际化自动化工作流启动\n');
        
        try {
            // 步骤1: 扫描
            await this.step1_scan();
            
            // 步骤2: 预览和确认
            if (this.options.interactive) {
                await this.step2_preview();
            }
            
            // 步骤3: 执行替换
            await this.step3_replace();
            
            // 步骤4: 验证质量
            await this.step4_validate();
            
            // 步骤5: 生成总结
            await this.step5_summary();
            
        } catch (error) {
            console.error('❌ 工作流执行失败:', error.message);
        } finally {
            this.rl.close();
        }
    }

    /**
     * 步骤1: 扫描硬编码文本
     */
    async step1_scan() {
        console.log('📍 步骤 1/5: 扫描硬编码文本');
        console.log('─'.repeat(50));
        
        const scanner = new I18nScanner({
            srcDir: this.options.srcDir,
            outputDir: this.options.outputDir
        });
        
        await scanner.scan();
        
        this.scanReport = JSON.parse(
            fs.readFileSync(
                path.join(this.options.outputDir, 'scan-report.json'), 
                'utf-8'
            )
        );
        
        console.log(`✅ 扫描完成，发现 ${this.scanReport.summary.totalTexts} 个需要国际化的文本\n`);
    }

    /**
     * 步骤2: 预览和确认
     */
    async step2_preview() {
        console.log('📍 步骤 2/5: 预览扫描结果');
        console.log('─'.repeat(50));
        
        // 显示统计信息
        console.log('📊 扫描统计:');
        console.log(`   文件数量: ${this.scanReport.summary.totalFiles}`);
        console.log(`   文本数量: ${this.scanReport.summary.totalTexts}`);
        console.log(`   命名空间: ${this.scanReport.summary.namespaces.join(', ')}`);
        
        // 显示前几个示例
        console.log('\n📝 示例文本:');
        this.scanReport.results.slice(0, 5).forEach((result, index) => {
            console.log(`   ${index + 1}. "${result.text}" -> ${result.namespace}:${result.suggestedKey}`);
        });
        
        if (this.scanReport.results.length > 5) {
            console.log(`   ... 还有 ${this.scanReport.results.length - 5} 个文本`);
        }
        
        // 询问是否继续
        const answer = await this.question('\n❓ 是否继续执行自动替换? (y/N): ');
        if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
            console.log('⏹️  工作流已取消');
            process.exit(0);
        }
        
        console.log();
    }

    /**
     * 步骤3: 执行替换
     */
    async step3_replace() {
        console.log('📍 步骤 3/5: 执行自动替换');
        console.log('─'.repeat(50));
        
        // 询问是否先预览
        let dryRun = false;
        if (this.options.interactive) {
            const preview = await this.question('❓ 是否先预览替换效果? (Y/n): ');
            dryRun = preview.toLowerCase() !== 'n' && preview.toLowerCase() !== 'no';
        }
        
        const replacer = new I18nReplacer({
            srcDir: this.options.srcDir,
            dryRun: dryRun
        });
        
        await replacer.replace(this.scanReport);
        
        if (dryRun && this.options.interactive) {
            const confirm = await this.question('\n❓ 预览完成，是否执行实际替换? (y/N): ');
            if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
                const actualReplacer = new I18nReplacer({
                    srcDir: this.options.srcDir,
                    dryRun: false
                });
                await actualReplacer.replace(this.scanReport);
            }
        }
        
        console.log('✅ 替换完成\n');
    }

    /**
     * 步骤4: 验证质量
     */
    async step4_validate() {
        console.log('📍 步骤 4/5: 验证国际化质量');
        console.log('─'.repeat(50));
        
        const validator = new I18nValidator({
            srcDir: this.options.srcDir,
            outputDir: this.options.outputDir
        });
        
        await validator.validate();
        console.log('✅ 验证完成\n');
    }

    /**
     * 步骤5: 生成总结
     */
    async step5_summary() {
        console.log('📍 步骤 5/5: 生成工作流总结');
        console.log('─'.repeat(50));
        
        const summary = {
            timestamp: new Date().toISOString(),
            scanResults: this.scanReport.summary,
            outputFiles: this.getOutputFiles(),
            nextSteps: this.getNextSteps()
        };
        
        const summaryPath = path.join(this.options.outputDir, 'workflow-summary.json');
        fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
        
        // 打印总结
        console.log('🎉 国际化工作流完成！');
        console.log('\n📋 总结:');
        console.log(`   处理文件: ${summary.scanResults.totalFiles} 个`);
        console.log(`   处理文本: ${summary.scanResults.totalTexts} 个`);
        console.log(`   生成报告: ${this.options.outputDir}`);
        
        console.log('\n📝 下一步建议:');
        summary.nextSteps.forEach(step => {
            console.log(`   • ${step}`);
        });
        
        console.log(`\n📊 详细报告请查看: ${this.options.outputDir}`);
    }

    /**
     * 获取输出文件列表
     */
    getOutputFiles() {
        const outputDir = this.options.outputDir;
        if (!fs.existsSync(outputDir)) return [];
        
        return fs.readdirSync(outputDir).map(file => ({
            name: file,
            path: path.join(outputDir, file),
            size: fs.statSync(path.join(outputDir, file)).size
        }));
    }

    /**
     * 获取下一步建议
     */
    getNextSteps() {
        return [
            '检查生成的翻译文件，补充英文翻译',
            '运行项目，测试语言切换功能',
            '检查validation-report.md中的问题',
            '考虑设置CI/CD中的国际化检查',
            '为团队成员提供国际化开发指南'
        ];
    }

    /**
     * 交互式问答
     */
    question(prompt) {
        return new Promise(resolve => {
            this.rl.question(prompt, resolve);
        });
    }
}

// 命令行接口
if (require.main === module) {
    const workflow = new I18nWorkflow({
        interactive: !process.argv.includes('--no-interactive'),
        srcDir: process.argv.find(arg => arg.startsWith('--src='))?.split('=')[1] || '../frontEnd/src'
    });
    
    workflow.run().catch(console.error);
}

module.exports = I18nWorkflow;
