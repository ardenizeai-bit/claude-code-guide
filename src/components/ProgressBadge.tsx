import { TOTAL_PAGES, localizeSection, type Locale } from "@/lib/pages";

export function ProgressBadge({
  order,
  section,
  locale,
}: {
  order: number;
  section: string;
  locale: Locale;
}) {
  const fraction = order / TOTAL_PAGES;
  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - fraction);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-raised px-3 py-1.5">
      <svg width="20" height="20" viewBox="0 0 20 20" className="shrink-0 -rotate-90">
        <circle
          cx="10"
          cy="10"
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="2.5"
        />
        <circle
          cx="10"
          cy="10"
          r={radius}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
        />
      </svg>
      <span className="font-mono text-xs tracking-wide text-text-secondary">
        {order}/{TOTAL_PAGES} · {localizeSection(section, locale)}
      </span>
    </div>
  );
}
