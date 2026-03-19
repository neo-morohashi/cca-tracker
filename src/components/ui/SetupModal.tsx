"use client";

import { useState } from "react";
import { CalendarDays, Sparkles } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/types";
import type { AppSettings } from "@/lib/types";

const today = new Date().toISOString().slice(0, 10);

const EMPTY_SETTINGS: AppSettings = {
  startDate: "", lastStudyDate: "", currentStreak: 0, longestStreak: 0,
};

export function SetupModal() {
  const [, setSettings] = useLocalStorage<AppSettings>(STORAGE_KEYS.SETTINGS, EMPTY_SETTINGS);
  const [date, setDate] = useState(today);

  function handleStart() {
    if (!date) return;
    setSettings((prev) => ({ ...prev, startDate: date }));
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl shadow-violet-500/10 p-6 space-y-6">

        {/* アイコン + タイトル */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/30 border border-violet-500/40 flex items-center justify-center">
            <Sparkles size={26} className="text-violet-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">CCA Study Tracker</h2>
            <p className="text-sm text-slate-400 mt-1">学習開始日を設定しましょう</p>
          </div>
        </div>

        {/* 説明 */}
        <div className="rounded-xl bg-slate-800/60 border border-slate-700/50 p-3 space-y-1.5">
          {[
            "16週間のCCA試験対策プラン",
            "毎日の学習を30秒で記録",
            "ドメイン別の自信度を可視化",
          ].map((text) => (
            <div key={text} className="flex items-center gap-2">
              <span className="text-emerald-400 text-xs">✓</span>
              <span className="text-xs text-slate-300">{text}</span>
            </div>
          ))}
        </div>

        {/* 開始日入力 */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
            <CalendarDays size={12} />
            <span>学習開始日</span>
          </div>
          <input
            type="date"
            value={date}
            max={today}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 text-slate-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <p className="text-[11px] text-slate-500">
            今日または過去の日付を選択できます（後から変更可能）
          </p>
        </div>

        <button
          onClick={handleStart}
          disabled={!date}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-sm disabled:opacity-40 active:scale-[0.98] transition-transform shadow-lg shadow-violet-500/20"
        >
          学習を始める →
        </button>
      </div>
    </div>
  );
}
