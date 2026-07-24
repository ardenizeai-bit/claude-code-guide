import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { TipCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Test Case Generation" };

export default async function QaTestCasesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="qa-test-cases"
        locale={locale}
        translated
        dek="给 Claude 一份清晰的需求描述，要求它整理成分类表格，然后用批判的眼光去审阅返回的结果。"
      >
        <h2>实战示例：一个登录页面</h2>
        <p>
          需求：邮箱／密码校验、特定的错误提示文案、连续 5 次失败锁定账号。要求生成一份
          分类测试表格，通常会返回十几行以上，覆盖：
        </p>
        <ul>
          <li>使用有效凭据的正向登录</li>
          <li>无效邮箱、密码过短、字段为空等负向场景</li>
          <li>密码恰好 8 个字符的边界情况</li>
          <li>输入字段中的 SQL 注入和 XSS 攻击载荷</li>
          <li>邮箱字段的大小写敏感性检查</li>
          <li>邮箱最大长度边界</li>
          <li>并发会话行为</li>
          <li>锁定以及锁定之后再次尝试的行为</li>
        </ul>

        <h2>把同样的模式应用到其他场景</h2>
        <ul>
          <li><strong>结账流程</strong> — 购物车数量限制、每单仅限一张优惠券的规则、支付字段校验</li>
          <li><strong>搜索与筛选</strong> — 查询长度限制、SQL 注入、特殊字符、分页边界</li>
          <li><strong>CRUD 接口</strong> — 鉴权、角色、重复、未找到等状态码</li>
          <li><strong>文件上传</strong> — 大小／格式边界、内容与扩展名不匹配、并发上传、上传中途网络中断</li>
        </ul>

        <h2>进阶模式</h2>
        <ul>
          <li>
            <strong>从 Jira 工单出发</strong> — 粘贴完整的工单文本，让 Claude 提取可测试的
            需求，以及工单没有明确写出的边界情况
          </li>
          <li>
            <strong>只生成负向用例</strong> — 当正常路径测试已经存在时，明确要求只生成
            无效输入、未授权访问、竞态条件和注入类用例，避免重复生成已有的测试
          </li>
          <li>
            <strong>边界值分析（BVA）表格</strong> — 给出某个字段的有效范围，要求生成{" "}
            <code>min-1</code>/<code>min</code>/<code>min+1</code>/常规值/<code>max-1</code>/
            <code>max</code>/<code>max+1</code> 各行，系统性地捕获差一错误
          </li>
        </ul>

        <CodeBlock
          language="text"
          code={`Field: page_size, range 1–100, default 20\n\nGenerate a Boundary Value Analysis table:\nID | Value | Category | Expected\n---|-------|----------|----------\nBV-1 | 0     | min-1    | 400 Bad Request\nBV-2 | 1     | min      | 200, 1 item returned\nBV-3 | 2     | min+1    | 200, 2 items returned\nBV-4 | 20    | nominal  | 200, default applied\nBV-5 | 99    | max-1    | 200, 99 items returned\nBV-6 | 100   | max      | 200, 100 items returned\nBV-7 | 101   | max+1    | 400 Bad Request`}
          locale={locale}
        />

        <TipCallout locale={locale}>
          始终把生成的用例对照实际规格来检查——Claude 可能会推断出一些并不存在的需求。
          而当一套测试已经存在时，把它喂进去问&ldquo;还漏了什么？&rdquo;，往往比从零生成
          一整套新用例更快发现缺口。
        </TipCallout>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="qa-test-cases"
      locale={locale}
      dek="Give Claude a clear requirements block, ask for a categorized table, and read what comes back critically."
    >
      <h2>Worked example: a login page</h2>
      <p>
        Requirements: email/password validation, specific error strings, a five-attempt lockout.
        Asking for a categorized test table typically returns a dozen-plus rows spanning:
      </p>
      <ul>
        <li>Positive login with valid credentials</li>
        <li>Invalid-email, short-password, and empty-field negatives</li>
        <li>An exactly-8-character password boundary case</li>
        <li>SQL-injection and XSS payloads in the input fields</li>
        <li>A case-sensitivity check on the email field</li>
        <li>A max-length email boundary</li>
        <li>Concurrent-session behavior</li>
        <li>Lockout and post-lockout attempt behavior</li>
      </ul>

      <h2>The same pattern applied elsewhere</h2>
      <ul>
        <li><strong>Checkout flow</strong> — cart quantity limits, single-coupon-per-order rule, payment field validation</li>
        <li><strong>Search + filter</strong> — query length limits, SQL injection, special characters, pagination edges</li>
        <li><strong>CRUD API</strong> — auth, role, duplicate, and not-found status codes</li>
        <li><strong>File upload</strong> — size/format boundaries, content-vs-extension mismatch, concurrent uploads, mid-upload network loss</li>
      </ul>

      <h2>Advanced patterns</h2>
      <ul>
        <li>
          <strong>From a Jira ticket</strong> — paste the full ticket text and ask Claude to
          extract testable requirements plus edge cases the ticket doesn&apos;t explicitly state
        </li>
        <li>
          <strong>Negative-only generation</strong> — when happy-path tests already exist, ask
          explicitly for only invalid-input, unauthorized-access, race-condition, and injection
          cases, so you&apos;re not re-generating tests you already have
        </li>
        <li>
          <strong>Boundary Value Analysis table</strong> — given a field&apos;s valid range, ask
          for <code>min-1</code>/<code>min</code>/<code>min+1</code>/nominal/<code>max-1</code>/
          <code>max</code>/<code>max+1</code> rows to systematically catch off-by-one errors
        </li>
      </ul>

      <CodeBlock
        language="text"
        code={`Field: page_size, range 1–100, default 20\n\nGenerate a Boundary Value Analysis table:\nID | Value | Category | Expected\n---|-------|----------|----------\nBV-1 | 0     | min-1    | 400 Bad Request\nBV-2 | 1     | min      | 200, 1 item returned\nBV-3 | 2     | min+1    | 200, 2 items returned\nBV-4 | 20    | nominal  | 200, default applied\nBV-5 | 99    | max-1    | 200, 99 items returned\nBV-6 | 100   | max      | 200, 100 items returned\nBV-7 | 101   | max+1    | 400 Bad Request`}
      />

      <TipCallout>
        Always check generated cases against the actual spec — Claude can infer requirements that
        don&apos;t exist. And when a suite already exists, feeding it in and asking &ldquo;what&apos;s
        missing?&rdquo; tends to surface gaps faster than generating a whole new set from scratch.
      </TipCallout>
    </ContentPage>
  );
}
