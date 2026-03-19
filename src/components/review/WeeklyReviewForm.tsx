"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useWeeklyReviews } from "@/hooks/useWeeklyReviews";
import { useStudyLogs } from "@/hooks/useStudyLogs";
import { useCurrentWeek } from "@/hooks/useCurrentWeek";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { DOMAINS, DOMAIN_IDS, ACTIVITY_TYPES } from "@/lib/constants";
import { STORAGE_KEYS } from "@/lib/types";
import type { DomainId, ActivityType, AppSettings } from "@/lib/types";
import { WeekSummaryCard } from "./WeekSummaryCard";

const today = new Date().toISOString().slice(0, 10);
const DEFAULT_SETTINGS: AppSettings = { startDate: today, lastStudyDate: "", currentStreak: 0, longestStreak: 0 };
const DEFAULT_CONF = Object.fromEntries(DOMAIN_IDS.map((id) => [id, 0])) as Record<DomainId, number>;

export function WeeklyReviewForm() {
  const router = useRouter();
  const [settings] = useLocalStorage<AppSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const { currentWeek } = useCurrentWeek(settings.startDate || today);
  const { getLogsByWeek } = useStudyLogs();
  const { reviews, saveReview } = useWeeklyReviews();

  const [milestoneMet, setMilestoneMet] = useState(false);
  const [confidence, setConfidence] = useState<Record<DomainId, number>>(DEFAULT_CONF);
  const [reflection, setReflection] = useState("");
  const [nextWeekFocus, setNextWeekFocus] = useState("");

  // localStorageハイドレーション後に既存レビューを反映
  useEffect(() => {
    const r = reviews[currentWeek];
    if (!r) return;
    setMilestoneMet(r.milestoneMet);
    setConfidence(r.domainConfidence);
    setReflection(r.reflection);
    setNextWeekFocus(r.nextWeekFocus);
  }, [reviews, currentWeek]);

  const weekLogs = getLogsByWeek(currentWeek);
  const prevLogs = getLogsByWeek(currentWeek - 1);

  const totalMins = useMemo(() => weekLogs.reduce((s, l) => s + l.durationMinutes, 0), [weekLogs]);
  const prevMins  = useMemo(() => prevLogs.reduce((s, l) => s + l.durationMinutes, 0), [prevLogs]);

  const domainMins = useMemo(() =>
    Object.fromEntries(DOMAIN_IDS.map((id) => [
      id, weekLogs.filter((l) => l.domain === id).reduce((s, l) => s + l.durationMinutes, 0),
    ])) as Record<DomainId, number>,
  [weekLogs]);

  const activityMins = useMemo(() =>
    Object.fromEntries((Object.keys(ACTIVITY_TYPES) as ActivityType[]).map((type) => [
      type, weekLogs.filter((l) => l.activityType === type).reduce((s, l) => s + l.durationMinutes, 0),
    ])) as Record<ActivityType, number>,
  [weekLogs]);

  function handleSave() {
    saveReview({ week: currentWeek, completed: true, milestoneMet, reflection, nextWeekFocus, domainConfidence: confidence });
    router.push("/");
  }

  return (
    <div className="space-y-4 p-4">

      <WeekSummaryCard
        week={currentWeek}
        totalMins={totalMins}
        prevMins={prevMins}
        domainMins={domainMins}
        activityMins={activityMins}
        isEmpty={weekLogs.length === 0}
      />

      {/* マイルストーン */}
      <Field label="マイルストーン達成">
        <div className="flex gap-2">
          {([true, false] as const).map((val) => (
            <button key={String(val)} type="button" onClick={() => setMilestoneMet(val)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                milestoneMet === val
                  ? val ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                        : "bg-rose-500/20 border-rose-500 text-rose-300"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
              }`}
            >
              {val ? "✓ 達成" : "✗ 未達成"}
            </button>
          ))}
        </div>
      </Field>

      {/* ドメイン自信度 */}
      <Field label="ドメイン自信度（1-5）">
        <div className="space-y-2">
          {DOMAIN_IDS.map((id) => (
            <div key={id} className="flex items-center gap-2">
              <span className="text-xs font-bold w-6 shrink-0" style={{ color: DOMAINS[id].colorHex }}>{id}</span>
              <span className="text-[11px] text-slate-400 flex-1 truncate">{DOMAINS[id].nameJa}</span>
              <div className="flex gap-1 shrink-0">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button"
                    onClick={() => setConfidence((p) => ({ ...p, [id]: n }))}
                    className="w-7 h-7 rounded text-xs font-bold ring-1 transition-all ring-slate-700 bg-slate-800 text-slate-400 hover:ring-slate-500"
                    style={confidence[id] === n ? {
                      backgroundColor: `${DOMAINS[id].colorHex}28`,
                      outline: `1px solid ${DOMAINS[id].colorHex}`,
                      color: DOMAINS[id].colorHex,
                    } : undefined}
                  >{n}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Field>

      {/* 振り返り */}
      <Field label="今週の振り返り">
        <textarea value={reflection} onChange={(e) => setReflection(e.target.value)} rows={3}
          placeholder="うまくいったこと・詰まった点・気づきなど"
          className="w-full rounded-lg bg-slate-800 border border-slate-700 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-slate-600 resize-none"
        />
      </Field>

      {/* 来週フォーカス */}
      <Field label="来週のフォーカス">
        <textarea value={nextWeekFocus} onChange={(e) => setNextWeekFocus(e.target.value)} rows={2}
          placeholder="来週に集中すること・目標など"
          className="w-full rounded-lg bg-slate-800 border border-slate-700 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-slate-600 resize-none"
        />
      </Field>

      <button onClick={handleSave}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold text-sm active:scale-[0.98] transition-transform"
      >
        レビューを保存
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-slate-900 border border-slate-700 p-4 space-y-2">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
      {children}
    </div>
  );
}
