import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { DecisionTree } from "@/components/diagrams/DecisionTree";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Decision Guide" };

export default async function DecisionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="decision"
        locale={locale}
        translated
        dek="一份分支式的实操向导——而不是又一篇解释文章。针对你的具体情况顺着树走一遍，而不必再读一遍全貌。"
      >
        <DecisionTree locale={locale} />

        <h2>如何读这棵树</h2>
        <ol>
          <li><strong>需要每次会话都记住这件事吗？</strong>无论任务是什么，都应该影响每一次会话的内容 → CLAUDE.md。</li>
          <li><strong>需要连接外部系统吗？</strong>GitHub、数据库、Slack——代码库之外的任何东西 → 一个 MCP 服务器。</li>
          <li><strong>是可重复的多步骤工作流吗？</strong>一段你原本每次都要重新输入的流程 → 一个 Skill，通过 <code>/skill-name</code> 调用。</li>
          <li><strong>必须始终执行，没有例外吗？</strong>某件事必须在每一次匹配的工具调用上确定性地发生 → 一个 Hook（<code>PreToolUse</code>/<code>PostToolUse</code>）。</li>
          <li><strong>各个工作者需要在过程中互相沟通吗？</strong>如果并行的各部分需要在运行过程中协调 → Agent Teams（点对点）。如果它们完全独立 → Subagents（各自隔离、最后汇报结果的工作者）。</li>
        </ol>

        <h2>速查表</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>场景</th><th>对应层</th></tr>
            </thead>
            <tbody>
              <tr><td>每次会话都要遵循的编码规范</td><td>CLAUDE.md</td></tr>
              <tr><td>从 Jira/Slack/数据库拉取数据</td><td>MCP</td></tr>
              <tr><td>对照固定清单进行 PR 评审</td><td>Skill</td></tr>
              <tr><td>保存时自动格式化</td><td>Hook</td></tr>
              <tr><td>三个 agent 评审不同的文件</td><td>Agent Teams</td></tr>
              <tr><td>并行运行测试＋lint＋类型检查</td><td>Subagents</td></tr>
              <tr><td>项目专属的 linter 配置</td><td>CLAUDE.md</td></tr>
              <tr><td>一个数据库迁移生成器</td><td>Skill</td></tr>
              <tr><td>拦截没有工单 ID 的提交</td><td>Hook</td></tr>
            </tbody>
          </table>
        </div>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="decision"
      locale={locale}
      dek="A branching walkthrough — not another explainer. Follow the tree for your specific situation instead of reading the whole picture again."
    >
      <DecisionTree />

      <h2>Reading the tree</h2>
      <ol>
        <li><strong>Always know this about the project?</strong> Something that should shape every session, no matter the task → CLAUDE.md.</li>
        <li><strong>Connects to an external system?</strong> GitHub, a database, Slack — anything outside the codebase itself → an MCP server.</li>
        <li><strong>Repeatable multi-step workflow?</strong> A sequence you'd otherwise retype every time → a Skill, called via <code>/skill-name</code>.</li>
        <li><strong>Must always run, no exceptions?</strong> Something that has to happen deterministically on every matching tool call → a Hook (<code>PreToolUse</code>/<code>PostToolUse</code>).</li>
        <li><strong>Workers must talk mid-task?</strong> If the parallel pieces need to coordinate while running → Agent Teams (peer-to-peer). If they're fully independent → Subagents (isolated workers that report back).</li>
      </ol>

      <h2>Quick-reference cheat sheet</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Scenario</th><th>Layer</th></tr>
          </thead>
          <tbody>
            <tr><td>Coding standards every session</td><td>CLAUDE.md</td></tr>
            <tr><td>Pulling data from Jira/Slack/DB</td><td>MCP</td></tr>
            <tr><td>PR review against a fixed checklist</td><td>Skill</td></tr>
            <tr><td>Auto-format on save</td><td>Hook</td></tr>
            <tr><td>Three agents reviewing different files</td><td>Agent Teams</td></tr>
            <tr><td>Parallel test + lint + type-check</td><td>Subagents</td></tr>
            <tr><td>Project-specific linter config</td><td>CLAUDE.md</td></tr>
            <tr><td>A database-migration generator</td><td>Skill</td></tr>
            <tr><td>Blocking commits without a ticket ID</td><td>Hook</td></tr>
          </tbody>
        </table>
      </div>
    </ContentPage>
  );
}
