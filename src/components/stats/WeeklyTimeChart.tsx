"use client";

import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer,
  Tooltip, ReferenceLine, Cell,
} from "recharts";
import { useStudyLogs } from "@/hooks/useStudyLogs";
import { WEEKLY_TARGET_MIN, WEEKLY_TARGET_MAX } from "@/lib/constants";

const TOOLTIP_STYLE = {
  backgroundColor: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "8px",
  fontSize: "12px",
  color: "#e2e8f0",
};

function barColor(minutes: number): string {
  if (minutes === 0) return "#1e293b";
  if (minutes < WEEKLY_TARGET_MIN) return "#f59e0b";
  if (minutes <= WEEKLY_TARGET_MAX) return "#10b981";
  return "#8b5cf6";
}

export function WeeklyTimeChart() {
  const { getLogsByWeek } = useStudyLogs();

  const data = Array.from({ length: 16 }, (_, i) => ({
    week: i + 1,
    minutes: getLogsByWeek(i + 1).reduce((s, l) => s + l.durationMinutes, 0),
  }));

  const hasData = data.some((d) => d.minutes > 0);

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-700 p-4">
      <p className="text-xs font-semibold text-slate-400 mb-3">週別学習時間（分）</p>

      {!hasData && (
        <p className="text-xs text-slate-600 text-center py-8">記録がありません</p>
      )}

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
          <XAxis dataKey="week" tick={{ fill: "#475569", fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(v: number) => [`${v}分`, "学習時間"]}
            labelFormatter={(w) => `Week ${w}`}
            cursor={{ fill: "#1e293b" }}
          />
          <ReferenceLine y={WEEKLY_TARGET_MIN} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth={1} label={{ value: `${WEEKLY_TARGET_MIN}`, fill: "#f59e0b", fontSize: 9, position: "right" }} />
          <ReferenceLine y={WEEKLY_TARGET_MAX} stroke="#10b981" strokeDasharray="3 3" strokeWidth={1} label={{ value: `${WEEKLY_TARGET_MAX}`, fill: "#10b981", fontSize: 9, position: "right" }} />
          <Bar dataKey="minutes" radius={[3, 3, 0, 0]} maxBarSize={28}>
            {data.map((entry) => (
              <Cell key={entry.week} fill={barColor(entry.minutes)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
        <LegendItem color="#f59e0b" label={`目標下限 ${WEEKLY_TARGET_MIN}分`} />
        <LegendItem color="#10b981" label={`目標上限 ${WEEKLY_TARGET_MAX}分`} />
        <LegendItem color="#8b5cf6" label="超過達成" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-3 h-2 rounded-sm shrink-0" style={{ backgroundColor: color }} />
      <span className="text-[10px] text-slate-500">{label}</span>
    </div>
  );
}
