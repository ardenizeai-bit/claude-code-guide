export type Locale = "en" | "zh";
export const LOCALES: Locale[] = ["en", "zh"];
export const DEFAULT_LOCALE: Locale = "en";

export type PageEntry = {
  slug: string;
  title: string;
  section: string;
  order: number;
};

export const TOTAL_PAGES = 40;

export const SECTIONS = [
  "Start Here",
  "Fundamentals",
  "Customize",
  "Vibe Coding",
  "Multi-Agent",
  "Use Cases",
  "Reference",
  "QA & Testing",
  "Product Updates",
  "Ecosystem & News",
] as const;

export const SECTIONS_ZH: Record<(typeof SECTIONS)[number], string> = {
  "Start Here": "入门指南",
  Fundamentals: "基础知识",
  Customize: "自定义配置",
  "Vibe Coding": "氛围编程",
  "Multi-Agent": "多智能体",
  "Use Cases": "使用场景",
  "QA & Testing": "质量保证与测试",
  "Product Updates": "产品更新",
  Reference: "参考资料",
  "Ecosystem & News": "生态与资讯",
};

export function localizeSection(section: string, locale: Locale): string {
  if (locale === "en") return section;
  return SECTIONS_ZH[section as (typeof SECTIONS)[number]] ?? section;
}

export const PAGES: PageEntry[] = [
  { slug: "getting-started", title: "Getting Started", section: "Start Here", order: 1 },
  { slug: "overview", title: "Overview", section: "Start Here", order: 2 },
  { slug: "prompts", title: "Prompt Tips", section: "Start Here", order: 3 },

  { slug: "cli", title: "CLI & Flags", section: "Fundamentals", order: 4 },
  { slug: "slash", title: "Slash Commands", section: "Fundamentals", order: 5 },
  { slug: "keys", title: "Keyboard Shortcuts", section: "Fundamentals", order: 6 },
  { slug: "files", title: "File Locations", section: "Fundamentals", order: 7 },
  { slug: "debugging", title: "Debugging", section: "Fundamentals", order: 8 },
  { slug: "best-practices", title: "Best Practices", section: "Fundamentals", order: 9 },

  { slug: "customize", title: "How It Fits Together", section: "Customize", order: 10 },
  { slug: "claude-md", title: "CLAUDE.md", section: "Customize", order: 11 },
  { slug: "write-claude-md", title: "Writing CLAUDE.md", section: "Customize", order: 12 },
  { slug: "mcp", title: "MCP (Model Context Protocol)", section: "Customize", order: 13 },
  { slug: "skills", title: "Skills", section: "Customize", order: 14 },
  { slug: "write-skill", title: "Writing Perfect Skills", section: "Customize", order: 15 },
  { slug: "hooks", title: "Hooks", section: "Customize", order: 16 },
  { slug: "plugins", title: "Plugins", section: "Customize", order: 17 },

  { slug: "vibe-intro", title: "What is Vibe Coding?", section: "Vibe Coding", order: 18 },
  { slug: "vibe-patterns", title: "Prompt Patterns", section: "Vibe Coding", order: 19 },
  { slug: "vibe-workflow", title: "6-Phase Workflow", section: "Vibe Coding", order: 20 },

  { slug: "subagents", title: "Subagents", section: "Multi-Agent", order: 21 },
  { slug: "write-agent", title: "Writing Perfect Subagents", section: "Multi-Agent", order: 22 },
  { slug: "teams", title: "Agent Teams", section: "Multi-Agent", order: 23 },
  { slug: "write-team", title: "Writing Agent Teams", section: "Multi-Agent", order: 24 },
  { slug: "comparison", title: "Subagents vs Agent Teams", section: "Multi-Agent", order: 25 },

  { slug: "cowork", title: "Cowork", section: "Use Cases", order: 26 },
  { slug: "by-role", title: "Use Cases by Role", section: "Use Cases", order: 27 },
  { slug: "pm-guide", title: "Product Manager Guide", section: "Use Cases", order: 28 },
  { slug: "real-world", title: "Real-World Examples", section: "Use Cases", order: 29 },
  { slug: "cicd", title: "CI/CD & Automation", section: "Use Cases", order: 30 },
  { slug: "non-tech", title: "Non-Technical Use Cases", section: "Use Cases", order: 31 },

  { slug: "decision", title: "Decision Guide", section: "Reference", order: 32 },
  { slug: "insights", title: "Top Insights", section: "Reference", order: 33 },

  { slug: "qa-overview", title: "QA with Claude Code", section: "QA & Testing", order: 34 },
  { slug: "qa-test-cases", title: "Test Case Generation", section: "QA & Testing", order: 35 },
  { slug: "qa-playwright", title: "Playwright Automation", section: "QA & Testing", order: 36 },
  { slug: "qa-api-testing", title: "API Testing", section: "QA & Testing", order: 37 },
  { slug: "qa-edge-cases", title: "Edge Cases & Regression", section: "QA & Testing", order: 38 },

  { slug: "changelog", title: "Changelog", section: "Product Updates", order: 39 },

  { slug: "open-source-repos", title: "Open-Source Repos", section: "Ecosystem & News", order: 40 },
];

// Chinese page titles — used in the sidebar/H1/progress badge when locale === "zh".
export const TITLES_ZH: Record<string, string> = {
  "getting-started": "快速入门",
  overview: "概览",
  prompts: "提示技巧",
  cli: "命令行与参数",
  slash: "斜杠命令",
  keys: "键盘快捷键",
  files: "文件位置",
  debugging: "调试",
  "best-practices": "最佳实践",
  customize: "各层如何协同工作",
  "claude-md": "CLAUDE.md",
  "write-claude-md": "编写 CLAUDE.md",
  mcp: "MCP（模型上下文协议）",
  skills: "Skills",
  "write-skill": "编写完美的 Skill",
  hooks: "Hooks",
  plugins: "Plugins",
  "vibe-intro": "什么是 Vibe Coding？",
  "vibe-patterns": "提示模式",
  "vibe-workflow": "六阶段工作流",
  subagents: "Subagents",
  "write-agent": "编写完美的 Subagent",
  teams: "Agent Teams",
  "write-team": "编写 Agent Teams",
  comparison: "Subagents 对比 Agent Teams",
  cowork: "Cowork",
  "by-role": "按角色划分的使用场景",
  "pm-guide": "产品经理指南",
  "real-world": "真实案例",
  cicd: "CI/CD 与自动化",
  "non-tech": "非技术类使用场景",
  "qa-overview": "用 Claude Code 做 QA",
  "qa-test-cases": "测试用例生成",
  "qa-playwright": "Playwright 自动化",
  "qa-api-testing": "API 测试",
  "qa-edge-cases": "边界情况与回归测试",
  changelog: "变更日志",
  decision: "决策指南",
  insights: "核心洞察",
  "open-source-repos": "开源仓库",
};

export function localizeTitle(page: PageEntry, locale: Locale): string {
  if (locale === "en") return page.title;
  return TITLES_ZH[page.slug] ?? page.title;
}

export function getPageBySlug(slug: string): PageEntry | undefined {
  return PAGES.find((p) => p.slug === slug);
}

export function getAdjacentPages(order: number) {
  const prev = PAGES.find((p) => p.order === order - 1);
  const next = PAGES.find((p) => p.order === order + 1);
  return { prev, next };
}

export function getPagesBySection(section: string): PageEntry[] {
  return PAGES.filter((p) => p.section === section).sort((a, b) => a.order - b.order);
}
