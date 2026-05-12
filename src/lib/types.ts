import type { LocalizedString } from "./i18n";

export type DomainId = "D1" | "D2" | "D3" | "D4" | "D5";
export type ActivityType = "course" | "docs" | "hands-on" | "review" | "mock-exam";
export type PhaseId = 1 | 2 | 3;

export interface StudyLog {
  id: string;
  date: string;
  week: number;
  durationMinutes: number;
  domain: DomainId | "General";
  activityType: ActivityType;
  topic: string;
  resource: string;
  note: string;
  confidence: number;
}

export interface WeeklyReview {
  week: number;
  completed: boolean;
  milestoneMet: boolean;
  reflection: string;
  nextWeekFocus: string;
  domainConfidence: Record<DomainId, number>;
}

export interface WeekPlan {
  week: number;
  phase: PhaseId;
  title: LocalizedString;
  domains: DomainId[];
  resources: ResourceLink[];
  milestone: LocalizedString;
  tasks: LocalizedString[];
}

export interface ResourceLink {
  name: string;
  url: string;
  category: "course" | "docs" | "github" | "exam-prep" | "community";
}

export interface AppSettings {
  startDate: string;
  lastStudyDate: string;
  currentStreak: number;
  longestStreak: number;
}

export const STORAGE_KEYS = {
  LOGS: "cca-tracker:logs",
  REVIEWS: "cca-tracker:reviews",
  SETTINGS: "cca-tracker:settings",
  CUSTOM_TASKS: "cca-tracker:custom-tasks",
  TASK_CHECKS: "cca-tracker:task-checks",
} as const;
