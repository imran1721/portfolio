"use client";

import { useEffect, useState } from "react";

const CAREER_START = new Date(2021, 7, 1); // August 1, 2021 (months are 0-indexed)

function fullYearsSince(start: Date, now: Date = new Date()): number {
  let years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  const dayDiff = now.getDate() - start.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years -= 1;
  }
  return Math.max(0, years);
}

/**
 * Renders "<N>+" years where N is full years elapsed since August 2021.
 * Static prerender baked at build time; client re-computes on mount so the
 * number stays current even if the deploy is months old.
 * `suppressHydrationWarning` because build-time and view-time dates can differ.
 */
export function YearsOfExperience() {
  const [years, setYears] = useState(() => fullYearsSince(CAREER_START));
  useEffect(() => {
    setYears(fullYearsSince(CAREER_START));
  }, []);
  return <span suppressHydrationWarning>{years}+</span>;
}
