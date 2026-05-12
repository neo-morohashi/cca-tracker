"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Calendar, BarChart2, ClipboardCheck, Plus, Languages, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { StringKey } from "@/lib/i18n";

interface NavItem { href: string; labelKey: StringKey; icon: LucideIcon; }

const NAV_ITEMS: NavItem[] = [
  { href: "/",       labelKey: "navHome",   icon: Home },
  { href: "/plan",   labelKey: "navPlan",   icon: Calendar },
  { href: "/stats",  labelKey: "navStats",  icon: BarChart2 },
  { href: "/review", labelKey: "navReview", icon: ClipboardCheck },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, lang, setLang } = useLanguage();
  const showFab = pathname !== "/log";
  const otherLang = lang === "en" ? "he" : "en";

  return (
    <>
      <button
        onClick={() => setLang(otherLang)}
        aria-label={t("langToggle")}
        title={t("langToggle")}
        className="fixed top-3 end-3 z-50 h-9 px-3 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-violet-300 hover:border-violet-500/40 transition-colors flex items-center gap-1.5 backdrop-blur"
      >
        <Languages size={14} />
        {otherLang === "he" ? "עברית" : "English"}
      </button>

      {showFab && (
        <button
          onClick={() => router.push("/log")}
          aria-label={t("logStudy")}
          className="fixed bottom-20 end-4 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/25 flex items-center justify-center transition-transform active:scale-95 hover:scale-105"
        >
          <Plus size={28} className="text-white" strokeWidth={2.5} />
        </button>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-slate-900 border-t border-slate-700">
        <div className="mx-auto max-w-2xl h-full flex items-center justify-around px-2">
          {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className="flex flex-col items-center gap-0.5 px-4 py-1 min-w-0">
                <Icon size={22} className={isActive ? "text-violet-500" : "text-slate-400"} />
                <span className={`text-xs font-medium ${isActive ? "text-violet-500" : "text-slate-400"}`}>
                  {t(labelKey)}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
