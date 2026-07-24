import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { TreeDiagram } from "@/components/diagrams/TreeDiagram";
import { MeshDiagram } from "@/components/diagrams/MeshDiagram";
import { TokenCostBars } from "@/components/TokenCostBars";
import { AccordionRow } from "@/components/AccordionRow";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Subagents vs Agent Teams" };

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="comparison"
        locale={locale}
        translated
        dek="Subagents 与 Agent Teams 并排对比：拓扑结构图、常见模式，以及 token 成本的权衡取舍。"
      >
        <p>
          Subagents 和 Agent Teams 都能让 Claude Code 启动额外的上下文窗口来处理一个问题。
          区别在于拓扑结构：subagent 树由单一的编排者把工作向下分派，而 agent team 则是一张
          由多个对等节点组成的网状结构，彼此直接通信。
        </p>

        <div className="grid grid-cols-1 gap-6 rounded-lg border border-border bg-bg-raised p-6 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Subagents — 树状结构
            </span>
            <TreeDiagram />
            <p className="text-center text-sm text-text-secondary">
              一个编排者把任务分派给相互隔离的子节点，每个子节点各自返回一份压缩结果。
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Agent Teams — 网状结构
            </span>
            <MeshDiagram />
            <p className="text-center text-sm text-text-secondary">
              对等节点直接协商，共享状态，没有单一的控制中心。
            </p>
          </div>
        </div>

        <h2>模式</h2>
        <div className="flex flex-col gap-2">
          <AccordionRow title="任务分派与汇报" defaultOpen>
            编排者把一项工作拆成互相独立的若干块，分派给各个 subagent，
            再收集每一个返回的压缩摘要。最适合子任务之间不需要看到彼此工作内容的情形。
          </AccordionRow>
          <AccordionRow title="对等协商">
            团队中的 agent 可以直接对彼此的输出提出建议、批评并修改——
            当正确答案取决于协调多个视角时（例如一位评审者和一位实现者来回讨论），
            这种模式很有用。
          </AccordionRow>
          <AccordionRow title="共享草稿区">
            团队成员读写同一份共用的工作文件，让状态可以跨轮次持续存在，
            而不需要每次都重新解释一遍——用一定程度的隔离性换取连续性。
          </AccordionRow>
          <AccordionRow title="升级交接">
            当一个 subagent 达到深度限制，或遇到一个超出其权限范围的决策时，
            可以把控制权交还给父会话，由父会话来解决问题，或者带着更多上下文重新委派任务。
          </AccordionRow>
        </div>

        <h2>Token 成本</h2>
        <p>
          协调是有代价的。循环中每多一个 agent，就会多一份自己的上下文窗口，
          而网状拓扑尤其容易比严格的树状结构重复共享更多状态——随着 agent 数量增加，
          相对成本会迅速攀升。
        </p>
        <TokenCostBars locale={locale} />
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="comparison"
      locale={locale}
      dek="Subagents vs. Agent Teams, side by side: the topology diagram, common patterns, and the token-cost tradeoff."
    >
      <p>
        Subagents and Agent Teams both let Claude Code spin up additional context windows to work
        on a problem. The difference is topology: a subagent tree hands work down from a single
        orchestrator, while an agent team is a mesh of peers that communicate directly with each
        other.
      </p>

      <div className="grid grid-cols-1 gap-6 rounded-lg border border-border bg-bg-raised p-6 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
            Subagents — Tree
          </span>
          <TreeDiagram />
          <p className="text-center text-sm text-text-secondary">
            One orchestrator delegates to isolated children, each returning a compressed result.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
            Agent Teams — Mesh
          </span>
          <MeshDiagram />
          <p className="text-center text-sm text-text-secondary">
            Peers negotiate directly, sharing state without a single point of control.
          </p>
        </div>
      </div>

      <h2>Patterns</h2>
      <div className="flex flex-col gap-2">
        <AccordionRow title="Task-and-report" defaultOpen>
          The orchestrator breaks a job into independent chunks, dispatches each to a subagent,
          and collects a compressed summary from each. Best when subtasks don&apos;t need to see
          each other&apos;s work.
        </AccordionRow>
        <AccordionRow title="Peer negotiation">
          Agents in a team can propose, critique, and revise each other&apos;s output directly —
          useful when the right answer depends on reconciling multiple perspectives (e.g. a
          reviewer and an implementer going back and forth).
        </AccordionRow>
        <AccordionRow title="Shared scratchpad">
          Team members read and write to a common working file so state persists across turns
          without being re-explained — trades some isolation for continuity.
        </AccordionRow>
        <AccordionRow title="Escalation handoff">
          A subagent that hits its depth limit or a decision it isn&apos;t scoped to make can hand
          control back to the parent, which either resolves it or re-delegates with more context.
        </AccordionRow>
      </div>

      <h2>Token cost</h2>
      <p>
        Coordination isn&apos;t free. Every additional agent in the loop adds its own context
        window, and mesh topologies in particular tend to re-share more state than a strict tree
        does — the relative cost climbs quickly as agent count grows.
      </p>
      <TokenCostBars locale={locale} />
    </ContentPage>
  );
}
