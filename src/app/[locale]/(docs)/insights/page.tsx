import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { InsightsGrid } from "@/components/InsightsGrid";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Top Insights" };

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="insights"
        locale={locale}
        translated
        dek="十条不那么显而易见的经验，按所属层归类——可以按层筛选，也可以一次看完全部。"
      >
        <InsightsGrid locale={locale} />
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="insights"
      locale={locale}
      dek="Ten non-obvious lessons, grouped by which layer they belong to — filter by layer or scan them all."
    >
      <InsightsGrid />
    </ContentPage>
  );
}
