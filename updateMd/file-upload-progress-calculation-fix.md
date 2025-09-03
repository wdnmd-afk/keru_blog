# 文件上传进度计算修复

## 问题描述

用户反馈文件上传功能存在问题：
- 上传进度始终显示为 0%
- 控制台日志显示进度为 0%，但文件合并流程已完成
- 大文件分片上传的进度计算逻辑存在缺陷

## 问题分析

### 根本原因

在 `useUpload.ts` 的 `updateProgress` 函数中，进度计算存在逻辑错误：

1. **分片状态管理问题**：
   - 正在上传的分片被移动到 `whileRequests` 数组
   - 同时从 `allChunkList` 数组中移除
   - 进度计算只考虑了 `allChunkList`，忽略了 `whileRequests` 中正在上传的分片

2. **已完成分片未计算**：
   - 已完成的分片从所有数组中移除
   - 只通过 `finishNumber` 记录完成数量，但未在进度计算中体现其大小

### 原始代码问题

```typescript
// 原始的错误计算方式
const uploadedSize = taskArrItem.allChunkList.reduce((acc, chunk) => acc + (chunk.loaded || 0), 0)
```

这种计算方式导致：
- 正在上传的分片进度丢失
- 已完成分片的大小未计入总进度
- 最终显示进度始终为 0%

## 解决方案

### 修复内容

修改 `updateProgress` 函数的进度计算逻辑：

```typescript
const updateProgress = (taskArrItem: FileChunkProp) => {
    const totalSize = taskArrItem.fileSize
    
    // 计算所有分片已上传的总大小（包括等待上传的和正在上传的分片）
    const allChunks = [...taskArrItem.allChunkList, ...taskArrItem.whileRequests]
    const uploadedSize = allChunks.reduce((acc, chunk) => acc + (chunk.loaded || 0), 0)
    
    // 添加已完成分片的大小（这些分片已经不在上述数组中）
    const completedChunksSize = taskArrItem.finishNumber * (options?.chunkSize || DEFAULT_OPTIONS.chunkSize!)
    const totalUploadedSize = uploadedSize + completedChunksSize

    if (totalSize > 0) {
        taskArrItem.percentage = Number(((totalUploadedSize / totalSize) * 100).toFixed(2))
    } else {
        taskArrItem.percentage = 0
    }

    // 更新更详细的进度状态
    const progress: UploadProgress = {
        percentage: taskArrItem.percentage,
        status: 'uploading',
        fileName: taskArrItem.fileName,
        uploadedSize: totalUploadedSize,
        totalSize,
        speed: 0,
        remainingTime: 0,
    }
    events?.onProgress?.(progress)
}
```

### 修复要点

1. **全面的分片进度统计**：
   - 合并 `allChunkList` 和 `whileRequests` 数组
   - 统计所有分片的 `loaded` 值

2. **已完成分片大小计算**：
   - 通过 `finishNumber * chunkSize` 计算已完成分片的总大小
   - 将其加入总的已上传大小

3. **准确的进度百分比**：
   - 基于真实的已上传字节数计算进度
   - 确保进度能够实时反映上传状态

## 测试验证

### 预期效果

修复后应该实现：
1. ✅ 进度条能够实时显示正确的上传百分比
2. ✅ 分片上传过程中进度逐步增加
3. ✅ 控制台日志显示准确的进度信息
4. ✅ 文件合并前进度接近 100%

### 测试场景

1. **小文件上传**：验证单分片文件的进度显示
2. **大文件分片上传**：验证多分片文件的进度计算
3. **并发上传**：验证多个文件同时上传时的进度独立性
4. **断点续传**：验证暂停恢复后的进度准确性

## 相关文件

- **修改文件**：`frontEnd/src/hooks/useUpload.ts`
- **影响组件**：`frontEnd/src/views/Files/Upload.tsx`
- **显示组件**：`frontEnd/src/components/Files/FileUpload.tsx`

## 风险评估

### 低风险
- 仅修改进度计算逻辑，不影响上传核心功能
- 保持原有的分片管理机制不变
- 向后兼容，不破坏现有接口

### 注意事项
- 确保 `chunkSize` 配置正确，影响已完成分片大小计算
- 监控内存使用，避免大量分片对象造成性能问题

---

**修复完成时间**：2024-01-16  
**修复状态**：✅ 已完成  
**测试状态**：⏳ 待验证