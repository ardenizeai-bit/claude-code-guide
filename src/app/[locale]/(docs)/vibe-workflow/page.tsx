import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { TipCallout, WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "6-Phase Workflow" };

export default async function VibeWorkflowPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="vibe-workflow"
        locale={locale}
        translated
        dek="一套构建真实项目的具体六阶段流程——以一个贯穿始终的&ldquo;自由职业者任务追踪工具&rdquo;为例来说明。"
      >
        <h2>1. 明确 Vibe</h2>
        <p>
          在打开 Claude Code 之前，先写一页需求简报：你要做什么、这是给谁用的，
          以及 3–5 个核心功能——本质上就是一份迷你 PRD。<em>对应功能：</em>提示技巧 + CLAUDE.md。
        </p>

        <h2>2. 先规划，再写代码</h2>
        <p>
          使用 Plan Mode（按两次 <code>Shift+Tab</code>），让 Claude 先探索代码库，
          提出架构和数据模型方案，此时先不写任何代码。审阅并批准之后再继续。
          <em>对应功能：</em>Plan Mode。
        </p>

        <h2>3. 搭建基础脚手架</h2>
        <p>
          让 Claude 搭建项目结构、安装依赖、创建基础的数据模型和鉴权接入——明确要求
          此时<em>还不要</em>构建界面。每创建一个文件都先审阅，再继续下一步。
          <em>对应功能：</em>命令行与参数、MCP（例如 Supabase）。
        </p>

        <h2>4. 逐个功能构建</h2>
        <p>
          每次提示只实现一个功能——绝不一次性全部实现——每完成一个都手动测试一遍，
          再进入下一个。<em>对应功能：</em>Skills、Subagents。
        </p>

        <h2>5. 测试与迭代</h2>
        <p>
          每完成一个功能，就让 Claude 编写覆盖增删改查、校验错误和未授权访问的测试——
          然后亲自验证输出是否真的符合预期，而不是只看到绿色的通过标记就相信它。
          <em>对应功能：</em>Hooks（自动 lint）、CI/CD。
        </p>

        <h2>6. 打磨与上线</h2>
        <p>
          添加加载状态、错误边界、空状态和响应式布局。把繁琐的机械性工作交给 Claude，
          自己专注在体验层面的判断上。最后完整跑一遍测试套件，修完所有失败项再宣告完成。
          <em>对应功能：</em>提示技巧、Hooks。
        </p>

        <TipCallout locale={locale}>
          值得反复强调的最佳实践：先写规格，再写代码——提前花时间写一份简短的需求简报，
          能省下几个小时的来回沟通。每次提示只做一个功能。审阅 Claude 产出的每一样东西，
          而不是想当然地认为它是对的。把 CLAUDE.md 当作一份不断复利积累的&ldquo;宪法&rdquo;
          ——每加入一条规则，都能避免未来一整类错误。任何有风险的操作之前都先用 Plan
          Mode：重构、迁移、架构调整。
        </TipCallout>

        <WarningCallout locale={locale}>
          永远不要把密钥写进提示词里。使用环境变量，并配置一个 <code>PreToolUse</code>{" "}
          hook 来自动拦截危险命令，而不是指望自己记得不去输入它们。
        </WarningCallout>

        <p>
          学会这套工作流最好的方式，是把它用在一个真实项目上——而不是先去刷更多教程。
        </p>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="vibe-workflow"
      locale={locale}
      dek="A concrete six-phase process for building a real project — illustrated with a running 'task tracker for freelancers' example."
    >
      <h2>1. Define the Vibe</h2>
      <p>
        Write a one-page brief before opening Claude Code at all: what you&apos;re building, who
        it&apos;s for, and 3–5 core features — effectively a mini-PRD. <em>Maps to:</em> Prompt
        Tips + CLAUDE.md.
      </p>

      <h2>2. Plan Before Code</h2>
      <p>
        Use Plan Mode (<code>Shift+Tab</code> twice) so Claude explores the codebase and proposes
        an architecture and data-model plan without writing any code yet. Review and approve
        before proceeding. <em>Maps to:</em> Plan Mode.
      </p>

      <h2>3. Scaffold the Foundation</h2>
      <p>
        Have Claude set up the project structure, install dependencies, and create the base
        schema and auth wiring — explicitly <em>without</em> building UI yet. Review each created
        file before moving on. <em>Maps to:</em> CLI &amp; Flags, MCP (e.g. Supabase).
      </p>

      <h2>4. Build Feature by Feature</h2>
      <p>
        Implement one feature per prompt — never everything at once — testing manually after each
        before moving to the next. <em>Maps to:</em> Skills, Subagents.
      </p>

      <h2>5. Test and Iterate</h2>
      <p>
        After each feature, ask Claude to write tests covering create/read/update/delete,
        validation errors, and unauthorized access — then personally verify the output actually
        matches intent, rather than trusting a green checkmark alone. <em>Maps to:</em> Hooks
        (auto-lint), CI/CD.
      </p>

      <h2>6. Polish and Ship</h2>
      <p>
        Add loading states, error boundaries, empty states, and responsive layout. Use Claude for
        the tedious mechanical parts while you focus on the UX judgment calls. Finish with a full
        test-suite run and fix any failures before calling it done. <em>Maps to:</em> Prompt Tips,
        Hooks.
      </p>

      <TipCallout>
        Best practices worth repeating: spec first, code second — a short brief upfront saves
        hours of back-and-forth. One feature per prompt. Review everything Claude produces rather
        than assuming correctness. Treat CLAUDE.md as a compounding constitution — every rule
        added prevents a whole category of future mistakes. Use Plan Mode before anything risky:
        refactors, migrations, architecture changes.
      </TipCallout>

      <WarningCallout>
        Never put secrets in prompts. Use environment variables, and set up a{" "}
        <code>PreToolUse</code> hook to block dangerous commands automatically rather than relying
        on remembering not to type them.
      </WarningCallout>

      <p>
        The best way to learn this workflow is by applying it to a real project — not by working
        through more tutorials first.
      </p>
    </ContentPage>
  );
}
