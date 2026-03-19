"use client";

import { useState, useEffect } from "react";
import { storage } from "@/lib/storage";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // SSR安全: 初期値はdefaultValueで起動し、useEffectでlocalStorageから読み込む
  const [storedValue, setStoredValue] = useState<T>(defaultValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStoredValue(storage.get<T>(key, defaultValue));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // 他のuseLocalStorageインスタンスからの変更を同期
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === key) {
        setStoredValue(storage.get<T>(key, defaultValue));
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = (value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const next = typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
      storage.set(key, next);
      // 同一ウィンドウ内の他インスタンスに変更を通知
      window.dispatchEvent(new StorageEvent("storage", { key }));
      return next;
    });
  };

  // ハイドレーション前はdefaultValueを返す（SSRとの一致を保証）
  return [hydrated ? storedValue : defaultValue, setValue];
}
