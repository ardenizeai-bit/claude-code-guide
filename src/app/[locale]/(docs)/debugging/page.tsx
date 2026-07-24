import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { TipCallout, TryItCallout } from "@/components/Callout";
import { Quiz } from "@/components/Quiz";
import { SeeAlso } from "@/components/SeeAlso";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Debugging" };

export default async function DebuggingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="debugging"
        locale={locale}
        translated
        dek="三种技巧几乎能覆盖你遇到的所有 bug：修复已知问题、完整错误追踪，以及逐步逻辑追踪。"
      >
        <h2>修复已知 bug</h2>
        <p>
          把代码交给 Claude，再用大白话描述&ldquo;期望行为&rdquo;和&ldquo;实际行为&rdquo;的差异。
          只要你能精确描述这个落差，并不一定需要提供堆栈追踪。
        </p>
        <CodeBlock
          language="python"
          code={`def get_average(numbers):\n    return sum(numbers) / len(numbers)\n\n# Expected: handle an empty list gracefully\n# Actual: raises ZeroDivisionError`}
        />
        <p>
          这种情况的修复方式通常是：对空输入提前 return，并跳过非数字项，而不是让一个坏值
          搞崩整个计算。
        </p>

        <h2>阅读完整的错误信息</h2>
        <p>
          请粘贴<strong>完整</strong>的堆栈追踪和相关代码——而不是转述一遍。截断的错误信息只会
          让 Claude 反过来问你省略的部分，多耗一轮沟通。
        </p>
        <CodeBlock
          language="text"
          code={`TypeError: Cannot read properties of undefined (reading 'name')\n    at getUserName (user.js:14)\n    at renderProfile (profile.js:8)`}
        />
        <p>
          这个错误可以追溯到 <code>getUserName</code> 默认 <code>user</code> 总是存在——
          修复方式是在访问 <code>user.name</code> 之前加一个空值检查。
        </p>

        <h2>逐步逻辑追踪</h2>
        <p>
          逻辑类 bug 更难处理，因为它们不会抛出任何异常。一个把 <code>max</code> 初始化为{" "}
          <code>0</code>、并从索引 1 开始循环的 <code>findMax</code> 函数，在面对全是负数的数组时，
          会悄无声息地返回 <code>0</code>——没有报错，只是答案错了。
        </p>
        <TipCallout locale={locale}>
          让 Claude 针对某个具体输入，逐行追踪函数执行过程，并在每一次迭代时打印所有变量。
          这样能一次性同时暴露出错误的初始值和被跳过的第一个索引——比盯着代码硬找要快得多。
        </TipCallout>

        <h2>排查不稳定（flaky）测试失败</h2>
        <ul>
          <li>
            <strong>断言失败</strong>——例如期望得到&ldquo;Welcome, John&rdquo;，实际却得到
            &ldquo;Welcome, null&rdquo;：通常是因为断言执行时 API 调用还没有完成。
            解决办法是先 await 这个响应。
          </li>
          <li>
            <strong>只在 CI 上出现的不稳定</strong>——通常是因为 CI 渲染更慢，再加上动画或懒加载。
            解决办法是等待网络空闲，并调高 CI 专用的超时时间。
          </li>
        </ul>

        <TryItCallout locale={locale}>
          粘贴一个失败的测试、它完整的 CI 报错输出，以及被测试的组件。让 Claude 去找出竞态条件，
          而不是简单地调大超时时间——更长的超时只是把 bug 藏起来，并没有真正修复它。
        </TryItCallout>

        <SeeAlso
          slug="best-practices"
          locale={locale}
          note="以上每个示例都遵循同一个 bug 模板：期望行为、实际行为、最近的改动、错误信息、相关文件。"
        />

        <h2>小测验</h2>
        <Quiz
          question="一个函数对所有全负数数组都返回 0，但从不报错。哪种调试技巧最适合排查这个问题？"
          options={[
            "阅读完整的错误信息",
            "逐步逻辑追踪",
            "仅凭描述修复已知 bug",
          ]}
          correctIndex={1}
        />
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="debugging"
      locale={locale}
      dek="Three techniques cover almost every bug you'll hit: known-bug fixes, full error traces, and step-by-step logic tracing."
    >
      <h2>Fixing a known bug</h2>
      <p>
        Give Claude the code plus a plain description of expected vs. actual behavior. It doesn&apos;t
        need a stack trace if you can describe the mismatch precisely.
      </p>
      <CodeBlock
        language="python"
        code={`def get_average(numbers):\n    return sum(numbers) / len(numbers)\n\n# Expected: handle an empty list gracefully\n# Actual: raises ZeroDivisionError`}
      />
      <p>
        The fix here is usually an early return for empty input, plus skipping non-numeric
        entries rather than letting one bad value crash the whole calculation.
      </p>

      <h2>Reading the full error message</h2>
      <p>
        Paste the <strong>entire</strong> stack trace and the relevant code — not a paraphrase.
        Truncated errors cost you a round trip while Claude asks for the part you left out.
      </p>
      <CodeBlock
        language="text"
        code={`TypeError: Cannot read properties of undefined (reading 'name')\n    at getUserName (user.js:14)\n    at renderProfile (profile.js:8)`}
      />
      <p>
        This one traces back to <code>getUserName</code> assuming <code>user</code> is always
        defined — the fix is a null-check before touching <code>user.name</code>.
      </p>

      <h2>Step-by-step logic tracing</h2>
      <p>
        Logic bugs are harder because nothing throws. A <code>findMax</code> function that
        initializes <code>max = 0</code> and starts its loop at index 1 will silently return{" "}
        <code>0</code> for an array of all-negative numbers — no error, just a wrong answer.
      </p>
      <TipCallout>
        Ask Claude to trace the function line by line for a specific input, printing every
        variable at each iteration. This surfaces both the bad initial value and the skipped
        first index at once — faster than staring at the code trying to spot it.
      </TipCallout>

      <h2>Debugging flaky test failures</h2>
      <ul>
        <li>
          <strong>Failed assertion</strong> — e.g. expecting &ldquo;Welcome, John&rdquo; but
          getting &ldquo;Welcome, null&rdquo;: usually the API call hadn&apos;t resolved before
          the assertion ran. Fix by awaiting the response first.
        </li>
        <li>
          <strong>CI-only flakiness</strong> — often slower CI rendering plus animations or lazy
          loading. Fix by waiting for network idle and raising the CI-specific timeout.
        </li>
      </ul>

      <TryItCallout>
        Paste a failing test, its full CI error output, and the component it&apos;s testing. Ask
        Claude to find the race condition rather than just increasing the timeout — a longer
        timeout hides the bug instead of fixing it.
      </TryItCallout>

      <SeeAlso
        slug="best-practices"
        note="Every example above follows the bug template: expected, actual, recent changes, error, relevant files."
      />

      <h2>Quick check</h2>
      <Quiz
        question="A function returns 0 for every array of all-negative numbers, but never throws an error. Which debugging technique fits best?"
        options={[
          "Reading the full error message",
          "Step-by-step logic tracing",
          "Fixing a known bug from a description alone",
        ]}
        correctIndex={1}
      />
    </ContentPage>
  );
}
