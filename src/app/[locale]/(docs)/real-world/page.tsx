import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { StatStrip } from "@/components/StatStrip";
import { WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Real-World Examples" };

export default async function RealWorldPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="real-world"
        locale={locale}
        translated
        dek="围绕 Claude Code 采用情况流传的一些案例研究——请把这些具体数字当作宣传说法，而不是经过审计的数据。"
      >
        <WarningCallout locale={locale}>
          这些数字被广泛引用，但并未经过独立验证。请把它们当作来自非官方来源的方向性说法，
          而不是已核实的数字。
        </WarningCallout>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CaseStudyCard
            company="Stripe"
            stat="4 天"
            description="一次一万行规模的 Scala 到 Java 支付系统迁移，四天内完成。"
            sourceUrl="https://claude.com/customers/stripe"
            sourceLabel="Anthropic 客户案例"
          />
          <CaseStudyCard
            company="Ramp"
            stat="快 80%"
            description="将 Claude Code 集成进值班工作流后，事件调查速度显著提升。"
            sourceUrl="https://claude.com/customers/ramp"
            sourceLabel="Anthropic 客户案例"
          />
          <CaseStudyCard
            company="Anthropic"
            stat="约 80%"
            description="Anthropic 内部合并进代码库的代码中，由 Claude 编写的比例——据报道预计到 2026 年底会突破 90%。"
            sourceUrl="https://venturebeat.com/technology/anthropic-says-80-of-its-new-production-code-is-now-authored-by-claude-how-your-enterprise-can-keep-up"
            sourceLabel="VentureBeat 报道"
          />
          <CaseStudyCard
            company="Fountain"
            stat="快 50%"
            description="采用后被提及的开发速度提升幅度。"
            sourceUrl="https://claude.com/customers/fountain"
            sourceLabel="Anthropic 客户案例"
          />
          <CaseStudyCard
            company="TELUS"
            stat="50 万+ 小时"
            description="各工程团队提及的、组织范围内节省的总工时。"
            sourceUrl="https://claude.com/customers/telus"
            sourceLabel="Anthropic 客户案例"
          />
          <CaseStudyCard
            company="CRED"
            stat="2 倍"
            description="将 Claude Code 嵌入整个软件开发生命周期后的开发速度提升。"
            sourceUrl="https://claude.com/customers/cred"
            sourceLabel="Anthropic 客户案例"
          />
        </div>

        <h2>行业整体数据</h2>
        <StatStrip locale={locale} />
        <p className="text-xs text-text-muted">
          示意性数字，并非独立核实的数据——网上没有找到可靠的原始出处，请勿引用为事实。
        </p>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="real-world"
      locale={locale}
      dek="Case studies circulating around Claude Code adoption — treat the specifics as claims, not audited figures."
    >
      <WarningCallout>
        These figures are widely cited but not independently confirmed. Read them as directional
        claims from an unofficial source rather than verified numbers.
      </WarningCallout>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CaseStudyCard
          company="Stripe"
          stat="4 days"
          description="A 10,000-line Scala-to-Java payments migration completed in four days."
          sourceUrl="https://claude.com/customers/stripe"
          sourceLabel="Anthropic case study"
        />
        <CaseStudyCard
          company="Ramp"
          stat="80% faster"
          description="Incident investigation sped up after integrating Claude Code into on-call workflows."
          sourceUrl="https://claude.com/customers/ramp"
          sourceLabel="Anthropic case study"
        />
        <CaseStudyCard
          company="Anthropic"
          stat="~80%"
          description="Share of code merged into Anthropic's own codebase written by Claude — reportedly trending toward 90%+ by end of 2026."
          sourceUrl="https://venturebeat.com/technology/anthropic-says-80-of-its-new-production-code-is-now-authored-by-claude-how-your-enterprise-can-keep-up"
          sourceLabel="VentureBeat coverage"
        />
        <CaseStudyCard
          company="Fountain"
          stat="50% faster"
          description="Developer velocity improvement cited after adoption."
          sourceUrl="https://claude.com/customers/fountain"
          sourceLabel="Anthropic case study"
        />
        <CaseStudyCard
          company="TELUS"
          stat="500K+ hrs"
          description="Hours saved organization-wide, cited across engineering teams."
          sourceUrl="https://claude.com/customers/telus"
          sourceLabel="Anthropic case study"
        />
        <CaseStudyCard
          company="CRED"
          stat="2x"
          description="Development speed increase after embedding Claude Code through the SDLC."
          sourceUrl="https://claude.com/customers/cred"
          sourceLabel="Anthropic case study"
        />
      </div>

      <h2>Industry-wide figures</h2>
      <StatStrip />
      <p className="text-xs text-text-muted">
        Illustrative figures, not independently sourced — no reliable primary citation could be
        found for these; treat as flavor, not fact.
      </p>
    </ContentPage>
  );
}
