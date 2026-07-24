import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Skills" };

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="skills"
        locale={locale}
        translated
        dek="把一套可重复的多步骤工作流，打包进一个斜杠命令背后。"
      >
        <p>
          Skill 是一个 <code>SKILL.md</code> 文件，把提示词、工具权限列表和分步说明打包在
          一起——把那些原本每次都要重新解释一遍的东西，变成一行命令就能调用。
        </p>

        <h2>两种激活模式</h2>
        <p>
          <strong>Manual</strong>（手动）skill 只有在通过 <code>/name</code> 显式调用时才会运行，
          并且可以接受参数。<strong>Auto</strong>（自动）skill 会在 Claude 判断当前任务与该
          skill 的描述相符时自行触发——不需要斜杠命令。自动激活能否成功，完全取决于这段描述
          写得有多精确；一段含糊的描述要么永远不触发，要么在错误的时机触发，而多个 skill 之间
          重叠的描述还可能让 Claude 选错。
        </p>

        <CodeBlock
          language="yaml"
          code={`---\nname: review-pr\ndescription: >\n  Review a pull request for bugs, style, and security.\n  Activates when reviewing PRs, diffs, or when asked\n  to check code quality.\ntrigger: auto\nallowed-tools:\n  - Read\n  - Grep\n  - Glob\n  - Bash(gh pr view *)\n  - Bash(gh pr diff *)\n---\n\n# PR Review Skill\n1. Fetch the PR diff using \`gh pr diff\`.\n2. Read every changed file in full for context.\n3. Check for logic errors, style-guide violations, and security issues.\n4. Output a markdown report with severity ratings.`}
          locale={locale}
        />

        <h2>Frontmatter 字段</h2>
        <p>
          <code>name</code> 和 <code>description</code> 是必填项。可选字段包括：{" "}
          <code>trigger</code>（<code>manual</code>/<code>auto</code>）、<code>allowed-tools</code>{" "}
          （一份白名单——始终优先遵循最小权限原则）、<code>hooks</code>（执行过程中触发的
          生命周期 hooks）、<code>context: fork</code>（在 subagent 中运行，让工作内容不
          进入主上下文），以及 <code>disable-model-invocation: true</code>（适用于部署、
          发布这类副作用较大、只能手动触发的工作流）。
        </p>

        <WarningCallout locale={locale}>
          Skills 与 CLAUDE.md 的区别：通用的、始终相关的规则属于 CLAUDE.md。特定领域的、
          按需触发的工作流——PR 评审、部署、迁移、测试生成——属于 Skill。把两者混在一起，
          会让二者都更难维护。
        </WarningCallout>

        <h2>参数</h2>
        <p>
          <code>$ARGUMENTS</code> 会捕获斜杠命令后面输入的所有内容。运行{" "}
          <code>/fix-issue 1234</code> 会把 <code>$ARGUMENTS</code> 设为{" "}
          <code>&quot;1234&quot;</code>。
        </p>

        <h2>最值得优先构建的高价值 skill</h2>
        <p>
          <code>/review-pr</code>、<code>/fix-ci</code>、<code>/migrate-db</code>、{" "}
          <code>/refactor</code>、<code>/test-gen</code>、<code>/deploy-check</code>、{" "}
          <code>/doc-gen</code>。
        </p>

        <h2>三个实战模式</h2>
        <ul>
          <li>
            <strong>/fix-issue</strong>（手动）— 读取一个 GitHub issue，实现修复，
            编写回归测试，并打开一个 PR
          </li>
          <li>
            <strong>/review-security</strong>（自动，仅使用只读工具）— 对每一次相关的
            diff 输出结构化的严重程度评估
          </li>
          <li>
            <strong>/generate-tests</strong>（手动）— 在编写新测试之前，先学习现有的测试模式
          </li>
        </ul>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="skills"
      locale={locale}
      dek="Package a repeatable multi-step workflow behind a single slash command."
    >
      <p>
        A Skill is a <code>SKILL.md</code> file bundling a prompt, a tool permission list, and
        step-by-step instructions — turning something you&apos;d otherwise re-explain every time
        into a one-line invocation.
      </p>

      <h2>Two activation modes</h2>
      <p>
        <strong>Manual</strong> skills only run when explicitly invoked with <code>/name</code>{" "}
        and can take arguments. <strong>Auto</strong> skills fire on their own whenever Claude&apos;s
        read of the current task matches the skill&apos;s description — no slash command needed.
        Auto-activation lives or dies on how precise that description is; a vague one either never
        fires or fires at the wrong moment, and overlapping descriptions across skills can make
        Claude pick the wrong one.
      </p>

      <CodeBlock
        language="yaml"
        code={`---\nname: review-pr\ndescription: >\n  Review a pull request for bugs, style, and security.\n  Activates when reviewing PRs, diffs, or when asked\n  to check code quality.\ntrigger: auto\nallowed-tools:\n  - Read\n  - Grep\n  - Glob\n  - Bash(gh pr view *)\n  - Bash(gh pr diff *)\n---\n\n# PR Review Skill\n1. Fetch the PR diff using \`gh pr diff\`.\n2. Read every changed file in full for context.\n3. Check for logic errors, style-guide violations, and security issues.\n4. Output a markdown report with severity ratings.`}
      />

      <h2>Frontmatter fields</h2>
      <p>
        <code>name</code> and <code>description</code> are required. Optional fields:{" "}
        <code>trigger</code> (<code>manual</code>/<code>auto</code>), <code>allowed-tools</code>{" "}
        (a whitelist — always prefer least privilege), <code>hooks</code> (lifecycle hooks that
        fire during execution), <code>context: fork</code> (run in a subagent to keep the work out
        of main context), and <code>disable-model-invocation: true</code> (for side-effect-heavy,
        manual-only workflows like deploy or publish).
      </p>

      <WarningCallout>
        Skills vs. CLAUDE.md: universal, always-relevant rules belong in CLAUDE.md. Domain-specific,
        on-demand workflows — PR review, deployment, migrations, test generation — belong in a
        Skill. Mixing the two makes both harder to maintain.
      </WarningCallout>

      <h2>Arguments</h2>
      <p>
        <code>$ARGUMENTS</code> captures everything typed after the slash command. Running{" "}
        <code>/fix-issue 1234</code> sets <code>$ARGUMENTS</code> to <code>&quot;1234&quot;</code>.
      </p>

      <h2>High-value skills worth building first</h2>
      <p>
        <code>/review-pr</code>, <code>/fix-ci</code>, <code>/migrate-db</code>,{" "}
        <code>/refactor</code>, <code>/test-gen</code>, <code>/deploy-check</code>,{" "}
        <code>/doc-gen</code>.
      </p>

      <h2>Three worked patterns</h2>
      <ul>
        <li>
          <strong>/fix-issue</strong> (manual) — reads a GitHub issue, implements a fix, writes a
          regression test, opens a PR
        </li>
        <li>
          <strong>/review-security</strong> (auto, read-only tools only) — structured severity
          output on every relevant diff
        </li>
        <li>
          <strong>/generate-tests</strong> (manual) — learns from existing test patterns before
          writing new ones
        </li>
      </ul>
    </ContentPage>
  );
}
