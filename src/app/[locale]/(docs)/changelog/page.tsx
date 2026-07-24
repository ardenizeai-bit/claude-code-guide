import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { ChangelogTimeline } from "@/components/ChangelogTimeline";
import { WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Changelog" };

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="changelog"
        locale={locale}
        translated
        dek="按时间倒序排列的版本历史——带警告图标的条目是破坏性变更。"
      >
        <WarningCallout locale={locale}>
          以下的版本号、日期和功能说明均为示意性内容，未与官方发布说明进行独立核实。
        </WarningCallout>

        <ChangelogTimeline locale={locale} />
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="changelog"
      locale={locale}
      dek="A reverse-chronological version history — items flagged with a warning icon are breaking changes."
    >
      <WarningCallout>
        Version numbers, dates, and feature claims below are illustrative and have not been
        independently verified against official release notes.
      </WarningCallout>

      <ChangelogTimeline />
    </ContentPage>
  );
}
