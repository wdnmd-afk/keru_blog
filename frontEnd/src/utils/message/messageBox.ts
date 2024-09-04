import { Modal } from 'antd';
import { ReactNode } from 'react';

interface MessageBoxProps {
    content: ReactNode | string;
    onOk: () => void;
}

class MessageBox {
  static confirm({ content, onOk }: MessageBoxProps): void {
    Modal.confirm({
      title: "提示",
      content: content,
      onOk: onOk,
      onCancel: () => {},
    });
  }
}

export { MessageBox };