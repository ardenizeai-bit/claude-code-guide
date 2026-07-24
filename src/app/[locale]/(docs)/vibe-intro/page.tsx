import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { WarningCallout, TipCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "What is Vibe Coding?" };

export default async function VibeIntroPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="vibe-intro"
        locale={locale}
        translated
        dek="描述你想要什么，AI 来写代码——而你描述的质量，就成了决定一切的关键。"
      >
        <p>
          这个说法通常归功于 Andrej Karpathy。核心转变在于：在旧的工作方式里，你一行一行写
          代码，边写边调试；而在 vibe coding 中，你描述意图，AI 负责实现，你负责审阅和迭代。
          规格说明的质量开始变得比原始的实现技巧更重要——一段清晰的提示词胜过手工精雕的代码，
          于是精力的重心从&ldquo;怎么做&rdquo;转移到了描述&ldquo;想要什么&rdquo;上。
        </p>

        <WarningCallout locale={locale}>
          关于 vibe coding 的采用率数据在网上流传很广，但并未经过独立验证。
          你看到的任何具体百分比，请当作示意性内容，而非已核实的事实。
        </WarningCallout>

        <h2>为什么 Claude Code 特别适合这种风格</h2>
        <ul>
          <li>通过 CLAUDE.md 实现跨会话存活的持久记忆</li>
          <li>完整的项目访问权限——读取整个代码库、运行命令、管理 git，而不只是孤立的代码片段</li>
          <li>用 Plan Mode 在写下第一行代码之前就把架构想清楚</li>
          <li>多智能体并行——subagents 和 Agent Teams 可以同时构建前端、后端和测试</li>
        </ul>

        <h2>每一步对应的功能</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>步骤</th><th>对应功能</th></tr>
            </thead>
            <tbody>
              <tr><td>写一份清晰的需求简报</td><td>提示技巧 + CLAUDE.md</td></tr>
              <tr><td>规划架构</td><td>Plan Mode（<code>Shift+Tab</code>）</td></tr>
              <tr><td>连接外部工具</td><td>MCP 服务器</td></tr>
              <tr><td>自动化工作流</td><td>Skills（<code>/commands</code>）</td></tr>
              <tr><td>保证质量</td><td>Hooks（自动 lint、测试）</td></tr>
              <tr><td>并行化工作</td><td>Subagents + Agent Teams</td></tr>
              <tr><td>与团队共享</td><td>Plugins</td></tr>
            </tbody>
          </table>
        </div>

        <TipCallout locale={locale}>
          最快的入门方式：挑一个真实的项目，写一页需求简报，然后直接开始用 Claude Code——
          而不是先去读三份更多的指南。
        </TipCallout>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="vibe-intro"
      locale={locale}
      dek="Describe what you want, the AI writes the code — and the quality of your description becomes the whole ballgame."
    >
      <p>
        The term is usually credited to Andrej Karpathy. The core shift: in the old workflow you
        write code line by line and debug as you go; in vibe coding you describe intent, the AI
        implements it, and you review and iterate. Specification quality starts to matter more
        than raw implementation skill — a clear prompt beats hand-tuned code, so the effort moves
        toward describing <em>what</em> you want rather than <em>how</em> to build it.
      </p>

      <WarningCallout>
        Adoption figures for vibe coding circulate widely but aren&apos;t independently verified.
        Treat any specific percentage you see quoted as illustrative, not confirmed fact.
      </WarningCallout>

      <h2>Why Claude Code fits this style well</h2>
      <ul>
        <li>Persistent memory via CLAUDE.md that survives across sessions</li>
        <li>Full project access — reads the whole codebase, runs commands, manages git, not just isolated snippets</li>
        <li>Plan Mode to think through architecture before a single line of code is written</li>
        <li>Multi-agent parallelism — subagents and Agent Teams building frontend, backend, and tests simultaneously</li>
      </ul>

      <h2>How each step maps to a feature</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Step</th><th>Feature</th></tr>
          </thead>
          <tbody>
            <tr><td>Write a clear brief</td><td>Prompt Tips + CLAUDE.md</td></tr>
            <tr><td>Plan the architecture</td><td>Plan Mode (<code>Shift+Tab</code>)</td></tr>
            <tr><td>Connect external tools</td><td>MCP servers</td></tr>
            <tr><td>Automate workflows</td><td>Skills (<code>/commands</code>)</td></tr>
            <tr><td>Enforce quality</td><td>Hooks (auto-lint, test)</td></tr>
            <tr><td>Parallelize work</td><td>Subagents + Agent Teams</td></tr>
            <tr><td>Share with team</td><td>Plugins</td></tr>
          </tbody>
        </table>
      </div>

      <TipCallout>
        The fastest way in: pick a real project, write a one-page brief, and start using Claude
        Code directly — not reading three more guides first.
      </TipCallout>
    </ContentPage>
  );
}
