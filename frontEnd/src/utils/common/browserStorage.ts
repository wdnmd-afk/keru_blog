class BrowserCache {
  private storage: Storage;

  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }

  /**
   * 存储缓存
   * @param key 缓存键
   * @param value 缓存值
   */
  public set(key: string, value: any): void {
    const valueType = typeof value;
    if (valueType === "object") {
      this.storage.setItem(key, JSON.stringify(value));
    } else if (valueType === "number" || valueType === "boolean") {
      this.storage.setItem(key, String(value));
    } else {
      this.storage.setItem(key, value);
    }
  }

  /**
   * 获取缓存
   * @param key 缓存键
   * @returns 缓存值
   */
  public get(key: string): any {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  /**
   * 删除缓存
   * @param key 缓存键
   */
  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  /**
   * 清空缓存
   */
  public clear(): void {
    this.storage.clear();
  }

  /**
   * 检查缓存是否存在
   * @param key 缓存键
   * @returns 是否存在
   */
  public has(key: string): boolean {
    return this.storage.getItem(key) !== null;
  }
}
const BrowserLocalStorage = new BrowserCache();
const BrowserSessionStorage = new BrowserCache(sessionStorage);

export { BrowserLocalStorage, BrowserSessionStorage };
