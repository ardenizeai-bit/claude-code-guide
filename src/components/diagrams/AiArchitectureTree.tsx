import type { Locale } from "@/lib/pages";

type TreeNode = {
  x: number;
  y: number;
  width: number;
  label: string;
  variant: "question" | "outcome";
};

const NODES: Record<Locale, TreeNode[]> = {
  en: [
    { x: 496, y: 30, width: 300, label: "Can deterministic rules or APIs solve it?", variant: "question" },
    { x: 110, y: 140, width: 220, label: "Workflow automation", variant: "outcome" },
    { x: 882, y: 140, width: 320, label: "Core need: answer, summarize, extract, classify, or draft?", variant: "question" },
    { x: 525, y: 250, width: 300, label: "Grounded in trusted / private / changing sources?", variant: "question" },
    { x: 380, y: 360, width: 220, label: "LLM + RAG", variant: "outcome" },
    { x: 670, y: 360, width: 260, label: "LLM app / prompt workflow", variant: "outcome" },
    { x: 1240, y: 250, width: 320, label: "Is the process predictable, steps definable?", variant: "question" },
    { x: 980, y: 360, width: 260, label: "AI workflow automation", variant: "outcome" },
    { x: 1500, y: 470, width: 320, label: "Must choose tools / sequence / adapt plan at runtime?", variant: "question" },
    { x: 1500, y: 580, width: 300, label: "Well-scoped agent w/ tools + RAG handle it?", variant: "question" },
    { x: 1270, y: 690, width: 220, label: "Single LLM agent", variant: "outcome" },
    { x: 1730, y: 690, width: 300, label: "Distinct specialist roles / parallel workstreams?", variant: "question" },
    { x: 1730, y: 800, width: 280, label: "Handoff sequence known in advance?", variant: "question" },
    { x: 1570, y: 910, width: 280, label: "Multi-agent + workflow orchestration", variant: "outcome" },
    { x: 1890, y: 910, width: 260, label: "Dynamic multi-agent orchestration", variant: "outcome" },
  ],
  zh: [
    { x: 496, y: 30, width: 300, label: "确定性的规则或 API 能解决这个问题吗？", variant: "question" },
    { x: 110, y: 140, width: 220, label: "工作流自动化", variant: "outcome" },
    { x: 882, y: 140, width: 320, label: "核心需求是回答、总结、提取、分类还是起草？", variant: "question" },
    { x: 525, y: 250, width: 300, label: "必须基于可信／私有／频繁变化的数据源吗？", variant: "question" },
    { x: 380, y: 360, width: 220, label: "LLM ＋ RAG", variant: "outcome" },
    { x: 670, y: 360, width: 260, label: "LLM 应用／提示词工作流", variant: "outcome" },
    { x: 1240, y: 250, width: 320, label: "流程是否可预测、步骤能明确定义？", variant: "question" },
    { x: 980, y: 360, width: 260, label: "AI 工作流自动化", variant: "outcome" },
    { x: 1500, y: 470, width: 320, label: "必须自行选择工具／排序步骤／调整计划吗？", variant: "question" },
    { x: 1500, y: 580, width: 300, label: "一个配备工具＋RAG 的 agent 能处理吗？", variant: "question" },
    { x: 1270, y: 690, width: 220, label: "单一 LLM agent", variant: "outcome" },
    { x: 1730, y: 690, width: 300, label: "有不同专家角色／可并行的工作线吗？", variant: "question" },
    { x: 1730, y: 800, width: 280, label: "交接顺序是否提前已知？", variant: "question" },
    { x: 1570, y: 910, width: 280, label: "多 agent ＋ 工作流编排", variant: "outcome" },
    { x: 1890, y: 910, width: 260, label: "动态多 agent 编排", variant: "outcome" },
  ],
};

// [fromIndex, toIndex, edgeLabel]
const EDGES: [number, number, "Yes" | "No"][] = [
  [0, 1, "Yes"],
  [0, 2, "No"],
  [2, 3, "Yes"],
  [2, 6, "No"],
  [3, 4, "Yes"],
  [3, 5, "No"],
  [6, 7, "Yes"],
  [6, 8, "No"],
  [8, 7, "No"],
  [8, 9, "Yes"],
  [9, 10, "Yes"],
  [9, 11, "No"],
  [11, 10, "No"],
  [11, 12, "Yes"],
  [12, 13, "Yes"],
  [12, 14, "No"],
];

const EDGE_LABEL: Record<Locale, Record<"Yes" | "No", string>> = {
  en: { Yes: "Yes", No: "No" },
  zh: { Yes: "是", No: "否" },
};

export function AiArchitectureTree({ locale = "en" }: { locale?: Locale }) {
  const nodes = NODES[locale];
  const viewW = 2060;
  const viewH = 970;

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-bg-raised p-4">
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="h-auto w-full min-w-[960px]"
        role="img"
        aria-label={
          locale === "zh"
            ? "AI 架构决策树：从确定性规则出发，依次判断是否需要 RAG、是否流程可预测、是否需要动态工具选择，以及是否需要多个专家 agent 协作，最终导向工作流自动化、LLM + RAG、AI 工作流自动化、单一 agent 或多 agent 系统"
            : "AI architecture decision tree: starting from deterministic rules, branching through RAG grounding, process predictability, dynamic tool selection, and specialist collaboration, to workflow automation, LLM + RAG, AI workflow automation, a single agent, or a multi-agent system"
        }
      >
        {EDGES.map(([fromIdx, toIdx, edgeLabel], i) => {
          const from = nodes[fromIdx];
          const to = nodes[toIdx];
          const x1 = from.x;
          const y1 = from.y + 20;
          const x2 = to.x;
          const y2 = to.y - 20;
          const midY = (y1 + y2) / 2;
          const isYes = edgeLabel === "Yes";

          return (
            <g key={i}>
              <path
                d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
                stroke="var(--color-border-strong)"
                strokeWidth="1.5"
                fill="none"
              />
              <rect
                x={(x1 + x2) / 2 - 16}
                y={midY - 9}
                width="32"
                height="18"
                rx="9"
                fill={isYes ? "var(--color-mint-soft)" : "var(--color-bg-sunken)"}
              />
              <text
                x={(x1 + x2) / 2}
                y={midY + 4}
                textAnchor="middle"
                className="font-mono text-[10px] font-semibold"
                fill={isYes ? "var(--color-mint)" : "var(--color-text-muted)"}
              >
                {EDGE_LABEL[locale][edgeLabel]}
              </text>
            </g>
          );
        })}

        {nodes.map((node, i) => {
          const isOutcome = node.variant === "outcome";
          const height = 44;
          return (
            <g key={i}>
              <rect
                x={node.x - node.width / 2}
                y={node.y - height / 2}
                width={node.width}
                height={height}
                rx="10"
                fill={isOutcome ? "var(--color-accent-soft)" : "var(--color-bg-sunken)"}
                stroke={isOutcome ? "var(--color-accent)" : "var(--color-border-strong)"}
                strokeWidth="1.5"
              />
              <foreignObject
                x={node.x - node.width / 2 + 8}
                y={node.y - height / 2}
                width={node.width - 16}
                height={height}
              >
                <div
                  className={`flex h-full items-center justify-center text-center text-[11px] leading-tight ${
                    isOutcome ? "font-semibold text-accent" : "text-text-primary"
                  }`}
                >
                  {node.label}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
