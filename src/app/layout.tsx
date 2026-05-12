import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { BottomNav } from "@/components/ui/BottomNav";
import { AppShell } from "@/components/ui/AppShell";
import { LanguageProvider } from "@/lib/language-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CCA Study Tracker",
  description: "16-week learning tracker for the Claude Certified Architect — Foundations exam",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen`}>
        <LanguageProvider>
          <AppShell>
            <div className="mx-auto max-w-2xl min-h-screen flex flex-col">
              <main className="flex-1 pb-16">{children}</main>
            </div>
            <BottomNav />
          </AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
