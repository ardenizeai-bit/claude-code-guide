import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { TipCallout, TryItCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "QA with Claude Code" };

export default async function QaOverviewPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="qa-overview"
        locale={locale}
        translated
        dek="四项能力覆盖了 QA 工程师日常工作的大部分内容：测试用例、浏览器自动化、API 覆盖，以及边界情况发现。"
      >
        <h2>Claude 在 QA 方面擅长的四件事</h2>
        <ul>
          <li><strong>测试用例生成</strong> — 输入需求，几秒钟内（而不是一个下午）就能得到结构化的正向／负向／边界／边缘用例</li>
          <li><strong>Playwright 自动化</strong> — Page Object Model、测试规格、fixtures，以及不稳定测试的排查</li>
          <li><strong>API 测试</strong> — 从接口规格出发，覆盖校验、鉴权、错误场景和状态码</li>
          <li><strong>边界情况发现</strong> — 把一段功能描述转化为并发、状态和边界用例，这些原本团队往往只有在生产环境出现 bug 之后才会发现</li>
        </ul>

        <h2>建议的工作流</h2>
        <p>
          描述功能或粘贴规格 → Claude 生成测试用例或自动化代码 → 运行前先审阅并调整 →
          把失败结果反馈给 Claude 进行修复。当你粘贴的是实际的失败输出而不是它的摘要时，
          这个循环收敛得最快。
        </p>

        <h2>入门提示词范例</h2>
        <ul>
          <li>
            <strong>从规格生成测试用例</strong> — 列出字段需求和校验规则，要求以 ID、分类、
            步骤、预期结果、优先级为列的表格形式给出正向／负向／边界／边缘用例
          </li>
          <li>
            <strong>Playwright 端到端测试</strong> — 说明要覆盖的流程，指定用 Page Object
            Model + TypeScript
          </li>
          <li>
            <strong>API 测试套件</strong> — 给出接口和必填字段，要求覆盖合法／缺失／
            非法／边界／注入／鉴权过期等场景
          </li>
          <li>
            <strong>边界情况发现</strong> — 描述一个有约束条件的功能（例如带大小／格式限制的
            文件上传），问 QA 工程师通常会漏掉哪些边界情况
          </li>
        </ul>

        <TipCallout locale={locale}>
          先从测试用例生成开始——它是投入时间后感知回报最高的一项，往往能为每个功能挖出
          20 个以上的用例，其中不乏一些原本只有生产环境出 bug 才会被发现的情形。
        </TipCallout>

        <TryItCallout locale={locale}>
          粘贴你正在测试的某个功能的需求，然后问：&ldquo;以 ID、分类、步骤、预期结果、
          优先级为列，生成一份正向、负向、边界和边缘测试用例表格。&rdquo;
        </TryItCallout>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="qa-overview"
      locale={locale}
      dek="Four capabilities cover most of what a QA engineer spends their day on: test cases, browser automation, API coverage, and edge-case discovery."
    >
      <h2>Four things Claude does well for QA</h2>
      <ul>
        <li><strong>Test-case generation</strong> — requirements in, structured positive/negative/boundary/edge cases out, in seconds rather than an afternoon</li>
        <li><strong>Playwright automation</strong> — Page Object Models, specs, fixtures, and flaky-test debugging</li>
        <li><strong>API testing</strong> — validation, auth, error scenarios, and status-code coverage from an endpoint spec</li>
        <li><strong>Edge-case discovery</strong> — turning a feature description into the concurrency, state, and boundary cases a team would otherwise only find after a production bug</li>
      </ul>

      <h2>The suggested workflow</h2>
      <p>
        Describe the feature or paste the spec → Claude generates test cases or automation code →
        review and adjust before running → feed failures back to Claude for fixes. The loop closes
        fastest when you paste the actual failure output, not a summary of it.
      </p>

      <h2>Starter prompt shapes</h2>
      <ul>
        <li>
          <strong>Test cases from a spec</strong> — list field requirements and validation rules,
          ask for positive/negative/boundary/edge cases as a table with ID, Category, Steps,
          Expected, Priority
        </li>
        <li>
          <strong>Playwright E2E</strong> — name the flows to cover, specify Page Object Model +
          TypeScript
        </li>
        <li>
          <strong>API test suite</strong> — give the endpoint, required fields, and ask for
          valid/missing/invalid/boundary/injection/auth-expiry cases
        </li>
        <li>
          <strong>Edge-case discovery</strong> — describe a constrained feature (e.g. file upload
          with a size/format limit) and ask what edge cases QA engineers typically miss
        </li>
      </ul>

      <TipCallout>
        Start with test-case generation first — it has the highest perceived return on the time
        invested, often surfacing 20+ cases per feature, including ones that would otherwise only
        get caught after a production bug.
      </TipCallout>

      <TryItCallout>
        Paste the requirements for a feature you&apos;re currently testing and ask: &ldquo;Generate
        positive, negative, boundary, and edge test cases as a table with ID, Category, Steps,
        Expected Result, and Priority.&rdquo;
      </TryItCallout>
    </ContentPage>
  );
}
