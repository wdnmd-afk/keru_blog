# 文件上传进度条依赖修复文档

## 问题描述

用户反馈文件上传时，控制台显示进度日志正常更新（如 100.28%、101.01%），但界面上的进度条始终保持在 0% 不更新。

## 问题分析

### 根本原因

在 `Upload.tsx` 组件中，`onProgress` 回调函数使用了 `useMemo` 进行优化，但依赖数组不完整：

```typescript
// 问题代码
const uploadEvents: UploadEvents = useMemo(() => ({
    onProgress: (progress) => {
        // 使用了 uploadFileList 和 updateUploadFileStatus
        const targetFile = uploadFileList.find(file => file.name === progress.fileName)
        if (targetFile) {
            updateUploadFileStatus(targetFile.uid, {
                percent: progress.percentage,
                status: 'uploading' as const
            })
        }
    },
    // 其他回调...
}), [refreshFileList]) // ❌ 依赖数组不完整
```

### 问题影响

1. **闭包陷阱**：`onProgress` 回调中的 `uploadFileList` 始终是组件初始渲染时的值（通常是空数组）
2. **无法找到文件**：由于 `uploadFileList` 为空，`targetFile` 始终为 `undefined`
3. **进度不更新**：`updateUploadFileStatus` 永远不会被调用，界面进度条保持 0%
4. **日志正常**：`console.log` 在回调开始就执行，所以日志显示正常

## 修复方案

### 核心修复

将 `uploadFileList` 和 `updateUploadFileStatus` 添加到 `useMemo` 的依赖数组中：

```typescript
// 修复后的代码
const uploadEvents: UploadEvents = useMemo(() => ({
    onProgress: (progress) => {
        console.log(`上传进度: ${progress.fileName} - ${progress.percentage}%`)
        
        // 现在可以正确访问最新的 uploadFileList
        const targetFile = uploadFileList.find(file => file.name === progress.fileName)
        if (targetFile) {
            updateUploadFileStatus(targetFile.uid, {
                percent: progress.percentage,
                status: 'uploading' as const
            })
        }
    },
    // 其他回调...
}), [refreshFileList, uploadFileList, updateUploadFileStatus]) // ✅ 完整的依赖数组
```

### 修复文件

- **文件路径**：`frontEnd/src/views/Files/Upload.tsx`
- **修改行**：第 65 行
- **修改内容**：依赖数组从 `[refreshFileList]` 改为 `[refreshFileList, uploadFileList, updateUploadFileStatus]`

## 技术细节

### React useMemo 依赖规则

1. **完整性**：所有在回调中使用的外部变量都必须包含在依赖数组中
2. **闭包更新**：依赖变化时，useMemo 会重新创建回调，确保闭包中的变量是最新的
3. **性能平衡**：虽然增加依赖会增加重新创建频率，但确保功能正确性更重要

### 数据流分析

```
用户选择文件 → fileStore.uploadFileList 更新 → Upload.tsx 重新渲染
                                                    ↓
定时器触发 → useUpload.updateProgress → onProgress 回调
                                                    ↓
查找 uploadFileList 中的文件 → 调用 updateUploadFileStatus → 更新进度条
```

## 测试验证

### 测试步骤

1. **准备测试文件**：选择一个较大的文件（>10MB）以便观察进度变化
2. **开始上传**：在文件上传页面选择文件并开始上传
3. **观察进度条**：确认界面上的进度条每秒更新
4. **检查控制台**：确认进度日志与界面进度一致
5. **测试多文件**：同时上传多个文件，确认每个文件的进度都正确显示

### 预期结果

- ✅ 界面进度条每秒更新，显示实际上传进度
- ✅ 控制台日志与界面进度条数值一致
- ✅ 多文件上传时，每个文件的进度独立正确显示
- ✅ 上传完成后进度条显示 100%
- ✅ 上传失败时进度条显示错误状态

### 回归测试

确认以下功能不受影响：
- 文件上传基本功能
- 大文件分片上传
- 秒传功能
- 上传暂停/恢复
- 错误处理

## 相关优化

### 已实现的定时器机制

本次修复配合之前实现的定时器机制，确保：
1. **定时更新**：每 1 秒自动计算并更新上传进度
2. **生命周期管理**：上传开始时启动定时器，结束时清理
3. **性能优化**：避免过于频繁的进度更新

### 进度计算优化

```typescript
// useUpload.ts 中的进度计算逻辑
const updateProgress = (taskArrItem: TaskArrItem) => {
    // 计算已完成分片的总大小
    const completedSize = taskArrItem.chunkList
        .filter(chunk => chunk.status === 2) // 已完成
        .reduce((sum, chunk) => sum + chunk.size, 0)
    
    // 计算正在上传分片的已上传大小
    const uploadingChunk = taskArrItem.chunkList.find(chunk => chunk.status === 1)
    const uploadingSize = uploadingChunk ? uploadingChunk.uploadedSize || 0 : 0
    
    // 总已上传大小 = 已完成分片大小 + 正在上传分片的已上传大小
    const totalUploadedSize = completedSize + uploadingSize
    
    // 计算百分比，确保不超过 100%
    const percentage = Math.min(
        Math.round((totalUploadedSize / taskArrItem.file.size) * 10000) / 100,
        100
    )
    
    // 触发进度回调
    events?.onProgress?.({
        fileName: taskArrItem.file.name,
        percentage,
        uploadedSize: totalUploadedSize,
        totalSize: taskArrItem.file.size
    })
}
```

## 总结

这次修复解决了一个典型的 React Hooks 依赖问题，确保了文件上传进度条的正确显示。修复后，用户可以实时看到文件上传的进度变化，提升了用户体验。

### 关键要点

1. **依赖完整性**：useMemo/useCallback 的依赖数组必须包含所有使用的外部变量
2. **闭包陷阱**：不完整的依赖会导致闭包中的变量过时
3. **功能优先**：在性能优化和功能正确性之间，优先保证功能正确
4. **测试验证**：修复后必须进行充分的功能测试和回归测试