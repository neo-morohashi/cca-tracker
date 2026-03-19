"use client";

import { useState } from "react";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useStudyLogs } from "@/hooks/useStudyLogs";
import { DOMAINS } from "@/lib/constants";
import type { StudyLog } from "@/lib/types";

function LogRow({ log, onDelete }: { log: StudyLog & { _date: string; _index: number }; onDelete: () => void }) {
  const [confirm, setConfirm] = useState(false);
  const domain = log.domain !== "General" ? DOMAINS[log.domain] : null;

  return (
    <div className="flex items-start justify-between gap-2 py-2.5 border-b border-slate-800 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={domain ? { backgroundColor: `${domain.colorHex}22`, color: domain.colorHex } : { backgroundColor: "#1e293b", color: "#94a3b8" }}
          >
            {log.domain}
          </span>
          <span className="text-xs font-medium text-slate-200 truncate">{log.topic || "—"}</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-slate-500">{log.date}</span>
          <span className="text-[10px] text-slate-500">{log.durationMinutes}分</span>
          <span className="text-[10px] text-slate-500">{log.activityType}</span>
          {log.confidence && (
            <span className="text-[10px] text-slate-500">自信度 {log.confidence}/5</span>
          )}
        </div>
        {log.note && <p className="text-[10px] text-slate-600 mt-0.5 truncate">{log.note}</p>}
      </div>

      {!confirm ? (
        <button
          onClick={() => setConfirm(true)}
          className="p-1.5 rounded text-slate-600 hover:text-red-400 hover:bg-slate-800 transition-colors shrink-0"
          aria-label="削除"
        >
          <Trash2 size={13} />
        </button>
      ) : (
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => setConfirm(false)} className="text-[10px] px-2 py-1 rounded bg-slate-700 text-slate-300 hover:bg-slate-600">
            取消
          </button>
          <button onClick={onDelete} className="text-[10px] px-2 py-1 rounded bg-red-800 text-white hover:bg-red-700">
            削除
          </button>
        </div>
      )}
    </div>
  );
}

export function LogHistory() {
  const { logs, deleteLog } = useStudyLogs();
  const [expanded, setExpanded] = useState(true);

  // 全ログを日付降順でフラット化
  const allLogs = Object.entries(logs)
    .sort(([a], [b]) => b.localeCompare(a))
    .flatMap(([date, entries]) =>
      entries.map((log, index) => ({ ...log, _date: date, _index: index }))
    );

  if (allLogs.length === 0) return null;

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-700 p-4">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center justify-between w-full"
      >
        <p className="text-xs font-semibold text-slate-400">学習ログ（{allLogs.length}件）</p>
        {expanded ? <ChevronUp size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
      </button>

      {expanded && (
        <div className="mt-3 max-h-72 overflow-y-auto pr-1">
          {allLogs.map((log) => (
            <LogRow
              key={`${log._date}-${log._index}`}
              log={log}
              onDelete={() => deleteLog(log._date, log._index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
