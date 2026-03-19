"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCurrentWeek } from "@/hooks/useCurrentWeek";
import { useStudyLogs } from "@/hooks/useStudyLogs";
import { HEATMAP_COLORS } from "@/lib/constants";
import { STORAGE_KEYS } from "@/lib/types";
import type { AppSettings } from "@/lib/types";

const today = new Date().toISOString().slice(0, 10);
const DEFAULT_SETTINGS: AppSettings = {
  startDate: today, lastStudyDate: "", currentStreak: 0, longestStreak: 0,
};
const DAY_JA = ["月", "火", "水", "木", "金", "土", "日"];

function offsetDate(start: string, days: number): string {
  const d = new Date(start);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function heatColor(minutes: number): string {
  if (minutes === 0) return HEATMAP_COLORS.empty;
  if (minutes <= 15) return HEATMAP_COLORS.low;
  if (minutes <= 30) return HEATMAP_COLORS.medium;
  if (minutes <= 45) return HEATMAP_COLORS.high;
  return HEATMAP_COLORS.max;
}

export function WeekHeatmap() {
  const [settings] = useLocalStorage<AppSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const { currentWeek } = useCurrentWeek(settings.startDate || today);
  const { logs } = useStudyLogs();

  const startDate = settings.startDate || today;
  const weekOffset = (currentWeek - 1) * 7;
  const weekDates = Array.from({ length: 7 }, (_, i) => offsetDate(startDate, weekOffset + i));
  const totalMinutes = weekDates.reduce(
    (sum, date) => sum + (logs[date] ?? []).reduce((s, l) => s + l.durationMinutes, 0),
    0
  );

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-slate-400">Week {currentWeek} の学習</p>
        <p className="text-xs text-slate-500">
          {totalMinutes > 0 ? `今週 ${totalMinutes}分` : "まだ記録なし"}
        </p>
      </div>

      <div className="flex gap-1.5">
        {weekDates.map((date, i) => {
          const minutes = (logs[date] ?? []).reduce((s, l) => s + l.durationMinutes, 0);
          const isToday = date === today;
          const isFuture = date > today;
          const dow = new Date(date).getDay();
          const dayLabel = DAY_JA[dow === 0 ? 6 : dow - 1];
          const shortDate = date.slice(8); // DD

          return (
            <div key={date} className="flex-1 flex flex-col items-center gap-1">
              <span className={`text-[10px] ${isToday ? "text-violet-400 font-bold" : "text-slate-500"}`}>
                {dayLabel}
              </span>
              <div
                className="w-full rounded-md transition-colors"
                style={{
                  aspectRatio: "1",
                  backgroundColor: isFuture ? "#0f172a" : heatColor(minutes),
                  boxShadow: isToday ? "0 0 0 2px #8b5cf6" : "none",
                  opacity: isFuture ? 0.4 : 1,
                }}
                title={`${date}: ${isFuture ? "未来" : minutes + "分"}`}
              />
              <span className={`text-[9px] ${isToday ? "text-violet-400" : "text-slate-600"}`}>
                {shortDate}
              </span>
              {minutes > 0 && (
                <span className="text-[9px] text-emerald-400 font-medium leading-none">
                  {minutes}m
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-3">
        <span className="text-[10px] text-slate-600">少</span>
        {Object.values(HEATMAP_COLORS).map((color) => (
          <span key={color} className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: color }} />
        ))}
        <span className="text-[10px] text-slate-600">多</span>
        <span className="ml-auto text-[10px] text-slate-600">
          <span className="inline-block w-3 h-3 rounded-sm border border-violet-500 align-middle mr-0.5" />
          今日
        </span>
      </div>
    </div>
  );
}
