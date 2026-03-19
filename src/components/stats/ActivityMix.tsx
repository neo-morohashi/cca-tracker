"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useStudyLogs } from "@/hooks/useStudyLogs";
import { ACTIVITY_TYPES } from "@/lib/constants";
import type { ActivityType } from "@/lib/types";

// 活動タイプはドメインカラーを流用（視覚的一貫性）
const ACTIVITY_COLORS: Record<ActivityType, string> = {
  course: "#8b5cf6",
  docs: "#06b6d4",
  "hands-on": "#f59e0b",
  review: "#10b981",
  "mock-exam": "#f43f5e",
};

const TOOLTIP_STYLE = {
  backgroundColor: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "8px",
  fontSize: "12px",
  color: "#e2e8f0",
};

export function ActivityMix() {
  const { logs } = useStudyLogs();
  const allLogs = Object.values(logs).flat();

  const data = (Object.keys(ACTIVITY_TYPES) as ActivityType[]).map((type) => ({
    type,
    name: ACTIVITY_TYPES[type].labelJa,
    value: allLogs.filter((l) => l.activityType === type).reduce((s, l) => s + l.durationMinutes, 0),
    color: ACTIVITY_COLORS[type],
  })).filter((d) => d.value > 0);

  const total = data.reduce((s, d) => s + d.value, 0);
  const hasData = data.length > 0;

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-700 p-4">
      <p className="text-xs font-semibold text-slate-400 mb-3">活動タイプ別</p>

      {!hasData && <p className="text-xs text-slate-600 text-center py-8">記録がありません</p>}

      {hasData && (
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="55%" height={180}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={46} outerRadius={76}
                paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}
              >
                {data.map((entry) => <Cell key={entry.type} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}分`, ""]} />
            </PieChart>
          </ResponsiveContainer>

          {/* 右側凡例 */}
          <div className="flex-1 space-y-2">
            {data.map((d) => (
              <div key={d.type} className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[11px] text-slate-300">{d.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{Math.round((d.value / total) * 100)}%</span>
                </div>
                <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${Math.round((d.value / total) * 100)}%`, backgroundColor: d.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
