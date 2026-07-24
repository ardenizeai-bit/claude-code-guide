export type ChangelogEntry = {
  version: string;
  date: string;
  items: { text: string; text_zh?: string; breaking?: boolean }[];
};

// Illustrative version history — not verified against official release notes.
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "v2.1.186–2.1.198",
    date: "2026-07-01",
    items: [
      { text: "Claude Sonnet 5 becomes the default model", text_zh: "Claude Sonnet 5 成为默认模型" },
      { text: "Claude in Chrome reaches general availability", text_zh: "Claude in Chrome 正式全面上线" },
      { text: "Subagents run in the background by default", text_zh: "Subagents 现在默认在后台运行" },
      { text: "New /dataviz skill", text_zh: "新增 /dataviz skill" },
      { text: "MCP auth CLI: claude mcp login / logout", text_zh: "MCP 鉴权命令行：claude mcp login / logout" },
      { text: "Org-level default models", text_zh: "支持组织级别的默认模型设置" },
      { text: "/rewind can resume from before /clear", text_zh: "/rewind 现在可以恢复到 /clear 之前的状态" },
      { text: "Hook matchers with hyphens are now exact-match instead of substring-match", text_zh: "带连字符的 hook matcher 现在改为精确匹配，而不是子字符串匹配", breaking: true },
    ],
  },
  {
    version: "v2.1.182–2.1.185",
    date: "2026-06-20",
    items: [
      { text: "Auto-mode guardrails against destructive commands", text_zh: "自动模式新增针对破坏性命令的防护机制" },
      { text: "Model-deprecation warnings in print mode", text_zh: "打印模式下新增模型弃用提醒" },
      { text: "Longer stream-stall hint (20s vs. 10s)", text_zh: "流式响应停滞提示时间延长（从 10 秒改为 20 秒）" },
      { text: "Fixed a bug where thinking blocks could end a turn with no output", text_zh: "修复了思考过程区块可能导致一轮对话结束却没有任何输出的 bug" },
    ],
  },
  {
    version: "v2.1.173–2.1.181",
    date: "2026-06-17",
    items: [
      { text: "/config key=value", text_zh: "/config key=value" },
      { text: "Tool(param:value)-style permission rules, e.g. Agent(model:opus)", text_zh: "支持 Tool(param:value) 风格的权限规则，例如 Agent(model:opus)" },
      { text: "Nested .claude/skills directories", text_zh: "支持嵌套的 .claude/skills 目录" },
      { text: "Session titles generated in the conversation's language", text_zh: "会话标题会用对话所使用的语言生成" },
      { text: "New enforceAvailableModels managed setting", text_zh: "新增 enforceAvailableModels 托管配置项" },
      { text: "Reliability fixes for mid-stream connection drops and a WSL2 scroll bug", text_zh: "修复了流式传输中途断连的稳定性问题，以及一个 WSL2 滚动 bug" },
    ],
  },
  {
    version: "v2.1.166",
    date: "2026-06-06",
    items: [
      { text: "fallbackModel setting — up to three fallback models tried in order on overload", text_zh: "新增 fallbackModel 配置项——过载时最多依次尝试三个备用模型" },
      { text: "Glob patterns in deny rules", text_zh: "deny 规则支持 glob 匹配模式" },
      { text: "Hardened cross-session messaging so relayed messages can't carry the original user's authority", text_zh: "加固了跨会话消息机制，转发的消息不再携带原始用户的权限" },
      { text: "Version guardrails via requiredMinimumVersion / requiredMaximumVersion", text_zh: "新增 requiredMinimumVersion / requiredMaximumVersion 版本防护机制" },
      { text: "Windsurf renamed to Devin Desktop", text_zh: "Windsurf 更名为 Devin Desktop" },
      { text: "Parallel-tool-call fix so one failed Bash command no longer cancels other in-flight calls", text_zh: "修复了并行工具调用的问题，单个 Bash 命令失败不再取消其他正在进行的调用" },
    ],
  },
  {
    version: "v2.1.154–2.1.159",
    date: "2026-05-31",
    items: [
      { text: "Opus 4.8 becomes default with high effort", text_zh: "Opus 4.8 成为默认模型，并采用 high 推理强度" },
      { text: "Dynamic Workflows (/workflows)", text_zh: "新增 Dynamic Workflows（/workflows）" },
      { text: "Fast Mode on Opus 4.8", text_zh: "Opus 4.8 支持 Fast Mode" },
      { text: "claude --bg --exec", text_zh: "新增 claude --bg --exec" },
      { text: "Plugins in .claude/skills auto-load", text_zh: ".claude/skills 中的插件会自动加载" },
      { text: "Auto mode extended to Bedrock/Vertex/Foundry deployments", text_zh: "自动模式扩展支持 Bedrock/Vertex/Foundry 部署环境" },
    ],
  },
  {
    version: "v2.1.149",
    date: "2026-05-23",
    items: [
      { text: "Usage-insights breakdown by category (skills, subagents, plugins, MCP costs)", text_zh: "使用情况洞察现在按类别拆分（skills、subagents、plugins、MCP 相关成本）" },
      { text: "Keyboard navigation for diff scrolling", text_zh: "diff 滚动支持键盘导航" },
      { text: "Markdown task-list checkboxes render properly", text_zh: "Markdown 任务列表复选框现在能正确渲染" },
      { text: "Enterprise setting for Claude.ai cloud MCP connectors", text_zh: "新增面向企业版的 Claude.ai 云端 MCP 连接器设置" },
    ],
  },
  {
    version: "v2.1.148",
    date: "2026-05-22",
    items: [{ text: "Hotfix for a regression where the Bash tool always returned exit code 127", text_zh: "紧急修复了 Bash 工具总是返回退出码 127 的回归问题" }],
  },
  {
    version: "v2.1.147",
    date: "2026-05-22",
    items: [
      { text: "Pinned background sessions survive memory pressure longer than unpinned ones", text_zh: "被固定的后台会话在内存压力下比未固定的会话存活时间更长" },
      { text: "Renamed /simplify to /code-review — now reports correctness bugs at a chosen effort level and can post inline GitHub PR comments", text_zh: "/simplify 更名为 /code-review——现在能以指定的推理强度报告正确性 bug，并可以在 GitHub PR 中发表行内评论", breaking: true },
    ],
  },
  {
    version: "v2.1.143",
    date: "2026-05-15",
    items: [
      { text: "claude plugin disable now refuses when another enabled plugin depends on the target", text_zh: "当另一个已启用的插件依赖目标插件时，claude plugin disable 现在会拒绝执行" },
      { text: "Projected per-turn/per-invocation token cost shown in the plugin marketplace browser", text_zh: "插件市场浏览界面现在会显示每轮／每次调用的预计 token 成本" },
    ],
  },
  {
    version: "v2.1.142",
    date: "2026-05-07",
    items: [
      { text: "worktree.baseRef setting controlling where worktrees branch from", text_zh: "新增 worktree.baseRef 配置项，用于控制 worktree 从哪个分支创建" },
      { text: "Linux sandbox path override settings", text_zh: "新增 Linux 沙箱路径覆盖设置" },
      { text: "Hooks now receive an effort.level field and $CLAUDE_EFFORT env var", text_zh: "Hooks 现在会收到 effort.level 字段和 $CLAUDE_EFFORT 环境变量" },
    ],
  },
];
