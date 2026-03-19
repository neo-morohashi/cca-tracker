import { StatsHeader } from "@/components/stats/StatsHeader";
import { WeeklyTimeChart } from "@/components/stats/WeeklyTimeChart";
import { DomainBreakdown } from "@/components/stats/DomainBreakdown";
import { ConfidenceTrend } from "@/components/stats/ConfidenceTrend";
import { ActivityMix } from "@/components/stats/ActivityMix";

export default function StatsPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-xl font-bold text-slate-100">統計</h1>
        <p className="text-sm text-slate-400">学習の記録を可視化</p>
      </div>
      <StatsHeader />
      <WeeklyTimeChart />
      <DomainBreakdown />
      <ActivityMix />
      <ConfidenceTrend />
    </div>
  );
}
