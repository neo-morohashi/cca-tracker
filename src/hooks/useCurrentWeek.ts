"use client";

import { useMemo } from "react";
import { TOTAL_WEEKS, TOTAL_DAYS } from "@/lib/constants";
import type { PhaseId } from "@/lib/types";

function getPhase(week: number): PhaseId {
  if (week <= 4) return 1;
  if (week <= 10) return 2;
  return 3;
}

export function useCurrentWeek(startDate: string) {
  return useMemo(() => {
    const start = new Date(startDate);
    const now = new Date();
    // 時刻を無視して日数差を計算
    const msPerDay = 86400000;
    const daysElapsed = Math.floor((now.getTime() - start.getTime()) / msPerDay);

    const clampedDays = Math.max(0, Math.min(daysElapsed, TOTAL_DAYS - 1));
    const currentWeek = Math.min(Math.floor(clampedDays / 7) + 1, TOTAL_WEEKS) as number;
    const daysRemaining = Math.max(0, TOTAL_DAYS - daysElapsed - 1);
    const progress = Math.min(100, Math.round((daysElapsed / TOTAL_DAYS) * 100));
    const currentPhase = getPhase(currentWeek);
    const isComplete = daysElapsed >= TOTAL_DAYS;

    return {
      currentWeek,
      currentPhase,
      daysElapsed: Math.max(0, daysElapsed),
      daysRemaining,
      progress,
      isComplete,
    };
  }, [startDate]);
}
