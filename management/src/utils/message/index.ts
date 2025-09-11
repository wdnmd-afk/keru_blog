// 消息工具导出
// 导出主要的消息类
export {
  ManagementMessage,
  default as ManagementMessageDefault,
} from "./message";
export {
  ManagementMessageBox,
  default as ManagementMessageBoxDefault,
} from "./messageBox";

// 为了避免命名冲突，使用命名空间导出
import * as MessageUtils from "./message";
import * as MessageBoxUtils from "./messageBox";

// 重新导出避免冲突的方法
export const {
  success: messageSuccess,
  error: messageError,
  warning: messageWarning,
  info: messageInfo,
  loading: messageLoading,
  custom: messageCustom,
  destroy: messageDestroy,
  notifySuccess,
  notifyError,
  notifyWarning,
  notifyInfo,
  notify,
  destroyNotifications,
  destroyAll: messageDestroyAll,
} = MessageUtils;

export const {
  confirm: boxConfirm,
  info: boxInfo,
  success: boxSuccess,
  error: boxError,
  warning: boxWarning,
  deleteConfirm,
  destroyAll: boxDestroyAll,
} = MessageBoxUtils;
