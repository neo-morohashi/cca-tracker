"use client";

import { useLocalStorage } from "./useLocalStorage";
import { DOMAIN_IDS } from "@/lib/constants";
import { STORAGE_KEYS } from "@/lib/types";
import type { WeeklyReview, DomainId } from "@/lib/types";

type ReviewsStore = Record<number, WeeklyReview>;

export function useWeeklyReviews() {
  const [reviews, setReviews] = useLocalStorage<ReviewsStore>(STORAGE_KEYS.REVIEWS, {});

  function saveReview(review: WeeklyReview): void {
    setReviews((prev) => ({ ...prev, [review.week]: review }));
  }

  function getReview(week: number): WeeklyReview | null {
    return reviews[week] ?? null;
  }

  // 最新週のレビューから各ドメインの直近confidence値を返す
  function getLatestConfidence(): Record<DomainId, number> {
    const result = Object.fromEntries(DOMAIN_IDS.map((id) => [id, 0])) as Record<DomainId, number>;
    const weeks = Object.keys(reviews).map(Number).sort((a, b) => b - a);
    const remaining = new Set<DomainId>(DOMAIN_IDS);

    for (const week of weeks) {
      const conf = reviews[week]?.domainConfidence;
      if (!conf) continue;
      for (const id of [...remaining]) {
        if (conf[id] != null) {
          result[id] = conf[id];
          remaining.delete(id);
        }
      }
      if (remaining.size === 0) break;
    }
    return result;
  }

  return { reviews, saveReview, getReview, getLatestConfidence };
}
