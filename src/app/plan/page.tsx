"use client";

import { PlanAccordion } from "@/components/plan/PlanAccordion";
import { useLanguage } from "@/lib/language-context";

export default function PlanPage() {
  const { t } = useLanguage();
  return (
    <div className="pt-2">
      <div className="px-4 pb-2">
        <h1 className="text-xl font-bold text-slate-100">{t("planTitle")}</h1>
        <p className="text-sm text-slate-400">{t("planSubtitle")}</p>
      </div>
      <div className="px-4 pb-4">
        <PlanAccordion />
      </div>
    </div>
  );
}
