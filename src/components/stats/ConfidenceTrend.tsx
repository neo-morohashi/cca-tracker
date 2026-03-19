"use client";

import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer,
  Tooltip, Legend,
} from "recharts";
import { useWeeklyReviews } from "@/hooks/useWeeklyReviews";
import { DOMAINS, DOMAIN_IDS } from "@/lib/constants";

const TOOLTIP_STYLE = {
  backgroundColor: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "8px",
  fontSize: "12px",
  color: "#e2e8f0",
};

export function ConfidenceTrend() {
  const { reviews } = useWeeklyReviews();

  // Week 1-16 の各週について domainConfidence を取り出す
  const data = Array.from({ length: 16 }, (_, i) => {
    const week = i + 1;
    const conf = reviews[week]?.domainConfidence;
    const point: Record<string, number | null | undefined> = { week };
    DOMAIN_IDS.forEach((id) => {
      point[id] = conf?.[id] ?? null;
    });
    return point;
  });

  const hasData = Object.keys(reviews).length > 0;

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-700 p-4">
      <p className="text-xs font-semibold text-slate-400 mb-3">自信度推移（週次レビューより）</p>

      {!hasData && (
        <p className="text-xs text-slate-600 text-center py-8">
          週次レビューで自信度を記録するとグラフが表示されます
        </p>
      )}

      {hasData && (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
            <XAxis dataKey="week" tick={{ fill: "#475569", fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              labelFormatter={(w) => `Week ${w}`}
              formatter={(v, name: string) => [v != null ? `${v} / 5` : "未記録", name]}
            />
            <Legend
              iconType="line"
              iconSize={14}
              formatter={(value) => <span style={{ fontSize: "10px", color: "#94a3b8" }}>{value}</span>}
            />
            {DOMAIN_IDS.map((id) => (
              <Line
                key={id}
                type="monotone"
                dataKey={id}
                name={`${id} ${DOMAINS[id].nameJa}`}
                stroke={DOMAINS[id].colorHex}
                strokeWidth={2}
                dot={{ r: 3, fill: DOMAINS[id].colorHex, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
