"use client";

import { Suspense } from "react";
import { WeeklyReviewForm } from "@/components/review/WeeklyReviewForm";
import { useLanguage } from "@/lib/language-context";

export default function ReviewPage() {
  const { t } = useLanguage();
  return (
    <div className="pt-2">
      <div className="px-4 pb-2">
        <h1 className="text-xl font-bold text-slate-100">{t("reviewTitle")}</h1>
        <p className="text-sm text-slate-400">{t("reviewSubtitle")}</p>
      </div>
      <Suspense>
        <WeeklyReviewForm />
      </Suspense>
    </div>
  );
}
