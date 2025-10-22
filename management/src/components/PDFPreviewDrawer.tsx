// 管理端通用 PDF 抽屉预览组件（iframe 实现）
// 说明：
// - 输入一个可直接访问的 PDF URL（如 /static/PDF/20250101/xxx.pdf）
// - 使用 Ant Design Drawer 承载，采用浏览器原生 PDF 预览能力，避免跨项目依赖与 worker 配置问题

import React from "react";
import { Drawer } from "antd";

export interface PDFPreviewDrawerProps {
  open: boolean;
  src?: string;
  fileName?: string;
  onClose: () => void;
  height?: number | string;
}

const PDFPreviewDrawer: React.FC<PDFPreviewDrawerProps> = ({ open, src, fileName, onClose, height = "80vh" }) => {
  return (
    <Drawer
      title={fileName ? `PDF 预览 - ${fileName}` : "PDF 预览"}
      placement="right"
      width={980}
      open={open}
      onClose={onClose}
      destroyOnClose
      bodyStyle={{ padding: 0 }}
    >
      {src ? (
        <iframe title="pdf-preview" src={src} style={{ width: "100%", height, border: 0 }} />
      ) : (
        <div style={{ color: "#999", padding: 16 }}>暂无预览内容</div>
      )}
    </Drawer>
  );
};

export default PDFPreviewDrawer;
