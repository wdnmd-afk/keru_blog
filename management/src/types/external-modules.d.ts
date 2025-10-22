// 使管理端可以引用 frontEnd 中的 PDFPreview 组件，避免 TS 提示找不到类型声明
declare module '@frontend/views/Files/components/PDFPreview' {
  import type { FC } from 'react'
  const Comp: FC<any>
  export default Comp
}
