#!/bin/bash

echo "代码高亮迁移工具"
echo "=================="

if [ $# -eq 0 ]; then
    echo "使用方法:"
    echo "  ./run.sh --nodejs                    (处理整个 nodejs 目录)"
    echo "  ./run.sh --nodejs/ExpressDetail.tsx (处理特定文件)"
    echo "  ./run.sh --git                      (处理整个 git 目录)"
    echo "  ./run.sh --test                     (运行测试)"
    exit 1
fi

if [ "$1" = "--test" ]; then
    echo "运行测试..."
    node test.js
    exit 0
fi

echo "开始迁移: $1"
node migrate-code-highlight.js "$1"

echo ""
echo "迁移完成！"
