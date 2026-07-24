import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Prompt Patterns" };

export default async function VibePatternsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="vibe-patterns"
        locale={locale}
        translated
        dek="八种能带来更好输出的可复用模式——以及四种可靠地带来更差结果的反模式。"
      >
        <h2>八种模式</h2>
        <ol>
          <li>
            <strong>上下文分层（Context Layering）</strong> — 把项目的技术栈、架构和约定
            都堆进提示词里，让生成的代码真正能融入进来。在请求一个新接口之前，先说明框架、
            ORM，以及现有的 API 响应封装模式。
          </li>
          <li>
            <strong>分步提示（Stepwise Prompting）</strong> — 把一个功能拆成一系列小步骤，
            每一步之间都测试一下。先搭建一个静态的看板界面，再接上真实数据库，
            最后再加拖拽功能。
          </li>
          <li>
            <strong>角色赋予（Role Assignment）</strong> — 让 Claude 扮演某个具体的专家角色
            （&ldquo;一位资深安全工程师&rdquo;），以触发与该领域相符的审查方式。
          </li>
          <li>
            <strong>约束锚定（Constraint Anchoring）</strong> — 设定明确的边界：禁用哪些库、
            函数最大长度、向后兼容性要求。这能在不想要的模式出现之前就把它们排除掉。
          </li>
          <li>
            <strong>对比式提示（Comparative Prompting）</strong> — 在最终确定方案之前，
            先要求给出多种方案及各自的权衡取舍（WebSockets 对比 SSE 对比轮询）。
          </li>
          <li>
            <strong>思维链（Chain-of-Thought）</strong> — 在写代码<em>之前</em>，先让 Claude
            解释它对棘手边界情况（并发编辑、排序维护）的应对策略，这样错误的假设能提前暴露，
            而不是事后才发现。
          </li>
          <li>
            <strong>错误前置（Error-Forward）</strong> — 直接粘贴错误信息、堆栈追踪和 lint
            输出，而不是转述它们。对照原始文本做模式匹配，比转述更快。
          </li>
          <li>
            <strong>模式延伸（Pattern Extension）</strong> — 指向一个已经实现类似功能的现有
            文件，让 Claude 在新功能上遵循同样的模式（同样的错误封装、同样的校验库、
            同样的鉴权中间件）。
          </li>
        </ol>

        <h2>应避免的反模式</h2>
        <ul>
          <li>
            <strong>一次性要求整个应用</strong> → 得到的输出会纠缠不清、难以维护。
            应该一次只要求一个功能，测试它，再要求下一个。
          </li>
          <li>
            <strong>不看就直接接受生成的代码</strong> → 应该审阅每一个文件，
            遇到看不懂的地方就问&ldquo;为什么这样做&rdquo;。
          </li>
          <li>
            <strong>每次会话都重新解释一遍技术栈</strong> → 应该把它写进 CLAUDE.md 一次就够了。
          </li>
          <li>
            <strong>&ldquo;做得更好一点&rdquo;这类含糊的反馈</strong> → 应该给出具体、
            明确的改动要求——比如&ldquo;这个按钮在移动端应该占满整行宽度&rdquo;。
          </li>
        </ul>

        <WarningCallout locale={locale}>
          Vibe coding 不是&ldquo;让 AI 包办一切&rdquo;。你始终是那个架构师，Claude 是
          建造者，最终输出的质量取决于你给出的规格说明的质量——而不是反过来。
        </WarningCallout>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="vibe-patterns"
      locale={locale}
      dek="Eight reusable patterns for getting better output — and the four anti-patterns that reliably produce worse results."
    >
      <h2>Eight patterns</h2>
      <ol>
        <li>
          <strong>Context Layering</strong> — stack the project&apos;s stack, architecture, and
          conventions into the prompt so generated code actually fits in. Name the framework, the
          ORM, and the existing API-envelope pattern before asking for a new endpoint.
        </li>
        <li>
          <strong>Stepwise Prompting</strong> — break a feature into small sequential steps,
          testing between each. Build a static Kanban UI first, then wire it to a real database,
          then add drag-and-drop.
        </li>
        <li>
          <strong>Role Assignment</strong> — ask Claude to act as a specific expert (&ldquo;a
          senior security engineer&rdquo;) to trigger domain-appropriate review patterns.
        </li>
        <li>
          <strong>Constraint Anchoring</strong> — set explicit boundaries: forbidden libraries,
          max function length, backward-compatibility requirements. Reduces unwanted patterns
          before they show up.
        </li>
        <li>
          <strong>Comparative Prompting</strong> — ask for multiple approaches with tradeoffs
          (WebSockets vs. SSE vs. polling) before committing to one.
        </li>
        <li>
          <strong>Chain-of-Thought</strong> — ask Claude to explain its strategy for tricky edge
          cases (concurrent edits, sort-order maintenance) <em>before</em> writing code, so wrong
          assumptions surface early instead of after the fact.
        </li>
        <li>
          <strong>Error-Forward</strong> — paste error messages, stack traces, and lint output
          directly rather than describing them. Pattern-matching against the raw text is faster
          than a paraphrase.
        </li>
        <li>
          <strong>Pattern Extension</strong> — point at an existing file that already implements a
          similar feature and ask Claude to follow the same pattern (same error envelope, same
          validation library, same auth middleware) for a new one.
        </li>
      </ol>

      <h2>Anti-patterns to avoid</h2>
      <ul>
        <li>
          <strong>Asking for an entire app at once</strong> → tangled, unmaintainable output. Ask
          for one feature, test it, then ask for the next.
        </li>
        <li>
          <strong>Accepting generated code without reading it</strong> → review every file, and
          ask &ldquo;why&rdquo; when something isn&apos;t understood.
        </li>
        <li>
          <strong>Re-explaining your stack every session</strong> → put it in CLAUDE.md once
          instead.
        </li>
        <li>
          <strong>Vague feedback like &ldquo;make it better&rdquo;</strong> → give a specific,
          concrete change instead — &ldquo;the button should be full-width on mobile.&rdquo;
        </li>
      </ul>

      <WarningCallout>
        Vibe coding isn&apos;t &ldquo;let the AI do everything.&rdquo; You remain the architect,
        Claude is the builder, and output quality tracks the quality of the specification you
        gave it — not the other way around.
      </WarningCallout>
    </ContentPage>
  );
}
