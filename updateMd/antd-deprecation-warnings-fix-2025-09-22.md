# Ant Design 弃用警告修复任务

## 任务描述
修复 Frontend 项目中的 Ant Design v5 组件弃用警告，将过时的组件用法替换为推荐的新用法。

## 项目概览
- 项目：keru_blog Frontend
- 框架：React + TypeScript + Ant Design v5
- 修复范围：4个弃用警告涉及3个文件

---

## 分析 (RESEARCH 模式完成)

### 发现的弃用警告：

#### 1. Tabs.TabPane 弃用警告 ❌
- **位置**: `frontEnd/src/views/WebRTC/index.tsx` (第18行和第42、54行)
- **问题**: `Tabs.TabPane` 已弃用
- **当前用法**: 
  ```tsx
  const { TabPane } = Tabs
  <TabPane tab={...} key="...">...</TabPane>
  ```
- **影响**: WebRTC 主页面的标签页功能

#### 2. Timeline.Item 弃用警告 ❌
- **位置**: 
  - `frontEnd/src/views/Learning/components/LearningTimeline.tsx` (第116行)
  - `frontEnd/src/views/Learning/components/TechNodeModal.tsx` (第221行)
- **问题**: `Timeline.Item` 已弃用
- **当前用法**: 
  ```tsx
  <Timeline.Item key={...} color={...} label={...}>...</Timeline.Item>
  ```
- **影响**: 学习时间线和技术节点详情展示

#### 3. Button.Group 弃用警告 ❌
- **位置**: 
  - `frontEnd/src/views/Learning/components/LearningTimeline.tsx` (第85行)
  - `frontEnd/src/views/Learning/components/TechFlowTimeline.tsx` (第373行)
- **问题**: `Button.Group` 已弃用
- **当前用法**: 
  ```tsx
  <Button.Group>
    <Button>...</Button>
    <Button>...</Button>
  </Button.Group>
  ```
- **影响**: 视图切换器和缩放控制器

#### 4. Modal destroyOnClose 弃用警告 ❌
- **位置**: `frontEnd/src/views/Home/components/TodoList.tsx` (第97行)
- **问题**: `destroyOnClose` 属性已弃用
- **当前用法**: 
  ```tsx
  <Modal destroyOnClose>...</Modal>
  ```
- **影响**: Todo 编辑模态框

---

## 提议解决方案 (INNOVATE 模式)

### 1. Tabs.TabPane → items 属性
**解决方案**: 使用 `items` 数组属性替代 `TabPane` 子组件
**优势**: 
- 更简洁的数据驱动方式
- 更好的 TypeScript 类型支持
- 符合 Ant Design v5 设计理念

### 2. Timeline.Item → items 属性
**解决方案**: 使用 `items` 数组属性替代 `Timeline.Item` 子组件
**优势**:
- 统一的数据结构
- 更好的性能表现
- 简化的组件结构

### 3. Button.Group → Space.Compact
**解决方案**: 使用 `Space.Compact` 替代 `Button.Group`
**优势**:
- 更灵活的布局控制
- 更好的响应式支持
- 统一的间距管理

### 4. destroyOnClose → destroyOnHidden
**解决方案**: 使用 `destroyOnHidden` 替代 `destroyOnClose`
**优势**:
- 更准确的语义表达
- 更好的性能控制
- 符合新的 API 设计

---

## 实施计划 (PLAN 模式)

### 修复步骤清单:

1. **修复 WebRTC Tabs 组件**
   - 文件: `frontEnd/src/views/WebRTC/index.tsx`
   - 移除 `const { TabPane } = Tabs`
   - 将 TabPane 结构转换为 items 数组

2. **修复 LearningTimeline Timeline 组件**
   - 文件: `frontEnd/src/views/Learning/components/LearningTimeline.tsx`
   - 将 Timeline.Item 结构转换为 items 数组
   - 替换 Button.Group 为 Space.Compact

3. **修复 TechFlowTimeline Button.Group**
   - 文件: `frontEnd/src/views/Learning/components/TechFlowTimeline.tsx`
   - 替换 Button.Group 为 Space.Compact

4. **修复 TechNodeModal Timeline 组件**
   - 文件: `frontEnd/src/views/Learning/components/TechNodeModal.tsx`
   - 将 Timeline.Item 结构转换为 items 数组

5. **修复 TodoList Modal 属性**
   - 文件: `frontEnd/src/views/Home/components/TodoList.tsx`
   - 替换 destroyOnClose 为 destroyOnHidden

6. **验证修复结果**
   - 运行 TypeScript 检查
   - 测试组件功能
   - 确认样式一致性

---

## 当前执行步骤
> 已完成所有修复步骤

## 任务进度

### ✅ 已完成修复

**[2025/09/22 15:05]**
- 步骤: 修复所有 Ant Design 弃用警告
- 修改文件:
  - `frontEnd/src/views/WebRTC/index.tsx`: Tabs.TabPane → items 配置
  - `frontEnd/src/views/Learning/components/LearningTimeline.tsx`: Timeline.Item → items 配置, Button.Group → Space.Compact
  - `frontEnd/src/views/Learning/components/TechFlowTimeline.tsx`: Button.Group → Space.Compact
  - `frontEnd/src/views/Learning/components/TechNodeModal.tsx`: Timeline.Item → items 配置
  - `frontEnd/src/views/Home/components/TodoList.tsx`: destroyOnClose → destroyOnHidden
- 变更摘要: 修复了4个弃用警告，涉及5个文件
- 原因: 执行 Ant Design v5 兼容性升级
- 阻塞: 无
- 状态: 待验证

### 🔧 具体修复内容

1. **WebRTC Tabs 组件** ✅
   - 移除 `const { TabPane } = Tabs` 解构
   - 创建 `tabItems` 数组配置
   - 使用 `items={tabItems}` 属性

2. **LearningTimeline 组件** ✅
   - 添加 `Space` 导入
   - `Button.Group` → `Space.Compact`
   - `Timeline.Item` → `items` 数组配置

3. **TechFlowTimeline 组件** ✅
   - 添加 `Space` 导入
   - `Button.Group` → `Space.Compact`

4. **TechNodeModal 组件** ✅
   - `Timeline.Item` → `items` 数组配置

5. **TodoList Modal** ✅
   - `destroyOnClose` → `destroyOnHidden`

## 最终审查
*准备进行验证测试*
