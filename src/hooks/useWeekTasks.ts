"use client";

import { useLocalStorage } from "./useLocalStorage";
import { WEEK_PLANS } from "@/lib/plan-data";
import { STORAGE_KEYS } from "@/lib/types";
import type { LocalizedString } from "@/lib/i18n";

type CustomTasks = Record<number, string[]>;

export function useWeekTasks(week: number) {
  const [customTasks, setCustomTasks] = useLocalStorage<CustomTasks>(
    STORAGE_KEYS.CUSTOM_TASKS,
    {}
  );

  const defaultTasks: LocalizedString[] = WEEK_PLANS.find((p) => p.week === week)?.tasks ?? [];
  const tasks: Array<string | LocalizedString> = customTasks[week] ?? defaultTasks;
  const isCustomized = week in customTasks;

  function saveTasks(newTasks: string[]) {
    setCustomTasks((prev) => ({ ...prev, [week]: newTasks }));
  }

  function resetTasks() {
    setCustomTasks((prev) => {
      const next = { ...prev };
      delete next[week];
      return next;
    });
  }

  return { tasks, defaultTasks, isCustomized, saveTasks, resetTasks };
}
