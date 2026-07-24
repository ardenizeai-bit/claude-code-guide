import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Writing Perfect Subagents" };

export default async function WriteAgentPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="write-agent"
        locale={locale}
        translated
        dek="聚焦的范围胜过宽泛的能力——一个领域，一份职责，一种清晰的输出格式。"
      >
        <p>
          Subagent 的定义存放在 <code>.claude/agents/</code>（项目级，优先级更高）或{" "}
          <code>~/.claude/agents/</code>（个人级，优先级更低），形式是带 YAML frontmatter 的
          markdown 文件。只有 <code>name</code> 和 <code>description</code> 是必填项——
          其余都是可选的微调项。
        </p>

        <h2>名称冲突时的优先级顺序</h2>
        <p>
          托管设置（组织管理员）&gt; <code>--agents</code> CLI 参数 &gt;{" "}
          <code>.claude/agents/</code>（项目级）&gt; <code>~/.claude/agents/</code>（用户级）
          &gt; 插件提供的 agent。
        </p>

        <h2>模型选择指南</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>角色</th><th>模型</th><th>适用场景</th></tr>
            </thead>
            <tbody>
              <tr><td>编排者</td><td>Opus</td><td>复杂推理、架构设计、安全审计、多步骤规划</td></tr>
              <tr><td>主力干活者</td><td>Sonnet</td><td>功能实现、编写测试、文档撰写、大多数编码工作</td></tr>
              <tr><td>侦察兵</td><td>Haiku</td><td>快速探索、文件搜索、简单分类</td></tr>
            </tbody>
          </table>
        </div>

        <h2>系统提示词的设计原则</h2>
        <ul>
          <li>以&ldquo;你是一位 [角色] 专家&rdquo;开头，为它的推理方式定调</li>
          <li>给出编号的具体步骤，而不是&ldquo;要仔细全面&rdquo;这类含糊的原则</li>
          <li>始终定义确切的输出格式——否则每次调用返回的结构都会不一样</li>
          <li>明确加入这个 agent <em>不应该</em> 做什么的约束</li>
          <li>把说明控制在约 30 行以内——如果需要更多，就拆成两个 agent</li>
        </ul>

        <h2>该做 / 不该做</h2>
        <ul>
          <li><strong>该做的：</strong>一个 agent，一份职责；用能胜任的最便宜模型；最小权限的工具；严格的输出格式；防止范围蔓延的约束；正式依赖它之前先用边界情况测试。</li>
          <li><strong>不该做的：</strong>给一个只读 agent 授予所有工具；写含糊的描述；用 Opus 做纯粹的探索；跳过定义输出格式；为一次性任务专门搭建一个 agent（直接提示就够了）；把项目级的通用规则放进 agent 里，而不是放进 CLAUDE.md。</li>
        </ul>

        <WarningCallout locale={locale}>
          每一个 subagent 都会把自己的工作上下文对父会话隐藏起来。一个专门的测试编写 agent，
          意味着父会话再也无法整体地推理测试覆盖率——只有当某个领域确实和任务的其余部分
          完全隔离时，才应该把它拆分成一个独立的 agent。
        </WarningCallout>

        <h2>三个完整示例</h2>
        <ul>
          <li>
            <strong>安全评审员</strong> — Opus，只读工具加上{" "}
            <code>Bash(git diff *)</code>，<code>permissionMode: plan</code>，{" "}
            <code>isolation: worktree</code>，输出按 CRITICAL/HIGH/MEDIUM 分级
          </li>
          <li>
            <strong>测试编写者</strong> — Sonnet，Read/Write/Grep/Glob 加上限定范围的运行
            测试用 Bash；优先级顺序为错误路径 → 边界情况 → 集成测试 → 正常路径 → 回归测试
          </li>
          <li>
            <strong>文档撰写者</strong> — Sonnet，Read/Write/Grep/Glob；只为公开 API 编写文档，
            并且始终附带一个可运行的示例
          </li>
        </ul>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="write-agent"
      locale={locale}
      dek="Focused scope beats broad capability — one domain, one job, one clear output format."
    >
      <p>
        Subagent definitions live in <code>.claude/agents/</code> (project, higher priority) or{" "}
        <code>~/.claude/agents/</code> (personal, lower priority) as markdown files with YAML
        frontmatter. Only <code>name</code> and <code>description</code> are required — everything
        else is optional tuning.
      </p>

      <h2>Priority order when names collide</h2>
      <p>
        Managed settings (org admin) &gt; <code>--agents</code> CLI flag &gt;{" "}
        <code>.claude/agents/</code> (project) &gt; <code>~/.claude/agents/</code> (user) &gt;
        plugin agents.
      </p>

      <h2>Model selection guidance</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Role</th><th>Model</th><th>Use for</th></tr>
          </thead>
          <tbody>
            <tr><td>Orchestrator</td><td>Opus</td><td>Complex reasoning, architecture, security audits, multi-step planning</td></tr>
            <tr><td>Workhorse</td><td>Sonnet</td><td>Implementation, test writing, documentation, most coding</td></tr>
            <tr><td>Scout</td><td>Haiku</td><td>Fast exploration, file search, simple classification</td></tr>
          </tbody>
        </table>
      </div>

      <h2>System-prompt design principles</h2>
      <ul>
        <li>Open with &ldquo;You are a [role] specialist&rdquo; to frame its reasoning</li>
        <li>Give numbered process steps, not vague principles like &ldquo;be thorough&rdquo;</li>
        <li>Always define the exact output format — otherwise every invocation returns a different shape</li>
        <li>Add explicit constraints on what the agent must <em>not</em> do</li>
        <li>Keep instructions under ~30 lines — if you need more, split into two agents</li>
      </ul>

      <h2>Do / Don&apos;t</h2>
      <ul>
        <li><strong>Do</strong> — one agent, one job; the cheapest model that can do it; least-privilege tools; a strict output format; constraints against scope creep; test with edge cases before relying on it.</li>
        <li><strong>Don&apos;t</strong> — give every tool to a read-only agent; write a vague description; use Opus for plain exploration; skip the output format; build an agent for a one-off task (just prompt directly); put project-wide rules in the agent instead of CLAUDE.md.</li>
      </ul>

      <WarningCallout>
        Every subagent hides its working context from the parent. A dedicated test-writer agent
        means the parent can no longer reason holistically about test coverage — only split off an
        agent when the domain is genuinely isolated from the rest of the task.
      </WarningCallout>

      <h2>Three complete examples</h2>
      <ul>
        <li>
          <strong>Security Reviewer</strong> — Opus, read-only tools plus{" "}
          <code>Bash(git diff *)</code>, <code>permissionMode: plan</code>,{" "}
          <code>isolation: worktree</code>, severity-tiered CRITICAL/HIGH/MEDIUM output
        </li>
        <li>
          <strong>Test Writer</strong> — Sonnet, Read/Write/Grep/Glob plus scoped test-running
          Bash; prioritizes error paths → boundaries → integration → happy path → regression
        </li>
        <li>
          <strong>Documentation Writer</strong> — Sonnet, Read/Write/Grep/Glob; documents only
          public APIs, always with a runnable example
        </li>
      </ul>
    </ContentPage>
  );
}
