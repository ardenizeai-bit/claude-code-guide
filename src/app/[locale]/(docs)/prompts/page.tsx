import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { TipCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Prompt Tips" };

const WEAK_VS_STRONG_CODE = `# Weak prompt\nFix the bug.\n\n# Strong prompt\nFix the failing test in auth.test.ts — the JWT mock\nreturns undefined instead of a valid token. Check\nthe mock setup in test/fixtures/jwt.ts.`;

export default async function PromptsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="prompts"
        locale={locale}
        translated
        dek="你描述任务的方式，比几乎任何其他因素都更能左右最终结果。"
      >
        <h2>核心模式</h2>
        <ol>
          <li>
            <strong>具体，而不是含糊。</strong>&ldquo;修复 auth.test.ts 中失败的测试——JWT 的 mock
            返回了 undefined 而不是有效的 token&rdquo;比&ldquo;把测试修好&rdquo;效果更好。
          </li>
          <li>
            <strong>把上下文和任务一起给出。</strong>点明具体的接口、所用的库和已有的约定——
            &ldquo;给 <code>/api/products</code> 加一层 Redis 缓存；我们用 ioredis，缓存键遵循{" "}
            <code>product:{"{id}"}</code> 的格式。&rdquo;
          </li>
          <li>
            <strong>让 Claude 来规划，别事无巨细地指挥。</strong>描述你想要的结果
            （&ldquo;把项目里所有的 <code>foo</code> 改名为 <code>bar</code>，同步更新测试和
            import&rdquo;），而不是逐个文件、逐行指定怎么改。
          </li>
          <li>
            <strong>风险较高的改动，先用计划模式。</strong>大重构之前按 <code>Shift+Tab</code>{" "}
            进入计划模式，让 Claude 先展示方案再动手。
          </li>
          <li>
            <strong>快速记忆。</strong>在一行前面加 <code>#</code>——例如{" "}
            <code># We use pnpm, not npm. Lock file is pnpm-lock.yaml.</code>——就能把这条笔记
            快速存入会话记忆，不必写成正式的提示词。
          </li>
          <li>
            <strong>Opus → Sonnet 工作流。</strong>规划阶段用 <code>/model opus</code>，
            执行阶段切到 <code>/model sonnet</code>，而不是从头到尾用同一个模型完成整个功能。
          </li>
          <li>
            <strong>把数据用管道传进去，方便自动化。</strong>
            <code>npm test 2&gt;&amp;1 | claude -p &quot;fix the failing tests&quot;</code>，
            而不是手动复制粘贴日志。
          </li>
          <li>
            <strong>别动不动就用 <code>/clear</code> 清空全部上下文。</strong>用{" "}
            <code>/compact</code> 压缩总结，既能释放 token，又能保留已经学到的内容。
          </li>
        </ol>

        <TipCallout locale={locale}>
          如果只记住一条：具体。这页上几乎所有其他技巧，本质上都是在教你如何给 Claude
          足够的上下文，让它自己做对判断，而不需要你逐步操心每一个细节。
        </TipCallout>

        <h2>团队与 QA 提示模式</h2>
        <ul>
          <li>
            <strong>QA 测试用例生成</strong>——给出明确的需求，并要求覆盖边界值
            （例如价格 0、0.01、9999.99；数量 0、1、100），以带优先级的表格形式呈现。
          </li>
          <li>
            <strong>QA 不稳定测试排查</strong>——把失败的 Playwright 测试、CI 报错，
            以及相关背景（例如 React 的懒加载）一起贴出来，让 Claude 找出竞态条件。
          </li>
          <li>
            <strong>QA 接口校验</strong>——要求覆盖缺失字段、类型错误、边界值、SQL
            注入和超大负载等负面测试场景。
          </li>
          <li>
            <strong>团队 PR 评审</strong>——要求做一次结构化评审，覆盖安全性、缺失的错误处理、
            破坏性接口变更和测试覆盖缺口，并以严重程度分级表的形式呈现。
          </li>
          <li>
            <strong>团队共享上下文</strong>——让 Claude 先读 <code>CLAUDE.md</code>，
            再按代码库中已有的模式实现新功能。
          </li>
        </ul>

        <CodeBlock language="text" code={WEAK_VS_STRONG_CODE} locale={locale} />

        <h2>面向当前功能集的提示技巧</h2>
        <p>
          一些较新的能力（详见《新版本速览》）不仅改变了提示词该怎么写，也改变了该在提示词里放什么。
        </p>
        <ul>
          <li>
            <strong>规划密集型任务，显式设置 effort。</strong>目前可用的推理强度等级有{" "}
            <code>low</code>/<code>medium</code>/<code>high</code>/<code>xhigh</code>/
            <code>max</code>，像&ldquo;以 high 强度规划这次迁移，然后按默认强度实现&rdquo;
            这样的提示，能在不为每次日常编辑都支付 max 强度成本的前提下，获得更深思熟虑的架构设计。
          </li>
          <li>
            <strong>让后台子智能体和你并行工作。</strong>由于子智能体现在默认在后台运行，
            值得在一开始就明确要求并行任务——&ldquo;你探索认证模块的同时，
            也用一个后台子智能体检查现有的测试覆盖率&rdquo;——而不是一条很长的单线程会话。
          </li>
          <li>
            <strong>用 Dynamic Workflows 来命名多智能体编排。</strong>不必手动列出每一个队友，
            提示词可以直接引用 <code>/workflows</code> 并描述你想要的编排结果——
            适用于确实需要多个智能体协同工作的任务，而不是一条冗长的单线程会话。
          </li>
          <li>
            <strong>直接要求 /dataviz 的输出。</strong>对于图表或仪表盘类的需求，
            直接点名这个技能（&ldquo;用 /dataviz 把这份 CSV 按月画成图&rdquo;），
            能省去让 Claude 猜测你到底想要图表还是表格的一轮沟通。
          </li>
          <li>
            <strong>大多数工作默认用 Sonnet 5。</strong>Sonnet 5 现在已是默认模型，
            具备接近 Opus 的智能体级质量，把显式切换到 <code>/model opus</code>{" "}
            留给真正需要的场景——深度架构决策、安全审计，或确实模糊不清的需求——
            而不是出于习惯就用 Opus。
          </li>
        </ul>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="prompts"
      locale={locale}
      dek="How you phrase a task changes the result more than almost anything else you can do."
    >
      <h2>Core patterns</h2>
      <ol>
        <li>
          <strong>Be specific, not vague.</strong> &ldquo;Fix the failing test in
          auth.test.ts — the JWT mock returns undefined instead of a valid token&rdquo; beats
          &ldquo;fix the tests.&rdquo;
        </li>
        <li>
          <strong>Give context with the task.</strong> Name the exact endpoint, library, and
          existing conventions — &ldquo;Add a Redis cache to <code>/api/products</code>; we use
          ioredis and cache keys follow <code>product:{"{id}"}</code>.&rdquo;
        </li>
        <li>
          <strong>Let Claude plan; don&apos;t micromanage.</strong> Describe the outcome
          (&ldquo;Rename <code>foo</code> to <code>bar</code> across the project, update tests and
          imports&rdquo;) rather than dictating each file and line edit.
        </li>
        <li>
          <strong>Use plan mode for risky changes.</strong> <code>Shift+Tab</code> into plan mode
          before large refactors, and ask Claude to show the plan before making changes.
        </li>
        <li>
          <strong>Quick memory add.</strong> Prefix a line with <code>#</code> — e.g.{" "}
          <code># We use pnpm, not npm. Lock file is pnpm-lock.yaml.</code> — to add a fast note to
          session memory instead of typing it as a normal prompt.
        </li>
        <li>
          <strong>Opus → Sonnet workflow.</strong> <code>/model opus</code> for planning, then{" "}
          <code>/model sonnet</code> for execution, rather than coding the whole feature on one
          model.
        </li>
        <li>
          <strong>Pipe data for automation.</strong>{" "}
          <code>npm test 2&gt;&amp;1 | claude -p &quot;fix the failing tests&quot;</code> instead of
          manually pasting logs.
        </li>
        <li>
          <strong>Don&apos;t just <code>/clear</code> a full context.</strong> Use{" "}
          <code>/compact</code> to summarize and free tokens while keeping learned context intact.
        </li>
      </ol>

      <TipCallout>
        If you only take one of these: be specific. Nearly every other pattern on this page is a
        variation on giving Claude enough context to make the right call without you having to
        micromanage each step.
      </TipCallout>

      <h2>Team &amp; QA prompt patterns</h2>
      <ul>
        <li>
          <strong>QA test-case generation</strong> — give explicit requirements and ask for
          boundary values (e.g. price 0, 0.01, 9999.99; quantity 0, 1, 100) formatted as a
          prioritized table.
        </li>
        <li>
          <strong>QA flaky-test debugging</strong> — paste the failing Playwright test, the CI
          error, and relevant context (e.g. React lazy loading) and ask Claude to find the race
          condition.
        </li>
        <li>
          <strong>QA API validation</strong> — ask for negative tests covering missing fields,
          invalid types, boundary values, SQL injection, and oversized payloads.
        </li>
        <li>
          <strong>Team PR review</strong> — ask for a structured review covering security, missing
          error handling, breaking API changes, and test-coverage gaps, formatted as a severity
          table.
        </li>
        <li>
          <strong>Team shared context</strong> — instruct Claude to read <code>CLAUDE.md</code>{" "}
          first, then implement a feature following the patterns already used elsewhere in the
          codebase.
        </li>
      </ul>

      <CodeBlock language="text" code={WEAK_VS_STRONG_CODE} />

      <h2>Prompting for the current feature set</h2>
      <p>
        A few of the newer capabilities (see <em>What&apos;s New</em>) change what&apos;s worth
        putting in a prompt, not just how you phrase it.
      </p>
      <ul>
        <li>
          <strong>Set effort explicitly for planning-heavy asks.</strong> With reasoning-effort
          levels available (<code>low</code>/<code>medium</code>/<code>high</code>/<code>xhigh</code>
          /<code>max</code>), a prompt like &ldquo;plan the migration at high effort, then implement
          at default&rdquo; gets you deliberate architecture thinking without paying max-effort
          cost on every routine edit afterward.
        </li>
        <li>
          <strong>Let background subagents run alongside you.</strong> Since subagents now run in
          the background by default, it&apos;s worth explicitly asking for parallel work up front —
          &ldquo;while you explore the auth module, also check the existing test coverage in a
          background subagent&rdquo; — rather than one long sequential session.
        </li>
        <li>
          <strong>Name Dynamic Workflows for multi-agent orchestration.</strong> Instead of manually
          spelling out every teammate, a prompt can reference <code>/workflows</code> and describe
          the outcome you want orchestrated — useful once a task genuinely needs several
          coordinated agents rather than one long single-threaded session.
        </li>
        <li>
          <strong>Ask for /dataviz output directly.</strong> For anything chart- or
          dashboard-shaped, naming the skill directly (&ldquo;use /dataviz to chart this CSV by
          month&rdquo;) skips a round of Claude figuring out you wanted a visual, not a table.
        </li>
        <li>
          <strong>Default to Sonnet 5 for most work.</strong> With Sonnet 5 now the default model at
          near-Opus agentic quality, save an explicit <code>/model opus</code> switch for the
          cases that actually need it — deep architecture calls, security audits, or genuinely
          ambiguous specs — rather than reaching for Opus out of habit.
        </li>
      </ul>
    </ContentPage>
  );
}
