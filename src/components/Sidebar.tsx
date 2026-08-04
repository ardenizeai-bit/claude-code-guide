"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { SECTIONS, getPagesBySection, localizeSection, localizeTitle, type Locale } from "@/lib/pages";
import { NavItem } from "@/components/NavItem";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";

const TAGLINE: Record<Locale, string> = {
  en: "REFERENCE GUIDE",
  zh: "参考指南",
};

const ATTRIBUTION_PREFIX: Record<Locale, string> = {
  en: "An AI PM Portfolio piece — ",
  zh: "An AI PM Portfolio piece — ",
};

const SEARCH_PLACEHOLDER: Record<Locale, string> = {
  en: "Search pages…",
  zh: "搜索页面…",
};

const NO_RESULTS: Record<Locale, string> = {
  en: "No pages match your search.",
  zh: "没有匹配的页面。",
};

function SidebarBody({
  currentSlug,
  locale,
  onNavigate,
}: {
  currentSlug: string;
  locale: Locale;
  onNavigate?: () => void;
}) {
  const navRef = useRef<HTMLElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) return;
    activeRef.current?.scrollIntoView({ block: "nearest" });
    // Only re-run when the active page changes, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlug]);

  const normalizedQuery = query.trim().toLowerCase();

  const sectionsWithMatches = useMemo(() => {
    if (!normalizedQuery) {
      return SECTIONS.map((section) => ({ section, pages: getPagesBySection(section) }));
    }
    return SECTIONS.map((section) => ({
      section,
      pages: getPagesBySection(section).filter((page) =>
        localizeTitle(page, locale).toLowerCase().includes(normalizedQuery)
      ),
    })).filter(({ pages }) => pages.length > 0);
  }, [normalizedQuery, locale]);

  return (
    <>
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ink dark:bg-white">
          <span className="font-heading text-base font-semibold text-amber">CC</span>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-medium text-text-primary">Claude Code</span>
          <span className="font-mono text-[10px] tracking-widest text-text-muted">
            {TAGLINE[locale]}
          </span>
        </div>
      </div>

      <div className="border-b border-border px-3 py-3">
        <div className="relative">
          <Search
            size={14}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={SEARCH_PLACEHOLDER[locale]}
            aria-label={SEARCH_PLACEHOLDER[locale]}
            className="w-full rounded-md border border-border bg-bg py-1.5 pl-8 pr-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </div>
      </div>

      <nav ref={navRef} className="flex-1 overflow-y-auto px-3 py-4">
        {sectionsWithMatches.length === 0 && (
          <p className="px-3 text-sm text-text-muted">{NO_RESULTS[locale]}</p>
        )}
        {sectionsWithMatches.map(({ section, pages }) => (
          <div key={section} className="mb-5">
            <div className="mb-1.5 px-3 font-mono text-[11px] font-medium uppercase tracking-wider text-text-muted">
              {localizeSection(section, locale)}
            </div>
            <div className="flex flex-col gap-0.5">
              {pages.map((page) => {
                const isActive = page.slug === currentSlug;
                return (
                  <NavItem
                    key={page.slug}
                    ref={isActive ? activeRef : undefined}
                    href={`/${locale}/${page.slug}`}
                    label={localizeTitle(page, locale)}
                    active={isActive}
                    onClick={onNavigate}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-border px-5 py-4">
        <p className="text-[11px] leading-snug text-text-muted">
          {ATTRIBUTION_PREFIX[locale]}
          <a
            href="https://jjandy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-text-secondary"
          >
            JJAndy.com
          </a>
        </p>
      </div>
    </>
  );
}

export function Sidebar({ currentSlug, locale }: { currentSlug: string; locale: Locale }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-[280px] shrink-0 flex-col border-r border-border bg-bg-raised md:sticky md:top-0 md:flex">
        <SidebarBody currentSlug={currentSlug} locale={locale} />
      </aside>

      {/* Mobile header */}
      <div className="flex items-center justify-between border-b border-border bg-bg-raised px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-ink dark:bg-white">
            <span className="font-heading text-sm font-semibold text-amber">CC</span>
          </div>
          <span className="font-medium text-text-primary">Claude Code</span>
        </div>
        <div className="flex items-center gap-1">
          <LanguageToggle currentSlug={currentSlug} locale={locale} />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary hover:bg-bg-sunken focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-ink/50"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-[280px] max-w-[85vw] flex-col bg-bg-raised shadow-xl">
            <div className="flex items-center justify-end border-b border-border px-3 py-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary hover:bg-bg-sunken focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X size={18} />
              </button>
            </div>
            <SidebarBody currentSlug={currentSlug} locale={locale} onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
