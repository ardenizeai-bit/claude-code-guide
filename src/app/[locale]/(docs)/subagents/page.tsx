import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { TreeDiagram } from "@/components/diagrams/TreeDiagram";
import { TipCallout } from "@/components/Callout";
import { SeeAlso } from "@/components/SeeAlso";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Subagents" };

export default async function SubagentsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="subagents"
        locale={locale}
        translated
        dek="独立的子会话，在各自的上下文窗口中自行探索，最后交回一份压缩后的摘要，而不是完整的过程记录。"
      >
        <p>
          Subagent 是由父会话启动的一个独立 Claude 实例，拥有自己的上下文窗口和工具访问权限。
          任务完成后，它的结果会先被压缩再返回——父会话付出的是一份摘要的成本，而不是产生这份
          摘要所需的整个探索过程。一个 subagent 可能会为了在代码库里翻找答案而消耗 8 万
          token，最终却只交回 3–5 千 token 的精炼结论。
        </p>

        <TreeDiagram />

        <SeeAlso
          slug="customize"
          locale={locale}
          note="Subagents 是六个叠加层中的一层——Skills、MCP、Hooks 和 Plugins 都围绕着它们组合在一起。"
        />

        <SeeAlso
          slug="best-practices"
          locale={locale}
          note="这正是为什么在跨多个文件搜索或分析大量日志时，subagent 是首选——冗长的输出留在它自己的上下文里，你的主上下文保持干净。"
        />

        <h2>内置的 subagent 类型</h2>
        <ul>
          <li><strong>Explore（Haiku）</strong> — 只读工具，快速搜索代码库</li>
          <li><strong>Plan</strong> — 继承父会话的模型，只读，在 <code>/plan</code> 模式下使用</li>
          <li><strong>General-purpose（通用）</strong> — 继承父会话的模型和完整工具权限，用于复杂的多步骤工作</li>
        </ul>

        <h2>一个自定义 subagent 定义示例</h2>
        <CodeBlock
          language="yaml"
          code={`# .claude/agents/security-reviewer.md\n---\nname: security-reviewer\nmodel: claude-sonnet-4-20250514\ntools:\n  - Read\n  - Grep\n  - Glob\ndescription: >\n  Reviews code for bugs, style violations,\n  and security issues. Returns a markdown\n  report with severity ratings.\nmaxTurns: 15\npermissionMode: plan\n---\nYou are a security-focused code reviewer.\nScan every file for: SQL injection, XSS,\nauth bypass, secrets in source, and unsafe\ndeserialization. Rate each finding as\ncritical / high / medium / low.`}
          locale={locale}
        />

        <h2>字段参考（精选）</h2>
        <p>
          <code>name</code> 和 <code>description</code> 是必填项。<code>tools</code> 是一份
          白名单，省略时会继承父会话的工具；<code>disallowedTools</code> 则表示授予除指定
          名单之外的所有工具。<code>model</code> 接受 <code>sonnet</code>/<code>opus</code>/
          <code>haiku</code>/完整的模型 ID/<code>inherit</code>。<code>permissionMode</code>{" "}
          的取值范围从 <code>default</code>、<code>bypassPermissions</code> 到{" "}
          <code>plan</code>。其他字段包括：<code>maxTurns</code>、<code>skills</code>
          （预加载的斜杠命令）、<code>mcpServers</code>（仅限该 agent 使用的作用域）、
          <code>hooks</code>、<code>memory</code>（<code>user</code>/<code>project</code>/
          <code>local</code>）、<code>background</code>、<code>effort</code>
          （<code>low</code>/<code>medium</code>/<code>high</code>/<code>max</code>——max
          仅限 Opus）、<code>isolation: worktree</code>（拥有自己的 git 分支和文件）、
          <code>color</code>，以及 <code>initialPrompt</code>（用于 <code>--agent</code>
          无头调用）。
        </p>

        <h2>文件夹解析优先级</h2>
        <p>
          托管配置（组织管理员）&gt; CLI 参数 &gt; <code>.claude/agents/</code>（项目级）&gt;{" "}
          <code>~/.claude/agents/</code>（用户级）&gt; 插件提供的 agent。
        </p>

        <h2>调用一个 subagent</h2>
        <p>
          <code>@agent-name</code>（显式调用）、直接用自然语言（Claude 会自动把意图匹配到
          某个描述）、<code>/agent-name</code>（直接的斜杠命令），或者 <code>--agent</code>
          （无头模式，用于 CI 和脚本）。
        </p>

        <TipCallout locale={locale}>
          启动一个 subagent 大约需要 5–10 秒的开销，所以只把它留给那些原本会大量消耗
          父会话上下文的探索性工作。刻意混用不同的模型——把便宜的探索任务交给 Haiku 或
          Sonnet，而编排者本身继续留在 Opus 上。
        </TipCallout>

        <h2>错误处理</h2>
        <p>
          即使达到 <code>maxTurns</code> 上限，也仍然会返回部分、经过压缩的结果。权限错误——
          比如用只读工具尝试写入——会向上冒泡给父会话。如果一个 subagent 自身的上下文中途
          被填满，它会透明地自动压缩，不会牵扯到父会话。
        </p>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="subagents"
      locale={locale}
      dek="Isolated child sessions that explore in their own context window and hand back a compressed summary, not the full trace."
    >
      <p>
        A subagent is a separate Claude instance with its own context window and tool access,
        spawned by a parent session. When it finishes, its result is compressed before returning
        — the parent pays for a summary, not the exploration that produced it. A subagent might
        burn 80k tokens digging through a codebase and still only hand back 3–5k tokens of
        distilled findings.
      </p>

      <TreeDiagram />

      <SeeAlso
        slug="customize"
        note="Subagents are one of six layers that stack together — Skills, MCP, Hooks, and Plugins fit around them."
      />

      <SeeAlso
        slug="best-practices"
        note="This is why subagents are the go-to for searching many files or analyzing big logs — the verbose output stays in their context, and yours stays clean."
      />

      <h2>Built-in subagent types</h2>
      <ul>
        <li><strong>Explore (Haiku)</strong> — read-only tools, fast codebase search</li>
        <li><strong>Plan</strong> — inherits the parent&apos;s model, read-only, used during <code>/plan</code> mode</li>
        <li><strong>General-purpose</strong> — inherits the parent&apos;s model and full tool access, for complex multi-step work</li>
      </ul>

      <h2>A custom subagent definition</h2>
      <CodeBlock
        language="yaml"
        code={`# .claude/agents/security-reviewer.md\n---\nname: security-reviewer\nmodel: claude-sonnet-4-20250514\ntools:\n  - Read\n  - Grep\n  - Glob\ndescription: >\n  Reviews code for bugs, style violations,\n  and security issues. Returns a markdown\n  report with severity ratings.\nmaxTurns: 15\npermissionMode: plan\n---\nYou are a security-focused code reviewer.\nScan every file for: SQL injection, XSS,\nauth bypass, secrets in source, and unsafe\ndeserialization. Rate each finding as\ncritical / high / medium / low.`}
      />

      <h2>Field reference (selected)</h2>
      <p>
        <code>name</code> and <code>description</code> are required. <code>tools</code> is an
        allowlist that inherits the parent&apos;s tools if omitted; <code>disallowedTools</code>{" "}
        grants everything except a named set. <code>model</code> accepts{" "}
        <code>sonnet</code>/<code>opus</code>/<code>haiku</code>/a full model ID/<code>inherit</code>.{" "}
        <code>permissionMode</code> ranges from <code>default</code> through{" "}
        <code>bypassPermissions</code> to <code>plan</code>. Other fields:{" "}
        <code>maxTurns</code>, <code>skills</code> (preloaded slash commands),{" "}
        <code>mcpServers</code> (scoped to this agent only), <code>hooks</code>,{" "}
        <code>memory</code> (<code>user</code>/<code>project</code>/<code>local</code>),{" "}
        <code>background</code>, <code>effort</code> (<code>low</code>/<code>medium</code>/
        <code>high</code>/<code>max</code> — max is Opus-only), <code>isolation: worktree</code>{" "}
        (its own git branch and files), <code>color</code>, and <code>initialPrompt</code> (for{" "}
        <code>--agent</code> headless invocation).
      </p>

      <h2>Folder resolution order</h2>
      <p>
        Managed (org admin) &gt; CLI flag &gt; <code>.claude/agents/</code> (project) &gt;{" "}
        <code>~/.claude/agents/</code> (user) &gt; plugin agents.
      </p>

      <h2>Invoking a subagent</h2>
      <p>
        <code>@agent-name</code> (explicit), plain natural language (Claude auto-matches intent to
        a description), <code>/agent-name</code> (direct slash command), or <code>--agent</code>{" "}
        (headless, for CI and scripts).
      </p>

      <TipCallout>
        Spawning a subagent costs roughly 5–10 seconds of overhead, so reserve it for exploration
        that would otherwise burn significant parent context. Mix models deliberately — run cheap
        exploration on Haiku or Sonnet while the orchestrator itself stays on Opus.
      </TipCallout>

      <h2>Error handling</h2>
      <p>
        Hitting <code>maxTurns</code> still returns partial, compressed results. A permission
        error — e.g. attempting a write with read-only tools — bubbles up to the parent. If a
        subagent&apos;s own context fills up mid-task, it auto-compacts transparently without
        involving the parent.
      </p>
    </ContentPage>
  );
}
