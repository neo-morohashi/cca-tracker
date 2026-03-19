import { PlanAccordion } from "@/components/plan/PlanAccordion";

export default function PlanPage() {
  return (
    <div className="pt-2">
      <div className="px-4 pb-2">
        <h1 className="text-xl font-bold text-slate-100">16週間プラン</h1>
        <p className="text-sm text-slate-400">Phase 1〜3のカリキュラム</p>
      </div>
      <div className="px-4 pb-4">
        <PlanAccordion />
      </div>
    </div>
  );
}
