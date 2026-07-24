"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/pages";

export function PersistentSidebar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];
  const locale: Locale = LOCALES.includes(maybeLocale as Locale)
    ? (maybeLocale as Locale)
    : DEFAULT_LOCALE;
  const currentSlug = segments[1] ?? "";

  return <Sidebar currentSlug={currentSlug} locale={locale} />;
}
