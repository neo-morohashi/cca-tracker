"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStudyLogs } from "@/hooks/useStudyLogs";
import { DOMAINS, DOMAIN_IDS, ACTIVITY_TYPES, DURATION_PRESETS } from "@/lib/constants";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/types";
import type { DomainId, ActivityType, AppSettings } from "@/lib/types";

const today = new Date().toISOString().slice(0, 10);

function computeWeek(date: string, startDate: string): number {
  const days = Math.floor(
    (new Date(date).getTime() - new Date(startDate).getTime()) / 86400000
  );
  return Math.max(1, Math.min(16, Math.floor(days / 7) + 1));
}

// Tailwindが静的解析できるよう固定クラスマップ
const DOMAIN_ACTIVE: Record<DomainId | "General", string> = {
  D1: "bg-violet-500/20 ring-violet-500 text-violet-300",
  D2: "bg-cyan-500/20 ring-cyan-500 text-cyan-300",
  D3: "bg-amber-500/20 ring-amber-500 text-amber-300",
  D4: "bg-emerald-500/20 ring-emerald-500 text-emerald-300",
  D5: "bg-rose-500/20 ring-rose-500 text-rose-300",
  General: "bg-slate-500/20 ring-slate-500 text-slate-300",
};

const CHIP_BASE = "px-3 py-1.5 rounded-lg text-xs font-medium ring-1 transition-colors";
const CHIP_IDLE = "bg-slate-800 ring-slate-700 text-slate-400 hover:ring-slate-500";
const CHIP_ACTIVE_DEFAULT = "bg-violet-500/20 ring-violet-500 text-violet-300";

export function LogForm() {
  const router = useRouter();
  const { addLog, getRecentTopics } = useStudyLogs();
  const settings = storage.get<AppSettings>(STORAGE_KEYS.SETTINGS, {
    startDate: today,
    lastStudyDate: "",
    currentStreak: 0,
    longestStreak: 0,
  });

  const [date, setDate] = useState(today);
  const [duration, setDuration] = useState(25);
  const [customDuration, setCustomDuration] = useState("");
  const [domain, setDomain] = useState<DomainId | "General">("General");
  const [activityType, setActivityType] = useState<ActivityType>("course");
  const [topic, setTopic] = useState("");
  const [confidence, setConfidence] = useState(3);
  const [note, setNote] = useState("");

  const activeDuration = customDuration ? parseInt(customDuration, 10) : duration;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!activeDuration || activeDuration < 1) return;
    addLog({
      date,
      week: computeWeek(date, settings.startDate),
      durationMinutes: activeDuration,
      domain,
      activityType,
      topic,
      resource: "",
      note,
      confidence,
    });
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">

      {/* 日付 */}
      <Field label="日付">
        <input type="date" value={date} max={today}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg bg-slate-800 border border-slate-700 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </Field>

      {/* 学習時間 */}
      <Field label="学習時間 ★">
        <div className="flex gap-2 flex-wrap items-center">
          {DURATION_PRESETS.map((d) => (
            <button key={d} type="button"
              onClick={() => { setDuration(d); setCustomDuration(""); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                duration === d && !customDuration
                  ? "bg-violet-500/20 border-violet-500 text-violet-300"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
              }`}
            >{d}分</button>
          ))}
          <input type="number" min={1} max={240} placeholder="カスタム"
            value={customDuration} onChange={(e) => setCustomDuration(e.target.value)}
            className="w-24 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-slate-600"
          />
        </div>
      </Field>

      {/* ドメイン */}
      <Field label="ドメイン ★">
        <div className="flex flex-wrap gap-2">
          {([...DOMAIN_IDS, "General"] as (DomainId | "General")[]).map((d) => (
            <button key={d} type="button" onClick={() => setDomain(d)}
              className={`${CHIP_BASE} ${domain === d ? DOMAIN_ACTIVE[d] : CHIP_IDLE}`}
            >
              {d === "General" ? "General" : `${d} ${DOMAINS[d].nameJa}`}
            </button>
          ))}
        </div>
      </Field>

      {/* 活動タイプ */}
      <Field label="活動タイプ ★">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(ACTIVITY_TYPES) as ActivityType[]).map((type) => (
            <button key={type} type="button" onClick={() => setActivityType(type)}
              className={`${CHIP_BASE} ${activityType === type ? CHIP_ACTIVE_DEFAULT : CHIP_IDLE}`}
            >
              {ACTIVITY_TYPES[type].labelJa}
            </button>
          ))}
        </div>
      </Field>

      {/* トピック */}
      <Field label="トピック（任意）">
        <input list="recent-topics" value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="例: CLAUDE.md階層設計"
          className="w-full rounded-lg bg-slate-800 border border-slate-700 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-slate-600"
        />
        <datalist id="recent-topics">
          {getRecentTopics().map((t) => <option key={t} value={t} />)}
        </datalist>
      </Field>

      {/* 自信度 */}
      <Field label="自信度（任意）">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => setConfidence(n)}
              className={`w-10 h-10 rounded-lg text-sm font-bold ring-1 transition-colors ${
                confidence === n ? CHIP_ACTIVE_DEFAULT : CHIP_IDLE
              }`}
            >{n}</button>
          ))}
        </div>
      </Field>

      {/* メモ */}
      <Field label="メモ（任意）">
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3}
          placeholder="気づき・詰まった点など"
          className="w-full rounded-lg bg-slate-800 border border-slate-700 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-slate-600 resize-none"
        />
      </Field>

      <button type="submit" disabled={!activeDuration || activeDuration < 1}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold text-sm disabled:opacity-40 active:scale-[0.98] transition-transform"
      >
        記録する
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
      {children}
    </div>
  );
}
