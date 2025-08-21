@echo off
echo 代码高亮迁移工具
echo ==================

if "%1"=="" (
    echo 使用方法:
    echo   run.bat --nodejs                    ^(处理整个 nodejs 目录^)
    echo   run.bat --nodejs/ExpressDetail.tsx ^(处理特定文件^)
    echo   run.bat --git                      ^(处理整个 git 目录^)
    echo   run.bat --test                     ^(运行测试^)
    goto :eof
)

if "%1"=="--test" (
    echo 运行测试...
    node test.js
    goto :eof
)

echo 开始迁移: %1
node migrate-code-highlight.js %1

echo.
echo 迁移完成！
pause
