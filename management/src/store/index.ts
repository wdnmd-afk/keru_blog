// 管理系统状态管理
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BrowserLocalStorage } from "@/utils";

// 用户信息类型 - 与 frontEnd 保持一致
interface UserInfo {
  id: string;
  name: string;
  email?: string;
  admin: boolean;
  token: string;
  avatar?: string;
  lastLoginTime?: string;
}

// 系统配置类型
interface SystemConfig {
  theme: "light" | "dark";
  language: string;
  sidebarCollapsed: boolean;
  notifications: boolean;
}

// 管理系统状态类型
interface ManagementState {
  // 用户相关状态
  user: UserInfo | null;
  isAuthenticated: boolean;

  // 系统配置状态
  systemConfig: SystemConfig;

  // UI 状态
  loading: boolean;
  sidebarCollapsed: boolean;

  // 操作方法
  actions: {
    // 用户操作
    setUser: (user: UserInfo) => void;
    clearUser: () => void;
    updateUserInfo: (updates: Partial<UserInfo>) => void;

    // 系统配置操作
    updateSystemConfig: (config: Partial<SystemConfig>) => void;
    toggleSidebar: () => void;
    setTheme: (theme: "light" | "dark") => void;
    setLanguage: (language: string) => void;

    // UI 操作
    setLoading: (loading: boolean) => void;

    // 初始化操作
    initializeStore: () => void;
  };
}

// 默认系统配置
const defaultSystemConfig: SystemConfig = {
  theme: "light",
  language: "zh-CN",
  sidebarCollapsed: false,
  notifications: true,
};

// 创建管理系统状态存储
export const useManagementStore = create<ManagementState>()(
  immer((set, get) => ({
    // 初始状态
    user: null,
    isAuthenticated: false,
    systemConfig: defaultSystemConfig,
    loading: false,
    sidebarCollapsed: false,

    // 操作方法
    actions: {
      // 设置用户信息
      setUser: (user: UserInfo) => {
        set((state) => {
          state.user = user;
          state.isAuthenticated = true;
        });

        // 保存到本地存储 - 与 frontEnd 保持一致
        BrowserLocalStorage.set("userInfo", user);
        console.log("[Management Store] 用户登录:", user.name);
      },

      // 清除用户信息
      clearUser: () => {
        set((state) => {
          state.user = null;
          state.isAuthenticated = false;
        });

        // 清除本地存储 - 与 frontEnd 保持一致
        BrowserLocalStorage.remove("userInfo");
        BrowserLocalStorage.remove("savedLoginInfo");
        console.log("[Management Store] 用户退出登录");
      },

      // 更新用户信息
      updateUserInfo: (updates: Partial<UserInfo>) => {
        set((state) => {
          if (state.user) {
            Object.assign(state.user, updates);

            // 更新本地存储 - 与 frontEnd 保持一致
            BrowserLocalStorage.set("userInfo", state.user);
          }
        });

        console.log("[Management Store] 更新用户信息:", updates);
      },

      // 更新系统配置
      updateSystemConfig: (config: Partial<SystemConfig>) => {
        set((state) => {
          Object.assign(state.systemConfig, config);

          // 同步侧边栏状态
          if (config.sidebarCollapsed !== undefined) {
            state.sidebarCollapsed = config.sidebarCollapsed;
          }
        });

        // 保存到本地存储
        const currentConfig = get().systemConfig;
        BrowserLocalStorage.set("managementSystemConfig", currentConfig);
        console.log("[Management Store] 更新系统配置:", config);
      },

      // 切换侧边栏
      toggleSidebar: () => {
        set((state) => {
          state.sidebarCollapsed = !state.sidebarCollapsed;
          state.systemConfig.sidebarCollapsed = state.sidebarCollapsed;
        });

        // 保存到本地存储
        const currentConfig = get().systemConfig;
        BrowserLocalStorage.set("managementSystemConfig", currentConfig);
      },

      // 设置主题
      setTheme: (theme: "light" | "dark") => {
        set((state) => {
          state.systemConfig.theme = theme;
        });

        // 保存到本地存储
        const currentConfig = get().systemConfig;
        BrowserLocalStorage.set("managementSystemConfig", currentConfig);
        console.log("[Management Store] 切换主题:", theme);
      },

      // 设置语言
      setLanguage: (language: string) => {
        set((state) => {
          state.systemConfig.language = language;
        });

        // 保存到本地存储
        const currentConfig = get().systemConfig;
        BrowserLocalStorage.set("managementSystemConfig", currentConfig);
        console.log("[Management Store] 切换语言:", language);
      },

      // 设置加载状态
      setLoading: (loading: boolean) => {
        set((state) => {
          state.loading = loading;
        });
      },

      // 初始化存储
      initializeStore: () => {
        // 从本地存储恢复用户信息 - 与 frontEnd 保持一致
        const savedUser = BrowserLocalStorage.get("userInfo");
        if (savedUser && savedUser.token) {
          set((state) => {
            state.user = savedUser;
            state.isAuthenticated = true;
          });
          console.log("[Management Store] 恢复用户登录状态:", savedUser.name);
        }

        // 从本地存储恢复系统配置
        const savedConfig = BrowserLocalStorage.get("managementSystemConfig");
        if (savedConfig) {
          set((state) => {
            state.systemConfig = { ...defaultSystemConfig, ...savedConfig };
            state.sidebarCollapsed = state.systemConfig.sidebarCollapsed;
          });
          console.log("[Management Store] 恢复系统配置:", savedConfig);
        }

        console.log("[Management Store] 状态存储初始化完成");
      },
    },
  })),
);

// 便捷的 Hook 用于获取状态和操作
export const useManagementUser = () => {
  const user = useManagementStore((state) => state.user);
  const isAuthenticated = useManagementStore((state) => state.isAuthenticated);
  const { setUser, clearUser, updateUserInfo } = useManagementStore(
    (state) => state.actions,
  );

  return {
    user,
    isAuthenticated,
    setUser,
    clearUser,
    updateUserInfo,
  };
};

export const useManagementConfig = () => {
  const systemConfig = useManagementStore((state) => state.systemConfig);
  const sidebarCollapsed = useManagementStore(
    (state) => state.sidebarCollapsed,
  );
  const { updateSystemConfig, toggleSidebar, setTheme, setLanguage } =
    useManagementStore((state) => state.actions);

  return {
    systemConfig,
    sidebarCollapsed,
    updateSystemConfig,
    toggleSidebar,
    setTheme,
    setLanguage,
  };
};

export const useManagementUI = () => {
  const loading = useManagementStore((state) => state.loading);
  const { setLoading } = useManagementStore((state) => state.actions);

  return {
    loading,
    setLoading,
  };
};

// 初始化存储的函数
export const initializeManagementStore = () => {
  const { initializeStore } = useManagementStore.getState().actions;
  initializeStore();
};

export default useManagementStore;
