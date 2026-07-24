import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "API Testing" };

export default async function QaApiTestingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="qa-api-testing"
        locale={locale}
        translated
        dek="从一份接口规格，到一整套覆盖校验、鉴权和错误路径的、基于请求的测试套件。"
      >
        <h2>从接口规格生成测试套件</h2>
        <p>
          给定一份 schema——必填和可选字段、类型、约束条件——Claude 会生成一份基于
          Playwright <code>request</code> 的测试规格，覆盖：合法创建返回 201、缺失字段
          返回 400、密码过短返回 400、邮箱重复返回 409，以及字符串字段中的注入尝试返回 400。
        </p>

        <h2>状态码覆盖矩阵</h2>
        <p>
          让 Claude 把每个 CRUD 接口对照预期状态码梳理一遍，能在写下第一行测试之前，
          就发现错误处理上的缺口。
        </p>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>场景</th><th>预期状态码</th></tr>
            </thead>
            <tbody>
              <tr><td>合法请求</td><td>200 / 201</td></tr>
              <tr><td>无效输入</td><td>400</td></tr>
              <tr><td>无 token</td><td>401</td></tr>
              <tr><td>角色错误</td><td>403</td></tr>
              <tr><td>资源未找到</td><td>404</td></tr>
              <tr><td>重复／冲突</td><td>409</td></tr>
              <tr><td>未处理的服务器错误</td><td>500</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          举例来说，确认 <code>DELETE</code> 在无 token 时返回 401、角色错误时返回 403、
          ID 缺失时返回 404——这三条断言，在赶时间手写测试时很容易被跳过。
        </p>

        <h2>按字段类型划分的详尽校验分类</h2>
        <ul>
          <li><strong>字符串字段</strong> — 空／null／undefined、超长输入、特殊／unicode／emoji 字符、SQL 注入和 XSS 攻击载荷</li>
          <li><strong>数值字段</strong> — 零、负数、<code>MAX_SAFE_INTEGER</code>、期望整数时传入浮点数、完全错误的类型</li>
          <li><strong>邮箱字段</strong> — 缺少或有两个 <code>@</code>、本地部分含 unicode 字符、常见拼写错误、超长地址</li>
        </ul>

        <h2>鉴权测试矩阵</h2>
        <p>
          四种标准场景，参数化地跑遍每一个 CRUD 接口：
        </p>
        <CodeBlock
          language="text"
          code={`No token           → 401\nExpired token       → 401\nMalformed token     → 401\nValid token, wrong role → 403`}
          locale={locale}
        />

        <h2>契约测试</h2>
        <p>
          把一份 OpenAPI schema 和一个实际的响应一起粘贴给 Claude，让它标记出字段名、
          类型、是否必填或状态码上的不一致——从而发现文档记录和 API 实际返回之间的偏差。
        </p>

        <WarningCallout locale={locale}>
          优先做错误路径的测试，而不是正常路径——同样是写一条测试，前者能捕获更多真实
          的 bug。并且永远不要把真实的 API key、token 或凭据直接写进提示词里；
          用占位符和环境变量代替。
        </WarningCallout>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="qa-api-testing"
      locale={locale}
      dek="From an endpoint spec to a full request-based test suite covering validation, auth, and error paths."
    >
      <h2>Generating a suite from an endpoint spec</h2>
      <p>
        Given a schema — required and optional fields, types, constraints — Claude produces a
        Playwright <code>request</code>-based spec covering: 201 on valid creation, 400 on missing
        fields, 400 on a too-short password, 409 on a duplicate email, and 400 on an injection
        attempt in a string field.
      </p>

      <h2>Status-code coverage matrix</h2>
      <p>
        Asking Claude to map every CRUD endpoint against expected codes surfaces gaps in error
        handling before a single test is written.
      </p>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Scenario</th><th>Expected code</th></tr>
          </thead>
          <tbody>
            <tr><td>Valid request</td><td>200 / 201</td></tr>
            <tr><td>Invalid input</td><td>400</td></tr>
            <tr><td>No token</td><td>401</td></tr>
            <tr><td>Wrong role</td><td>403</td></tr>
            <tr><td>Resource not found</td><td>404</td></tr>
            <tr><td>Duplicate / conflict</td><td>409</td></tr>
            <tr><td>Unhandled server error</td><td>500</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        For example, confirming <code>DELETE</code> returns 401 with no token, 403 for the wrong
        role, and 404 for a missing ID — three assertions that are easy to skip when writing tests
        by hand under time pressure.
      </p>

      <h2>Exhaustive validation categories by field type</h2>
      <ul>
        <li><strong>String fields</strong> — empty/null/undefined, very long input, special/unicode/emoji characters, SQL-injection and XSS payloads</li>
        <li><strong>Numeric fields</strong> — zero, negative, <code>MAX_SAFE_INTEGER</code>, float where an int is expected, wrong type entirely</li>
        <li><strong>Email fields</strong> — missing or double <code>@</code>, unicode in the local part, common typos, very long addresses</li>
      </ul>

      <h2>Authentication test matrix</h2>
      <p>
        Four canonical scenarios, run parameterized across every CRUD endpoint:
      </p>
      <CodeBlock
        language="text"
        code={`No token           → 401\nExpired token       → 401\nMalformed token     → 401\nValid token, wrong role → 403`}
      />

      <h2>Contract testing</h2>
      <p>
        Paste an OpenAPI schema alongside an actual response and ask Claude to flag mismatches in
        field names, types, required-ness, or status codes — catches drift between what&apos;s
        documented and what the API actually returns.
      </p>

      <WarningCallout>
        Prioritize error-path tests over happy-path ones — they catch more real bugs per test
        written. And never put real API keys, tokens, or credentials directly in a prompt; use
        placeholders and environment variables instead.
      </WarningCallout>
    </ContentPage>
  );
}
