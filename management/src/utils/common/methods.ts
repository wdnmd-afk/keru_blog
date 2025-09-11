// 管理系统通用工具方法

/**
 * 生成指定范围内的随机数
 * @param min 最小值
 * @param max 最大值
 * @returns 随机数
 */
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 深拷贝函数
 * @param list 要拷贝的对象
 * @param map WeakMap 用于处理循环引用
 * @returns 拷贝后的对象
 */
const deepClone = (list: any, map = new WeakMap()) => {
  // 判断传进来的 list 是否为引用类型数据
  if (list && typeof list === "object") {
    // 通过 list 的 constructor 来指定 cloneList 的类型
    const cloneList: any = list.constructor === Array ? [] : {};

    // 如果是 Date，RegExp 类型直接返回
    if (list instanceof Date) return new Date(list);
    if (list instanceof RegExp) return new RegExp(list);

    // 如果传进来的 list 已经存在于 map 中直接返回对应的 value
    if (map.has(list)) {
      return map.get(list);
    }

    // 保存每个 list key
    map.set(list, cloneList);

    for (const key in list) {
      // 不循环原型上的 key
      if (Object.hasOwnProperty.call(list, key)) {
        // 每个 key 值等于 deepClone 的函数返回值，把新的 map 作为参数传递
        cloneList[key] = deepClone(list[key], map);
      }
    }
    return cloneList;
  } else {
    // 值类型直接返回
    return list;
  }
};

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间（毫秒）
 * @param immediate 是否立即执行
 * @returns 防抖后的函数
 */
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func(...args);
  };
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param limit 时间间隔（毫秒）
 * @returns 节流后的函数
 */
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @param decimals 小数位数
 * @returns 格式化后的文件大小
 */
function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * 格式化日期时间
 * @param date 日期对象或时间戳
 * @param format 格式字符串
 * @returns 格式化后的日期字符串
 */
function formatDateTime(
  date: Date | number | string,
  format: string = "YYYY-MM-DD HH:mm:ss",
): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return "无效日期";
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return format
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}

/**
 * 生成唯一 ID
 * @param prefix 前缀
 * @returns 唯一 ID
 */
function generateUniqueId(prefix: string = "id"): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 9);
  return `${prefix}_${timestamp}_${randomStr}`;
}

/**
 * 检查是否为空值
 * @param value 要检查的值
 * @returns 是否为空
 */
function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/**
 * 管理系统专用的工具方法
 */
const ManagementUtils = {
  getRandomNumber,
  deepClone,
  debounce,
  throttle,
  formatFileSize,
  formatDateTime,
  generateUniqueId,
  isEmpty,
};

export {
  deepClone,
  debounce,
  formatDateTime,
  formatFileSize,
  generateUniqueId,
  getRandomNumber,
  isEmpty,
  ManagementUtils,
  throttle,
};

export default ManagementUtils;
