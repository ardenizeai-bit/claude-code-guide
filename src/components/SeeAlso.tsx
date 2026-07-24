import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPageBySlug, localizeTitle, type Locale } from "@/lib/pages";

const SEE_ALSO_LABEL: Record<Locale, string> = {
  en: "See also",
  zh: "另请参阅",
};

export function SeeAlso({
  slug,
  note,
  locale = "en",
}: {
  slug: string;
  note: string;
  locale?: Locale;
}) {
  const page = getPageBySlug(slug);
  if (!page) throw new Error(`Unknown page slug: ${slug}`);

  return (
    <Link
      href={`/${locale}/${page.slug}`}
      className="group flex items-center gap-3 rounded-lg border border-dashed border-border-strong bg-bg-sunken px-4 py-3 transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
          {SEE_ALSO_LABEL[locale]} &middot; {localizeTitle(page, locale)}
        </span>
        <span className="text-sm text-text-secondary">{note}</span>
      </div>
      <ArrowRight size={16} className="shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
