"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/types";
import type { AppSettings } from "@/lib/types";
import { SetupModal } from "./SetupModal";

const EMPTY_SETTINGS: AppSettings = {
  startDate: "", lastStudyDate: "", currentStreak: 0, longestStreak: 0,
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const [settings] = useLocalStorage<AppSettings>(STORAGE_KEYS.SETTINGS, EMPTY_SETTINGS);
  // useLocalStorage はSSR時にdefaultValueを返す。クライアントマウント後に実際の値に変わる。
  // 「startDateが空」という判断はマウント後に行う（SSRフラッシュ防止）
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const showSetup = mounted && !settings.startDate;

  return (
    <>
      {showSetup && <SetupModal />}
      {children}
    </>
  );
}
