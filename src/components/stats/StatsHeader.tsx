"use client";

import { Clock, CalendarDays, Flame } from "lucide-react";
import { useStudyLogs } from "@/hooks/useStudyLogs";
import { useStreak } from "@/hooks/useStreak";

export function StatsHeader() {
  const { getTotalMinutes } = useStudyLogs();
  const { longestStreak, totalStudyDays } = useStreak();

  const totalMins = getTotalMinutes();
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;

  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard
        icon={<Clock size={18} className="text-violet-400" />}
        value={`${hours}h${mins > 0 ? ` ${mins}m` : ""}`}
        label="累積学習時間"
      />
      <StatCard
        icon={<CalendarDays size={18} className="text-cyan-400" />}
        value={String(totalStudyDays)}
        label="学習日数"
      />
      <StatCard
        icon={<Flame size={18} className="text-orange-400" />}
        value={String(longestStreak)}
        label="最長ストリーク"
      />
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl bg-slate-900 border border-slate-700 p-3 flex flex-col items-center gap-1.5 text-center">
      {icon}
      <span className="text-xl font-bold text-slate-100 leading-none">{value}</span>
      <span className="text-[10px] text-slate-500 leading-tight">{label}</span>
    </div>
  );
}
