"use client";

import { StatsHeader } from "@/components/stats/StatsHeader";
import { WeeklyTimeChart } from "@/components/stats/WeeklyTimeChart";
import { DomainBreakdown } from "@/components/stats/DomainBreakdown";
import { ConfidenceTrend } from "@/components/stats/ConfidenceTrend";
import { ActivityMix } from "@/components/stats/ActivityMix";
import { useLanguage } from "@/lib/language-context";

export default function StatsPage() {
  const { t, lang } = useLanguage();
  return (
    <div className="p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-xl font-bold text-slate-100">{t("statsTitle")}</h1>
        <p className="text-sm text-slate-400">{lang === "he" ? "ההתקדמות שלכם, בויזואליה" : "Your progress, visualized"}</p>
      </div>
      <StatsHeader />
      <WeeklyTimeChart />
      <DomainBreakdown />
      <ActivityMix />
      <ConfidenceTrend />
    </div>
  );
}
