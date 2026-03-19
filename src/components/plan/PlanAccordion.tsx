"use client";

import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCurrentWeek } from "@/hooks/useCurrentWeek";
import { useWeeklyReviews } from "@/hooks/useWeeklyReviews";
import { WEEK_PLANS } from "@/lib/plan-data";
import { STORAGE_KEYS } from "@/lib/types";
import type { AppSettings, PhaseId } from "@/lib/types";
import { PlanWeekItem } from "./PlanWeekItem";

const today = new Date().toISOString().slice(0, 10);
const DEFAULT_SETTINGS: AppSettings = { startDate: today, lastStudyDate: "", currentStreak: 0, longestStreak: 0 };

const PHASES: { id: PhaseId; label: string; weeks: string }[] = [
  { id: 1, label: "P1 基盤固め", weeks: "W1-4" },
  { id: 2, label: "P2 専門深掘り", weeks: "W5-10" },
  { id: 3, label: "P3 試験準備", weeks: "W11-16" },
];

export function PlanAccordion() {
  const [settings] = useLocalStorage<AppSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const { currentWeek } = useCurrentWeek(settings.startDate || today);
  const { reviews } = useWeeklyReviews();

  const currentPhase: PhaseId = currentWeek <= 4 ? 1 : currentWeek <= 10 ? 2 : 3;
  const [activePhase, setActivePhase] = useState<PhaseId>(currentPhase);
  const [openWeek, setOpenWeek] = useState<number | null>(currentWeek);
  const currentRef = useRef<HTMLDivElement>(null);

  // フェーズが変わったときに現在週のフェーズに合わせてスクロール
  useEffect(() => {
    if (activePhase === currentPhase) {
      currentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activePhase, currentPhase]);

  const filteredPlans = WEEK_PLANS.filter((p) => p.phase === activePhase);

  return (
    <div className="space-y-3">
      {/* Phase タブ */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-800">
        {PHASES.map(({ id, label, weeks }) => (
          <button
            key={id}
            onClick={() => setActivePhase(id)}
            className={`flex-1 py-2 px-1 rounded-lg text-xs font-semibold transition-colors ${
              activePhase === id
                ? "bg-slate-900 text-slate-100 shadow"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{weeks}</span>
          </button>
        ))}
      </div>

      {/* Week アコーディオン */}
      <div className="space-y-2">
        {filteredPlans.map((plan) => {
          const isCurrentWeek = plan.week === currentWeek;
          const isCompleted = reviews[plan.week]?.completed === true;
          return (
            <div key={plan.week} ref={isCurrentWeek ? currentRef : undefined}>
              <PlanWeekItem
                plan={plan}
                isOpen={openWeek === plan.week}
                isCurrentWeek={isCurrentWeek}
                isCompleted={isCompleted}
                onToggle={() => setOpenWeek(openWeek === plan.week ? null : plan.week)}
              />
            </div>
          );
        })}
      </div>

      {/* 凡例 */}
      <div className="flex items-center gap-4 px-1 pb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-violet-500 text-[8px] text-white flex items-center justify-center font-bold">N</span>
          <span className="text-[10px] text-slate-500">現在週</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-emerald-400 text-xs">✓</span>
          <span className="text-[10px] text-slate-500">レビュー完了</span>
        </div>
      </div>
    </div>
  );
}
