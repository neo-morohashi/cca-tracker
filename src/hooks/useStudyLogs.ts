"use client";

import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/lib/types";
import type { StudyLog, DomainId } from "@/lib/types";

// キー: YYYY-MM-DD、値: その日のログ配列
type LogsStore = Record<string, StudyLog[]>;

export function useStudyLogs() {
  const [logs, setLogs] = useLocalStorage<LogsStore>(STORAGE_KEYS.LOGS, {});

  function addLog(log: Omit<StudyLog, "id">): void {
    const id = log.date;
    setLogs((prev) => {
      const existing = prev[id] ?? [];
      return { ...prev, [id]: [...existing, { ...log, id }] };
    });
  }

  function deleteLog(date: string, index: number): void {
    setLogs((prev) => {
      const existing = prev[date] ?? [];
      const updated = existing.filter((_, i) => i !== index);
      if (updated.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: updated };
    });
  }

  function getLogsByWeek(week: number): StudyLog[] {
    return Object.values(logs)
      .flat()
      .filter((log) => log.week === week);
  }

  function getLogsByDomain(domain: DomainId): StudyLog[] {
    return Object.values(logs)
      .flat()
      .filter((log) => log.domain === domain);
  }

  function getLogsByDateRange(from: string, to: string): StudyLog[] {
    return Object.entries(logs)
      .filter(([date]) => date >= from && date <= to)
      .flatMap(([, entries]) => entries);
  }

  function getTotalMinutes(): number {
    return Object.values(logs)
      .flat()
      .reduce((sum, log) => sum + log.durationMinutes, 0);
  }

  // datalistサジェスト用（重複除去・最新順）
  function getRecentTopics(): string[] {
    const all = Object.entries(logs)
      .sort(([a], [b]) => b.localeCompare(a))
      .flatMap(([, entries]) => entries.map((e) => e.topic))
      .filter(Boolean);
    return Array.from(new Set(all)).slice(0, 20);
  }

  return {
    logs,
    addLog,
    deleteLog,
    getLogsByWeek,
    getLogsByDomain,
    getLogsByDateRange,
    getTotalMinutes,
    getRecentTopics,
  };
}
