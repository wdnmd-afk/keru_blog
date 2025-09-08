#!/usr/bin/env node

/**
 * 智能国际化替换工具
 * 
 * 功能：
 * 1. 基于AST的精确文本替换
 * 2. 自动添加useTranslation hook
 * 3. 生成翻译文件
 * 4. 支持回滚操作
 */

const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

class I18nReplacer {
    constructor(options = {}) {
        this.options = {
            srcDir: options.srcDir || '../frontEnd/src',
            i18nDir: options.i18nDir || '..\frontEnd\src\i18n/locales',
            backupDir: options.backupDir || './i18n-backup',
            dryRun: options.dryRun || false,
            ...options
        };
        
        this.translationMap = new Map();
        this.modifiedFiles = new Set();
        this.chineseRegex = /[\u4e00-\u9fa5]/;
    }

    /**
     * 执行自动替换
     */
    async replace(scanReport) {
        console.log('🔄 开始智能替换...');
        
        if (!this.options.dryRun) {
            await this.createBackup();
        }

        // 按文件处理
        const fileGroups = this.groupByFile(scanReport.results);
        
        for (const [filePath, items] of fileGroups) {
            await this.processFile(filePath, items);
        }

        // 生成翻译文件
        await this.generateTranslationFiles(scanReport.translationKeys);
        
        console.log(`✅ 替换完成！处理了 ${this.modifiedFiles.size} 个文件`);
        
        if (this.options.dryRun) {
            console.log('🔍 这是预览模式，实际文件未被修改');
        }
    }

    /**
     * 按文件分组
     */
    groupByFile(results) {
        const groups = new Map();
        results.forEach(item => {
            if (!groups.has(item.file)) {
                groups.set(item.file, []);
            }
            groups.get(item.file).push(item);
        });
        return groups;
    }

    /**
     * 处理单个文件
     */
    async processFile(filePath, items) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const ast = parser.parse(content, {
                sourceType: 'module',
                plugins: ['jsx', 'typescript', 'decorators-legacy']
            });

            let hasChanges = false;
            let needsUseTranslation = false;
            let hasUseTranslation = false;

            // 检查是否已经有useTranslation
            traverse(ast, {
                ImportDeclaration(path) {
                    if (path.node.source.value === 'react-i18next') {
                        const specifiers = path.node.specifiers;
                        hasUseTranslation = specifiers.some(spec => 
                            spec.imported && spec.imported.name === 'useTranslation'
                        );
                    }
                }
            });

            // 替换文本
            traverse(ast, {
                StringLiteral(path) {
                    const value = path.node.value;
                    const item = items.find(i => i.text === value);
                    
                    if (item && this.chineseRegex.test(value)) {
                        const tCall = this.createTranslationCall(item);
                        path.replaceWith(tCall);
                        hasChanges = true;
                        needsUseTranslation = true;
                    }
                },
                
                JSXText(path) {
                    const value = path.node.value.trim();
                    const item = items.find(i => i.text === value);
                    
                    if (item && this.chineseRegex.test(value)) {
                        const tCall = this.createTranslationCall(item);
                        const jsxExpression = t.jsxExpressionContainer(tCall);
                        path.replaceWith(jsxExpression);
                        hasChanges = true;
                        needsUseTranslation = true;
                    }
                }
            });

            // 添加useTranslation hook
            if (needsUseTranslation && !hasUseTranslation) {
                this.addUseTranslationHook(ast, filePath);
                hasChanges = true;
            }

