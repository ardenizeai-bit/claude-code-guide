import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { TryItCallout } from "@/components/Callout";
import { SeeAlso } from "@/components/SeeAlso";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Use Cases by Role" };

export default async function ByRolePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="by-role"
        locale={locale}
        translated
        dek="五种与工程相关的岗位职能，五种截然不同的日常工作方式——从独立开发者到产品经理。"
      >
        <h2>独立开发者</h2>
        <ul>
          <li>从自然语言快速构建全栈功能原型</li>
          <li>遗留系统重构与现代化改造</li>
          <li>自动化测试生成</li>
          <li>Git 工作流自动化——分支、提交信息、变更日志、rebase</li>
          <li>直接从粘贴的堆栈追踪进行调试</li>
        </ul>

        <h2>工程团队</h2>
        <ul>
          <li>项目级共享的 CLAUDE.md，让所有贡献者遵循一致的标准</li>
          <li>在 CI 中运行的 PR 评审自动化</li>
          <li>一次性跨多个仓库的全局迁移</li>
          <li>跨层功能开发——前端、后端和数据库在同一个会话里完成</li>
          <li>从 Slack 触发 Claude Code 来调查生产环境告警</li>
        </ul>

        <h2>QA 工程师</h2>
        <ul>
          <li>从需求生成测试用例，包括人工评审容易遗漏的边界情况</li>
          <li>Playwright 的 Page Object Model、测试规格、fixtures，以及不稳定测试的排查</li>
          <li>REST API 测试套件——校验、鉴权、状态码矩阵、契约测试</li>
          <li>直接从功能描述发现边界情况</li>
          <li>把已解决的 bug 转化为永久的回归测试</li>
        </ul>

        <h2>工程经理</h2>
        <ul>
          <li>&ldquo;导演模式&rdquo;——编排多个 agent 并行处理子任务</li>
          <li>事件响应，把日志和指标直接喂给 Claude Code</li>
          <li>集成在 CI 中、强制执行架构规则的代码质量关卡</li>
          <li>为新人 onboarding 生成交互式代码库导览</li>
        </ul>

        <h2>产品经理／设计师</h2>
        <ul>
          <li>描述一个功能，直接得到一个可运行的原型</li>
          <li>从规格说明中枚举边界情况，并生成测试骨架</li>
          <li>自然语言转 SQL 的数据查询</li>
          <li>无需排工程 sprint 就能构建内部管理工具和仪表盘</li>
        </ul>

        <SeeAlso
          slug="pm-guide"
          locale={locale}
          note="如果你正是产品经理，有一份专门的指南，包含更深入的工作流、提示模式和需要避开的坑。"
        />

        <h2>亲自试试</h2>
        <TryItCallout locale={locale}>
          <strong>QA：</strong>&ldquo;为 [某功能] 生成全面的测试用例。包括正常路径、边界情况
          和错误状态。以带优先级的表格形式呈现。&rdquo;
        </TryItCallout>
        <TryItCallout locale={locale}>
          <strong>数据分析师：</strong>&ldquo;写一条 PostgreSQL 查询，找出过去 30 天内
          按订单总价值排名前 5 的客户，包含他们的邮箱和订单数量。&rdquo;
        </TryItCallout>
        <TryItCallout locale={locale}>
          <strong>开发者：</strong>&ldquo;构建一个用户注册的 REST API 接口。使用 Express +
          Prisma，校验输入，对密码做哈希处理，并返回一个 JWT。&rdquo;
        </TryItCallout>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="by-role"
      locale={locale}
      dek="Five engineering-adjacent job functions, five different day-to-day workflows — Solo Developer through Product Manager."
    >
      <h2>Solo Developer</h2>
      <ul>
        <li>Rapid prototyping of full-stack features from natural language</li>
        <li>Legacy refactoring and modernization</li>
        <li>Automated test generation</li>
        <li>Git workflow automation — branches, commit messages, changelogs, rebases</li>
        <li>Debugging straight from a pasted stack trace</li>
      </ul>

      <h2>Engineering Team</h2>
      <ul>
        <li>A shared project-level CLAUDE.md for consistent standards across contributors</li>
        <li>PR review automation running in CI</li>
        <li>Fleet-wide migrations across many repos at once</li>
        <li>Cross-layer feature work — frontend, backend, and DB in one session</li>
        <li>Triggering Claude Code from Slack to investigate production alerts</li>
      </ul>

      <h2>QA Engineer</h2>
      <ul>
        <li>Test-case generation from requirements, including edge cases manual review misses</li>
        <li>Playwright Page Object Models, specs, fixtures, and flaky-test debugging</li>
        <li>REST API test suites — validation, auth, status-code matrix, contract testing</li>
        <li>Edge-case discovery straight from a feature description</li>
        <li>Turning resolved bugs into permanent regression tests</li>
      </ul>

      <h2>Engineering Manager</h2>
      <ul>
        <li>&ldquo;Director mode&rdquo; — orchestrating multiple agents on parallel sub-tasks</li>
        <li>Incident response, feeding logs and metrics directly to Claude Code</li>
        <li>CI-integrated code-quality gates enforcing architecture rules</li>
        <li>Generating interactive codebase walkthroughs for onboarding</li>
      </ul>

      <h2>Product Manager / Designer</h2>
      <ul>
        <li>Describing a feature and getting back a working prototype</li>
        <li>Enumerating edge cases from a spec, plus generating test stubs</li>
        <li>Natural-language-to-SQL data queries</li>
        <li>Building internal admin tools and dashboards without an engineering sprint</li>
      </ul>

      <SeeAlso
        slug="pm-guide"
        note="If you're a PM specifically, there's a dedicated guide with deeper workflows, prompt patterns, and pitfalls to avoid."
      />

      <h2>Try it yourself</h2>
      <TryItCallout>
        <strong>QA:</strong> &ldquo;Generate comprehensive test cases for [feature]. Include
        happy path, edge cases, and error states. Format as a table with priority.&rdquo;
      </TryItCallout>
      <TryItCallout>
        <strong>Data Analyst:</strong> &ldquo;Write a PostgreSQL query to find the top 5 customers
        by total order value in the last 30 days, including their email and order count.&rdquo;
      </TryItCallout>
      <TryItCallout>
        <strong>Developer:</strong> &ldquo;Build a REST API endpoint for user registration. Use
        Express + Prisma, validate input, hash passwords, and return a JWT.&rdquo;
      </TryItCallout>
    </ContentPage>
  );
}
