import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { localizeTitle, type PageEntry, type Locale } from "@/lib/pages";

const LABELS: Record<Locale, { prev: string; next: string }> = {
  en: { prev: "Previous", next: "Next" },
  zh: { prev: "上一页", next: "下一页" },
};

export function PaginationFooter({
  prev,
  next,
  locale,
}: {
  prev?: PageEntry;
  next?: PageEntry;
  locale: Locale;
}) {
  const labels = LABELS[locale];

  return (
    <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
      {prev ? (
        <Link
          href={`/${locale}/${prev.slug}`}
          className="group flex flex-1 items-center gap-3 rounded-lg border border-border bg-bg-raised px-4 py-3 transition-colors hover:border-border-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:max-w-[45%]"
        >
          <ChevronLeft size={18} className="shrink-0 text-text-muted transition-transform group-hover:-translate-x-0.5" />
          <span className="flex flex-col overflow-hidden text-left">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
              {labels.prev}
            </span>
            <span className="truncate font-medium text-text-primary">{localizeTitle(prev, locale)}</span>
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/${locale}/${next.slug}`}
          className="group flex flex-1 items-center justify-end gap-3 rounded-lg border border-border bg-bg-raised px-4 py-3 text-right transition-colors hover:border-border-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:max-w-[45%]"
        >
          <span className="flex flex-col overflow-hidden text-right">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
              {labels.next}
            </span>
            <span className="truncate font-medium text-text-primary">{localizeTitle(next, locale)}</span>
          </span>
          <ChevronRight size={18} className="shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
