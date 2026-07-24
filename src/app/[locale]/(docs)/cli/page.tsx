import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "CLI & Flags" };

export default async function CliPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="cli"
        locale={locale}
        translated
        dek="你最常用到的那些参数：启动会话、非交互式运行，以及选择模型。"
      >
        <h2>安装与认证</h2>
        <CodeBlock
          language="bash"
          code={`curl -fsSL https://claude.ai/install.sh | sh   # install via shell script\nnpm i -g @anthropic-ai/claude-code             # install via npm\nclaude auth login                              # authenticate with Anthropic\nclaude --version                               # print installed version\nclaude update                                  # update to latest release`}
          locale={locale}
        />

        <h2>启动会话</h2>
        <CodeBlock
          language="bash"
          code={`claude                # open interactive REPL\nclaude "prompt"       # start with an initial prompt\nclaude -c             # continue the most recent conversation\nclaude -r ID          # resume a specific conversation by ID\nclaude -n             # start a new session (skip resume prompt)`}
          locale={locale}
        />

        <h2>非交互式／SDK 模式</h2>
        <p>
          打印模式会把单条提示词运行到完成后就退出——这正是脚本、CI 任务，以及任何需要把
          Claude Code 接入更大流水线的场景所需要的模式。
        </p>
        <CodeBlock
          language="bash"
          code={`claude -p "prompt"                 # print mode — run one prompt and exit\ncat file | claude -p "summarize"   # pipe stdin as context\nclaude -p --output-format json     # return structured JSON output\nclaude -c -p "follow up"           # continue previous session in print mode`}
          locale={locale}
        />

        <h2>模型与权限</h2>
        <CodeBlock
          language="bash"
          code={`claude --model sonnet\nclaude --model opus\nclaude --permission-mode auto   # auto-approve safe tool calls\nclaude --permission-mode plan   # require approval for writes`}
          locale={locale}
        />

        <h2>Worktree 与多智能体</h2>
        <CodeBlock
          language="bash"
          code={`claude -w                  # create and work inside a git worktree\nclaude -w --tmux           # run worktree session in tmux\nclaude --add-dir ../other  # add extra directories to context\nclaude --from-pr 123       # start session from a PR number`}
          locale={locale}
        />

        <h2>调试与配置</h2>
        <CodeBlock
          language="bash"
          code={`claude --debug        # verbose debug logging\nclaude doctor         # check environment/config health\nclaude mcp list       # list connected MCP servers\nclaude config list    # show all configuration values`}
          locale={locale}
        />
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="cli"
      locale={locale}
      dek="The flags you'll reach for most: starting sessions, running non-interactively, and picking a model."
    >
      <h2>Install &amp; authenticate</h2>
      <CodeBlock
        language="bash"
        code={`curl -fsSL https://claude.ai/install.sh | sh   # install via shell script\nnpm i -g @anthropic-ai/claude-code             # install via npm\nclaude auth login                              # authenticate with Anthropic\nclaude --version                               # print installed version\nclaude update                                  # update to latest release`}
      />

      <h2>Starting a session</h2>
      <CodeBlock
        language="bash"
        code={`claude                # open interactive REPL\nclaude "prompt"       # start with an initial prompt\nclaude -c             # continue the most recent conversation\nclaude -r ID          # resume a specific conversation by ID\nclaude -n             # start a new session (skip resume prompt)`}
      />

      <h2>Non-interactive / SDK mode</h2>
      <p>
        Print mode runs a single prompt to completion and exits — this is the mode you want for
        scripts, CI jobs, and anywhere you&apos;re piping Claude Code into a larger pipeline.
      </p>
      <CodeBlock
        language="bash"
        code={`claude -p "prompt"                 # print mode — run one prompt and exit\ncat file | claude -p "summarize"   # pipe stdin as context\nclaude -p --output-format json     # return structured JSON output\nclaude -c -p "follow up"           # continue previous session in print mode`}
      />

      <h2>Models &amp; permissions</h2>
      <CodeBlock
        language="bash"
        code={`claude --model sonnet\nclaude --model opus\nclaude --permission-mode auto   # auto-approve safe tool calls\nclaude --permission-mode plan   # require approval for writes`}
      />

      <h2>Worktrees &amp; multi-agent</h2>
      <CodeBlock
        language="bash"
        code={`claude -w                  # create and work inside a git worktree\nclaude -w --tmux           # run worktree session in tmux\nclaude --add-dir ../other  # add extra directories to context\nclaude --from-pr 123       # start session from a PR number`}
      />

      <h2>Debug &amp; config</h2>
      <CodeBlock
        language="bash"
        code={`claude --debug        # verbose debug logging\nclaude doctor         # check environment/config health\nclaude mcp list       # list connected MCP servers\nclaude config list    # show all configuration values`}
      />
    </ContentPage>
  );
}
