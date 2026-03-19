"use client";

import { ChevronDown, CheckCircle2, ExternalLink, BookOpen, FileText, Github, Target, Users, type LucideIcon } from "lucide-react";
import { DOMAINS } from "@/lib/constants";
import type { WeekPlan, ResourceLink } from "@/lib/types";

interface Props {
  plan: WeekPlan;
  isOpen: boolean;
  isCurrentWeek: boolean;
  isCompleted: boolean;
  onToggle: () => void;
}

const RESOURCE_ICON: Record<ResourceLink["category"], LucideIcon> = {
  course: BookOpen,
  docs: FileText,
  github: Github,
  "exam-prep": Target,
  community: Users,
};

export function PlanWeekItem({ plan, isOpen, isCurrentWeek, isCompleted, onToggle }: Props) {
  return (
    <div className={`rounded-xl border overflow-hidden transition-colors ${
      isCurrentWeek ? "border-violet-500/50 bg-violet-500/5" : "border-slate-700 bg-slate-900"
    }`}>
      {/* ヘッダー行 */}
      <button onClick={onToggle} className="w-full flex items-center gap-3 px-4 py-3 text-left">
        <span className={`text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 ${
          isCurrentWeek ? "bg-violet-500 text-white"
            : isCompleted ? "bg-emerald-500/20 text-emerald-400"
            : "bg-slate-800 text-slate-500"
        }`}>
          {plan.week}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-100 truncate">{plan.title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            {plan.domains.map((d) => (
              <span key={d} className="text-[10px] font-bold" style={{ color: DOMAINS[d].colorHex }}>{d}</span>
            ))}
          </div>
        </div>
        {isCompleted && <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />}
        {isCurrentWeek && !isCompleted && (
          <span className="text-[10px] font-bold text-violet-400 px-1.5 py-0.5 rounded bg-violet-500/20 shrink-0">NOW</span>
        )}
        <ChevronDown size={15} className={`text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* 展開ボディ */}
      {isOpen && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-700/50">
          <div className="pt-3">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">マイルストーン</p>
            <p className="text-xs text-slate-300 leading-relaxed">{plan.milestone}</p>
          </div>

          <div>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">タスク</p>
            <div className="space-y-1">
              {plan.tasks.map((task, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-slate-600 mt-0.5 shrink-0">·</span>
                  <span className="text-xs text-slate-300 leading-relaxed">{task}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">リソース</p>
            <div className="space-y-1.5">
              {plan.resources.map((res) => {
                const Icon = RESOURCE_ICON[res.category];
                return (
                  <a key={res.name} href={res.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors group"
                  >
                    <Icon size={11} className="shrink-0 text-slate-600 group-hover:text-cyan-500" />
                    <span className="truncate">{res.name}</span>
                    <ExternalLink size={10} className="text-slate-700 ml-auto shrink-0 group-hover:text-cyan-500" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
