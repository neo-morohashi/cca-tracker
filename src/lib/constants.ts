import type { DomainId, ActivityType } from "./types";
import type { LocalizedString } from "./i18n";

export const DOMAINS: Record<
  DomainId,
  {
    id: DomainId;
    name: string;
    label: LocalizedString;
    weight: number;
    color: string;
    colorHex: string;
  }
> = {
  D1: {
    id: "D1",
    name: "Agentic Architecture & Orchestration",
    label: { en: "Agentic architecture", he: "ארכיטקטורת סוכנים" },
    weight: 27,
    color: "violet-500",
    colorHex: "#8b5cf6",
  },
  D2: {
    id: "D2",
    name: "Tool Design & MCP Integration",
    label: { en: "Tools & MCP", he: "כלים ו-MCP" },
    weight: 18,
    color: "cyan-500",
    colorHex: "#06b6d4",
  },
  D3: {
    id: "D3",
    name: "Claude Code Configuration & Workflows",
    label: { en: "Claude Code", he: "Claude Code" },
    weight: 20,
    color: "amber-500",
    colorHex: "#f59e0b",
  },
  D4: {
    id: "D4",
    name: "Prompt Engineering & Structured Output",
    label: { en: "Prompts & structured output", he: "פרומפט ופלט מובנה" },
    weight: 20,
    color: "emerald-500",
    colorHex: "#10b981",
  },
  D5: {
    id: "D5",
    name: "Context Management & Reliability",
    label: { en: "Context & reliability", he: "הקשר ואמינות" },
    weight: 15,
    color: "rose-500",
    colorHex: "#f43f5e",
  },
};

export const DOMAIN_IDS: DomainId[] = ["D1", "D2", "D3", "D4", "D5"];

export const ACTIVITY_TYPES: Record<ActivityType, { label: LocalizedString }> = {
  course:      { label: { en: "Course",     he: "קורס"   } },
  docs:        { label: { en: "Docs",       he: "תיעוד"  } },
  "hands-on":  { label: { en: "Hands-on",   he: "מעשי"   } },
  review:      { label: { en: "Review",     he: "סקירה"  } },
  "mock-exam": { label: { en: "Mock Exam",  he: "דמה"    } },
};

export const WEEKLY_TARGET_MIN = 105;
export const WEEKLY_TARGET_MAX = 210;
export const TOTAL_WEEKS = 16;
export const TOTAL_DAYS = 112;

export const HEATMAP_COLORS = {
  empty: "#1e293b",
  low: "#14532d",
  medium: "#15803d",
  high: "#10b981",
  max: "#34d399",
} as const;

export const DURATION_PRESETS = [15, 20, 25, 30] as const;
