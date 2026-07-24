import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { TipCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "CLAUDE.md" };

export default async function ClaudeMdPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="claude-md"
        locale={locale}
        translated
        dek="唯一一个让 Claude 对你的项目拥有持久记忆的文件，每次会话开始时都会重新加载。"
      >
        <p>
          可以把 CLAUDE.md 想象成一本员工手册，而不是配置文件。它是以普通消息的形式注入的，
          而不是强制性的系统状态，所以 Claude 会把它当作强有力的指导，而不是不可打破的规则——
          这也意味着含糊或者堆砌的指令会被悄悄降低优先级。
        </p>

        <h2>三层作用范围</h2>
        <ul>
          <li><code>~/.claude/CLAUDE.md</code> — 全局，适用于你接触的每一个项目</li>
          <li><code>.claude/CLAUDE.md</code> — 项目级，提交到 git 中并与团队共享</li>
          <li>类似 <code>src/auth/CLAUDE.md</code> 这样的文件 — 仅在该子目录内生效</li>
        </ul>

        <h2>三段式公式</h2>
        <p>
          杠杆最高的那一部分，往往正是大家最容易跳过的：把过去的错误记录下来。能避免一次
          真实 bug 的规则，远比泛泛而谈的最佳实践建议管用得多。
        </p>
        <ol>
          <li><strong>过去的错误</strong> — Claude 实际犯过的错误，写下来是为了让它不再重复</li>
          <li><strong>约定</strong> — 命名、结构、模式、工具选择</li>
          <li><strong>规则</strong> — 硬性约束，例如&ldquo;提交前必须先跑测试&rdquo;</li>
        </ol>

        <CodeBlock
          language="markdown"
          code={`# CLAUDE.md\n\n## Past Errors\n- Do NOT use \`any\` in TypeScript — always define proper types.\n- Never run \`rm -rf\` without confirming the path first.\n\n## Conventions\n- Use kebab-case for file names, PascalCase for components.\n- All API responses use { data, error } envelope pattern.\n- Tests live next to source: Button.tsx → Button.test.tsx.\n\n## Rules\n- Always run \`npm test\` before committing.\n- Maximum function length: 40 lines.\n- No console.log in production code — use the logger.`}
          locale={locale}
        />

        <TipCallout locale={locale}>
          在这件事上，少即是多。有个团队把一份一万行的 CLAUDE.md 精简到大约 1,500 行、
          更聚焦的内容，指令遵循度明显提升——简洁、具体的规则，几乎总是胜过面面俱到的文档。
        </TipCallout>

        <h2>CLAUDE.md 与 settings.json 对比</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th></th><th>CLAUDE.md</th><th>settings.json</th></tr>
            </thead>
            <tbody>
              <tr><td>用途</td><td>Agent 行为与记忆</td><td>工具权限与 hooks</td></tr>
              <tr><td>格式</td><td>Markdown（自由格式）</td><td>JSON（结构化）</td></tr>
              <tr><td>作用范围</td><td>全局 / 项目 / 本地</td><td>用户 / 项目</td></tr>
              <tr><td>版本控制</td><td>是，会提交</td><td>用户级仅存在本地</td></tr>
              <tr><td>加载时机</td><td>每次会话开始时</td><td>CLI 启动时</td></tr>
            </tbody>
          </table>
        </div>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="claude-md"
      locale={locale}
      dek="The one file that gives Claude persistent memory of your project, loaded fresh at the start of every session."
    >
      <p>
        Think of CLAUDE.md as an employee handbook rather than a config file. It&apos;s injected as
        a regular message, not forced system state, so Claude weighs it as strong guidance rather
        than an unbreakable rule — which also means vague or padded instructions get silently
        deprioritized.
      </p>

      <h2>Three-tier scope</h2>
      <ul>
        <li><code>~/.claude/CLAUDE.md</code> — global, applies to every project you touch</li>
        <li><code>.claude/CLAUDE.md</code> — project-level, checked into git and shared with your team</li>
        <li><code>src/auth/CLAUDE.md</code>-style files — scoped to just that subdirectory</li>
      </ul>

      <h2>The three-part formula</h2>
      <p>
        The highest-leverage section is usually the one people skip: documented past mistakes.
        Rules that would&apos;ve prevented a real bug beat generic best-practice advice by a wide
        margin.
      </p>
      <ol>
        <li><strong>Past Errors</strong> — mistakes Claude has actually made, written down so it stops repeating them</li>
        <li><strong>Conventions</strong> — naming, structure, patterns, tooling choices</li>
        <li><strong>Rules</strong> — hard constraints, e.g. &ldquo;tests before commits&rdquo;</li>
      </ol>

      <CodeBlock
        language="markdown"
        code={`# CLAUDE.md\n\n## Past Errors\n- Do NOT use \`any\` in TypeScript — always define proper types.\n- Never run \`rm -rf\` without confirming the path first.\n\n## Conventions\n- Use kebab-case for file names, PascalCase for components.\n- All API responses use { data, error } envelope pattern.\n- Tests live next to source: Button.tsx → Button.test.tsx.\n\n## Rules\n- Always run \`npm test\` before committing.\n- Maximum function length: 40 lines.\n- No console.log in production code — use the logger.`}
      />

      <TipCallout>
        Less is more here. One team trimmed a 10,000-line CLAUDE.md down to roughly 1,500 focused
        lines and saw instruction-following noticeably improve — concise, specific rules beat
        exhaustive documentation almost every time.
      </TipCallout>

      <h2>CLAUDE.md vs. settings.json</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th></th><th>CLAUDE.md</th><th>settings.json</th></tr>
          </thead>
          <tbody>
            <tr><td>Purpose</td><td>Agent behavior and memory</td><td>Tool permissions and hooks</td></tr>
            <tr><td>Format</td><td>Markdown (free-form)</td><td>JSON (structured)</td></tr>
            <tr><td>Scope</td><td>Global / Project / Local</td><td>User / Project</td></tr>
            <tr><td>Version control</td><td>Yes, checked in</td><td>User-level is local only</td></tr>
            <tr><td>When loaded</td><td>Start of every session</td><td>At CLI startup</td></tr>
          </tbody>
        </table>
      </div>
    </ContentPage>
  );
}
