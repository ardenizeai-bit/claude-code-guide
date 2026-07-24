import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { TipCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "CI/CD & Automation" };

export default async function CicdPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="cicd"
        locale={locale}
        translated
        dek="把 Claude Code 接入 GitHub Actions 和其他流水线，底层机制就是打印模式（-p）。"
      >
        <p>
          正是打印模式让 Claude Code 能够融入流水线：没有交互式提示，没有批准循环，
          只有一个输入和一个输出。这正是 GitHub Action、cron 任务或 Makefile 目标所期望的形状。
        </p>

        <h2>在 GitHub Actions 中实现自动化 PR 评审</h2>
        <CodeBlock
          language="yaml"
          code={`name: claude-code-review\non:\n  pull_request:\n    types: [opened, synchronize]\n\njobs:\n  review:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Run Claude Code review\n        env:\n          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}\n        run: |\n          npm install -g @anthropic-ai/claude-code\n          claude -p "Review this PR for bugs, security issues, \\\n            and style violations. Output as GitHub-flavored markdown." \\\n            > review.md\n      - name: Post review comment\n        uses: actions/github-script@v7\n        with:\n          script: |\n            const fs = require('fs');\n            const body = fs.readFileSync('review.md', 'utf8');\n            github.rest.issues.createComment({\n              issue_number: context.issue.number,\n              owner: context.repo.owner,\n              repo: context.repo.repo,\n              body\n            });`}
          locale={locale}
        />

        <h2>打印模式的单行命令示例</h2>
        <ul>
          <li>自动化代码评审：<code>claude -p &quot;Review this diff...: $(git diff HEAD~1)&quot;</code></li>
          <li>直接从失败的任务里管道传入日志进行分析</li>
          <li>测试生成结果直接写入文件</li>
          <li>从 <code>git log</code> 生成变更日志</li>
          <li>大规模重构：&ldquo;把代码库中所有 userId 改名为 accountId，并同步更新测试&rdquo;</li>
        </ul>

        <TipCallout locale={locale}>
          一条生产级流水线的形状通常是：触发 → GitHub Action → Hooks → 输出 → 良性循环。
          Hooks 这一步，正是把一次性评审变成能随时间推移不断改进代码库自身防护机制的关键——
          例如把发现的 bug 反过来写进 CLAUDE.md。
        </TipCallout>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="cicd"
      locale={locale}
      dek="Wiring Claude Code into GitHub Actions and other pipelines, using print mode (-p) as the underlying mechanism."
    >
      <p>
        Print mode is what makes Claude Code fit into a pipeline: no interactive prompt, no
        approval loop, just an input and an output. That's exactly the shape a GitHub Action, a
        cron job, or a Makefile target expects.
      </p>

      <h2>Automated PR review in GitHub Actions</h2>
      <CodeBlock
        language="yaml"
        code={`name: claude-code-review\non:\n  pull_request:\n    types: [opened, synchronize]\n\njobs:\n  review:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Run Claude Code review\n        env:\n          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}\n        run: |\n          npm install -g @anthropic-ai/claude-code\n          claude -p "Review this PR for bugs, security issues, \\\n            and style violations. Output as GitHub-flavored markdown." \\\n            > review.md\n      - name: Post review comment\n        uses: actions/github-script@v7\n        with:\n          script: |\n            const fs = require('fs');\n            const body = fs.readFileSync('review.md', 'utf8');\n            github.rest.issues.createComment({\n              issue_number: context.issue.number,\n              owner: context.repo.owner,\n              repo: context.repo.repo,\n              body\n            });`}
      />

      <h2>Print-mode one-liners</h2>
      <ul>
        <li>Automated code review: <code>claude -p &quot;Review this diff...: $(git diff HEAD~1)&quot;</code></li>
        <li>Log analysis piped straight from a failing job</li>
        <li>Test generation written directly to a file</li>
        <li>Changelog generation from <code>git log</code></li>
        <li>Mass refactors: &ldquo;Rename all instances of userId to accountId across the codebase and update tests&rdquo;</li>
      </ul>

      <TipCallout>
        The shape of a production pipeline is usually: Trigger → GitHub Action → Hooks → Output →
        Flywheel. The hooks step is what turns a one-off review into something that improves the
        codebase&apos;s own guardrails over time — e.g. writing a caught bug back into CLAUDE.md.
      </TipCallout>
    </ContentPage>
  );
}
