import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { BottomNav } from "@/components/ui/BottomNav";
import { AppShell } from "@/components/ui/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CCA Study Tracker",
  description: "CCA Foundations資格取得に向けた16週間学習トラッカー",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen`}>
        <AppShell>
          <div className="mx-auto max-w-2xl min-h-screen flex flex-col">
            <main className="flex-1 pb-16">{children}</main>
          </div>
          <BottomNav />
        </AppShell>
      </body>
    </html>
  );
}
