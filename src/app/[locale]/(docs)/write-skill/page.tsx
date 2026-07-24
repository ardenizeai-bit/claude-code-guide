import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { TipCallout, WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Writing Perfect Skills" };

export default async function WriteSkillPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="write-skill"
        locale={locale}
        translated
        dek="一个 skill 的好坏，取决于它的 description——这是自动激活的全部关键所在。"
      >
        <h2>入门模板</h2>
        <CodeBlock
          language="yaml"
          code={`---\nname: my-skill\ndescription: >\n  One sentence that tells Claude WHEN to activate this skill.\n  Be specific — Claude matches this against the current task.\ntrigger: manual          # or "auto" for context-based activation\nallowed-tools:            # least-privilege — only what the skill needs\n  - Read\n  - Grep\n  - Glob\nhooks:\n  PostToolUse:\n    - matcher: "Write"\n      hooks:\n        - type: command\n          command: "npx eslint --fix"\n---\n\n## Context\n## Steps\n## Output format\n## Constraints`}
          locale={locale}
        />

        <TipCallout locale={locale}>
          对自动 skill 来说，description 就是一切。&ldquo;帮助进行代码评审&rdquo;这种描述
          要么永远不触发，要么在错误的时机触发。而&ldquo;检查代码变更中的安全漏洞、性能问题
          和风格违规。在评审 PR、diff，或被要求检查代码质量时触发&rdquo;则给出了 Claude
          真正能够匹配的具体触发条件。
        </TipCallout>

        <h2>trigger 选择的经验法则</h2>
        <p>
          如果这个 skill 会修改文件或有副作用，用 <code>manual</code>。如果它只是只读的，
          或者纯粹是一道质量关卡，用 <code>auto</code> 是合理的。
        </p>

        <h2>按 skill 类型划分的工具权限</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>Skill 类型</th><th>推荐工具</th></tr>
            </thead>
            <tbody>
              <tr><td>代码评审</td><td>Read, Grep, Glob, <code>Bash(gh pr diff *)</code></td></tr>
              <tr><td>测试生成</td><td>Read, Write, Grep, Glob, <code>Bash(npm test *)</code></td></tr>
              <tr><td>文档编写</td><td>Read, Write, Grep, Glob</td></tr>
              <tr><td>部署</td><td>Read, Grep, <code>Bash(npm run *)</code>, <code>Bash(git *)</code></td></tr>
              <tr><td>探索型任务</td><td>Read, Grep, Glob（只读）</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          始终把 Bash 限定到具体的命令模式（<code>Bash(npm test *)</code>），
          而不是授予不受限制的 <code>Bash(*)</code>。
        </p>

        <h2>该做 / 不该做</h2>
        <ul>
          <li><strong>该做的：</strong>写一段触发条件丰富的描述，把工具权限限定到最小范围，明确定义输出格式，写清楚这个 skill <em>不应该</em> 做什么，加入一个验证步骤，并把说明控制在约 50 行以内。</li>
          <li><strong>不该做的：</strong>只写一行描述，明明只需要 Read 却授予所有工具，不定义输出格式，写一份 200 行的说明小说，重复 CLAUDE.md 里已有的内容，或者对危险操作使用 <code>auto</code>。</li>
        </ul>

        <WarningCallout locale={locale}>
          每个新 skill 都先用 <code>trigger: manual</code> 开始，用样本输入测试它，
          确认输出格式正确——只有到那时才切换成 <code>auto</code>。危险的 skill
          （部署、迁移、发布）应该永久保持手动模式。
        </WarningCallout>

        <h2>三个完整示例</h2>
        <ul>
          <li>一个只读、自动触发的<strong>代码评审</strong> skill，输出按严重程度分级的结果</li>
          <li>一个手动的<strong>部署前验证</strong> skill（测试、lint、git 状态、迁移、build），输出 Ready/Not Ready 的判定结果</li>
          <li>一个自动的<strong>文档同步</strong> skill，带有一个 <code>PostToolUse</code> hook，在每次写入后运行文档同步检查</li>
        </ul>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="write-skill"
      locale={locale}
      dek="A skill is only as good as its description — that's the field doing all the work for auto-activation."
    >
      <h2>Starter template</h2>
      <CodeBlock
        language="yaml"
        code={`---\nname: my-skill\ndescription: >\n  One sentence that tells Claude WHEN to activate this skill.\n  Be specific — Claude matches this against the current task.\ntrigger: manual          # or "auto" for context-based activation\nallowed-tools:            # least-privilege — only what the skill needs\n  - Read\n  - Grep\n  - Glob\nhooks:\n  PostToolUse:\n    - matcher: "Write"\n      hooks:\n        - type: command\n          command: "npx eslint --fix"\n---\n\n## Context\n## Steps\n## Output format\n## Constraints`}
      />

      <TipCallout>
        For auto skills, the description is everything. &ldquo;Helps with code review&rdquo; either
        never fires or fires at the wrong time. &ldquo;Review code changes for security
        vulnerabilities, performance issues, and style violations. Activates when reviewing PRs,
        diffs, or when asked to check code quality&rdquo; names concrete triggers Claude can
        actually match against.
      </TipCallout>

      <h2>Trigger rule of thumb</h2>
      <p>
        If the skill changes files or has side effects, use <code>manual</code>. If it&apos;s
        read-only or purely a quality gate, <code>auto</code> is reasonable.
      </p>

      <h2>Tool permissions by skill type</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Skill type</th><th>Recommended tools</th></tr>
          </thead>
          <tbody>
            <tr><td>Code review</td><td>Read, Grep, Glob, <code>Bash(gh pr diff *)</code></td></tr>
            <tr><td>Test generation</td><td>Read, Write, Grep, Glob, <code>Bash(npm test *)</code></td></tr>
            <tr><td>Documentation</td><td>Read, Write, Grep, Glob</td></tr>
            <tr><td>Deployment</td><td>Read, Grep, <code>Bash(npm run *)</code>, <code>Bash(git *)</code></td></tr>
            <tr><td>Exploration</td><td>Read, Grep, Glob (read-only)</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Always scope Bash to a specific command pattern (<code>Bash(npm test *)</code>) instead of
        granting unrestricted <code>Bash(*)</code>.
      </p>

      <h2>Do / Don&apos;t</h2>
      <ul>
        <li><strong>Do</strong> write a trigger-rich description, scope tools to the minimum, define an explicit output format, add constraints on what the skill should <em>not</em> do, include a verification step, and keep instructions under ~50 lines.</li>
        <li><strong>Don&apos;t</strong> write a one-line description, grant every tool when only Read is needed, leave the output format undefined, write a 200-line instruction novel, duplicate CLAUDE.md content, or use <code>auto</code> for dangerous operations.</li>
      </ul>

      <WarningCallout>
        Start every new skill with <code>trigger: manual</code>, test it against sample inputs,
        confirm the output format is right — only then switch to <code>auto</code>. Dangerous
        skills (deploy, migrate, publish) should stay manual permanently.
      </WarningCallout>

      <h2>Three complete examples</h2>
      <ul>
        <li>A read-only, auto-triggered <strong>Code Review</strong> skill with severity-tiered output</li>
        <li>A manual <strong>Pre-Deploy Validation</strong> skill (tests, lint, git status, migrations, build) outputting a Ready/Not Ready verdict</li>
        <li>An auto <strong>Documentation Sync</strong> skill with a <code>PostToolUse</code> hook that runs a docs-sync check after every write</li>
      </ul>
    </ContentPage>
  );
}
