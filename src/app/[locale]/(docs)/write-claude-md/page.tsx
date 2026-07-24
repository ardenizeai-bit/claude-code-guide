import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { WarningCallout, TipCallout } from "@/components/Callout";
import { SeeAlso } from "@/components/SeeAlso";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Writing CLAUDE.md" };

export default async function WriteClaudeMdPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="write-claude-md"
        locale={locale}
        translated
        dek="Claude 每次会话都从一张白纸开始——CLAUDE.md 是唯一能跨越会话和压缩过程存活下来的上下文。"
      >
        <p>
          系统会用一种隐含的&ldquo;这可能相关，也可能不相关&rdquo;的方式来包装 CLAUDE.md，
          这就是为什么含糊的规则往往是被悄悄忽略，而不是被主动违反。在这里，具体性不是一种
          风格偏好——它是让这个文件真正起作用的前提。
        </p>

        <h2>文件位置，按优先级从高到低</h2>
        <ol>
          <li><code>CLAUDE.local.md</code> — 个人覆盖项，已加入 gitignore</li>
          <li><code>./CLAUDE.md</code> 或 <code>.claude/CLAUDE.md</code> — 项目规则，纳入 git 版本控制</li>
          <li>父级目录的 <code>CLAUDE.md</code> — 适用于 monorepo</li>
          <li><code>~/.claude/CLAUDE.md</code> — 全局个人规则</li>
          <li>子目录的 <code>CLAUDE.md</code> — 进入该目录时按需加载</li>
        </ol>

        <h2>值得写入的四大类内容</h2>
        <ul>
          <li><strong>代码规范</strong> — 只写 Claude 无法从现有代码中推断出的部分（例如&ldquo;只用具名导出&rdquo;、&ldquo;在 API 边界用 zod 做校验&rdquo;）</li>
          <li><strong>项目约定</strong> — 目录结构、API 契约的形状、不那么显而易见的架构决策</li>
          <li><strong>常用命令</strong> — Claude 无从猜测的确切测试／lint／build 命令</li>
          <li><strong>协作偏好</strong> — 你希望它如何工作（编辑前先阅读、先提出一个最小修复方案、未经告知不要提交）</li>
        </ul>

        <WarningCallout locale={locale}>
          指令预算是真实存在的。前沿模型大致能可靠遵循 150–200 条指令，而 Claude Code
          自身的系统提示词已经占用了大约 50 条——留给你的文件的大致只有 100–150 条的空间。
          目标控制在 60–100 行；把 300 行当作硬性上限，超过之后规则会被一律忽略，
          而不只是最新加入的那些。
        </WarningCallout>

        <SeeAlso
          slug="best-practices"
          locale={locale}
          note="来自团队实践手册的同一条规则：CLAUDE.md 保持在 200 行以内，细节通过 @filename 引入，而不是直接内联。"
        />

        <h2>通过 @imports 实现渐进式披露</h2>
        <p>
          让主文件保持简短，把细节推到 Claude 只在需要时才读取的文件里：
        </p>
        <CodeBlock
          language="markdown"
          code={`# CLAUDE.md (keep this SHORT — under 100 lines)\n## Stack\n- Next.js 15, TypeScript, Playwright, Supabase\n\n## Commands\n- \`npm run dev\` — start dev server\n- \`npm run test\` — run tests\n- \`npx playwright test\` — run E2E\n\n## Key rules\n- No raw SQL — use Supabase client\n- Named exports only\n- Run lint + test before committing\n\n## Detailed docs (Claude reads these on demand)\n- Architecture: @docs/architecture.md\n- API conventions: @docs/api-conventions.md\n- Testing patterns: @docs/testing-guide.md\n- Database schema: @docs/database.md`}
          locale={locale}
        />

        <h2>CLAUDE.md 与 settings.json 与 AGENTS.md 的对比</h2>
        <p>
          三者分工不同：CLAUDE.md 是 Claude 可以权衡取舍的指导性内容；settings.json 是
          Claude 无法覆盖的防火墙；AGENTS.md 是其他 AI 助手（Cursor、Copilot）也会读取的
          跨工具通用建议标准。经验法则——涉及安全或数据丢失风险的规则放进
          settings.json，需要跨工具统一生效的规则放进 AGENTS.md，其余的都放进 CLAUDE.md。
        </p>

        <h2>应避免的反模式</h2>
        <ul>
          <li>把 CLAUDE.md 当成 linter 的替代品——&ldquo;要用分号&rdquo;这类规则应该放进 ESLint 或 hook，而不是这里</li>
          <li>直接照单全收 <code>/init</code> 自动生成的草稿，不做任何精简</li>
          <li>把 500 行以上的内容全塞进一个文件，而不是通过 <code>@imports</code> 拆分</li>
          <li>含糊、无法落地执行的规则，比如&ldquo;写干净的代码&rdquo;</li>
        </ul>

        <TipCallout locale={locale}>
          检验任何一条规则的试金石：删掉这一行，真的会导致 Claude 犯错吗？如果不会，
          那它就是冗余内容——删掉它。
        </TipCallout>

        <h2>生命周期</h2>
        <p>
          从 <code>/init</code> 开始，然后大刀阔斧地精简。随着 Claude 真的犯下具体错误，
          再逐步、有机地添加规则。每季度清理一次——删掉它已经不再违反的规则。通过 git
          共享这个文件；个人的例外情况放进 <code>CLAUDE.local.md</code>。架构发生变化时
          立即更新它，而不是等到下一个方便的时机。
        </p>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="write-claude-md"
      locale={locale}
      dek="Claude starts every session with a blank slate — CLAUDE.md is the only context that survives across sessions and compaction."
    >
      <p>
        The system wraps CLAUDE.md with an implicit &ldquo;this may or may not be relevant&rdquo;
        framing, which is why vague rules tend to get quietly ignored rather than actively broken.
        Specificity isn&apos;t a style preference here — it&apos;s what makes the file work at all.
      </p>

      <h2>File locations, highest priority first</h2>
      <ol>
        <li><code>CLAUDE.local.md</code> — personal overrides, gitignored</li>
        <li><code>./CLAUDE.md</code> or <code>.claude/CLAUDE.md</code> — project rules, git-tracked</li>
        <li>Parent-directory <code>CLAUDE.md</code> — for monorepos</li>
        <li><code>~/.claude/CLAUDE.md</code> — global personal rules</li>
        <li>Child-directory <code>CLAUDE.md</code> — loaded on demand when entering that directory</li>
      </ol>

      <h2>Four categories worth writing</h2>
      <ul>
        <li><strong>Code standards</strong> — only what Claude can&apos;t infer from your existing code (e.g. &ldquo;named exports only,&rdquo; &ldquo;validate with zod at API boundaries&rdquo;)</li>
        <li><strong>Project conventions</strong> — directory structure, API contract shape, non-obvious architecture decisions</li>
        <li><strong>Common commands</strong> — exact test/lint/build commands Claude has no way to guess</li>
        <li><strong>Collaboration preferences</strong> — how you want it to work (read before editing, propose a minimal fix first, don&apos;t commit until told)</li>
      </ul>

      <WarningCallout>
        Instruction budget is real. Frontier models reliably follow roughly 150–200 instructions
        total, and Claude Code&apos;s own system prompt already uses about 50 of those — leaving
        roughly 100–150 slots for your file. Target 60–100 lines; treat 300 as a hard ceiling
        beyond which rules start getting ignored uniformly, not just the newest ones.
      </WarningCallout>

      <SeeAlso
        slug="best-practices"
        note="Same rule from the team playbook: keep CLAUDE.md under 200 lines, and import detail via @filename instead of inlining it."
      />

      <h2>Progressive disclosure via @imports</h2>
      <p>
        Keep the main file short and push detail into files Claude only reads on demand:
      </p>
      <CodeBlock
        language="markdown"
        code={`# CLAUDE.md (keep this SHORT — under 100 lines)\n## Stack\n- Next.js 15, TypeScript, Playwright, Supabase\n\n## Commands\n- \`npm run dev\` — start dev server\n- \`npm run test\` — run tests\n- \`npx playwright test\` — run E2E\n\n## Key rules\n- No raw SQL — use Supabase client\n- Named exports only\n- Run lint + test before committing\n\n## Detailed docs (Claude reads these on demand)\n- Architecture: @docs/architecture.md\n- API conventions: @docs/api-conventions.md\n- Testing patterns: @docs/testing-guide.md\n- Database schema: @docs/database.md`}
      />

      <h2>CLAUDE.md vs. settings.json vs. AGENTS.md</h2>
      <p>
        Three different jobs: CLAUDE.md is guidance Claude can weigh; settings.json is a firewall
        Claude cannot override; AGENTS.md is a cross-tool advisory standard other AI assistants
        (Cursor, Copilot) also read. Rule of thumb — security or data-loss-relevant rules go in
        settings.json, rules that must apply across tools go in AGENTS.md, everything else goes
        in CLAUDE.md.
      </p>

      <h2>Anti-patterns to avoid</h2>
      <ul>
        <li>Using CLAUDE.md as a linter substitute — &ldquo;use semicolons&rdquo; belongs in ESLint or a hook, not here</li>
        <li>Accepting <code>/init</code>&apos;s auto-generated draft without editing it down</li>
        <li>Stuffing 500+ lines into one file instead of splitting via <code>@imports</code></li>
        <li>Vague, unactionable rules like &ldquo;write clean code&rdquo;</li>
      </ul>

      <TipCallout>
        The acid test for any rule: would removing this line actually cause Claude to make a
        mistake? If not, it&apos;s padding — cut it.
      </TipCallout>

      <h2>Lifecycle</h2>
      <p>
        Start with <code>/init</code> and trim it aggressively. Add rules organically as Claude
        makes real mistakes. Prune quarterly — remove rules it no longer violates. Share the file
        via git; keep personal exceptions in <code>CLAUDE.local.md</code>. Update it immediately
        when the architecture changes, not at the next convenient moment.
      </p>
    </ContentPage>
  );
}
