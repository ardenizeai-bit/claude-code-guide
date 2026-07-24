import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Playwright Automation" };

export default async function QaPlaywrightPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="qa-playwright"
        locale={locale}
        translated
        dek="Page Object Model、鉴权 fixture，以及导致大多数不稳定测试失败的三种常见模式。"
      >
        <h2>Page Object Model</h2>
        <p>
          描述页面、它的字段以及你想要的方法——Claude 会生成一个基于稳健定位器构建的、
          带类型的 POM 类。
        </p>
        <CodeBlock
          language="typescript"
          code={`export class LoginPage {\n  constructor(private page: Page) {}\n\n  async goto() {\n    await this.page.goto("/login");\n  }\n\n  async login(email: string, password: string) {\n    await this.page.getByLabel("Email").fill(email);\n    await this.page.getByLabel("Password").fill(password);\n    await this.page.getByRole("button", { name: "Sign in" }).click();\n  }\n\n  getError() {\n    return this.page.getByTestId("login-error");\n  }\n}`}
          locale={locale}
        />

        <h2>测试规格（Test specs）</h2>
        <p>
          引用这个 POM 并描述测试场景。生成的测试规格会用 <code>test.beforeEach</code>{" "}
          做前置设置，并对照 page object 的方法进行断言——有效登录会跳转到{" "}
          <code>/dashboard</code>，无效的邮箱或密码会显示具体的错误信息，空表单提交会
          出现校验提示。
        </p>

        <h2>鉴权 Fixture</h2>
        <p>
          一个一次性的 <code>auth.setup.ts</code> 只登录一次，并把 <code>storageState</code>{" "}
          保存到一个 JSON 文件里。一个共享的 fixture 会在整套测试中复用这份保存下来的会话，
          避免每个测试都要重新登录一次。
        </p>

        <h2>排查不稳定测试——三种常见模式</h2>
        <ul>
          <li>
            <strong>时序问题</strong> — 在一个操作之后立即读取定位器的{" "}
            <code>textContent()</code>，而没有等待页面导航完成。修复方式是使用{" "}
            <code>waitForURL</code> 加上会自动重试的{" "}
            <code>expect(locator).toContainText(...)</code>。
          </li>
          <li>
            <strong>定位器变动</strong> — 像 <code>.submit-btn</code> 这样脆弱的 CSS
            选择器，一旦标签结构改变就会失效。改用基于角色的定位器：{" "}
            <code>getByRole(&apos;button&apos;, {"{"} name: &apos;Sign in&apos; {"}"})</code>。
          </li>
          <li>
            <strong>仅在 CI 上出现的失败</strong> — 无头模式的 Linux 环境，视口、字体渲染
            和网络状况都和本地开发环境不同。解决办法是显式设置视口，并对截图对比使用容忍度
            阈值，而不是要求逐像素精确匹配。
          </li>
        </ul>

        <h2>CI 集成</h2>
        <CodeBlock
          language="yaml"
          code={`- uses: actions/checkout@v4\n- uses: actions/setup-node@v4\n  with:\n    node-version: 20\n- run: npm ci\n- run: npx playwright install --with-deps\n- run: npx playwright test\n- uses: actions/upload-artifact@v4\n  if: always()\n  with:\n    name: playwright-report\n    path: playwright-report/`}
          locale={locale}
        />

        <WarningCallout locale={locale}>
          永远不要用硬编码的 <code>waitForTimeout</code> 来掩盖一个不稳定的测试——那只会
          让测试变慢，而且偶尔仍然会出错。依赖 Playwright 内置的自动等待断言，并且在任何
          地方都优先使用基于角色的定位器，而不是 CSS 选择器。
        </WarningCallout>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="qa-playwright"
      locale={locale}
      dek="Page Object Models, auth fixtures, and the three patterns behind most flaky test failures."
    >
      <h2>Page Object Model</h2>
      <p>
        Describe the page, its fields, and the methods you want — Claude produces a typed POM
        class built on resilient locators.
      </p>
      <CodeBlock
        language="typescript"
        code={`export class LoginPage {\n  constructor(private page: Page) {}\n\n  async goto() {\n    await this.page.goto("/login");\n  }\n\n  async login(email: string, password: string) {\n    await this.page.getByLabel("Email").fill(email);\n    await this.page.getByLabel("Password").fill(password);\n    await this.page.getByRole("button", { name: "Sign in" }).click();\n  }\n\n  getError() {\n    return this.page.getByTestId("login-error");\n  }\n}`}
      />

      <h2>Test specs</h2>
      <p>
        Reference the POM and describe scenarios. The resulting spec uses{" "}
        <code>test.beforeEach</code> for setup and asserts against the page object&apos;s methods
        — valid login redirects to <code>/dashboard</code>, invalid email or password show
        specific errors, empty-form submission surfaces validation messages.
      </p>

      <h2>Auth fixtures</h2>
      <p>
        A one-time <code>auth.setup.ts</code> logs in once and saves <code>storageState</code> to
        a JSON file. A shared fixture reuses that stored session across the whole suite, avoiding
        a fresh login on every single test.
      </p>

      <h2>Debugging flaky tests — three patterns</h2>
      <ul>
        <li>
          <strong>Timing issues</strong> — reading a locator&apos;s <code>textContent()</code>{" "}
          immediately after an action, without waiting for navigation. Fix with{" "}
          <code>waitForURL</code> plus <code>expect(locator).toContainText(...)</code>, which
          auto-retries.
        </li>
        <li>
          <strong>Locator changes</strong> — a fragile CSS selector like <code>.submit-btn</code>{" "}
          breaks the moment markup changes. Replace with a role-based locator:{" "}
          <code>getByRole(&apos;button&apos;, {"{"} name: &apos;Sign in&apos; {"}"})</code>.
        </li>
        <li>
          <strong>CI-only failures</strong> — headless Linux runs a different viewport, font
          rendering, and network profile than local dev. Fix by setting an explicit viewport and
          using a screenshot-comparison threshold tolerance rather than an exact pixel match.
        </li>
      </ul>

      <h2>CI integration</h2>
      <CodeBlock
        language="yaml"
        code={`- uses: actions/checkout@v4\n- uses: actions/setup-node@v4\n  with:\n    node-version: 20\n- run: npm ci\n- run: npx playwright install --with-deps\n- run: npx playwright test\n- uses: actions/upload-artifact@v4\n  if: always()\n  with:\n    name: playwright-report\n    path: playwright-report/`}
      />

      <WarningCallout>
        Never hardcode <code>waitForTimeout</code>{" "}to paper over a flaky test — it just makes
        the test slower and still occasionally wrong. Rely on Playwright&apos;s built-in
        auto-waiting assertions, and prefer role-based locators over CSS selectors everywhere.
      </WarningCallout>
    </ContentPage>
  );
}
