import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Plugins" };

export default async function PluginsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="plugins"
        locale={locale}
        translated
        dek="打包层——把 skills、agents、hooks 和 MCP 服务器打包成一个可安装、有版本号的整体单元。"
      >
        <p>
          一旦你已经写出几个配合良好的 skill 和 hook，Plugin 就能让你把整套东西打包成
          一次性安装，而不必让团队成员各自手动重新搭建每一个部分。
        </p>

        <CodeBlock
          language="text"
          code={`my-plugin/\n├── plugin.json          # Manifest: name, version, permissions\n├── skills/\n│   ├── review-pr/SKILL.md\n│   └── fix-ci/SKILL.md\n├── agents/\n│   └── code-reviewer/agent.yaml\n├── hooks/\n│   ├── pre-commit.sh\n│   └── post-write.sh\n└── mcp-servers/\n    └── custom-db/\n        ├── index.js\n        └── package.json`}
          locale={locale}
        />

        <WarningCallout locale={locale}>
          Plugin 会以其 <code>plugin.json</code> 清单中声明的权限运行。安装前请审查它
          请求的工具权限——一个拥有 Bash 访问权限的插件，可以在你的机器上运行任意命令。
          只从你信任的来源安装插件。
        </WarningCallout>

        <h2>为什么要打包</h2>
        <p>
          插件作为一个整体统一管理版本，所以打包在一起的 skill 和它配套的 hook 会一起
          更新发布——不存在团队成员用新版 skill 配旧版 hook 的风险。如果你想把某套工作流
          分享到团队之外，插件也正是你会发布出去的那个单元。
        </p>

        <h2>社区插件资源</h2>
        <p>
          以下是社区维护的一批插件／工具，各自覆盖了打包层之外常见的问题——路由与网关、
          跨会话记忆、上下文用量可见性、项目脚手架，以及 skill 改进的自我观察。均为第三方项目，
          与 Anthropic 无关，安装前请自行审查权限与来源。
        </p>

        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-border bg-bg-raised p-5">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-heading text-lg font-semibold text-text-primary">
                OmniRoute
              </span>
              <span className="font-mono text-xs text-text-muted">AI 网关 · 路由</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              一个免费、开源的 AI 网关，把 Claude Code（及其他编码工具）对接到 290 多个模型
              提供方的单一入口，支持配额用尽时的自动切换和 token 压缩。通过设置 Base URL
              指向本地网关来接入 Claude Code。
            </p>
            <a
              href="https://github.com/diegosouzapw/OmniRoute"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-2"
            >
              GitHub 仓库 ↗
            </a>
          </div>

          <div className="rounded-lg border border-border bg-bg-raised p-5">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-heading text-lg font-semibold text-text-primary">
                claude-mem
              </span>
              <span className="font-mono text-xs text-text-muted">跨会话记忆</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              为 Claude Code 提供跨会话的持久记忆。它会记录会话中的操作、用 AI 压缩成摘要，
              并在后续会话中把相关上下文重新注入——不需要每次都重新解释项目背景。
              用 <code>npx claude-mem install</code> 安装，或通过插件市场安装。
            </p>
            <a
              href="https://github.com/thedotmack/claude-mem"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-2"
            >
              GitHub 仓库 ↗
            </a>
          </div>

          <div className="rounded-lg border border-border bg-bg-raised p-5">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-heading text-lg font-semibold text-text-primary">
                Headroom
              </span>
              <span className="font-mono text-xs text-text-muted">上下文用量可见性</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              在状态栏中显示一条实时的上下文窗口用量条。它读取真实的会话 JSONL 文件（而不是
              估算值），在每次工具调用后更新，帮助你判断该压缩上下文还是开一个新会话。
              <strong>注意：</strong>&ldquo;Headroom&rdquo;这个名字被好几个互不相关的项目使用，
              安装前请核对是你要找的那一个。
            </p>
            <a
              href="https://github.com/henchmarketing-rgb/headroom"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-2"
            >
              GitHub 仓库 ↗
            </a>
          </div>

          <div className="rounded-lg border border-border bg-bg-raised p-5">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-heading text-lg font-semibold text-text-primary">
                Claude Code Setup
              </span>
              <span className="font-mono text-xs text-text-muted">项目脚手架</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              一份 Claude Code 项目起始模板，内置基于 CLAUDE.md 的记忆库体系，用于在多次会话
              之间保持项目上下文，附带配置文件、hooks、slash commands、subagents 和 skills。
              下载后运行 <code>/init</code> 分析你的代码库并生成记忆库文件。
            </p>
            <a
              href="https://github.com/centminmod/my-claude-code-setup"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-2"
            >
              GitHub 仓库 ↗
            </a>
          </div>

          <div className="rounded-lg border border-border bg-bg-raised p-5">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-heading text-lg font-semibold text-text-primary">
                Task Observer
              </span>
              <span className="font-mono text-xs text-text-muted">Skill 自我改进</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              一个&ldquo;元 skill&rdquo;，在你工作时观察会话，记录可以沉淀为新 skill 或改进
              现有 skill 的重复模式与纠正行为。观察结果会生成日志，由你审核后再决定是否
              落地为实际改动——不会自动修改任何东西。
            </p>
            <a
              href="https://github.com/rebelytics/one-skill-to-rule-them-all"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-2"
            >
              GitHub 仓库 ↗
            </a>
          </div>
        </div>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="plugins"
      locale={locale}
      dek="The packaging layer — bundle skills, agents, hooks, and MCP servers into one installable, versioned unit."
    >
      <p>
        Once you&apos;ve built a few skills and hooks that work well together, a Plugin lets you
        ship the whole bundle as a single install rather than asking teammates to recreate each
        piece by hand.
      </p>

      <CodeBlock
        language="text"
        code={`my-plugin/\n├── plugin.json          # Manifest: name, version, permissions\n├── skills/\n│   ├── review-pr/SKILL.md\n│   └── fix-ci/SKILL.md\n├── agents/\n│   └── code-reviewer/agent.yaml\n├── hooks/\n│   ├── pre-commit.sh\n│   └── post-write.sh\n└── mcp-servers/\n    └── custom-db/\n        ├── index.js\n        └── package.json`}
      />

      <WarningCallout>
        Plugins run with whatever permissions their <code>plugin.json</code> manifest declares.
        Review the requested tool permissions before installing — a plugin with Bash access can
        run arbitrary commands on your machine. Only install plugins from sources you trust.
      </WarningCallout>

      <h2>Why bundle at all</h2>
      <p>
        A plugin is versioned as a single unit, so an update to the bundled skill and its
        supporting hook ship together — no risk of a teammate running a newer skill against an
        older hook. It&apos;s also the unit you&apos;d publish if you wanted to share a workflow
        outside your own team.
      </p>

      <h2>Community plugin resources</h2>
      <p>
        A handful of community-maintained plugins and tools that cover problems outside the
        packaging layer itself — routing and gateways, cross-session memory, context usage
        visibility, project scaffolding, and self-observation for improving skills over time. All
        are third-party projects, unaffiliated with Anthropic — review permissions and provenance
        before installing any of them.
      </p>

      <div className="flex flex-col gap-3">
        <div className="rounded-lg border border-border bg-bg-raised p-5">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-heading text-lg font-semibold text-text-primary">
              OmniRoute
            </span>
            <span className="font-mono text-xs text-text-muted">AI gateway / routing</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            A free, open-source AI gateway that puts Claude Code (and other coding tools) behind
            a single endpoint spanning 290+ model providers, with automatic fallback when a quota
            runs out and token compression. Point Claude Code at the local gateway&apos;s Base
            URL to use it.
          </p>
          <a
            href="https://github.com/diegosouzapw/OmniRoute"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-2"
          >
            GitHub repo ↗
          </a>
        </div>

        <div className="rounded-lg border border-border bg-bg-raised p-5">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-heading text-lg font-semibold text-text-primary">
              claude-mem
            </span>
            <span className="font-mono text-xs text-text-muted">Cross-session memory</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            Gives Claude Code persistent memory across sessions. It captures what happened during
            a session, compresses it with AI, and injects the relevant context back into future
            sessions — so you don&apos;t re-explain project background every time. Install with{" "}
            <code>npx claude-mem install</code>, or via the plugin marketplace.
          </p>
          <a
            href="https://github.com/thedotmack/claude-mem"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-2"
          >
            GitHub repo ↗
          </a>
        </div>

        <div className="rounded-lg border border-border bg-bg-raised p-5">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-heading text-lg font-semibold text-text-primary">
              Headroom
            </span>
            <span className="font-mono text-xs text-text-muted">Context usage visibility</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            Shows a live context-window usage bar in your statusline. It reads your actual session
            JSONL file (not an estimate) and updates after every tool call, so you can tell when
            to compact or start fresh. <strong>Note:</strong> &ldquo;Headroom&rdquo; is used by
            several unrelated projects — confirm you&apos;ve got the right one before installing.
          </p>
          <a
            href="https://github.com/henchmarketing-rgb/headroom"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-2"
          >
            GitHub repo ↗
          </a>
        </div>

        <div className="rounded-lg border border-border bg-bg-raised p-5">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-heading text-lg font-semibold text-text-primary">
              Claude Code Setup
            </span>
            <span className="font-mono text-xs text-text-muted">Project scaffolding</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            A starter template for Claude Code projects with a CLAUDE.md-based memory bank system
            for keeping project context across sessions, plus config files, hooks, slash
            commands, subagents, and skills. Run <code>/init</code> after cloning it in to
            analyze your codebase and populate the memory bank.
          </p>
          <a
            href="https://github.com/centminmod/my-claude-code-setup"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-2"
          >
            GitHub repo ↗
          </a>
        </div>

        <div className="rounded-lg border border-border bg-bg-raised p-5">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-heading text-lg font-semibold text-text-primary">
              Task Observer
            </span>
            <span className="font-mono text-xs text-text-muted">Skill self-improvement</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            A &ldquo;meta-skill&rdquo; that watches your sessions as you work and logs recurring
            patterns or corrections that could become a new skill or improve an existing one. It
            produces an observation log for you to review — nothing gets changed automatically.
          </p>
          <a
            href="https://github.com/rebelytics/one-skill-to-rule-them-all"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-2"
          >
            GitHub repo ↗
          </a>
        </div>
      </div>
    </ContentPage>
  );
}
