import { Modal } from "antd";
import { ReactNode } from "react";

interface MessageBoxProps {
  content: ReactNode | string;
  confirm: () => void;
  cancelText?: string;
  okText?: string;
  title?: string;
  centered?: boolean;
}

class MessageBox {
  static confirm({
    content,
    confirm,
    cancelText = "取消",
    okText = "确认",
    centered = true,
  }: MessageBoxProps): void {
    Modal.confirm({
      title: "提示",
      content: content,
      onOk: confirm,
      onCancel: () => {},
      cancelText,
      okText,
      centered,
    });
  }
}

export { MessageBox };
