import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { TipCallout, WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Best Practices" };

export default async function BestPracticesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="best-practices"
        locale={locale}
        translated
        dek="保持上下文干净是杠杆率最高的一个习惯：响应更快、成本更低、幻觉更少。"
      >
        <h2>心智模型</h2>
        <p>
          上下文是一种预算，不是无限的资源。每一个加载进来的无关文件、每一段粘贴的日志、
          每一次在同一个会话里从修 bug 跳到做功能的转向，都会消耗这份预算。更小、更聚焦的
          上下文，能让 Claude 的表现明显更好。
        </p>
        <p>
          可以把 Claude 想象成一位聪明的资深工程师，只是他的短期记忆非常&ldquo;昂贵&rdquo;。
          你的任务是喂给他干净的上下文——而不是把所有东西都扔给他，指望他自己分辨出哪些重要。
        </p>

        <h2>速查表</h2>
        <CodeBlock
          language="text"
          code={`/clear            → fresh conversation\n/compact          → summarize history, continue\n/context          → where am I on context?\n/plan             → planning mode before edits\n/model sonnet     → switch model\n/effort low       → cheaper for trivial work\n/cost             → spending check\n/diff             → inspect changes before commit\n/review           → quality review\n/security-review  → for sensitive paths\n/agents           → manage subagents\n@filename         → pull a specific file into context`}
        />

        <h2>最重要的五个习惯</h2>
        <ol>
          <li>
            <strong>一个会话，只聚焦一件事。</strong>修 bug？开新对话。做新功能？开新对话。
            讨论架构？开新对话。在处理不相关的任务之间使用 <code>/clear</code>——把它们混在
            一起是产生幻觉的头号原因。
          </li>
          <li>
            <strong>先规划，再写代码。</strong>任何非平凡的改动之前都先用 <code>/plan</code>。
            让 Claude 先提出方案，你提出异议、一起打磨——<em>然后</em>再执行。跳过这一步，
            就容易得到方向错误的重写。
          </li>
          <li>
            <strong>用 <code>@file</code>，而不是&ldquo;到处看看&rdquo;。</strong>用{" "}
            <code>@auth.ts @login-api.ts</code> 这样的方式精确引用具体文件。不要说&ldquo;review
            一下整个项目&rdquo;。注意力会随着范围扩大而下降——文件越多，幻觉也越多。
          </li>
          <li>
            <strong>粘贴日志前先过滤。</strong>永远不要甩出一万五千行原始日志。用{" "}
            <code>grep ERROR app.log | tail -50</code> 先过滤一遍，或者直接粘贴堆栈追踪加相关的
            请求／响应即可。日志是 token 黑洞。
          </li>
          <li>
            <strong>使用 bug 模板。</strong>更少的猜测意味着更少的幻觉——花 20 秒填一下这个模板
            是值得的。
          </li>
        </ol>

        <CodeBlock
          language="text"
          code={`Expected:\nActual:\nRecent changes:\nError / stack trace:\nRelevant files: @x.ts @y.ts`}
        />

        <h2>用好这些基础组件——不要重新发明</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>当你在……</th><th>该用哪个</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>跨多个文件搜索</td>
                <td>一个 <strong>subagent</strong>——冗长的输出留在它自己的上下文里，主会话保持干净</td>
              </tr>
              <tr><td>运行测试／分析大量日志</td><td>一个 <strong>subagent</strong></td></tr>
              <tr><td>重复同一套工作流</td><td>放在 <code>.claude/skills/</code> 下的一个 <strong>skill</strong></td></tr>
              <tr><td>做一次敏感内容的审查</td><td><code>/security-review</code></td></tr>
              <tr><td>在编辑后自动跑 lint／测试</td><td>一个 <strong>hook</strong></td></tr>
              <tr>
                <td>记录项目约定、技术栈、规则</td>
                <td><code>CLAUDE.md</code>——控制在 200 行以内；细节通过 <code>@filename</code> 引入</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>当 Claude 开始变得&ldquo;笨&rdquo;的时候</h2>
        <p>
          迹象包括：和之前做过的决定自相矛盾、引用了不相关的文件、重复犯已经修复过的错误，
          或者提出的方案违背了你明确说过的约束条件。
        </p>
        <p>
          主动运行 <code>/compact</code>——而不是等它已经明显变差之后才用。如果这样还不够，
          就 <code>/clear</code> 然后用一段简短的说明重新开始。定期查看 <code>/context</code>{" "}
          了解当前的上下文占用情况。
        </p>

        <h2>模型与成本</h2>
        <ul>
          <li><strong>日常工作默认用 Sonnet</strong>——它足够胜任。</li>
          <li><code>/model opus</code> 只留给复杂的异步 bug、架构设计、跨服务调试和大型重构。</li>
          <li>琐碎的事情（改名、格式化、脚手架搭建）用 <code>/effort low</code>。</li>
          <li>定期运行 <code>/cost</code>，让自己对花费心里有数。</li>
        </ul>

        <TipCallout locale={locale}>
          这些习惯是会叠加的。一个干净的会话，加上精准范围的 <code>@file</code> 引用，
          再加上填好的 bug 模板，一次就拿到正确答案的概率，远高于只做其中任何一件事。
        </TipCallout>

        <h2>反模式——千万别这么做</h2>
        <WarningCallout locale={locale}>
          <ul className="flex flex-col gap-1.5">
            <li>直接粘贴上万行的原始日志</li>
            <li>&ldquo;把这个修一下，它坏了&rdquo;——应该给出期望行为和实际行为</li>
            <li>上下文用到超过 80% 还硬撑——先运行 <code>/compact</code></li>
            <li>在同一个会话里混合调试和功能开发</li>
            <li>&ldquo;review 一下整个仓库&rdquo;——用 <code>@file</code> 提及来限定范围</li>
            <li>用 <code>--no-verify</code> 关闭 hooks 来绕过失败的检查——应该去修那个检查本身</li>
            <li>还没用默认配置跑上一周，就先去搭建一套复杂的自定义配置</li>
          </ul>
        </WarningCallout>

      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="best-practices"
      locale={locale}
      dek="Keeping context clean is the single highest-leverage habit: faster responses, lower cost, less hallucination."
    >
      <h2>The mental model</h2>
      <p>
        Context is a budget, not an infinite resource. Every irrelevant file loaded, every log
        dump pasted, every bug-then-feature pivot in the same session eats into that budget.
        Smaller, more focused context produces a noticeably better Claude.
      </p>
      <p>
        Think of Claude like a sharp senior engineer with expensive short-term memory. Your job is
        to feed it clean context — not to hand it everything and hope it figures out what matters.
      </p>

      <h2>Quick reference</h2>
      <CodeBlock
        language="text"
        code={`/clear            → fresh conversation\n/compact          → summarize history, continue\n/context          → where am I on context?\n/plan             → planning mode before edits\n/model sonnet     → switch model\n/effort low       → cheaper for trivial work\n/cost             → spending check\n/diff             → inspect changes before commit\n/review           → quality review\n/security-review  → for sensitive paths\n/agents           → manage subagents\n@filename         → pull a specific file into context`}
      />

      <h2>Five habits that matter most</h2>
      <ol>
        <li>
          <strong>One session, one concern.</strong> Bug fix? New chat. Feature work? New chat.
          Architecture discussion? New chat. Use <code>/clear</code> between unrelated tasks —
          mixing them is the number one cause of hallucination.
        </li>
        <li>
          <strong>Plan before code.</strong> Use <code>/plan</code> before any non-trivial change.
          Let Claude propose the approach, push back, refine — <em>then</em> execute. Skipping
          this is how you get wrong-direction rewrites.
        </li>
        <li>
          <strong><code>@file</code> instead of &ldquo;look around.&rdquo;</strong> Reference exact
          files with <code>@auth.ts @login-api.ts</code>. Don&apos;t say &ldquo;review the
          project.&rdquo; Attention degrades with scope — more files means more hallucination.
        </li>
        <li>
          <strong>Filter logs before pasting.</strong> Never dump 15k lines. Pre-filter with{" "}
          <code>grep ERROR app.log | tail -50</code>, or just paste the stack trace plus the
          relevant request/response. Logs are token black holes.
        </li>
        <li>
          <strong>Use the bug template.</strong> Less guessing means less hallucination — worth
          the 20 seconds it takes to fill in.
        </li>
      </ol>

      <CodeBlock
        language="text"
        code={`Expected:\nActual:\nRecent changes:\nError / stack trace:\nRelevant files: @x.ts @y.ts`}
      />

      <h2>Use the primitives — don&apos;t reinvent them</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>When you&apos;re...</th><th>Reach for</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Searching across many files</td>
              <td>A <strong>subagent</strong> — verbose output stays in its context, main stays clean</td>
            </tr>
            <tr><td>Running tests / analyzing big logs</td><td>A <strong>subagent</strong></td></tr>
            <tr><td>Repeating the same workflow</td><td>A <strong>skill</strong> at <code>.claude/skills/</code></td></tr>
            <tr><td>Doing a sensitive review</td><td><code>/security-review</code></td></tr>
            <tr><td>Auto-running lints/tests post-edit</td><td>A <strong>hook</strong></td></tr>
            <tr>
              <td>Documenting project conventions, stack, rules</td>
              <td><code>CLAUDE.md</code> — keep under 200 lines; import detail via <code>@filename</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>When Claude starts getting &ldquo;stupid&rdquo;</h2>
      <p>
        Signs: it contradicts decisions made earlier, references unrelated files, repeats mistakes
        it already fixed, or proposes solutions against your stated constraints.
      </p>
      <p>
        Run <code>/compact</code>{" "}proactively — not after it&apos;s already degraded. If that
        doesn&apos;t help, <code>/clear</code> and start fresh with a short brief. Check{" "}
        <code>/context</code> periodically to see where you stand.
      </p>

      <h2>Model &amp; cost</h2>
      <ul>
        <li><strong>Default to Sonnet</strong> for everything routine — it&apos;s enough.</li>
        <li><code>/model opus</code> only for complex async bugs, architecture, multi-service debugging, and big refactors.</li>
        <li><code>/effort low</code> for trivial stuff — renames, formatting, scaffolding.</li>
        <li>Run <code>/cost</code> regularly to keep yourself honest.</li>
      </ul>

      <TipCallout>
        These habits compound. A clean session plus a scoped <code>@file</code> reference plus a
        filled-in bug template gets you a correct answer on the first try far more often than any
        single one of these alone.
      </TipCallout>

      <h2>Anti-patterns — just don&apos;t</h2>
      <WarningCallout>
        <ul className="flex flex-col gap-1.5">
          <li>Pasting raw 10k-line logs</li>
          <li>&ldquo;Fix this, it&apos;s broken&rdquo; — give expected vs. actual instead</li>
          <li>Continuing past 80% context — run <code>/compact</code> first</li>
          <li>Mixing debug and feature work in one session</li>
          <li>&ldquo;Review the whole repo&rdquo; — scope it with <code>@file</code> mentions</li>
          <li>Disabling hooks with <code>--no-verify</code> to bypass a failing check — fix the check instead</li>
          <li>Building elaborate config before using the defaults for a week</li>
        </ul>
      </WarningCallout>
    </ContentPage>
  );
}
