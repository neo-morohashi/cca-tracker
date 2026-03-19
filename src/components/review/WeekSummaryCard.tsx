"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { DOMAINS, DOMAIN_IDS, ACTIVITY_TYPES } from "@/lib/constants";
import type { DomainId, ActivityType } from "@/lib/types";

interface Props {
  week: number;
  totalMins: number;
  prevMins: number;
  domainMins: Record<DomainId, number>;
  activityMins: Record<ActivityType, number>;
  isEmpty: boolean;
}

export function WeekSummaryCard({ week, totalMins, prevMins, domainMins, activityMins, isEmpty }: Props) {
  const diff = totalMins - prevMins;
  const DiffIcon = diff > 0 ? TrendingUp : diff < 0 ? TrendingDown : Minus;
  const diffColor = diff > 0 ? "text-emerald-400" : diff < 0 ? "text-rose-400" : "text-slate-500";

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-700 p-4 space-y-3">
      <p className="text-xs font-semibold text-slate-400">Week {week} サマリー</p>

      {/* 合計時間 + 前週比 */}
      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold text-slate-100">{totalMins}</span>
        <span className="text-sm text-slate-400 pb-0.5">分</span>
        {prevMins > 0 && (
          <span className={`flex items-center gap-1 text-sm font-medium pb-0.5 ${diffColor}`}>
            <DiffIcon size={14} />
            {Math.abs(diff)}分（前週比）
          </span>
        )}
      </div>

      {/* ドメイン別バー */}
      {DOMAIN_IDS.some((id) => domainMins[id] > 0) && (
        <div className="space-y-1.5">
          {DOMAIN_IDS.filter((id) => domainMins[id] > 0).map((id) => (
            <div key={id} className="flex items-center gap-2">
              <span className="text-[10px] font-bold w-6 shrink-0" style={{ color: DOMAINS[id].colorHex }}>
                {id}
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.round((domainMins[id] / totalMins) * 100)}%`,
                    backgroundColor: DOMAINS[id].colorHex,
                  }}
                />
              </div>
              <span className="text-[10px] text-slate-400 w-9 text-right">{domainMins[id]}分</span>
            </div>
          ))}
        </div>
      )}

      {/* 活動タイプ別ピル */}
      {(Object.keys(ACTIVITY_TYPES) as ActivityType[]).some((t) => activityMins[t] > 0) && (
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-800">
          {(Object.keys(ACTIVITY_TYPES) as ActivityType[])
            .filter((t) => activityMins[t] > 0)
            .map((type) => (
              <span key={type} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">
                {ACTIVITY_TYPES[type].labelJa} {activityMins[type]}分
              </span>
            ))}
        </div>
      )}

      {isEmpty && <p className="text-xs text-slate-600">今週の学習記録がありません</p>}
    </div>
  );
}