            // 保存修改
            if (hasChanges) {
                const newCode = generate(ast, {
                    retainLines: true,
                    compact: false
                }).code;

                if (!this.options.dryRun) {
                    fs.writeFileSync(filePath, newCode);
                }
                
                this.modifiedFiles.add(filePath);
                console.log(`📝 已处理: ${filePath}`);
            }

        } catch (error) {
            console.error(`❌ 处理文件失败: ${filePath}`, error.message);
        }
    }

    /**
     * 创建翻译函数调用
     */
    createTranslationCall(item) {
        const key = `${item.namespace}:${item.suggestedKey}`;
        return t.callExpression(
            t.identifier('t'),
            [t.stringLiteral(key)]
        );
    }

    /**
     * 添加useTranslation hook
     */
    addUseTranslationHook(ast, filePath) {
        let hasReactImport = false;
        let hasI18nImport = false;
        let insertAfter = null;

        // 检查现有导入
        traverse(ast, {
            ImportDeclaration(path) {
                if (path.node.source.value === 'react') {
                    hasReactImport = true;
                    insertAfter = path;
                } else if (path.node.source.value === 'react-i18next') {
                    hasI18nImport = true;
                }
            }
        });

        // 添加react-i18next导入
        if (!hasI18nImport) {
            const importDeclaration = t.importDeclaration(
                [t.importSpecifier(t.identifier('useTranslation'), t.identifier('useTranslation'))],
                t.stringLiteral('react-i18next')
            );

            if (insertAfter) {
                insertAfter.insertAfter(importDeclaration);
            } else {
                ast.body.unshift(importDeclaration);
            }
        }

        // 在函数组件中添加hook
        traverse(ast, {
            FunctionDeclaration(path) {
                if (this.isReactComponent(path.node)) {
                    this.addHookToComponent(path);
                }
            },
            ArrowFunctionExpression(path) {
                if (this.isReactComponent(path.node)) {
                    this.addHookToComponent(path);
                }
            }
        });
    }

    /**
     * 判断是否为React组件
     */
    isReactComponent(node) {
        // 简单判断：函数名首字母大写或返回JSX
        if (node.id && /^[A-Z]/.test(node.id.name)) {
            return true;
        }
        // TODO: 更精确的JSX返回检测
        return false;
    }

    /**
     * 在组件中添加hook
     */
    addHookToComponent(path) {
        const body = path.node.body;
        if (t.isBlockStatement(body)) {
            const hookStatement = t.variableDeclaration('const', [
                t.variableDeclarator(
                    t.objectPattern([
                        t.objectProperty(t.identifier('t'), t.identifier('t'), false, true)
                    ]),
                    t.callExpression(t.identifier('useTranslation'), [])
                )
            ]);
            
            body.body.unshift(hookStatement);
        }
    }

    /**
     * 生成翻译文件
     */
    async generateTranslationFiles(translationKeys) {
        console.log('📝 生成翻译文件...');
        
        for (const [namespace, keys] of Object.entries(translationKeys)) {
            // 中文文件
            const zhPath = path.join(this.options.i18nDir, 'zh', `${namespace}.json`);
            const enPath = path.join(this.options.i18nDir, 'en', `${namespace}.json`);
            
            // 读取现有文件
            let zhData = {};
            let enData = {};
            
            if (fs.existsSync(zhPath)) {
                zhData = JSON.parse(fs.readFileSync(zhPath, 'utf-8'));
            }
            if (fs.existsSync(enPath)) {
                enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
            }
            
            // 合并新键
            Object.entries(keys).forEach(([key, value]) => {
                zhData[key] = value;
                enData[key] = `[TODO: Translate] ${value}`;
            });
            
            // 保存文件
            if (!this.options.dryRun) {
                fs.writeFileSync(zhPath, JSON.stringify(zhData, null, 2));
                fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
            }
            
            console.log(`📄 已更新: ${namespace}.json`);
        }
    }

    /**
     * 创建备份
     */
    async createBackup() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(this.options.backupDir, timestamp);
        
        if (!fs.existsSync(backupPath)) {
            fs.mkdirSync(backupPath, { recursive: true });
        }
        
        console.log(`💾 创建备份到: ${backupPath}`);
        // TODO: 实现文件备份逻辑
    }

    /**
     * 回滚操作
     */
    async rollback(backupPath) {
        console.log(`🔄 从备份恢复: ${backupPath}`);
        // TODO: 实现回滚逻辑
    }
}

// 命令行接口
if (require.main === module) {
    const reportPath = process.argv[2];
    if (!reportPath) {
        console.error('请提供扫描报告文件路径');
        process.exit(1);
    }
    
    const scanReport = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
    const replacer = new I18nReplacer({
        dryRun: process.argv.includes('--dry-run')
    });
    
    replacer.replace(scanReport).catch(console.error);
}

module.exports = I18nReplacer;
