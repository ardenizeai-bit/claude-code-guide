export type InsightLayer = "Subagents" | "Agent Teams" | "CLAUDE.md" | "Hooks";

export const INSIGHT_LAYERS: InsightLayer[] = ["Subagents", "Agent Teams", "CLAUDE.md", "Hooks"];

export type Insight = {
  layer: InsightLayer;
  text: string;
  text_zh?: string;
};

export const INSIGHTS: Insight[] = [
  {
    layer: "Subagents",
    text: "Context compression is lossy — if exact line numbers, file paths, or code snippets need to survive back to the parent, tell the subagent to state them explicitly in its final answer rather than leaving them in working notes.",
    text_zh: "上下文压缩是有损的——如果确切的行号、文件路径或代码片段需要传回父会话，就要明确要求 subagent 在最终答案中直接写出来，而不是留在过程记录里。",
  },
  {
    layer: "Subagents",
    text: "Put shared definitions that multiple subagents need in CLAUDE.md, which every agent reads automatically, instead of repeating them across each agent's own description.",
    text_zh: "把多个 subagent 都需要的共享定义放进 CLAUDE.md——每个 agent 都会自动读取它——而不是在每个 agent 各自的描述里重复一遍。",
  },
  {
    layer: "Subagents",
    text: "Specialization trades off against breadth — an agent scoped to one file won't catch a cross-module issue like an auth bypass spanning three files.",
    text_zh: "专精和广度是有权衡的——一个只关注单个文件的 agent，抓不住像跨三个文件的鉴权绕过这样的跨模块问题。",
  },
  {
    layer: "Agent Teams",
    text: "Plan before you team. Teams shine on genuinely parallelizable work with independent units; teams that collide on the same files waste more tokens than they save.",
    text_zh: "组队之前先规划。团队模式在真正可并行、彼此独立的工作单元上最出色；如果队员们撞在同一批文件上，浪费的 token 会比省下来的更多。",
  },
  {
    layer: "Agent Teams",
    text: "Put explicit acceptance criteria in the team definition so every member shares the same idea of \"done.\"",
    text_zh: "在团队定义中写明确的验收标准，让每个成员对&ldquo;完成&rdquo;的理解保持一致。",
  },
  {
    layer: "Agent Teams",
    text: "Use file locking, or partition work by directory, to prevent two agents silently overwriting or conflicting on the same file.",
    text_zh: "使用文件锁定，或者按目录划分工作范围，避免两个 agent 在同一个文件上互相悄悄覆盖或产生冲突。",
  },
  {
    layer: "CLAUDE.md",
    text: "Write it as guidance, not commands — \"prefer early returns over deep nesting\" adapts better to edge cases than \"always use early returns.\"",
    text_zh: "把它写成指导性建议，而不是命令——&ldquo;优先用提前 return，而不是深层嵌套&rdquo;比&ldquo;必须始终使用提前 return&rdquo;更能适应边界情况。",
  },
  {
    layer: "CLAUDE.md",
    text: "When Claude repeats a mistake, the fix is usually a new line in CLAUDE.md, not a longer prompt — treat it as a living document updated every time a recurring behavior gets corrected.",
    text_zh: "当 Claude 重复犯同一个错误时，通常的解决办法是在 CLAUDE.md 里加一行，而不是把提示词写得更长——把它当作一份活文档，每次纠正一个反复出现的行为，就更新一次。",
  },
  {
    layer: "Hooks",
    text: "Hooks guarantee execution — unlike CLAUDE.md guidance Claude might interpret loosely, a hook's deterministic code runs on every matching event. Use hooks for things that must happen, not things that are merely suggested.",
    text_zh: "Hooks 能保证一定会执行——不同于 Claude 可能会宽松解读的 CLAUDE.md 指导，hook 的确定性代码会在每一个匹配的事件上运行。把 hooks 用在必须发生的事情上，而不是仅仅建议发生的事情上。",
  },
  {
    layer: "Hooks",
    text: "settings.json-defined hooks run outside Claude's own context and can't be overridden by prompt injection — a reasonable place to enforce security boundaries like blocking dangerous commands or requiring commit signing.",
    text_zh: "在 settings.json 中定义的 hooks 运行在 Claude 自身上下文之外，无法被提示词注入攻击覆盖——这是一个适合用来强制执行安全边界的地方，比如拦截危险命令或要求提交签名。",
  },
];
