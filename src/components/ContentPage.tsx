import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ProgressBadge } from "@/components/ProgressBadge";
import { PaginationFooter } from "@/components/PaginationFooter";
import {
  getPageBySlug,
  getAdjacentPages,
  localizeTitle,
  type Locale,
} from "@/lib/pages";

export function ContentPage({
  slug,
  locale,
  dek,
  translated = false,
  children,
}: {
  slug: string;
  locale: Locale;
  dek: string;
  /**
   * Set to true only on a page whose zh branch has real Chinese content.
   * Defaults to false so newly-migrated pages never silently claim to be
   * translated just because the prop was omitted.
   */
  translated?: boolean;
  children: ReactNode;
}) {
  const page = getPageBySlug(slug);
  if (!page) throw new Error(`Unknown page slug: ${slug}`);

  const { prev, next } = getAdjacentPages(page.order);

  return (
    <main className="min-w-0 flex-1">
      <div className="hidden justify-end gap-1 border-b border-border px-8 py-3 md:flex">
        <LanguageToggle currentSlug={slug} locale={locale} />
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-3xl px-5 py-10 md:px-10 md:py-14">
        <ProgressBadge order={page.order} section={page.section} locale={locale} />

        <h1 className="mt-5 font-heading text-3xl font-semibold text-text-primary md:text-4xl">
          {localizeTitle(page, locale)}
        </h1>
        <p className="mt-3 text-lg text-text-secondary">{dek}</p>

        {locale === "zh" && !translated && (
          <p className="mt-3 rounded-md border border-border-strong bg-bg-sunken px-3 py-2 font-mono text-xs text-text-muted">
            此页面暂无中文翻译，以下内容为英文原文 · This page isn&apos;t translated yet — showing English content.
          </p>
        )}

        <article className="prose-content mt-8 flex flex-col gap-6">
          {children}
        </article>

        <PaginationFooter prev={prev} next={next} locale={locale} />
      </div>
    </main>
  );
}
