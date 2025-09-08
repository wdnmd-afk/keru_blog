#!/usr/bin/env node

/**
 * 替换工具测试脚本
 * 
 * 功能：
 * 1. 测试I18nReplacer类的初始化
 * 2. 验证chineseRegex的定义和使用
 * 3. 测试文件处理功能
 */

const I18nReplacer = require('./i18n-replacer');
const fs = require('fs');
const path = require('path');

class ReplacerTester {
    constructor() {
        this.testResults = [];
    }

    /**
     * 运行所有测试
     */
    async runTests() {
        console.log('🧪 替换工具测试开始');
        console.log('='.repeat(40));

        await this.testClassInitialization();
        await this.testChineseRegex();
        await this.testFileProcessing();
        
        this.printResults();
    }

    /**
     * 测试类初始化
     */
    async testClassInitialization() {
        console.log('\n📋 测试1: 类初始化');
        
        try {
            const replacer = new I18nReplacer();
            
            // 检查基本属性
            this.assert('options存在', !!replacer.options);
            this.assert('translationMap存在', replacer.translationMap instanceof Map);
            this.assert('modifiedFiles存在', replacer.modifiedFiles instanceof Set);
            this.assert('chineseRegex存在', !!replacer.chineseRegex);
            this.assert('chineseRegex是正则表达式', replacer.chineseRegex instanceof RegExp);
            
            console.log('   ✅ 类初始化测试通过');
            
        } catch (error) {
            console.log(`   ❌ 类初始化失败: ${error.message}`);
            this.testResults.push({ test: '类初始化', passed: false, error: error.message });
        }
    }

    /**
     * 测试中文正则表达式
     */
    async testChineseRegex() {
        console.log('\n📋 测试2: 中文正则表达式');
        
        try {
            const replacer = new I18nReplacer();
            const regex = replacer.chineseRegex;
            
            // 测试中文文本
            const testCases = [
                { text: '你好世界', expected: true, desc: '纯中文' },
                { text: 'Hello 世界', expected: true, desc: '中英混合' },
                { text: 'Hello World', expected: false, desc: '纯英文' },
                { text: '123456', expected: false, desc: '纯数字' },
                { text: '加载中...', expected: true, desc: '中文+符号' },
                { text: '', expected: false, desc: '空字符串' }
            ];
            
            testCases.forEach(testCase => {
                const result = regex.test(testCase.text);
                const passed = result === testCase.expected;
                
                if (passed) {
                    console.log(`   ✅ ${testCase.desc}: "${testCase.text}" -> ${result}`);
                } else {
                    console.log(`   ❌ ${testCase.desc}: "${testCase.text}" -> ${result} (期望: ${testCase.expected})`);
                }
                
                this.testResults.push({
                    test: `正则测试-${testCase.desc}`,
                    passed: passed,
                    details: `"${testCase.text}" -> ${result}`
                });
            });
            
        } catch (error) {
            console.log(`   ❌ 正则表达式测试失败: ${error.message}`);
            this.testResults.push({ test: '正则表达式', passed: false, error: error.message });
        }
    }

    /**
     * 测试文件处理功能
     */
    async testFileProcessing() {
        console.log('\n📋 测试3: 文件处理功能');
        
        try {
            const replacer = new I18nReplacer({ dryRun: true });
            
            // 创建测试文件
            const testFilePath = path.join(__dirname, 'test-file.tsx');
            const testContent = `
import React from 'react';

const TestComponent: React.FC = () => {
    return (
        <div>
            <h1>测试标题</h1>
            <p>这是一个测试组件</p>
            <button>点击按钮</button>
        </div>
    );
};

export default TestComponent;
`;
            
            fs.writeFileSync(testFilePath, testContent);
            
            // 模拟扫描结果
            const mockItems = [
                { text: '测试标题', namespace: 'common', suggestedKey: 'test_title' },
                { text: '这是一个测试组件', namespace: 'common', suggestedKey: 'test_description' },
                { text: '点击按钮', namespace: 'common', suggestedKey: 'click_button' }
            ];
            
            // 测试文件处理
            await replacer.processFile(testFilePath, mockItems);
            
            console.log('   ✅ 文件处理测试完成（dry-run模式）');
            
            // 清理测试文件
            if (fs.existsSync(testFilePath)) {
                fs.unlinkSync(testFilePath);
            }
            
            this.testResults.push({ test: '文件处理', passed: true });
            
        } catch (error) {
            console.log(`   ❌ 文件处理测试失败: ${error.message}`);
            console.log(`   错误堆栈: ${error.stack}`);
            this.testResults.push({ test: '文件处理', passed: false, error: error.message });
        }
    }

    /**
     * 断言辅助函数
     */
    assert(description, condition) {
        const passed = !!condition;
        this.testResults.push({ test: description, passed: passed });
        
        if (passed) {
            console.log(`   ✅ ${description}`);
        } else {
            console.log(`   ❌ ${description}`);
        }
        
        return passed;
    }

    /**
     * 打印测试结果
     */
    printResults() {
        console.log('\n📊 测试结果汇总');
        console.log('='.repeat(40));
        
        const totalTests = this.testResults.length;
        const passedTests = this.testResults.filter(r => r.passed).length;
        const failedTests = totalTests - passedTests;
        
        console.log(`总测试数: ${totalTests}`);
        console.log(`通过: ${passedTests}`);
        console.log(`失败: ${failedTests}`);
        console.log(`成功率: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
        
        if (failedTests > 0) {
            console.log('\n❌ 失败的测试:');
            this.testResults
                .filter(r => !r.passed)
                .forEach(r => {
                    console.log(`   - ${r.test}: ${r.error || r.details || '未知错误'}`);
                });
        }
        
        if (passedTests === totalTests) {
            console.log('\n🎉 所有测试通过！替换工具已修复');
        } else {
            console.log('\n⚠️  部分测试失败，需要进一步修复');
        }
    }
}

// 运行测试
if (require.main === module) {
    const tester = new ReplacerTester();
    tester.runTests().catch(console.error);
}

module.exports = ReplacerTester;
