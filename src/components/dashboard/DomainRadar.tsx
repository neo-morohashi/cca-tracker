"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useWeeklyReviews } from "@/hooks/useWeeklyReviews";
import { DOMAINS, DOMAIN_IDS } from "@/lib/constants";
import type { DomainId } from "@/lib/types";

interface RadarPoint {
  subject: string;
  domain: DomainId;
  confidence: number;
  weight: number; // normalized 0-5
}

const MAX_WEIGHT = Math.max(...DOMAIN_IDS.map((id) => DOMAINS[id].weight));

// Rechartsのdotカスタムレンダラー（型は緩めに定義）
function ColoredDot(props: Record<string, unknown>) {
  const { cx, cy, index } = props as { cx: number; cy: number; index: number };
  const id = DOMAIN_IDS[index];
  if (!id || cx == null || cy == null) return null;
  return (
    <circle
      key={id}
      cx={cx}
      cy={cy}
      r={4}
      fill={DOMAINS[id].colorHex}
      stroke="#0f172a"
      strokeWidth={1.5}
    />
  );
}

export function DomainRadar() {
  const { getLatestConfidence } = useWeeklyReviews();
  const confidence = getLatestConfidence();
  const hasData = DOMAIN_IDS.some((id) => confidence[id] > 0);

  const data: RadarPoint[] = DOMAIN_IDS.map((id) => ({
    subject: `${id}`,
    domain: id,
    confidence: confidence[id] ?? 0,
    weight: Math.round((DOMAINS[id].weight / MAX_WEIGHT) * 5 * 10) / 10,
  }));

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-700 p-4">
      <p className="text-xs font-semibold text-slate-400 mb-1">ドメイン自信度</p>

      {!hasData && (
        <p className="text-xs text-slate-600 text-center pt-3 pb-1">
          週次レビューで自信度を入力するとグラフが表示されます
        </p>
      )}

      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={data} outerRadius={72} margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
          {/* 試験配点ウェイト（背景） */}
          <Radar
            name="試験配点"
            dataKey="weight"
            stroke="#334155"
            fill="#334155"
            fillOpacity={0.35}
            dot={false}
          />
          {/* 自信度（メイン）*/}
          <Radar
            name="自信度"
            dataKey="confidence"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.22}
            dot={ColoredDot as never}
            activeDot={{ r: 5, fill: "#8b5cf6" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#e2e8f0",
            }}
            formatter={(value: number, name: string) => [
              name === "自信度" ? `${value} / 5` : `${value} (配点ウェイト)`,
              name,
            ]}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Domain legend */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-1">
        {DOMAIN_IDS.map((id) => (
          <div key={id} className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: DOMAINS[id].colorHex }} />
            <span className="text-[10px] text-slate-400">
              {id} <span className="text-slate-600">{DOMAINS[id].nameJa}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
