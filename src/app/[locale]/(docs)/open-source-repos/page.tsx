import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { RepoDirectory } from "@/components/RepoDirectory";
import { WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Open-Source Repos" };

export default async function OpenSourceReposPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="open-source-repos"
        locale={locale}
        translated
        dek="一份精选目录，收录了如果你在围绕 Claude Code 做开发，值得了解的活跃维护仓库。"
      >
        <WarningCallout locale={locale}>
          这是一份快照，不是实时数据流——这个领域的描述和维护状态变化很快。
          在依据这里的任何内容做决定之前，请直接去 GitHub 上核实。
        </WarningCallout>

        <RepoDirectory locale={locale} />
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="open-source-repos"
      locale={locale}
      dek="A curated directory of actively-maintained repos worth knowing about if you're building around Claude Code."
    >
      <WarningCallout>
        This is a snapshot, not a live feed — descriptions and maintenance status drift fast in
        this space. Verify directly on GitHub before relying on anything here for a decision.
      </WarningCallout>

      <RepoDirectory />
    </ContentPage>
  );
}
