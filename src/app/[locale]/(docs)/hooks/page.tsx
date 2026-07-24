import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { LifecycleFlow } from "@/components/diagrams/LifecycleFlow";
import { TipCallout } from "@/components/Callout";
import { SeeAlso } from "@/components/SeeAlso";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Hooks" };

export default async function HooksPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="hooks"
        locale={locale}
        translated
        dek="Hooks 是确定性的——不同于 Claude 会自行解读的 CLAUDE.md 指导，hook 总是会执行。"
      >
        <LifecycleFlow locale={locale} />

        <h2>四种处理器类型</h2>
        <ul>
          <li><strong>command</strong> — 一条 shell 命令，通过环境变量和 stdin JSON 接收上下文</li>
          <li><strong>http</strong> — 向某个 URL 发起 POST 请求，hook 的负载作为请求体</li>
          <li><strong>prompt</strong> — 直接把文本注入对话中</li>
          <li><strong>agent</strong> — 启动一个 subagent 来处理这个 hook 的逻辑</li>
        </ul>

        <h2>退出码约定</h2>
        <p>
          <code>0</code> 表示成功，继续执行。<code>1</code> 表示错误，会终止该操作——
          Claude 会把 stderr 的内容当作了解出错原因的上下文。<code>2</code> 表示修改：
          hook 的 stdout 会替换原本的工具输入或输出。
        </p>

        <CodeBlock
          language="json"
          code={`// .claude/settings.json\n{\n  "hooks": {\n    "PreToolUse": [\n      { "matcher": "Bash", "handler": { "type": "command", "command": "python3 .claude/hooks/lint-bash.py" } }\n    ],\n    "PostToolUse": [\n      { "matcher": "Write", "handler": { "type": "command", "command": "npx prettier --write $CLAUDE_FILE_PATH" } }\n    ],\n    "Stop": [\n      { "matcher": "", "handler": { "type": "command", "command": "npm test" } }\n    ]\n  }\n}`}
          locale={locale}
        />

        <TipCallout locale={locale}>
          黄金法则：对于必须<em>始终</em>发生的事情——格式化、lint、安全检查——用 Hook。
          对于<em>通常</em>应该发生的事情，用 CLAUDE.md。如果你正在往 CLAUDE.md 里写
          &ldquo;始终执行 X&rdquo;，它大概率更应该放进 hook 里。
        </TipCallout>

        <h2>事件参考（精选）</h2>
        <ul>
          <li><code>SessionStart</code> — matcher：startup/resume/clear/compact；无法阻断</li>
          <li><code>UserPromptSubmit</code>、<code>PreToolUse</code>、<code>PostToolUse</code> — 可通过退出码 2 阻断</li>
          <li><code>Stop</code> — 可以阻断</li>
          <li><code>SubagentStop</code>、<code>FileChanged</code> — 无法阻断</li>
          <li>Agent Teams 专属：<code>TeammateIdle</code>、<code>TaskCreated</code>、<code>TaskCompleted</code> — 可以阻断</li>
        </ul>

        <h2>每个 hook 中都可用的环境变量</h2>
        <p>
          <code>$CLAUDE_PROJECT_DIR</code>、<code>$CLAUDE_CODE_REMOTE</code>（在网页／无头环境中
          为&ldquo;true&rdquo;），以及 <code>$CLAUDE_ENV_FILE</code>——可以在这里写入{" "}
          <code>KEY=VALUE</code> 格式的内容，但只能在 <code>SessionStart</code> hook 中这样做。
        </p>

        <h2>Matcher 模式</h2>
        <p>
          Matcher 是针对工具名称（对 <code>SessionStart</code> 而言则是会话类型）测试的
          正则表达式：<code>&quot;Bash&quot;</code> 精确匹配，{" "}
          <code>&quot;Edit|Write&quot;</code> 匹配两者之一，
          <code>&quot;mcp__memory__.*&quot;</code> 匹配来自某个特定 MCP 服务器的任意工具，
          <code>&quot;.*&quot;</code> 或空字符串则匹配所有情况。
        </p>

        <h2>异步 hooks</h2>
        <p>
          设置 <code>&quot;async&quot;: true</code> 可以让 hook 在后台触发。异步 hook
          无法阻断或修改操作——它们的退出码会被忽略——所以最适合用于不应拖慢会话速度的
          日志记录或遥测数据采集。
        </p>

        <h2>调试 hooks</h2>
        <p>
          检查脚本是否可执行（<code>chmod +x</code>）、shebang 行是否正确、脚本用到{" "}
          <code>jq</code> 的话是否已经安装，以及在退出码为 1 时写入 stderr 的内容，
          是否真的是你想让 Claude 看到的信息。
        </p>

        <SeeAlso
          slug="best-practices"
          locale={locale}
          note="如果某个 hook 失败了，应该去修那个检查本身——用 --no-verify 绕过它，正是团队反模式清单中列出的一条。"
        />
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="hooks"
      locale={locale}
      dek="Hooks are deterministic — unlike CLAUDE.md guidance that Claude interprets, a hook always runs."
    >
      <LifecycleFlow />

      <h2>Four handler types</h2>
      <ul>
        <li><strong>command</strong> — a shell command, receiving context via env vars and stdin JSON</li>
        <li><strong>http</strong> — a POST request to a URL, with the hook payload as the body</li>
        <li><strong>prompt</strong> — injects text directly into the conversation</li>
        <li><strong>agent</strong> — spawns a subagent to handle the hook&apos;s logic</li>
      </ul>

      <h2>Exit-code contract</h2>
      <p>
        <code>0</code> succeeds and proceeds. <code>1</code> is an error that halts the operation
        — Claude sees stderr as context for what went wrong. <code>2</code> means modify: the
        hook&apos;s stdout replaces the original tool input or output.
      </p>

      <CodeBlock
        language="json"
        code={`// .claude/settings.json\n{\n  "hooks": {\n    "PreToolUse": [\n      { "matcher": "Bash", "handler": { "type": "command", "command": "python3 .claude/hooks/lint-bash.py" } }\n    ],\n    "PostToolUse": [\n      { "matcher": "Write", "handler": { "type": "command", "command": "npx prettier --write $CLAUDE_FILE_PATH" } }\n    ],\n    "Stop": [\n      { "matcher": "", "handler": { "type": "command", "command": "npm test" } }\n    ]\n  }\n}`}
      />

      <TipCallout>
        Golden rule: use a Hook for things that must <em>always</em> happen — formatting, linting,
        security checks. Use CLAUDE.md for things that should <em>usually</em> happen. If
        you&apos;re writing &ldquo;always do X&rdquo; into CLAUDE.md, it probably belongs in a
        hook instead.
      </TipCallout>

      <h2>Event reference (selected)</h2>
      <ul>
        <li><code>SessionStart</code> — matcher: startup/resume/clear/compact; cannot block</li>
        <li><code>UserPromptSubmit</code>, <code>PreToolUse</code>, <code>PostToolUse</code> — can block via exit 2</li>
        <li><code>Stop</code> — can block</li>
        <li><code>SubagentStop</code>, <code>FileChanged</code> — cannot block</li>
        <li>Agent-Teams-specific: <code>TeammateIdle</code>, <code>TaskCreated</code>, <code>TaskCompleted</code> — can block</li>
      </ul>

      <h2>Environment variables available in every hook</h2>
      <p>
        <code>$CLAUDE_PROJECT_DIR</code>, <code>$CLAUDE_CODE_REMOTE</code> (&quot;true&quot; in
        web/headless contexts), and <code>$CLAUDE_ENV_FILE</code> — write <code>KEY=VALUE</code>{" "}
        lines here, but only in a <code>SessionStart</code> hook.
      </p>

      <h2>Matcher patterns</h2>
      <p>
        Matchers are regexes tested against the tool name (or session type for{" "}
        <code>SessionStart</code>): <code>&quot;Bash&quot;</code> exact match,{" "}
        <code>&quot;Edit|Write&quot;</code> either, <code>&quot;mcp__memory__.*&quot;</code> any
        tool from a specific MCP server, <code>&quot;.*&quot;</code> or an empty string to match
        everything.
      </p>

      <h2>Async hooks</h2>
      <p>
        Set <code>&quot;async&quot;: true</code> to fire a hook in the background. Async hooks
        can&apos;t block or modify the action — their exit code is ignored — so they&apos;re best
        suited to logging or telemetry that shouldn&apos;t slow the session down.
      </p>

      <h2>Debugging hooks</h2>
      <p>
        Check the script is executable (<code>chmod +x</code>), the shebang line is correct,{" "}
        <code>jq</code> is installed if the script uses it, and that whatever you write to stderr
        on exit 1 is actually what you want Claude to see.
      </p>

      <SeeAlso
        slug="best-practices"
        note="If a hook is failing, fix the check — reaching for --no-verify to bypass it is one of the team's listed anti-patterns."
      />
    </ContentPage>
  );
}
