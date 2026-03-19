"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useStudyLogs } from "@/hooks/useStudyLogs";
import { HEATMAP_COLORS } from "@/lib/constants";
import { STORAGE_KEYS } from "@/lib/types";
import type { AppSettings } from "@/lib/types";

const today = new Date().toISOString().slice(0, 10);
const DEFAULT_SETTINGS: AppSettings = {
  startDate: today, lastStudyDate: "", currentStreak: 0, longestStreak: 0,
};
const DAY_JA = ["月", "火", "水", "木", "金", "土", "日"];

// Phase区切り定義
const PHASES = [
  { label: "P1 基盤", weeks: 4 },
  { label: "P2 深掘り", weeks: 6 },
  { label: "P3 試験", weeks: 6 },
] as const;

function offsetDate(start: string, days: number): string {
  const d = new Date(start);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function heatColor(minutes: number, isFuture: boolean): string {
  if (isFuture) return "#0f172a";
  if (minutes === 0) return HEATMAP_COLORS.empty;
  if (minutes <= 15) return HEATMAP_COLORS.low;
  if (minutes <= 30) return HEATMAP_COLORS.medium;
  if (minutes <= 45) return HEATMAP_COLORS.high;
  return HEATMAP_COLORS.max;
}

export function CalendarHeatmap() {
  const [settings] = useLocalStorage<AppSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const { logs } = useStudyLogs();

  const startDate = settings.startDate || today;

  // 行ラベル: startDateの曜日基点で7日分の実際の曜日名
  const dayLabels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const dow = d.getDay();
    return DAY_JA[dow === 0 ? 6 : dow - 1];
  });

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-700 p-4">
      <p className="text-xs font-semibold text-slate-400 mb-3">16週間カレンダー</p>

      <div className="overflow-x-auto">
        <div style={{ minWidth: "288px" }}>

          {/* Phase ラベル行 */}
          <div className="flex mb-1.5" style={{ paddingLeft: "22px", gap: "2px" }}>
            {PHASES.map((phase) => (
              <div
                key={phase.label}
                className="text-[9px] text-slate-500 border-l border-slate-700 pl-1 truncate"
                style={{ flex: phase.weeks }}
              >
                {phase.label}
              </div>
            ))}
          </div>

          {/* 7行 × 16列 グリッド */}
          {Array.from({ length: 7 }, (_, dayIdx) => (
            <div key={dayIdx} className="flex items-center mb-[2px]" style={{ gap: "2px" }}>
              {/* 曜日ラベル */}
              <span className="text-[9px] text-slate-600 shrink-0 text-right" style={{ width: "18px", marginRight: "2px" }}>
                {dayLabels[dayIdx]}
              </span>

              {/* 16週分のセル */}
              {Array.from({ length: 16 }, (_, weekIdx) => {
                const offset = weekIdx * 7 + dayIdx;
                const date = offsetDate(startDate, offset);
                const isFuture = date > today;
                const isToday = date === today;
                const minutes = (logs[date] ?? []).reduce((s, l) => s + l.durationMinutes, 0);

                return (
                  <div
                    key={weekIdx}
                    className="flex-1 rounded-[2px]"
                    style={{
                      height: "14px",
                      minWidth: "10px",
                      backgroundColor: heatColor(minutes, isFuture),
                      boxShadow: isToday ? "0 0 0 1.5px #8b5cf6" : "none",
                      opacity: isFuture ? 0.35 : 1,
                    }}
                    title={`${date}: ${isFuture ? "未来" : minutes + "分"}`}
                  />
                );
              })}
            </div>
          ))}

          {/* 週番号ラベル */}
          <div className="flex mt-1.5" style={{ paddingLeft: "22px", gap: "2px" }}>
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} className="flex-1 text-[9px] text-slate-700 text-center">
                {i + 1}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-3">
        <span className="text-[10px] text-slate-600">0分</span>
        {Object.values(HEATMAP_COLORS).map((color) => (
          <span key={color} className="w-3 h-3 rounded-[2px] shrink-0" style={{ backgroundColor: color }} />
        ))}
        <span className="text-[10px] text-slate-600">45分+</span>
      </div>
    </div>
  );
}
