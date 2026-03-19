import type { DomainId, ActivityType } from "./types";

export const DOMAINS: Record<
  DomainId,
  {
    id: DomainId;
    name: string;
    nameJa: string;
    weight: number;     // 試験配点 (%)
    color: string;      // Tailwind色名
    colorHex: string;   // Rechartsグラフ用
  }
> = {
  D1: {
    id: "D1",
    name: "Agentic Architecture & Orchestration",
    nameJa: "エージェントアーキテクチャ",
    weight: 27,
    color: "violet-500",
    colorHex: "#8b5cf6",
  },
  D2: {
    id: "D2",
    name: "Tool Design & MCP Integration",
    nameJa: "ツール設計 & MCP",
    weight: 18,
    color: "cyan-500",
    colorHex: "#06b6d4",
  },
  D3: {
    id: "D3",
    name: "Claude Code Configuration & Workflows",
    nameJa: "Claude Code設定",
    weight: 20,
    color: "amber-500",
    colorHex: "#f59e0b",
  },
  D4: {
    id: "D4",
    name: "Prompt Engineering & Structured Output",
    nameJa: "プロンプト & 構造化出力",
    weight: 20,
    color: "emerald-500",
    colorHex: "#10b981",
  },
  D5: {
    id: "D5",
    name: "Context Management & Reliability",
    nameJa: "コンテキスト管理",
    weight: 15,
    color: "rose-500",
    colorHex: "#f43f5e",
  },
};

export const DOMAIN_IDS: DomainId[] = ["D1", "D2", "D3", "D4", "D5"];

export const ACTIVITY_TYPES: Record<ActivityType, { label: string; labelJa: string }> = {
  course: { label: "Course", labelJa: "コース" },
  docs: { label: "Docs", labelJa: "ドキュメント" },
  "hands-on": { label: "Hands-on", labelJa: "実装" },
  review: { label: "Review", labelJa: "復習" },
  "mock-exam": { label: "Mock Exam", labelJa: "模擬試験" },
};

// 推奨学習時間 (分/週)
export const WEEKLY_TARGET_MIN = 105;
export const WEEKLY_TARGET_MAX = 210;

// 全16週 × 7日
export const TOTAL_WEEKS = 16;
export const TOTAL_DAYS = 112;

// ヒートマップ用カラー（学習時間に応じた濃淡）
export const HEATMAP_COLORS = {
  empty: "#1e293b",       // slate-800
  low: "#14532d",         // emerald-900
  medium: "#15803d",      // emerald-700
  high: "#10b981",        // emerald-500
  max: "#34d399",         // emerald-400
} as const;

export const DURATION_PRESETS = [15, 20, 25, 30] as const;
