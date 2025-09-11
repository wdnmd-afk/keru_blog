// 管理系统确认框工具
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

// 确认框配置接口
interface MessageBoxConfig {
  title?: string;
  content: string;
  confirm?: () => void;
  cancel?: () => void;
  okText?: string;
  cancelText?: string;
  type?: "info" | "success" | "error" | "warning" | "confirm";
}

/**
 * 管理系统确认框工具类
 */
class ManagementMessageBox {
  /**
   * 显示确认框
   * @param config 确认框配置
   */
  static confirm(config: MessageBoxConfig) {
    const {
      title = "确认操作",
      content,
      confirm,
      cancel,
      okText = "确定",
      cancelText = "取消",
      type = "confirm",
    } = config;

    return Modal.confirm({
      title,
      content,
      icon: <ExclamationCircleOutlined />,
      okText,
      cancelText,
      onOk: confirm,
      onCancel: cancel,
      centered: true,
      maskClosable: false,
    });
  }

  /**
   * 显示信息确认框
   * @param config 确认框配置
   */
  static info(config: MessageBoxConfig) {
    const { title = "信息", content, confirm, okText = "确定" } = config;

    return Modal.info({
      title,
      content,
      okText,
      onOk: confirm,
      centered: true,
    });
  }

  /**
   * 显示成功确认框
   * @param config 确认框配置
   */
  static success(config: MessageBoxConfig) {
    const { title = "成功", content, confirm, okText = "确定" } = config;

    return Modal.success({
      title,
      content,
      okText,
      onOk: confirm,
      centered: true,
    });
  }

  /**
   * 显示错误确认框
   * @param config 确认框配置
   */
  static error(config: MessageBoxConfig) {
    const { title = "错误", content, confirm, okText = "确定" } = config;

    return Modal.error({
      title,
      content,
      okText,
      onOk: confirm,
      centered: true,
    });
  }

  /**
   * 显示警告确认框
   * @param config 确认框配置
   */
  static warning(config: MessageBoxConfig) {
    const {
      title = "警告",
      content,
      confirm,
      cancel,
      okText = "确定",
      cancelText = "取消",
    } = config;

    return Modal.warning({
      title,
      content,
      okText,
      cancelText,
      onOk: confirm,
      onCancel: cancel,
      centered: true,
    });
  }

  /**
   * 显示删除确认框
   * @param config 确认框配置
   */
  static delete(config: Omit<MessageBoxConfig, "type">) {
    const {
      title = "确认删除",
      content,
      confirm,
      cancel,
      okText = "删除",
      cancelText = "取消",
    } = config;

    return Modal.confirm({
      title,
      content,
      icon: <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />,
      okText,
      cancelText,
      okType: "danger",
      onOk: confirm,
      onCancel: cancel,
      centered: true,
      maskClosable: false,
    });
  }

  /**
   * 销毁所有确认框
   */
  static destroyAll() {
    Modal.destroyAll();
  }
}

// 导出确认框工具
export { ManagementMessageBox };
export default ManagementMessageBox;

// 便捷方法导出
export const {
  confirm,
  info,
  success,
  error,
  warning,
  delete: deleteConfirm,
  destroyAll,
} = ManagementMessageBox;
