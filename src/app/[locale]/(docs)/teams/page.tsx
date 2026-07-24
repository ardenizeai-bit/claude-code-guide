import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { MeshDiagram } from "@/components/diagrams/MeshDiagram";
import { WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Agent Teams" };

export default async function TeamsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="teams"
        locale={locale}
        translated
        dek="多个 Claude 实例之间的点对点协作——队友们能看到彼此的工作内容，而不只是向一个父会话汇报。"
      >
        <WarningCallout locale={locale}>
          Agent Teams 是一项实验性功能，随 Opus 4.6 一同推出。请预期它的 API 会发生变化，
          token 成本也会明显高于单一会话。建议先在非关键的工作流中试用。
        </WarningCallout>

        <MeshDiagram />

        <h2>架构</h2>
        <p>
          Team Lead 充当编排者，而 Agent A/B/C 之间通过 <code>SendMessage</code> 和一份共享
          任务列表直接通信——而不是每个结果都要绕经一个父会话才能传递。
        </p>
        <CodeBlock
          language="json"
          code={`// .claude/settings.json\n{\n  "enable_agent_teams": true,\n  "agent_teams": {\n    "max_agents": 5,\n    "model": "claude-opus-4-6-20260401"\n  }\n}`}
          locale={locale}
        />

        <h2>什么时候该用 Agent Teams</h2>
        <ul>
          <li>任务可以并行，但需要共享上下文</li>
          <li>各个 agent 必须在过程中协调，而不只是在最后汇总</li>
          <li>你需要实时了解彼此工作进度的对等可见性</li>
          <li>合并前的同行评审能带来实际价值</li>
        </ul>

        <h2>什么时候该跳过它</h2>
        <ul>
          <li>单个 agent 一次就能搞定</li>
          <li>子任务之间完全独立——改用 Subagents</li>
          <li>token 预算紧张——团队模式的成本大约是单一会话的 5–7 倍</li>
          <li>任务还处于探索阶段，尚无清晰的拆解方式</li>
        </ul>

        <h2>通信机制</h2>
        <ul>
          <li><code>SendMessage</code> — 发送给某个具名队友</li>
          <li><code>Broadcast</code> — 发送给所有人；成本随团队规模增长，请谨慎使用</li>
          <li>一份<strong>共享任务列表</strong> — 待处理 → 进行中 → 已完成，带依赖关系；队友会自行认领未被阻塞的任务</li>
          <li><strong>文件锁定</strong> — 防止两个队友同时写入同一个文件</li>
        </ul>

        <h2>显示模式</h2>
        <p>
          进程内模式（所有队友都在同一个终端里，用 <code>Shift+Down</code> 在它们之间切换）
          或分屏模式（每个队友各占一个独立的 tmux/iTerm2 面板）。默认值是 <code>auto</code>。
        </p>

        <h2>团队专属的 hooks</h2>
        <ul>
          <li><code>TeammateIdle</code> — 在某个队友即将进入空闲状态时触发；退出码 2 可以让它继续工作</li>
          <li><code>TaskCreated</code> — 退出码 2 会阻止任务创建并附带反馈</li>
          <li><code>TaskCompleted</code> — 退出码 2 会拒绝这次完成，并把反馈发回给该队友</li>
        </ul>

        <h2>成本与规模</h2>
        <p>
          每个队友都携带自己的上下文窗口，所以成本大致随团队规模线性增长。3–5 名队友是
          最佳区间；超过 5 名，协调开销就会超过并行带来的收益。目标是每个队友分到
          5–6 个任务。典型的总成本大约是单一会话的 5–7 倍。
        </p>

        <h2>清理</h2>
        <p>
          先让每个队友分别关闭，再让 team lead 去&ldquo;清理这个团队&rdquo;。共享状态
          （比如任务列表和文件锁）应该由 lead 负责追踪和安全移除，而不是由各个队友各自处理。
        </p>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="teams"
      locale={locale}
      dek="Peer-to-peer coordination between multiple Claude instances — teammates can see each other's work, not just report to a parent."
    >
      <WarningCallout>
        Agent Teams is an experimental feature, shipped alongside Opus 4.6. Expect API changes and
        meaningfully higher token cost than a single session. Try it on non-critical workflows
        first.
      </WarningCallout>

      <MeshDiagram />

      <h2>Architecture</h2>
      <p>
        A Team Lead acts as orchestrator, while Agents A/B/C communicate directly via{" "}
        <code>SendMessage</code> and a shared task list — rather than every result routing back
        through one parent.
      </p>
      <CodeBlock
        language="json"
        code={`// .claude/settings.json\n{\n  "enable_agent_teams": true,\n  "agent_teams": {\n    "max_agents": 5,\n    "model": "claude-opus-4-6-20260401"\n  }\n}`}
      />

      <h2>When to use Agent Teams</h2>
      <ul>
        <li>Tasks are parallelizable but need shared context</li>
        <li>Agents must coordinate mid-flight, not just at the end</li>
        <li>You need real-time peer visibility into each other&apos;s work</li>
        <li>Peer review before merge would add real value</li>
      </ul>

      <h2>When to skip them</h2>
      <ul>
        <li>A single agent can do it in one pass</li>
        <li>Sub-tasks are fully independent — use Subagents instead</li>
        <li>Token budget is tight — teams cost roughly 5–7x a single session</li>
        <li>The task is exploratory with no clear decomposition yet</li>
      </ul>

      <h2>Communication mechanisms</h2>
      <ul>
        <li><code>SendMessage</code> — to one named teammate</li>
        <li><code>Broadcast</code> — to everyone; cost scales with team size, use sparingly</li>
        <li>A <strong>shared task list</strong> — pending → in progress → completed, with dependencies; teammates self-claim unblocked work</li>
        <li><strong>File locking</strong> — prevents two teammates writing the same file at once</li>
      </ul>

      <h2>Display modes</h2>
      <p>
        In-process (all teammates in one terminal, <code>Shift+Down</code> to cycle between them)
        or split panes (each teammate in its own tmux/iTerm2 pane). Default is <code>auto</code>.
      </p>

      <h2>Team-specific hooks</h2>
      <ul>
        <li><code>TeammateIdle</code> — fires when a teammate is about to go idle; exit 2 keeps it working</li>
        <li><code>TaskCreated</code> — exit 2 blocks creation with feedback</li>
        <li><code>TaskCompleted</code> — exit 2 rejects the completion and sends feedback back to the teammate</li>
      </ul>

      <h2>Cost and sizing</h2>
      <p>
        Each teammate carries its own context window, so cost scales roughly linearly with team
        size. 3–5 teammates is the sweet spot; beyond 5, coordination overhead outweighs the
        parallelism gained. Aim for 5–6 tasks per teammate. Typical total cost runs ~5–7x a single
        session.
      </p>

      <h2>Cleanup</h2>
      <p>
        Ask individual teammates to shut down, then ask the lead to &ldquo;clean up the
        team.&rdquo; The lead — not individual teammates — tracks and safely removes shared state
        like the task list and file locks.
      </p>
    </ContentPage>
  );
}
