"use client";

import { useState } from "react";
import { Flame, CalendarDays, Settings, Trash2, Trophy } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCurrentWeek } from "@/hooks/useCurrentWeek";
import { useStreak } from "@/hooks/useStreak";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/types";
import type { AppSettings, PhaseId } from "@/lib/types";

const today = new Date().toISOString().slice(0, 10);
const DEFAULT_SETTINGS: AppSettings = {
  startDate: today, lastStudyDate: "", currentStreak: 0, longestStreak: 0,
};
const PHASE_LABEL: Record<PhaseId, string> = {
  1: "基盤固め", 2: "専門深掘り", 3: "試験準備",
};

export function ProgressHeader() {
  const [settings, setSettings] = useLocalStorage<AppSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const { currentWeek, currentPhase, daysElapsed, daysRemaining, progress, isComplete } =
    useCurrentWeek(settings.startDate || today);
  const { currentStreak } = useStreak();
  const [showSettings, setShowSettings] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  function handleReset() {
    storage.clear();
    window.location.reload();
  }

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-700 p-4 space-y-3">
      {/* 上段: アプリ名 + ストリーク + 設定ギア */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase">
          CCA Study Tracker
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-slate-800 border border-slate-700 px-3 py-1">
            <Flame size={13} className="text-orange-400" />
            <span className="text-xs font-bold text-slate-100">{currentStreak}</span>
            <span className="text-xs text-slate-400">日連続</span>
          </div>
          <button
            onClick={() => setShowSettings((v) => !v)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
            aria-label="設定"
          >
            <Settings size={15} />
          </button>
        </div>
      </div>

      {/* Plan Complete バナー */}
      {isComplete && (
        <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-900/50 to-cyan-900/50 border border-violet-500/30 px-3 py-2">
          <Trophy size={16} className="text-yellow-400 shrink-0" />
          <div>
            <p className="text-sm font-bold text-slate-100">Plan Complete!</p>
            <p className="text-xs text-slate-400">16週間の学習計画を完了しました 🎉</p>
          </div>
        </div>
      )}

      {/* 中段: Week / Phase */}
      {!isComplete && (
        <div>
          <h1 className="text-2xl font-bold text-slate-100 leading-tight">
            Week {currentWeek}
            <span className="text-slate-500 font-normal text-lg"> / </span>
            <span className="text-lg font-semibold text-slate-300">Phase {currentPhase}</span>
            <span className="ml-2 text-sm font-normal text-slate-400">{PHASE_LABEL[currentPhase]}</span>
          </h1>
        </div>
      )}

      {/* 進捗バー */}
      <div className="space-y-1">
        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>{progress}%</span>
          <span>16週間</span>
        </div>
      </div>

      {/* 下段: 経過/残り日数 */}
      {!isComplete && (
        <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-0.5">
          <CalendarDays size={13} />
          <span>{daysElapsed}日経過</span>
          <span className="text-slate-600">·</span>
          <span className="text-emerald-400 font-medium">残り{daysRemaining}日</span>
        </div>
      )}

      {/* 設定パネル */}
      {showSettings && (
        <div className="border-t border-slate-700 pt-3 space-y-3">
          <label className="flex items-center justify-between text-xs text-slate-400">
            <span>開始日</span>
            <input
              type="date"
              value={settings.startDate || today}
              max={today}
              onChange={(e) => setSettings((prev) => ({ ...prev, startDate: e.target.value }))}
              className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-violet-500"
            />
          </label>

          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="flex items-center gap-1.5 w-full justify-center rounded-lg border border-red-800 bg-red-950/40 text-red-400 text-xs py-2 hover:bg-red-900/40 transition-colors"
            >
              <Trash2 size={13} />
              全データをリセット
            </button>
          ) : (
            <div className="rounded-lg border border-red-700 bg-red-950/60 p-3 space-y-2">
              <p className="text-xs text-red-300 text-center">本当にすべてのデータを削除しますか？</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 rounded-lg bg-slate-700 text-slate-300 text-xs py-1.5 hover:bg-slate-600 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 rounded-lg bg-red-700 text-white text-xs py-1.5 hover:bg-red-600 transition-colors font-semibold"
                >
                  削除する
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
