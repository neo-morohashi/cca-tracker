"use client";

import { useState } from "react";
import { CalendarDays, Sparkles } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/types";
import type { AppSettings } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";

const today = new Date().toISOString().slice(0, 10);

const EMPTY_SETTINGS: AppSettings = {
  startDate: "", lastStudyDate: "", currentStreak: 0, longestStreak: 0,
};

export function SetupModal() {
  const [, setSettings] = useLocalStorage<AppSettings>(STORAGE_KEYS.SETTINGS, EMPTY_SETTINGS);
  const [date, setDate] = useState(today);
  const { t, lang } = useLanguage();

  function handleStart() {
    if (!date) return;
    setSettings((prev) => ({ ...prev, startDate: date }));
  }

  const bullets = lang === "he"
    ? ["תוכנית הכנה למבחן CCA של 16 שבועות", "תעדו לימוד יומי תוך 30 שניות", "הציגו ביטחון לפי דומיין באופן ויזואלי"]
    : ["16-week CCA exam prep plan", "Log a daily session in 30 seconds", "Visualize confidence by domain"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl shadow-violet-500/10 p-6 space-y-6">
        <div className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/30 border border-violet-500/40 flex items-center justify-center">
            <Sparkles size={26} className="text-violet-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">{t("appTitle")}</h2>
            <p className="text-sm text-slate-400 mt-1">{t("setupSubtitle")}</p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-800/60 border border-slate-700/50 p-3 space-y-1.5">
          {bullets.map((text) => (
            <div key={text} className="flex items-center gap-2">
              <span className="text-emerald-400 text-xs">✓</span>
              <span className="text-xs text-slate-300">{text}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
            <CalendarDays size={12} />
            <span>{t("setupStartDateLabel")}</span>
          </div>
          <input
            type="date"
            value={date}
            max={today}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 text-slate-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <p className="text-[11px] text-slate-500">{t("setupHint")}</p>
        </div>

        <button
          onClick={handleStart}
          disabled={!date}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-sm disabled:opacity-40 active:scale-[0.98] transition-transform shadow-lg shadow-violet-500/20"
        >
          {t("setupBeginButton")} →
        </button>
      </div>
    </div>
  );
}
