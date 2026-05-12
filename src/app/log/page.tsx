"use client";

import { LogForm } from "@/components/log/LogForm";
import { LogHistory } from "@/components/log/LogHistory";
import { useLanguage } from "@/lib/language-context";

export default function LogPage() {
  const { t, lang } = useLanguage();
  return (
    <div className="pt-2 space-y-3 px-4">
      <div className="pb-2">
        <h1 className="text-xl font-bold text-slate-100">{t("logFormTitle")}</h1>
        <p className="text-sm text-slate-400">{lang === "he" ? "תעדו את הסשן שלכם" : "Record today's session"}</p>
      </div>
      <LogForm />
      <LogHistory />
    </div>
  );
}
