#!/usr/bin/env node

/**
 * TypeScript错误修复验证脚本
 * 
 * 功能：
 * 1. 验证之前的TypeScript错误是否已修复
 * 2. 运行TypeScript编译检查
 * 3. 生成修复报告
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TypeScriptFixVerifier {
    constructor() {
        this.frontEndDir = path.resolve(__dirname, '../frontEnd');
        this.originalErrors = [];
        this.currentErrors = [];
        this.fixedErrors = [];
    }

    /**
     * 运行验证
     */
    async run() {
        console.log('🔍 TypeScript错误修复验证开始');
        console.log('='.repeat(50));

        await this.loadOriginalErrors();
        await this.runTypeScriptCheck();
        await this.compareErrors();
        
        this.printResults();
    }

    /**
     * 加载原始错误
     */
    async loadOriginalErrors() {
        console.log('\n📋 加载原始错误报告...');
        
        try {
            const errorReportPath = path.join(this.frontEndDir, 'TsError/error-report.json');
            if (fs.existsSync(errorReportPath)) {
                const errorReport = JSON.parse(fs.readFileSync(errorReportPath, 'utf-8'));
                this.originalErrors = errorReport.errors || [];
                console.log(`   📊 原始错误数量: ${this.originalErrors.length}`);
                
                this.originalErrors.forEach((error, index) => {
                    console.log(`   ${index + 1}. ${error.code} - ${error.file}:${error.line}:${error.column}`);
                    console.log(`      ${error.message}`);
                });
            } else {
                console.log('   ⚠️  未找到原始错误报告文件');
            }
        } catch (error) {
            console.log(`   ❌ 加载原始错误失败: ${error.message}`);
        }
    }

    /**
     * 运行TypeScript检查
     */
    async runTypeScriptCheck() {
        console.log('\n🧪 运行TypeScript编译检查...');
        
        try {
            // 切换到前端目录
            process.chdir(this.frontEndDir);
            
            // 运行TypeScript检查
            console.log('   🔄 执行 tsc --noEmit...');
            const result = execSync('npx tsc --noEmit', { 
                encoding: 'utf-8',
                timeout: 60000 
            });
            
            console.log('   ✅ TypeScript编译检查通过 - 无错误！');
            this.currentErrors = [];
            
        } catch (error) {
            console.log('   ⚠️  TypeScript编译检查发现错误');
            
            // 解析错误输出
            const errorOutput = error.stdout || error.message || '';
            this.currentErrors = this.parseTypeScriptErrors(errorOutput);
            
            console.log(`   📊 当前错误数量: ${this.currentErrors.length}`);
            this.currentErrors.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error.code} - ${error.file}:${error.line}`);
                console.log(`      ${error.message}`);
            });
        }
    }

    /**
     * 解析TypeScript错误输出
     */
    parseTypeScriptErrors(output) {
        const errors = [];
        const lines = output.split('\n');
        
        for (const line of lines) {
            // 匹配错误格式: file(line,column): error TSxxxx: message
            const match = line.match(/^(.+?)\((\d+),(\d+)\):\s*error\s+(TS\d+):\s*(.+)$/);
            if (match) {
                errors.push({
                    file: match[1],
                    line: match[2],
                    column: match[3],
                    code: match[4],
                    message: match[5].trim()
                });
            }
        }
        
        return errors;
    }

    /**
     * 比较错误
     */
    async compareErrors() {
        console.log('\n📊 比较错误修复情况...');
        
        // 检查每个原始错误是否已修复
        for (const originalError of this.originalErrors) {
            const stillExists = this.currentErrors.some(currentError => 
                currentError.code === originalError.code &&
                currentError.file.includes(path.basename(originalError.file)) &&
                currentError.line === originalError.line
            );
            
            if (!stillExists) {
                this.fixedErrors.push(originalError);
                console.log(`   ✅ 已修复: ${originalError.code} - ${originalError.file}:${originalError.line}`);
            } else {
                console.log(`   ❌ 仍存在: ${originalError.code} - ${originalError.file}:${originalError.line}`);
            }
        }
        
        // 检查是否有新的错误
        const newErrors = this.currentErrors.filter(currentError => 
            !this.originalErrors.some(originalError => 
                originalError.code === currentError.code &&
                originalError.file.includes(path.basename(currentError.file)) &&
                originalError.line === currentError.line
            )
        );
        
        if (newErrors.length > 0) {
            console.log('\n⚠️  发现新的错误:');
            newErrors.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error.code} - ${error.file}:${error.line}`);
                console.log(`      ${error.message}`);
            });
        }
    }

    /**
     * 打印结果
     */
    printResults() {
        console.log('\n📊 TypeScript错误修复验证结果');
        console.log('='.repeat(50));
        
        const originalCount = this.originalErrors.length;
        const fixedCount = this.fixedErrors.length;
        const remainingCount = originalCount - fixedCount;
        const newCount = this.currentErrors.length - remainingCount;
        
        console.log(`原始错误数量: ${originalCount}`);
        console.log(`已修复错误数量: ${fixedCount}`);
        console.log(`剩余错误数量: ${remainingCount}`);
        console.log(`新增错误数量: ${newCount}`);
        console.log(`当前总错误数量: ${this.currentErrors.length}`);
        
        if (fixedCount > 0) {
            console.log('\n🎉 已修复的错误:');
            this.fixedErrors.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error.code} - ${error.file}:${error.line}:${error.column}`);
                console.log(`      ${error.message}`);
            });
        }
        
        if (this.currentErrors.length === 0) {
            console.log('\n🎉 恭喜！所有TypeScript错误已修复！');
            console.log('项目现在可以正常编译了。');
        } else if (fixedCount === originalCount && newCount === 0) {
            console.log('\n🎉 原始错误全部修复！');
            console.log('但可能在修复过程中引入了新的错误，请检查。');
        } else if (fixedCount > 0) {
            console.log('\n✅ 部分错误已修复！');
            console.log('请继续修复剩余的错误。');
        } else {
            console.log('\n⚠️  错误修复不完整');
            console.log('请检查修复方案并重新尝试。');
        }
        
        // 生成修复报告
        this.generateFixReport();
    }

    /**
     * 生成修复报告
     */
    generateFixReport() {
        const reportPath = path.join(this.frontEndDir, 'TsError/fix-report.json');
        const report = {
            timestamp: new Date().toISOString(),
            originalErrorCount: this.originalErrors.length,
            fixedErrorCount: this.fixedErrors.length,
            remainingErrorCount: this.currentErrors.length,
            fixedErrors: this.fixedErrors,
            remainingErrors: this.currentErrors
        };
        
        try {
            fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
            console.log(`\n📄 修复报告已生成: ${reportPath}`);
        } catch (error) {
            console.log(`\n❌ 生成修复报告失败: ${error.message}`);
        }
    }
}

// 运行验证
if (require.main === module) {
    const verifier = new TypeScriptFixVerifier();
    verifier.run().catch(console.error);
}

module.exports = TypeScriptFixVerifier;
