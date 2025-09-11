// 管理系统消息提示工具
import { message, notification } from "antd";
import type { ArgsProps as MessageArgsProps } from "antd/es/message";
import type { ArgsProps as NotificationArgsProps } from "antd/es/notification";

// 消息提示配置
const messageConfig = {
  duration: 3, // 默认显示时间（秒）
  maxCount: 5, // 最大显示数量
  top: 24, // 距离顶部的位置
};

// 通知配置
const notificationConfig = {
  duration: 4.5, // 默认显示时间（秒）
  placement: "topRight" as const, // 显示位置
};

// 配置全局消息
message.config(messageConfig);
notification.config(notificationConfig);

/**
 * 管理系统消息提示类
 */
class ManagementMessage {
  /**
   * 成功消息
   * @param content 消息内容
   * @param duration 显示时间
   */
  static success(content: string, duration?: number) {
    return message.success({
      content,
      duration: duration || messageConfig.duration,
    });
  }

  /**
   * 错误消息
   * @param content 消息内容
   * @param duration 显示时间
   */
  static error(content: string, duration?: number) {
    return message.error({
      content,
      duration: duration || messageConfig.duration,
    });
  }

  /**
   * 警告消息
   * @param content 消息内容
   * @param duration 显示时间
   */
  static warning(content: string, duration?: number) {
    return message.warning({
      content,
      duration: duration || messageConfig.duration,
    });
  }

  /**
   * 信息消息
   * @param content 消息内容
   * @param duration 显示时间
   */
  static info(content: string, duration?: number) {
    return message.info({
      content,
      duration: duration || messageConfig.duration,
    });
  }

  /**
   * 加载中消息
   * @param content 消息内容
   * @param duration 显示时间
   */
  static loading(content: string, duration?: number) {
    return message.loading({
      content,
      duration: duration || 0, // 加载消息默认不自动关闭
    });
  }

  /**
   * 自定义消息
   * @param config 消息配置
   */
  static custom(config: MessageArgsProps) {
    return message.open(config);
  }

  /**
   * 销毁所有消息
   */
  static destroy() {
    message.destroy();
  }

  /**
   * 成功通知
   * @param title 标题
   * @param description 描述
   * @param duration 显示时间
   */
  static notifySuccess(title: string, description?: string, duration?: number) {
    return notification.success({
      message: title,
      description,
      duration: duration || notificationConfig.duration,
    });
  }

  /**
   * 错误通知
   * @param title 标题
   * @param description 描述
   * @param duration 显示时间
   */
  static notifyError(title: string, description?: string, duration?: number) {
    return notification.error({
      message: title,
      description,
      duration: duration || notificationConfig.duration,
    });
  }

  /**
   * 警告通知
   * @param title 标题
   * @param description 描述
   * @param duration 显示时间
   */
  static notifyWarning(title: string, description?: string, duration?: number) {
    return notification.warning({
      message: title,
      description,
      duration: duration || notificationConfig.duration,
    });
  }

  /**
   * 信息通知
   * @param title 标题
   * @param description 描述
   * @param duration 显示时间
   */
  static notifyInfo(title: string, description?: string, duration?: number) {
    return notification.info({
      message: title,
      description,
      duration: duration || notificationConfig.duration,
    });
  }

  /**
   * 自定义通知
   * @param config 通知配置
   */
  static notify(config: NotificationArgsProps) {
    return notification.open(config);
  }

  /**
   * 销毁所有通知
   */
  static destroyNotifications() {
    notification.destroy();
  }

  /**
   * 销毁所有消息和通知
   */
  static destroyAll() {
    message.destroy();
    notification.destroy();
  }
}

// 导出消息工具
export { ManagementMessage };
export default ManagementMessage;

// 便捷方法导出
export const {
  success,
  error,
  warning,
  info,
  loading,
  custom,
  destroy,
  notifySuccess,
  notifyError,
  notifyWarning,
  notifyInfo,
  notify,
  destroyNotifications,
  destroyAll,
} = ManagementMessage;
