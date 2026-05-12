"use client";

import Link from "next/link";
import { ExternalLink, BookOpen, FileText, Github, Target, Users, CheckSquare, Square, type LucideIcon } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCurrentWeek } from "@/hooks/useCurrentWeek";
import { useWeekTasks } from "@/hooks/useWeekTasks";
import { useTaskChecks } from "@/hooks/useTaskChecks";
import { WEEK_PLANS } from "@/lib/plan-data";
import { DOMAINS } from "@/lib/constants";
import { STORAGE_KEYS } from "@/lib/types";
import type { AppSettings, DomainId, ResourceLink } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import type { LocalizedString } from "@/lib/i18n";

const today = new Date().toISOString().slice(0, 10);
const DEFAULT_SETTINGS: AppSettings = { startDate: today, lastStudyDate: "", currentStreak: 0, longestStreak: 0 };

const RESOURCE_ICON: Record<ResourceLink["category"], LucideIcon> = {
  course: BookOpen, docs: FileText, github: Github, "exam-prep": Target, community: Users,
};

export function TodayCard() {
  const [settings] = useLocalStorage<AppSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const { currentWeek } = useCurrentWeek(settings.startDate || today);
  const { tasks } = useWeekTasks(currentWeek);
  const { isChecked, toggle } = useTaskChecks();
  const { lang, t } = useLanguage();

  const plan = WEEK_PLANS.find((p) => p.week === currentWeek) ?? WEEK_PLANS[0];

  const renderTask = (task: string | LocalizedString): string => {
    if (typeof task === "string") return task;
    return task[lang] ?? task.en;
  };

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400 font-medium">{t("dashWeekLabel")} {plan.week}</p>
          <p className="text-sm font-semibold text-slate-100 mt-0.5 leading-snug">{plan.title[lang]}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {plan.domains.map((d) => <DomainTag key={d} domainId={d} />)}
        </div>

        <div className="rounded-lg bg-slate-800/60 border border-slate-700/50 px-3 py-2">
          <p className="text-xs font-semibold text-slate-400 mb-0.5">{t("dashMilestone")}</p>
          <p className="text-xs text-slate-300 leading-relaxed">{plan.milestone[lang]}</p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-400">{t("planTasks")}</p>
            <span className="text-[10px] text-slate-500">
              {tasks.filter((_, i) => isChecked(plan.week, i)).length}/{tasks.length}
            </span>
          </div>
          {tasks.map((task, i) => {
            const done = isChecked(plan.week, i);
            return (
              <button key={i} onClick={() => toggle(plan.week, i)} className="flex items-start gap-2 w-full text-left group">
                {done
                  ? <CheckSquare size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                  : <Square size={13} className="text-slate-600 mt-0.5 shrink-0 group-hover:text-slate-400 transition-colors" />
                }
                <span className={`text-xs leading-relaxed transition-colors ${done ? "text-slate-500 line-through" : "text-slate-300"}`}>
                  {renderTask(task)}
                </span>
              </button>
            );
          })}
        </div>

        {plan.resources.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-slate-400">{t("planResources")}</p>
            {plan.resources.map((res) => {
              const Icon = RESOURCE_ICON[res.category];
              return (
                <a key={res.name} href={res.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-300 hover:text-cyan-400 transition-colors group">
                  <Icon size={12} className="text-slate-500 group-hover:text-cyan-500 shrink-0" />
                  <span className="truncate">{res.name}</span>
                  <ExternalLink size={10} className="text-slate-600 group-hover:text-cyan-500 shrink-0 ms-auto" />
                </a>
              );
            })}
          </div>
        )}

        <Link href="/log" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30 text-sm font-semibold text-violet-300 hover:from-violet-500/30 hover:to-cyan-500/30 transition-colors">
          {t("logStudy")} →
        </Link>
      </div>
    </div>
  );
}

function DomainTag({ domainId }: { domainId: DomainId }) {
  const d = DOMAINS[domainId];
  const { lang } = useLanguage();
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-medium border"
      style={{ backgroundColor: `${d.colorHex}1a`, borderColor: `${d.colorHex}60`, color: d.colorHex }}>
      {domainId} {d.label[lang]}
    </span>
  );
}
