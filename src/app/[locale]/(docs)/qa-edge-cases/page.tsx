import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { TipCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Edge Cases & Regression" };

export default async function QaEdgeCasesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="qa-edge-cases"
        locale={locale}
        translated
        dek="日期选择器听起来很简单——直到你把它实际需要处理的每一种边界情况都列出来。"
      >
        <h2>边界情况发现</h2>
        <p>
          描述一个功能——比如一个日期选择器——并要求给出分类的边界情况，通常会挖出这样几类：
          边界值（1 月 1 日、12 月 31 日、2 月 28/29 日）、无效输入（第 13 个月、2 月 30 日）、
          格式歧义（MM/DD 对比 DD/MM 对比 ISO）、时区和夏令时切换、闰年规则
          （2024 对比 2025 对比 2100），以及本地化／国际化方面的考量（从右到左的排版、
          非公历历法、分隔符字符）。
        </p>

        <h2>边界值分析（BVA）</h2>
        <p>
          给定一个参数的最小值、最大值和默认值——例如 <code>page_size</code> 范围
          1–100，默认 20——Claude 会生成一份完整的 BVA 表格，在标准边界行之外，还包括
          负数、小数和非数字类&ldquo;特殊值&rdquo;行。
        </p>

        <h2>从 bug 报告生成回归测试</h2>
        <p>
          粘贴一段 bug 描述加上它的修复摘要——&ldquo;双击导致重复下单，已用防抖修复&rdquo;
          ——就能生成一条针对性的 Playwright 测试，复现原始的失败条件，并断言它不再发生。
        </p>
        <CodeBlock
          language="typescript"
          code={`test("double-click does not create duplicate orders", async ({ page }) => {\n  await page.goto("/checkout");\n  const submit = page.getByRole("button", { name: "Place order" });\n\n  await Promise.all([submit.click(), submit.click()]);\n\n  await expect(page.getByTestId("order-confirmation")).toHaveCount(1);\n  await expect(submit).toBeDisabled();\n});`}
          locale={locale}
        />
        <p>
          同样的模式也适用于一个 API 校验类的 bug——负数或零的数量现在会正确返回 400，
          而有效的数量仍然返回 201。
        </p>

        <h2>状态与并发方面的边界情况</h2>
        <ul>
          <li><strong>同时编辑引发的竞态条件</strong> — 后写入者获胜 对比 冲突检测 对比 字段级合并 对比 展示冲突让用户处理</li>
          <li><strong>多步骤表单中途会话过期</strong> — 进度丢失、请求过程中返回 401、静默刷新与刷新失败的 token、多标签页之间的 token 不同步</li>
          <li><strong>表单提交后点击浏览器后退按钮</strong> — 显示过期数据、重复提交风险、POST/Redirect/GET 模式</li>
          <li><strong>离线／重新连接场景</strong> — 排队操作的同步、离线编辑产生的冲突、重试队列导致的重复提交、过期的 service worker 缓存、错过的 WebSocket 事件</li>
        </ul>

        <h2>探索性测试清单：SFDPOT</h2>
        <p>
          结构（Structure）、功能（Function）、数据（Data）、平台（Platform）、操作
          （Operations）、时间（Time）——一种启发式方法，确保手动测试不只是在正常路径上
          反复打转。应用到一个购物车上：
        </p>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>维度</th><th>示例检查项</th></tr>
            </thead>
            <tbody>
              <tr><td>结构</td><td>空购物车、单个商品、数百个商品行</td></tr>
              <tr><td>功能</td><td>添加、移除、更新数量、使用优惠券、结账</td></tr>
              <tr><td>数据</td><td>缺货商品、会话期间价格变动、货币四舍五入</td></tr>
              <tr><td>平台</td><td>Safari 对比 Chrome 的自动填充、iOS 输入框聚焦放大、屏幕阅读器播报、慢速 3G 下的加载状态</td></tr>
              <tr><td>操作</td><td>结账过程中会话超时、浏览器刷新、多个标签页</td></tr>
              <tr><td>时间</td><td>购物车过夜后是否保留、加购和结账之间价格／促销是否过期</td></tr>
            </tbody>
          </table>
        </div>

        <TipCallout locale={locale}>
          把团队历史上的 bug 列表喂给 Claude，问它看出了什么规律——这是快速发现一个
          <em>新</em>功能中，那些本可以被团队过去的 bug 预测到的边界情况的捷径。
        </TipCallout>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="qa-edge-cases"
      locale={locale}
      dek="A date picker sounds simple until you list every edge case it actually needs to handle."
    >
      <h2>Edge-case discovery</h2>
      <p>
        Describing a feature — say, a date picker — and asking for categorized edge cases tends
        to surface buckets like: boundary values (Jan 1, Dec 31, Feb 28/29), invalid inputs (month
        13, Feb 30), format ambiguity (MM/DD vs. DD/MM vs. ISO), timezone and DST transitions,
        leap-year rules (2024 vs. 2025 vs. 2100), and locale/i18n concerns (RTL layout,
        non-Gregorian calendars, separator characters).
      </p>

      <h2>Boundary Value Analysis</h2>
      <p>
        Given a parameter&apos;s min, max, and default — e.g. <code>page_size</code> from 1–100,
        default 20 — Claude produces a full BVA table including negative, decimal, and non-numeric
        &ldquo;special value&rdquo; rows alongside the standard boundary rows.
      </p>

      <h2>Regression tests from bug reports</h2>
      <p>
        Pasting a bug description plus its fix summary — &ldquo;double-click created duplicate
        orders, fixed with a debounce&rdquo; — produces a targeted Playwright test that reproduces
        the original failure condition and asserts it no longer occurs.
      </p>
      <CodeBlock
        language="typescript"
        code={`test("double-click does not create duplicate orders", async ({ page }) => {\n  await page.goto("/checkout");\n  const submit = page.getByRole("button", { name: "Place order" });\n\n  await Promise.all([submit.click(), submit.click()]);\n\n  await expect(page.getByTestId("order-confirmation")).toHaveCount(1);\n  await expect(submit).toBeDisabled();\n});`}
      />
      <p>
        The same pattern applies to an API validation bug — a negative or zero quantity now
        correctly returns 400, while a valid quantity still returns 201.
      </p>

      <h2>State &amp; concurrency edge cases</h2>
      <ul>
        <li><strong>Simultaneous-edit race conditions</strong> — last-write-wins vs. conflict detection vs. field-level merge vs. surfaced conflicts</li>
        <li><strong>Session expiry mid-multi-step-form</strong> — lost progress, a mid-call 401, silent vs. failed token refresh, multi-tab token skew</li>
        <li><strong>Browser back-button after form submission</strong> — stale re-display, duplicate-submission risk, the POST/Redirect/GET pattern</li>
        <li><strong>Offline/reconnect scenarios</strong> — queued-action sync, conflicting offline edits, duplicate submissions from a retry queue, a stale service-worker cache, missed WebSocket events</li>
      </ul>

      <h2>Exploratory testing checklist: SFDPOT</h2>
      <p>
        Structure, Function, Data, Platform, Operations, Time — a heuristic for making sure a
        manual testing pass doesn&apos;t just retread the happy path. Applied to a shopping cart:
      </p>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Dimension</th><th>Example checks</th></tr>
          </thead>
          <tbody>
            <tr><td>Structure</td><td>Empty cart, single item, hundreds of line items</td></tr>
            <tr><td>Function</td><td>Add, remove, update quantity, apply coupon, checkout</td></tr>
            <tr><td>Data</td><td>Out-of-stock items, price changes mid-session, currency rounding</td></tr>
            <tr><td>Platform</td><td>Safari vs. Chrome autofill, iOS input-zoom-on-focus, screen-reader announcements, slow-3G loading states</td></tr>
            <tr><td>Operations</td><td>Session timeout mid-checkout, browser refresh, multiple tabs</td></tr>
            <tr><td>Time</td><td>Cart persisting overnight, price/promo expiry between add and checkout</td></tr>
          </tbody>
        </table>
      </div>

      <TipCallout>
        Feed Claude your team&apos;s historical bug list and ask what patterns it sees — it&apos;s
        a fast way to surface the edge cases in a <em>new</em> feature that your own past bugs
        would have predicted.
      </TipCallout>
    </ContentPage>
  );
}
