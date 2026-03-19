import { ProgressHeader } from "@/components/dashboard/ProgressHeader";
import { TodayCard } from "@/components/dashboard/TodayCard";
import { DomainRadar } from "@/components/dashboard/DomainRadar";
import { WeekHeatmap } from "@/components/dashboard/WeekHeatmap";
import { CalendarHeatmap } from "@/components/dashboard/CalendarHeatmap";

export default function DashboardPage() {
  return (
    <div className="p-4 space-y-4">
      <ProgressHeader />
      <WeekHeatmap />
      <TodayCard />
      <DomainRadar />
      <CalendarHeatmap />
    </div>
  );
}
