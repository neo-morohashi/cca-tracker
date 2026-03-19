// localStorageを直接触るのはここだけ
// 将来的にSupabase等に差し替える場合、このlayerのみ変更する

export const storage = {
  get<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage quota exceeded等は無視
    }
  },

  remove(key: string): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },

  clear(): void {
    if (typeof window === "undefined") return;
    try {
      // cca-tracker: プレフィックスのキーのみ削除
      const keys = Object.keys(window.localStorage).filter((k) =>
        k.startsWith("cca-tracker:")
      );
      keys.forEach((k) => window.localStorage.removeItem(k));
    } catch {
      // ignore
    }
  },
};
