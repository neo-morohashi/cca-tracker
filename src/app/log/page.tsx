import { LogForm } from "@/components/log/LogForm";
import { LogHistory } from "@/components/log/LogHistory";

export default function LogPage() {
  return (
    <div className="pt-2 space-y-3 px-4">
      <div className="pb-2">
        <h1 className="text-xl font-bold text-slate-100">学習を記録</h1>
        <p className="text-sm text-slate-400">今日の学習を記録しよう</p>
      </div>
      <LogForm />
      <LogHistory />
    </div>
  );
}
