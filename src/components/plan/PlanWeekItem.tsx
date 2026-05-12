"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, CheckSquare, Square, ExternalLink, BookOpen, FileText, Github, Target, Users, Pencil, X, Plus, RotateCcw, type LucideIcon } from "lucide-react";
import { DOMAINS } from "@/lib/constants";
import { useWeekTasks } from "@/hooks/useWeekTasks";
import { useTaskChecks } from "@/hooks/useTaskChecks";
import type { WeekPlan, ResourceLink } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import type { LocalizedString } from "@/lib/i18n";

interface Props { plan: WeekPlan; isOpen: boolean; isCurrentWeek: boolean; isCompleted: boolean; onToggle: () => void; }

const RESOURCE_ICON: Record<ResourceLink["category"], LucideIcon> = {
  course: BookOpen, docs: FileText, github: Github, "exam-prep": Target, community: Users,
};

const renderTask = (task: string | LocalizedString, lang: "en" | "he"): string => {
  if (typeof task === "string") return task;
  return task[lang] ?? task.en;
};

export function PlanWeekItem({ plan, isOpen, isCurrentWeek, isCompleted, onToggle }: Props) {
  const { tasks, isCustomized, saveTasks, resetTasks } = useWeekTasks(plan.week);
  const { isChecked, toggle } = useTaskChecks();
  const { lang, t } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<string[]>([]);

  function startEdit() { setDraft(tasks.map((task) => renderTask(task, lang))); setEditing(true); }
  function handleSave() { saveTasks(draft.filter((s) => s.trim() !== "")); setEditing(false); }
  function handleCancel() { setEditing(false); }

  return (
    <div className={`rounded-xl border overflow-hidden transition-colors ${isCurrentWeek ? "border-violet-500/50 bg-violet-500/5" : "border-slate-700 bg-slate-900"}`}>
      <button onClick={onToggle} className="w-full flex items-center gap-3 px-4 py-3 text-left">
        <span className={`text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 ${
          isCurrentWeek ? "bg-violet-500 text-white" : isCompleted ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"
        }`}>{plan.week}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-100 truncate">{plan.title[lang]}</p>
          <div className="flex items-center gap-2 mt-0.5">
            {plan.domains.map((d) => (
              <span key={d} className="text-[10px] font-bold" style={{ color: DOMAINS[d].colorHex }}>{d}</span>
            ))}
          </div>
        </div>
        {isCompleted && <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />}
        {isCurrentWeek && !isCompleted && <span className="text-[10px] font-bold text-violet-400 px-1.5 py-0.5 rounded bg-violet-500/20 shrink-0">NOW</span>}
        <ChevronDown size={15} className={`text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-700/50">
          <div className="pt-3">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">{t("planMilestone")}</p>
            <p className="text-xs text-slate-300 leading-relaxed">{plan.milestone[lang]}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                {t("planTasks")}
                {isCustomized && <span className="ms-1.5 text-violet-400">✎</span>}
              </p>
              {!editing ? (
                <div className="flex items-center gap-1">
                  {isCustomized && (
                    <button onClick={resetTasks} className="p-1 rounded text-slate-600 hover:text-slate-400 transition-colors" title={lang === "he" ? "החזרת ברירת מחדל" : "Reset to default"}>
                      <RotateCcw size={11} />
                    </button>
                  )}
                  <button onClick={startEdit} className="p-1 rounded text-slate-600 hover:text-violet-400 transition-colors" title={lang === "he" ? "עריכה" : "Edit"}>
                    <Pencil size={11} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <button onClick={handleCancel} className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 hover:bg-slate-600">{t("cancel")}</button>
                  <button onClick={handleSave} className="text-[10px] px-2 py-0.5 rounded bg-violet-600 text-white hover:bg-violet-500">{t("save")}</button>
                </div>
              )}
            </div>

            {!editing ? (
              <div className="space-y-1">
                {tasks.map((task, i) => {
                  const done = isChecked(plan.week, i);
                  return (
                    <button key={i} onClick={() => toggle(plan.week, i)} className="flex items-start gap-2 w-full text-left group">
                      {done
                        ? <CheckSquare size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                        : <Square size={13} className="text-slate-600 mt-0.5 shrink-0 group-hover:text-slate-400 transition-colors" />
                      }
                      <span className={`text-xs leading-relaxed transition-colors ${done ? "text-slate-500 line-through" : "text-slate-300"}`}>
                        {renderTask(task, lang)}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-1.5">
                {draft.map((task, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <input
                      value={task}
                      onChange={(e) => setDraft((d) => d.map((tt, j) => j === i ? e.target.value : tt))}
                      className="flex-1 rounded bg-slate-800 border border-slate-600 text-xs text-slate-100 px-2 py-1 focus:outline-none focus:border-violet-500"
                    />
                    <button onClick={() => setDraft((d) => d.filter((_, j) => j !== i))} className="p-1 text-slate-600 hover:text-red-400 transition-colors shrink-0">
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <button onClick={() => setDraft((d) => [...d, ""])} className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-violet-400 transition-colors mt-1">
                  <Plus size={11} />{lang === "he" ? "הוסיפו משימה" : "Add task"}
                </button>
              </div>
            )}
          </div>

          <div>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{t("planResources")}</p>
            <div className="space-y-1.5">
              {plan.resources.map((res) => {
                const Icon = RESOURCE_ICON[res.category];
                return (
                  <a key={res.name} href={res.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors group">
                    <Icon size={11} className="shrink-0 text-slate-600 group-hover:text-cyan-500" />
                    <span className="truncate">{res.name}</span>
                    <ExternalLink size={10} className="text-slate-700 ms-auto shrink-0 group-hover:text-cyan-500" />
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
