// 浏览器存储工具类 - 复用 frontEnd 的实现并针对管理系统进行适配

class BrowserCache {
  private storage: Storage;
  private prefix: string;

  constructor(storage: Storage = localStorage, prefix: string = "management_") {
    this.storage = storage;
    this.prefix = prefix; // 管理系统专用前缀，避免与 frontEnd 项目冲突
  }

  /**
   * 获取带前缀的键名
   * @param key 原始键名
   * @returns 带前缀的键名
   */
  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  /**
   * 存储缓存
   * @param key 缓存键
   * @param value 缓存值
   */
  public set(key: string, value: any): void {
    const fullKey = this.getKey(key);
    const valueType = typeof value;

    try {
      if (valueType === "object") {
        this.storage.setItem(fullKey, JSON.stringify(value));
      } else if (valueType === "number" || valueType === "boolean") {
        this.storage.setItem(fullKey, String(value));
      } else {
        this.storage.setItem(fullKey, value);
      }
      console.log(`[Management Storage] 存储数据: ${key}`, value);
    } catch (error) {
      console.error(`[Management Storage] 存储失败: ${key}`, error);
    }
  }

  /**
   * 获取缓存
   * @param key 缓存键
   * @returns 缓存值
   */
  public get(key: string): any {
    const fullKey = this.getKey(key);

    try {
      const value = this.storage.getItem(fullKey);
      if (value === null) {
        return null;
      }

      // 尝试解析 JSON，如果失败则返回原始字符串
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      console.error(`[Management Storage] 获取失败: ${key}`, error);
      return null;
    }
  }

  /**
   * 删除缓存
   * @param key 缓存键
   */
  public remove(key: string): void {
    const fullKey = this.getKey(key);

    try {
      this.storage.removeItem(fullKey);
      console.log(`[Management Storage] 删除数据: ${key}`);
    } catch (error) {
      console.error(`[Management Storage] 删除失败: ${key}`, error);
    }
  }

  /**
   * 清空所有管理系统相关的缓存
   */
  public clear(): void {
    try {
      const keys = Object.keys(this.storage);
      const managementKeys = keys.filter((key) => key.startsWith(this.prefix));

      managementKeys.forEach((key) => {
        this.storage.removeItem(key);
      });

      console.log(
        `[Management Storage] 清空所有数据，共 ${managementKeys.length} 项`,
      );
    } catch (error) {
      console.error("[Management Storage] 清空失败:", error);
    }
  }

  /**
   * 检查缓存是否存在
   * @param key 缓存键
   * @returns 是否存在
   */
  public has(key: string): boolean {
    const fullKey = this.getKey(key);
    return this.storage.getItem(fullKey) !== null;
  }

  /**
   * 获取所有管理系统相关的键名
   * @returns 键名数组
   */
  public keys(): string[] {
    try {
      const allKeys = Object.keys(this.storage);
      return allKeys
        .filter((key) => key.startsWith(this.prefix))
        .map((key) => key.replace(this.prefix, ""));
    } catch (error) {
      console.error("[Management Storage] 获取键名失败:", error);
      return [];
    }
  }

  /**
   * 获取存储大小（字节）
   * @returns 存储大小
   */
  public size(): number {
    try {
      let totalSize = 0;
      const keys = Object.keys(this.storage);
      const managementKeys = keys.filter((key) => key.startsWith(this.prefix));

      managementKeys.forEach((key) => {
        const value = this.storage.getItem(key);
        if (value) {
          totalSize += key.length + value.length;
        }
      });

      return totalSize;
    } catch (error) {
      console.error("[Management Storage] 计算大小失败:", error);
      return 0;
    }
  }
}

// 创建管理系统专用的存储实例
const BrowserLocalStorage = new BrowserCache(localStorage, "management_");
const BrowserSessionStorage = new BrowserCache(
  sessionStorage,
  "management_session_",
);

export { BrowserLocalStorage, BrowserSessionStorage };
export default BrowserLocalStorage;
