# Shared 包内部别名导致的导入错误修复说明

## 背景
在将表格统一替换为共享组件 KTable 后，运行时出现如下错误：

```
Uncaught SyntaxError: The requested module '/src/utils/index.ts' does not provide an export named 'createExcludeComparator' (at index.tsx:2:10)
```

该错误出现在管理端（management）运行时，由 Vite 抛出。

## 根因分析
- shared 包中的 `KTable` 组件源码（被以源码形式通过 alias 引入）内部使用了 `"@"` 路径别名：
  - `import "@/styles/antd.scss"`
  - `import { createExcludeComparator } from "@/utils"`
- 但是，`management` 项目自身也配置了 `"@" -> management/src` 的别名。Vite 在解析 shared 源码时，会把 `@/utils` 解析到宿主项目（management）的 `src/utils`，而不是 shared 的 `src/utils`。
- 宿主项目并没有导出 `createExcludeComparator`，导致运行时报“命名导出不存在”。

## 解决方案
- 避免在 shared 源码中使用 `"@"` 别名，统一改为相对路径，确保在任意宿主项目中引用 shared 源码都能正确解析到 shared 自身目录。

### 具体改动
文件：`shared/src/components/KTable/index.tsx`
- 将：
  - `import "@/styles/antd.scss"` 改为 `import "../../styles/antd.scss"`
  - `import { createExcludeComparator } from "@/utils"` 改为 `import { createExcludeComparator } from "../../utils"`

另外：
- `shared/src/utils/index.ts` 已统一 `export * from './memoComparator'`，包含 `createExcludeComparator` 导出，无需额外调整。

## 影响评估
- 该调整仅限 shared 包内部源码的导入路径，不改变公共 API：
  - `shared/components` 继续导出：`KTable`、`IKTableProps`、`IKTableColumns`
- management 与 frontEnd 通过 alias `shared` 以源码方式引用，不受破坏，反而避免了别名冲突。

## 验证步骤（建议）
1. 重新启动或刷新 management 开发服务（如已在运行，直接浏览器强刷一次）。
2. 打开使用 KTable 的页面（UserManagement、RoleManagement、UserRoleManagement、PermissionManagement）。
3. 验证：
   - 页面不再出现 `createExcludeComparator` 的导出错误；
   - 表格分页、排序、选择、斑马纹等功能正常；
   - 控制台无新的模块解析报错。

## 风险与回滚
- 风险：无。改动仅是 shared 内部相对路径的修正。
- 回滚：如需回滚，恢复上述两处 import 为 `@` 别名。但这会再次触发宿主别名冲突问题，不建议回滚。

## 后续优化建议
- 统一规范：shared 包内部严禁使用宿主可能占用的别名（如 `@`），一律使用相对路径或以 `shared` 自身为根的解析策略（打包后再消费）。
- 如未来将 shared 作为独立 npm 包发布，建议在打包产物中消除别名依赖，确保消费方零配置使用。

