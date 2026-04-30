"use client";

import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/lib/types";

export function useTaskChecks() {
  const [checked, setChecked] = useLocalStorage<string[]>(STORAGE_KEYS.TASK_CHECKS, []);

  function isChecked(week: number, index: number) {
    return checked.includes(`${week}:${index}`);
  }

  function toggle(week: number, index: number) {
    const key = `${week}:${index}`;
    setChecked((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  return { isChecked, toggle };
}
