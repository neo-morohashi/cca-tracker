// CCA試験ドメイン
export type DomainId = "D1" | "D2" | "D3" | "D4" | "D5";

// 活動タイプ
export type ActivityType = "course" | "docs" | "hands-on" | "review" | "mock-exam";

// Phase
export type PhaseId = 1 | 2 | 3;

// 日次学習ログ
export interface StudyLog {
  id: string;               // YYYY-MM-DD
  date: string;             // ISO date string
  week: number;             // 1-16
  durationMinutes: number;  // 学習時間（分）
  domain: DomainId | "General";
  activityType: ActivityType;
  topic: string;            // 学習トピック
  resource: string;         // 使用リソース
  note: string;             // メモ（任意）
  confidence: number;       // 1-5 ドメイン自己評価
}

// 週次レビュー
export interface WeeklyReview {
  week: number;             // 1-16
  completed: boolean;
  milestoneMet: boolean;
  reflection: string;
  nextWeekFocus: string;
  domainConfidence: Record<DomainId, number>; // 各1-5
}

// 週間プラン（マスターデータ）
export interface WeekPlan {
  week: number;
  phase: PhaseId;
  title: string;
  domains: DomainId[];
  resources: ResourceLink[];
  milestone: string;
  tasks: string[];          // 具体的なタスクリスト
}

// リソースリンク
export interface ResourceLink {
  name: string;
  url: string;
  category: "course" | "docs" | "github" | "exam-prep" | "community";
}

// アプリ設定
export interface AppSettings {
  startDate: string;        // ISO date
  lastStudyDate: string;
  currentStreak: number;
  longestStreak: number;
}

// ストレージキー定数
export const STORAGE_KEYS = {
  LOGS: "cca-tracker:logs",
  REVIEWS: "cca-tracker:reviews",
  SETTINGS: "cca-tracker:settings",
} as const;
