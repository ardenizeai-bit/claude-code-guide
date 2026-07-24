"use client";

import Link from "next/link";
import type { Locale } from "@/lib/pages";

export function LanguageToggle({
  currentSlug,
  locale,
}: {
  currentSlug: string;
  locale: Locale;
}) {
  const nextLocale: Locale = locale === "en" ? "zh" : "en";
  const label = locale === "en" ? "中文" : "EN";

  function handleClick() {
    try {
      localStorage.setItem("locale", nextLocale);
    } catch {}
  }

  return (
    <Link
      href={`/${nextLocale}/${currentSlug}`}
      onClick={handleClick}
      aria-label={locale === "en" ? "切换到简体中文" : "Switch to English"}
      className="flex h-8 min-w-8 items-center justify-center rounded-md px-2 font-mono text-xs font-medium text-text-secondary transition-colors hover:bg-bg-sunken hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {label}
    </Link>
  );
}
