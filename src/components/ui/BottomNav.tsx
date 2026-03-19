"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Calendar, BarChart2, ClipboardCheck, Plus, type LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/plan", label: "Plan", icon: Calendar },
  { href: "/stats", label: "Stats", icon: BarChart2 },
  { href: "/review", label: "Review", icon: ClipboardCheck },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const showFab = pathname !== "/log";

  return (
    <>
      {/* FAB */}
      {showFab && (
        <button
          onClick={() => router.push("/log")}
          aria-label="学習を記録する"
          className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/25 flex items-center justify-center transition-transform active:scale-95 hover:scale-105"
        >
          <Plus size={28} className="text-white" strokeWidth={2.5} />
        </button>
      )}

      {/* BottomNav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-slate-900 border-t border-slate-700">
        <div className="mx-auto max-w-2xl h-full flex items-center justify-around px-2">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-0.5 px-4 py-1 min-w-0"
              >
                <Icon
                  size={22}
                  className={isActive ? "text-violet-500" : "text-slate-400"}
                />
                <span
                  className={`text-xs font-medium ${
                    isActive ? "text-violet-500" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
