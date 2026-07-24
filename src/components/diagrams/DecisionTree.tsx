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
    { x: 500, y: 30, width: 260, label: "Always know this about the project?", variant: "question" },
    { x: 140, y: 130, width: 200, label: "CLAUDE.md", variant: "outcome" },
    { x: 620, y: 130, width: 260, label: "Connects to an external system?", variant: "question" },
    { x: 380, y: 230, width: 180, label: "MCP server", variant: "outcome" },
    { x: 740, y: 230, width: 260, label: "Repeatable multi-step workflow?", variant: "question" },
    { x: 540, y: 330, width: 180, label: "A Skill", variant: "outcome" },
    { x: 860, y: 330, width: 280, label: "Must always run, no exceptions?", variant: "question" },
    { x: 660, y: 430, width: 180, label: "A Hook", variant: "outcome" },
    { x: 980, y: 430, width: 280, label: "Workers must talk mid-task?", variant: "question" },
    { x: 850, y: 530, width: 200, label: "Agent Teams", variant: "outcome" },
    { x: 1090, y: 530, width: 200, label: "Subagents", variant: "outcome" },
  ],
  zh: [
    { x: 500, y: 30, width: 260, label: "需要每次会话都记住这件事吗？", variant: "question" },
    { x: 140, y: 130, width: 200, label: "CLAUDE.md", variant: "outcome" },
    { x: 620, y: 130, width: 260, label: "需要连接外部系统吗？", variant: "question" },
    { x: 380, y: 230, width: 180, label: "MCP 服务器", variant: "outcome" },
    { x: 740, y: 230, width: 260, label: "是可重复的多步骤工作流吗？", variant: "question" },
    { x: 540, y: 330, width: 180, label: "一个 Skill", variant: "outcome" },
    { x: 860, y: 330, width: 280, label: "必须始终执行，没有例外吗？", variant: "question" },
    { x: 660, y: 430, width: 180, label: "一个 Hook", variant: "outcome" },
    { x: 980, y: 430, width: 280, label: "各个工作者需要在过程中互相沟通吗？", variant: "question" },
    { x: 850, y: 530, width: 200, label: "Agent Teams", variant: "outcome" },
    { x: 1090, y: 530, width: 200, label: "Subagents", variant: "outcome" },
  ],
};

// [fromIndex, toIndex, edgeLabel]
const EDGES: [number, number, "Yes" | "No"][] = [
  [0, 1, "Yes"],
  [0, 2, "No"],
  [2, 3, "Yes"],
  [2, 4, "No"],
  [4, 5, "Yes"],
  [4, 6, "No"],
  [6, 7, "Yes"],
  [6, 8, "No"],
  [8, 9, "Yes"],
  [8, 10, "No"],
];

const EDGE_LABEL: Record<Locale, Record<"Yes" | "No", string>> = {
  en: { Yes: "Yes", No: "No" },
  zh: { Yes: "是", No: "否" },
};

export function DecisionTree({ locale = "en" }: { locale?: Locale }) {
  const nodes = NODES[locale];
  const viewW = 1200;
  const viewH = 600;

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-bg-raised p-4">
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="h-auto w-full min-w-[720px]"
        role="img"
        aria-label={
          locale === "zh"
            ? "决策树：五个依次判断的是／否问题，分支导向六种结果——CLAUDE.md、MCP 服务器、Skill、Hook、Agent Teams 或 Subagents"
            : "Decision tree: five sequential yes/no questions branching to six outcomes — CLAUDE.md, MCP server, a Skill, a Hook, Agent Teams, or Subagents"
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
          const height = 40;
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
                  className={`flex h-full items-center justify-center text-center text-[12px] leading-tight ${
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
