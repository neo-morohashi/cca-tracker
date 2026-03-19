"use client";

import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/lib/types";
import type { StudyLog } from "@/lib/types";

type LogsStore = Record<string, StudyLog[]>;

export function useStreak() {
  const [logs] = useLocalStorage<LogsStore>(STORAGE_KEYS.LOGS, {});

  return useMemo(() => {
    const studyDates = Object.keys(logs)
      .filter((date) => (logs[date]?.length ?? 0) > 0)
      .sort((a, b) => b.localeCompare(a)); // 降順

    const totalStudyDays = studyDates.length;

    if (totalStudyDays === 0) {
      return { currentStreak: 0, longestStreak: 0, totalStudyDays: 0 };
    }

    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    // currentStreak: 今日or昨日から遡って連続した日数
    let currentStreak = 0;
    if (studyDates[0] === today || studyDates[0] === yesterday) {
      let prev = studyDates[0];
      for (const date of studyDates) {
        const diff =
          (new Date(prev).getTime() - new Date(date).getTime()) / 86400000;
        if (diff > 1) break;
        currentStreak++;
        prev = date;
      }
    }

    // longestStreak: 全期間での最長連続
    let longestStreak = 0;
    let run = 1;
    for (let i = 1; i < studyDates.length; i++) {
      const diff =
        (new Date(studyDates[i - 1]).getTime() - new Date(studyDates[i]).getTime()) /
        86400000;
      if (diff === 1) {
        run++;
        if (run > longestStreak) longestStreak = run;
      } else {
        if (run > longestStreak) longestStreak = run;
        run = 1;
      }
    }
    if (run > longestStreak) longestStreak = run;

    return { currentStreak, longestStreak, totalStudyDays };
  }, [logs]);
}
