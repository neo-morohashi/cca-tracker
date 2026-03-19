import { WeeklyReviewForm } from "@/components/review/WeeklyReviewForm";

export default function ReviewPage() {
  return (
    <div className="pt-2">
      <div className="px-4 pb-2">
        <h1 className="text-xl font-bold text-slate-100">週間レビュー</h1>
        <p className="text-sm text-slate-400">今週の学習を振り返ろう</p>
      </div>
      <WeeklyReviewForm />
    </div>
  );
}
