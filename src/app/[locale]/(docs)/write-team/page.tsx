import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { TipCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Writing Agent Teams" };

export default async function WriteTeamPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="write-team"
        locale={locale}
        translated
        dek="先规划，再把批准过的计划交给分配了具体文件的具名队友——跳过这一步，是团队模式浪费 token 最常见的原因。"
      >
        <p>
          Agent Teams 需要 Claude Code v2.1.32 及以上版本、Opus 4.6 模型，以及一个功能开关：
        </p>
        <CodeBlock
          language="json"
          code={`// ~/.claude/settings.json\n{\n  "env": {\n    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"\n  }\n}`}
          locale={locale}
        />

        <TipCallout locale={locale}>
          黄金法则：先规划。从一段含糊的提示词直接启动团队，会导致队友们重复劳动、编辑
          同一个文件，并在相互冲突的努力上浪费 token。先运行 <code>/plan</code> 设计好
          这项工作，审阅并批准之后，再把这份获批的计划交给一个团队，配上具名角色、
          分配好的文件，以及通信触发条件。
        </TipCallout>

        <h2>编写一段团队提示词</h2>
        <p>不需要 YAML——用纯自然语言即可，但要围绕以下五点来组织结构：</p>
        <ol>
          <li>给每位队友起名并指定角色，这样他们才能互相引用</li>
          <li>为每位队友分配具体的文件——文件锁定是强制执行的，所以要按领域来设计分工</li>
          <li>定义通信触发条件（&ldquo;一旦定义好 API 类型就分享给大家&rdquo;、&ldquo;如果发现的结论有冲突就展开讨论&rdquo;）</li>
          <li>设定共享约束（&ldquo;遵循 CLAUDE.md&rdquo;、&ldquo;完成前先跑 lint&rdquo;、&ldquo;如果改动了共享类型就通知所有队友&rdquo;）</li>
          <li>明确定义输出物——是一个 PR？一份汇总评审？还是一份根因分析报告？</li>
        </ol>

        <h2>Teams 与 Subagents——各自的使用时机</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>该用 Teams 的情形</th><th>该用 Subagents 的情形</th></tr>
            </thead>
            <tbody>
              <tr><td>一个工作者发现了另一个工作者<em>现在就</em>需要的信息</td><td>各个工作者完全独立</td></tr>
              <tr><td>前端／后端必须协商出一份 API 契约</td><td>任务是顺序执行的（B 依赖 A）</td></tr>
              <tr><td>多位评审者需要互相challenge对方的结论</td><td>需要对同一文件进行编辑</td></tr>
              <tr><td>bug 调查中存在多个相互竞争的假设</td><td>对成本敏感（subagent 约 3 倍成本，team 约 5–7 倍）</td></tr>
            </tbody>
          </table>
        </div>

        <h2>该做 / 不该做</h2>
        <ul>
          <li><strong>该做的：</strong>启动前始终先 <code>/plan</code>；给每位队友分配独立的文件；定义通信触发条件；设定共享约束；团队规模保持在 2–4 人；用于跨层的工作。</li>
          <li><strong>不该做的：</strong>用一句含糊的话就启动团队；把同一个文件分配给两位队友；超过 5 名队友；把 team 用在顺序执行的任务上；跳过定义输出格式；为了&ldquo;节省时间&rdquo;跳过规划这一步。</li>
        </ul>

        <h2>三个完整的团队提示词示例</h2>
        <ul>
          <li>
            <strong>全栈功能开发</strong> — 后端、前端和测试队友通过共享的 API 类型
            协调开发一个支付接口
          </li>
          <li>
            <strong>并行代码评审</strong> — 安全、性能和正确性评审者各自使用只读工具，
            在讨论并解决分歧之后汇总成一份评审意见
          </li>
          <li>
            <strong>科学式调试</strong> — 四位队友分别验证一个间歇性 500 错误的不同假设，
            主动尝试推翻彼此的理论，最后由 lead 综合出一份根因分析报告
          </li>
        </ul>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="write-team"
      locale={locale}
      dek="Plan first, then hand the approved plan to named teammates with assigned files — skipping this step is the most common way teams waste tokens."
    >
      <p>
        Agent Teams requires Claude Code v2.1.32+, the Opus 4.6 model, and a feature flag:
      </p>
      <CodeBlock
        language="json"
        code={`// ~/.claude/settings.json\n{\n  "env": {\n    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"\n  }\n}`}
      />

      <TipCallout>
        Golden rule: plan first. Spawning a team from a vague prompt causes teammates to duplicate
        work, edit the same files, and burn tokens on conflicting effort. Run <code>/plan</code>{" "}
        to design the work, review and approve it, then hand the approved plan to a team with
        named roles, assigned files, and communication triggers.
      </TipCallout>

      <h2>Writing a team prompt</h2>
      <p>No YAML needed — plain natural language, but structured around five things:</p>
      <ol>
        <li>Name each teammate and their role, so they can reference each other</li>
        <li>Assign specific files to each teammate — file locking is enforced, so design for domain separation</li>
        <li>Define communication triggers (&ldquo;share API types once defined,&rdquo; &ldquo;if findings conflict, debate&rdquo;)</li>
        <li>Set shared constraints (&ldquo;follow CLAUDE.md,&rdquo; &ldquo;run lint before done,&rdquo; &ldquo;message all teammates if you change a shared type&rdquo;)</li>
        <li>Define the output explicitly — a PR? A consolidated review? A root-cause report?</li>
      </ol>

      <h2>Teams vs. Subagents — when to use each</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Use Teams when</th><th>Use Subagents when</th></tr>
          </thead>
          <tbody>
            <tr><td>A worker discovers something another needs <em>now</em></td><td>Workers are fully independent</td></tr>
            <tr><td>Frontend/backend must negotiate an API contract</td><td>Tasks are sequential (B depends on A)</td></tr>
            <tr><td>Multiple reviewers should challenge each other</td><td>Same-file edits are needed</td></tr>
            <tr><td>Bug investigation has competing hypotheses</td><td>Cost-sensitive (subagents ≈3x vs. teams ≈5–7x)</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Do / Don&apos;t</h2>
      <ul>
        <li><strong>Do</strong> — always <code>/plan</code> before spawning; assign separate files per teammate; define messaging triggers; set shared constraints; keep teams to 2–4; use for cross-layer work.</li>
        <li><strong>Don&apos;t</strong> — spawn from a vague one-liner; assign the same file to two teammates; exceed 5 teammates; use teams for sequential work; skip defining the output format; skip the plan step to &ldquo;save time.&rdquo;</li>
      </ul>

      <h2>Three complete example team prompts</h2>
      <ul>
        <li>
          <strong>Full-Stack Feature</strong> — backend, frontend, and test teammates coordinating
          a payments endpoint via shared API types
        </li>
        <li>
          <strong>Parallel Code Review</strong> — security, performance, and correctness reviewers
          on read-only tools, consolidating into one review after debating conflicts
        </li>
        <li>
          <strong>Scientific Debugging</strong> — four teammates each testing a different
          hypothesis for an intermittent 500 error, actively trying to disprove each other&apos;s
          theories before the lead synthesizes a root-cause report
        </li>
      </ul>
    </ContentPage>
  );
}
