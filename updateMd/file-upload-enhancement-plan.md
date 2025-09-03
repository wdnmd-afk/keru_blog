# 文件上传功能增强计划：实时进度、暂停与断点续传

## 1. 目标

在现有文件上传功能的基础上，进行增强和优化，以提供更精细的用户体验。
1.  **实时上传进度条**：将当前基于“分片完成数”的进度条，升级为基于“已上传字节数”的实时进度条。
2.  **完善暂停与恢复**：确保暂停功能可以立即中断所有正在进行的上传请求，并能从上次的进度恢复上传。
3.  **断点续传验证**：确保在刷新页面或关闭浏览器后，对于同一个文件，能够识别已上传的分片，并继续未完成的上传。

## 2. 现有架构分析

项目已采用成熟的“分片上传”方案。

-   **前端 (`frontEnd/`)**
    -   **核心逻辑**: `hooks/useUpload.ts` 封装了文件处理的主要逻辑，包括文件切片、计算文件哈希、构建分片列表、并发上传以及暂停。
    -   **API 调用**: `api/fileApi.ts` 定义了与后端交互的接口，如 `checkFile` (校验文件状态)、`uploadFile` (上传分片) 和 `uploadFileSingle` (上传小文件)。
    -   **UI 组件**: `components/Files/FileUpload.tsx` 提供了文件选择和上传列表的界面，并已集成进度条显示。
    -   **状态管理**: `store/fileStore.ts` 使用 Zustand 管理上传文件列表和上传状态。

-   **后端 (`server/`)**
    -   **路由**: `router/file/controller.ts` 定义了 `/upload` (接收分片) 和 `/merge` (合并分片) 等接口。
    -   **服务逻辑**: `router/file/service.ts` 实现了分片文件的临时存储、校验已存在的分片 (`createUploadedList`) 以及最终将分片合并为完整文件的功能。
    -   **文件工具**: `utils/file.ts` 提供了 `createUploadedList` 等核心工具函数，用于读取临时目录中的已上传分片列表。

## 3. 功能增强计划

### 3.1. 实现实时进度条

当前进度可能是根据已完成的分片数量计算的。要实现实时进度，我们需要跟踪每个分片内部的上传进度。

**实施步骤：**

1.  **前端 `fileApi.ts` 改造**：
    -   修改 `Http.postFile` 方法或 `FileApi.uploadFile` 方法，使其接受一个 `onUploadProgress` 回调函数。
    -   在内部的 HTTP 请求客户端（如 Axios）的配置中，将此回调函数传递给 `onUploadProgress` 选项。该函数会接收到进度事件（`ProgressEvent`)，其中包含 `loaded` (已上传字节) 和 `total` (总字节) 信息。

2.  **前端 `useUpload.ts` 改造**：
    -   在 `uploadChunk` 函数内，为 `FileApi.uploadFile` 调用附加一个新的 `onUploadProgress` 回调。
    -   需要一个地方来存储每个分片各自的上传进度。可以修改 `ChunkProp` 接口，增加 `loaded` 字段。
    -   在 `onUploadProgress` 回调中，更新当前分片的 `loaded` 值。
    -   计算总进度：
        -   遍历所有分片 (`allChunkList`)。
        -   总已上传大小 = SUM(所有分片的 `loaded` 值)。
        -   总文件大小 = 文件原始大小。
        -   实时进度 = (总已上传大小 / 总文件大小) * 100。
    -   通过 `setUploadProgress` 更新全局进度状态，UI 将自动响应。

### 3.2. 完善暂停与恢复功能

`useUpload.ts` 中已存在 `pauseUpload` 函数，我们需要确保其行为符合预期。

**实施步骤：**

1.  **请求取消机制**：
    -   确认 `fileApi.ts` 中的 `Http.postFile` 是否正确实现了请求取消逻辑。通常使用 `AbortController` (原生 Fetch API) 或 Axios 的 `CancelToken`。
    -   `pauseUpload` 函数在调用时，必须触发所有正在进行中的分片上传请求的取消操作。
    -   在 `useUpload.ts` 中，为每个并发的 `uploadChunk` 请求创建一个 `AbortController` 实例，并将其 `signal` 传递给 API 调用。
    -   `pauseUpload` 函数被调用时，遍历并调用所有当前活跃请求的 `abort()` 方法。

2.  **恢复上传**：
    -   当用户点击“恢复”或重新“开始上传”时，`_uploadChunkedFile` 函数会再次被调用。
    -   该函数会首先调用 `FileApi.checkFile`，后端返回 `uploadedList` (已上传分片哈希列表)。
    -   前端利用 `uploadedList` 过滤掉 `allChunkList` 中已经完成的分片。
    -   然后，对剩余的未上传分片启动 `uploadSingleFile` 流程。
    -   这个逻辑已经存在，主要工作是**验证其在暂停、刷新页面等场景下的健壮性**。

### 3.3. 断点续传验证

断点续传的核心是文件哈希和分片哈希。只要文件内容不变，其哈希就不变，后端就能识别出这是同一个文件。

**实施步骤：**

1.  **前端**：
    -   在 `_uploadChunkedFile` 函数中，文件哈希 (`fileHash`) 是关键标识。在发起上传前，通过 `FileApi.checkFile` 将此哈希发送到后端。
2.  **后端**：
    -   `checkFile` 接口根据 `fileHash` 检查临时文件夹 (`temp/chunkCache_${fileHash}`) 是否存在以及其中包含哪些分片。
    -   将已存在的分片名列表返回给前端。
3.  **测试场景**：
    -   上传一个大文件，中途刷新页面。
    -   重新选择同一个文件上传。
    -   观察网络请求，确认前端只上传了未完成的分片。
    -   观察 `useUpload.ts` 中的日志，确认 `uploadedList` 被正确接收和处理。

## 4. 实施清单

-   [ ] **后端**：无需修改。当前后端逻辑已支持所需功能。
-   [ ] **前端 `fileApi.ts`**
    -   [ ] 为 `uploadFile` 方法增加 `onUploadProgress` 回调参数。
    -   [ ] 将 `onUploadProgress` 参数绑定到底层 HTTP 请求库。
    -   [ ] 确保 `AbortController` 或等效的请求取消机制被正确实现和传递。
-   [ ] **前端 `types/files.ts`**
    -   [ ] 在 `ChunkProp` 接口中添加 `loaded: number` 字段来跟踪单个分片的上传字节。
-   [ ] **前端 `hooks/useUpload.ts`**
    -   [ ] 在 `uploadChunk` 中，实现 `onUploadProgress` 回调来更新分片的 `loaded` 值。
    -   [ ] 修改总进度计算逻辑，改为基于所有分片 `loaded` 值的总和。
    -   [ ] 在 `uploadChunk` 中集成 `AbortController`，并将其存储在组件状态中。
    -   [ ] 修改 `pauseUpload` 函数，使其能调用所有活跃请求的 `abort()` 方法。
-   [ ] **前端 `components/Files/FileUpload.tsx`**
    -   [ ] 确保“暂停”和“恢复”按钮正确调用 `useUpload` 中对应的 `pauseUpload` 和 `upload` 方法。
-   [ ] **测试**
    -   [ ] 验证实时进度条的流畅性。
    -   [ ] 测试暂停功能是否能立即停止网络请求。
    -   [ ] 测试从暂停状态恢复上传。
    -   [ ] 测试刷新页面后的断点续传。

---
此文档作为后续开发的指导。
