import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Overview" };

export default async function OverviewPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="overview"
        locale={locale}
        translated
        dek="Claude Code 到底是什么，以及可以用来扩展它的七个组成部分。"
      >
        <p>
          Claude Code 是 Anthropic 推出的智能体式编程工具——它直接在你的终端和代码库中运作，
          而不是通过复制粘贴式的聊天界面。它能读取文件、执行命令、编写和修改代码，
          并根据你的反馈不断迭代，直到任务完成。
        </p>

        <WarningCallout locale={locale}>
          关于 Claude Code 的采用率和收入数据在网上流传很广，但并未经过独立验证。
          包括本页在内出现的任何具体数字，请视为示意性内容，而非已核实的事实。
        </WarningCallout>

        <h2>七个扩展层</h2>
        <p>
          在 Claude Code 中，所有可配置或可扩展的内容都归属于七个层次之一。
          理解每一层<em>是为了解决什么问题</em>，是判断该用哪个手段最快的方式。
        </p>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr>
                <th>层级</th>
                <th>作用</th>
                <th>性质</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>CLAUDE.md</td><td>智能体的行为准则／持久记忆</td><td>始终生效</td></tr>
              <tr><td>MCP</td><td>用于工具和数据集成的通用协议</td><td>外部连接</td></tr>
              <tr><td>Skills</td><td>可复用、由 Markdown 驱动的任务宏</td><td>按需调用</td></tr>
              <tr><td>Hooks</td><td>生命周期事件的确定性处理器</td><td>自动触发</td></tr>
              <tr><td>Subagents</td><td>拥有压缩上下文的独立子会话</td><td>任务委派</td></tr>
              <tr><td>Agent Teams</td><td>用于并行工作的多智能体编排</td><td>协作式</td></tr>
              <tr><td>Plugins</td><td>打包 Skills、Hooks、Agents 与 MCP 服务器的集合</td><td>打包分发</td></tr>
            </tbody>
          </table>
        </div>

        <h2>为什么分层很重要</h2>
        <p>
          CLAUDE.md 是记忆：每次会话都会加载，默认塑造智能体的行为方式。Hooks 和 MCP 向外连接——
          接入你的 CI 流水线、工单系统、内部 API。Skills 把可复用的流程打包起来，
          让你不必每周重新解释一遍同样的工作流。Subagents 和 Agent Teams 关乎规模化：
          把大任务拆分委派出去，让上下文保持干净，工作可以并行进行。Plugins 则把以上所有内容
          整合成一步即可安装、并可与团队共享的东西。
        </p>
        <p>
          本指南的其余部分都是围绕这些层展开的——每一层都有自己的章节，涵盖机制、常见坑，以及实战示例。
        </p>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="overview"
      locale={locale}
      dek="What Claude Code actually is, and the seven pieces that let you extend it."
    >
      <p>
        Claude Code is Anthropic&apos;s agentic coding tool — an AI that operates directly in your
        terminal and codebase rather than through a copy-paste chat interface. It reads files,
        runs commands, writes and edits code, and iterates against your feedback until a task is
        done.
      </p>

      <WarningCallout>
        Adoption and revenue figures for Claude Code circulate widely online but aren&apos;t
        independently confirmed. Treat any specific numbers you see quoted — including on this
        page — as illustrative rather than verified fact.
      </WarningCallout>

      <h2>The seven extension layers</h2>
      <p>
        Everything you can configure or extend in Claude Code falls into one of seven layers.
        Understanding what each one is <em>for</em> is the fastest way to know which lever to pull
        for a given problem.
      </p>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Layer</th>
              <th>Role</th>
              <th>Nature</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>CLAUDE.md</td><td>Agent constitution / persistent memory</td><td>Always-on</td></tr>
            <tr><td>MCP</td><td>Universal protocol for tool and data integrations</td><td>External</td></tr>
            <tr><td>Skills</td><td>Reusable, markdown-driven task macros</td><td>On-demand</td></tr>
            <tr><td>Hooks</td><td>Deterministic handlers for lifecycle events</td><td>Automatic</td></tr>
            <tr><td>Subagents</td><td>Isolated child sessions with compressed context</td><td>Delegated</td></tr>
            <tr><td>Agent Teams</td><td>Multi-agent orchestration for parallel work</td><td>Collaborative</td></tr>
            <tr><td>Plugins</td><td>Packaged bundles of skills, hooks, agents, and MCP servers</td><td>Packaged</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Why layering matters</h2>
      <p>
        CLAUDE.md is memory: it&apos;s loaded every session and shapes how the agent behaves by
        default. Hooks and MCP reach outward — into your CI pipeline, your ticket tracker, your
        internal APIs. Skills package up repeatable procedures so you&apos;re not re-explaining the
        same workflow every week. Subagents and Agent Teams are about scale: delegating pieces of
        a large task so context stays clean and work can happen in parallel. Plugins tie all of
        the above into something you can install in one step and share with a team.
      </p>
      <p>
        The rest of this guide is organized around these layers — each gets its own section with
        the mechanics, the gotchas, and worked examples.
      </p>
    </ContentPage>
  );
}
