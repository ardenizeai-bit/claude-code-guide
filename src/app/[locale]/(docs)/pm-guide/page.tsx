import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { TipCallout, WarningCallout, TryItCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Product Manager Guide" };

export default async function PmGuidePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="pm-guide"
        locale={locale}
        translated
        dek="想从 Claude Code 获得真正的价值，你不需要会写代码——你需要写清晰的规格说明，并且知道该问什么。"
      >
        <p>
          让 Claude Code 对工程师有用的那些东西——精确的指令、具体的例子、紧凑的反馈
          循环——恰好也正是让一份产品规格说明变得优秀的要素。一位已经习惯严谨地写需求的
          产品经理，其实已经掌握了大部分所需技能；这一页要讲的，是如何把这项技能对准这个工具。
        </p>

        <h2>产品经理实际上会用它做什么</h2>
        <ul>
          <li>
            <strong>从书面规格生成可点击的原型</strong> — 用大白话描述一个流程，就能拿到
            一个可以拿给用户或利益相关方看的可运行界面，不需要排队等工程 sprint 的档期。
          </li>
          <li>
            <strong>边界情况和需求缺口</strong> — 粘贴一份草稿规格，问它有哪些场景没有覆盖到。
            这往往比第一轮设计评审更快、也更全面。
          </li>
          <li>
            <strong>不用开工单就能拿到数据答案</strong> — 自然语言转 SQL，用来回答那些原本
            会积压在数据分析团队待办列表里的问题。
          </li>
          <li>
            <strong>内部工具和仪表盘</strong> — 一个不值得启动完整工程项目的简单管理面板或
            运营仪表盘。
          </li>
          <li>
            <strong>竞品与市场调研的整合</strong> — 把一堆截图、文档或访谈记录，整理成一份
            结构化的对比分析或简报。
          </li>
          <li>
            <strong>读懂工程产出</strong> — 让 Claude 在评审会议前用大白话总结一个 PR 或
            一份技术设计文档，这样你进会议室时已经有了基本认知。
          </li>
        </ul>

        <h2>适合产品经理工作方式的提示模式</h2>
        <ol>
          <li>
            <strong>把规格本身当作提示词。</strong>把你现有的规格格式直接当成提示词——用户
            故事、验收标准、边界情况、范围之外的内容。你的规格越像一份测试计划，输出就越好。
          </li>
          <li>
            <strong>动工之前先问缺口。</strong>&ldquo;这是我为 [某功能] 写的规格。在交给工程
            团队之前，我还漏掉了哪些边界情况、错误状态或含糊的需求？&rdquo;——在这里发现
            缺口，比在 sprint 评审时发现要便宜得多。
          </li>
          <li>
            <strong>以&ldquo;一次性原型&rdquo;模式来构建。</strong>明确说明这是用于验证的
            一次性原型，不是生产代码——Claude 会为了速度和视觉还原度而优化，牺牲架构上的
            考量，而这正是你在这个阶段真正想要的。
          </li>
          <li>
            <strong>要权衡取舍，而不只是一个答案。</strong>&ldquo;实现 [某功能] 有哪 3 种方式，
            各自的权衡取舍是什么？&rdquo;能给你一个和工程团队展开真正讨论的切入点，
            而不是一个被当作事实呈现的单一意见。
          </li>
          <li>
            <strong>用大白话提出数据问题。</strong>&ldquo;上个季度哪个客户群体的流失率最高，
            支持工单里提到最多的原因是什么？&rdquo;——不需要写 SQL，但要像对待别人交给你的
            任何查询结果一样，对这个结果做一次合理性检查。
          </li>
        </ol>

        <CodeBlock
          language="text"
          code={`# Weak prompt\nBuild me a settings page.\n\n# Strong prompt\nBuild a clickable prototype of a settings page for a\nB2B SaaS product. Sections: Profile, Notifications,\nBilling. Notifications should show a toggle per\nchannel (email/Slack/in-app). This is a throwaway\nprototype for a stakeholder review — prioritize\nvisual fidelity over code quality.`}
          locale={locale}
        />

        <h2>与工程团队协作，而不是绕过他们</h2>
        <p>
          Claude 搭建出来的原型是一个讨论的起点，不是一份可以直接合并的 PR。
          失去工程团队信任最快的方式，就是拿着&ldquo;能跑的代码&rdquo;出现，还期待它原样
          上线——建立信任最快的方式，则是提前坦诚说明：这是一个用来降低真正构建风险的
          一次性原型，而不是替代它。
        </p>
        <TipCallout locale={locale}>
          把你用过的提示词和原型一起分享出去，而不只是分享输出结果。这能让工程团队拿到
          可以直接采取行动的真实需求格式，也展示了你的思考过程，而不是一个黑盒子。
        </TipCallout>

        <h2>常见的坑</h2>
        <WarningCallout locale={locale}>
          <ul className="flex flex-col gap-1.5">
            <li>把 AI 生成的原型当作可直接上线的成品展示给利益相关方</li>
            <li>在把生成的 SQL 结果放进汇报材料之前，跳过了对它的审查</li>
            <li>写一句含糊的提示词，却期待得到一份完整的规格说明</li>
            <li>用它来回避与工程团队就可行性或权衡取舍展开真正的对话</li>
            <li>把真实客户数据放进提示词，而不是使用合成的示例数据</li>
          </ul>
        </WarningCallout>

        <h2>亲自试试</h2>
        <TryItCallout locale={locale}>
          原样粘贴你下一份功能规格，然后问：&ldquo;列出这份规格中所有 QA 工程师在评审时
          会标记出来的边界情况、错误状态和含糊需求。&rdquo;在设计评审之前，拿它和你自己
          列出的清单做个对比。
        </TryItCallout>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="pm-guide"
      locale={locale}
      dek="You don't need to write code to get real value from Claude Code — you need to write clear specs and know what to ask for."
    >
      <p>
        Most of what makes Claude Code useful to an engineer — precise instructions, concrete
        examples, a tight feedback loop — is exactly what makes a good product spec good. A PM
        who's already disciplined about writing requirements has most of the skill already; this
        page is about pointing that skill at the tool.
      </p>

      <h2>What PMs actually use it for</h2>
      <ul>
        <li>
          <strong>Clickable prototypes from a written spec</strong> — describe a flow in plain
          language and get back a working UI to put in front of users or stakeholders, without
          waiting for an engineering sprint slot.
        </li>
        <li>
          <strong>Edge-case and requirement gaps</strong> — paste a draft spec and ask what
          scenarios it doesn't cover. This is often faster and more thorough than a first design
          review.
        </li>
        <li>
          <strong>Data answers without a ticket</strong> — natural-language-to-SQL for questions
          that would otherwise sit in an analytics team's backlog.
        </li>
        <li>
          <strong>Internal tools and dashboards</strong> — a simple admin panel or ops dashboard
          that doesn't justify a full engineering project.
        </li>
        <li>
          <strong>Competitive and market research synthesis</strong> — turning a pile of
          screenshots, docs, or transcripts into a structured comparison or brief.
        </li>
        <li>
          <strong>Reading engineering output</strong> — asking Claude to summarize a PR or a
          technical design doc in plain language before a review meeting, so you walk in already
          oriented.
        </li>
      </ul>

      <h2>Prompt patterns for PM-shaped work</h2>
      <ol>
        <li>
          <strong>Spec-as-prompt.</strong> Treat your existing spec format as the prompt itself —
          user story, acceptance criteria, edge cases, out-of-scope. The more your spec already
          looks like a test plan, the better the output.
        </li>
        <li>
          <strong>Ask for the gaps before the build.</strong> &ldquo;Here&apos;s my spec for
          [feature]. What edge cases, error states, or ambiguous requirements am I missing before
          this goes to engineering?&rdquo; — cheaper to find gaps here than in a sprint review.
        </li>
        <li>
          <strong>Prototype in throwaway mode.</strong> Say explicitly that this is a disposable
          prototype for validation, not production code — Claude will optimize for speed and
          visual fidelity over architecture, which is what you actually want at this stage.
        </li>
        <li>
          <strong>Ask for the tradeoffs, not just the answer.</strong> &ldquo;What are 3 ways to
          implement [feature], and what does each trade off?&rdquo; gives you a real conversation
          starter with engineering instead of a single opinion presented as fact.
        </li>
        <li>
          <strong>Bring data questions in plain English.</strong> &ldquo;Which customer segment
          had the highest churn last quarter, and what's the top reason cited in support
          tickets?&rdquo; — no SQL required, but sanity-check the result the same way you would
          any other query someone handed you.
        </li>
      </ol>

      <CodeBlock
        language="text"
        code={`# Weak prompt\nBuild me a settings page.\n\n# Strong prompt\nBuild a clickable prototype of a settings page for a\nB2B SaaS product. Sections: Profile, Notifications,\nBilling. Notifications should show a toggle per\nchannel (email/Slack/in-app). This is a throwaway\nprototype for a stakeholder review — prioritize\nvisual fidelity over code quality.`}
      />

      <h2>Working with engineering, not around it</h2>
      <p>
        A Claude-built prototype is a conversation starter, not a pull request. The fastest way to
        lose engineering trust is to show up with &ldquo;working code&rdquo; and an expectation
        that it ships as-is — the fastest way to build it is to be upfront that it&apos;s a
        disposable mockup meant to de-risk the real build, not replace it.
      </p>
      <TipCallout>
        Share the prompt you used alongside the prototype, not just the output. It gives
        engineering the actual requirements in a format they can act on directly, and it shows
        your work rather than presenting a black box.
      </TipCallout>

      <h2>Common pitfalls</h2>
      <WarningCallout>
        <ul className="flex flex-col gap-1.5">
          <li>Presenting an AI-generated prototype as production-ready to stakeholders</li>
          <li>Skipping a review of generated SQL before trusting the numbers in a deck</li>
          <li>Writing a vague one-line prompt and expecting a complete spec back</li>
          <li>Using it to avoid a real conversation with engineering about feasibility or tradeoffs</li>
          <li>Putting real customer data into a prompt instead of using a synthetic sample</li>
        </ul>
      </WarningCallout>

      <h2>Try it yourself</h2>
      <TryItCallout>
        Paste your next feature spec as-is and ask: &ldquo;List every edge case, error state, and
        ambiguous requirement in this spec that a QA engineer would flag in review.&rdquo; Compare
        it against your own list before the design review.
      </TryItCallout>
    </ContentPage>
  );
}
