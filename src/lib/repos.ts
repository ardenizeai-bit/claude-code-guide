export type RepoCategory =
  | "AI Coding & Workflow Systems"
  | "Claude Code Ecosystem"
  | "Project Management"
  | "DevOps & CI/CD"
  | "Automation & Low-Code";

export const REPO_CATEGORIES: RepoCategory[] = [
  "AI Coding & Workflow Systems",
  "Claude Code Ecosystem",
  "Project Management",
  "DevOps & CI/CD",
  "Automation & Low-Code",
];

export const REPO_CATEGORY_LABEL_ZH: Record<RepoCategory, string> = {
  "AI Coding & Workflow Systems": "AI 编码与工作流系统",
  "Claude Code Ecosystem": "Claude Code 生态",
  "Project Management": "项目管理",
  "DevOps & CI/CD": "DevOps 与 CI/CD",
  "Automation & Low-Code": "自动化与低代码",
};

export type Repo = {
  name: string;
  description: string;
  description_zh?: string;
  category: RepoCategory;
};

// Illustrative snapshot — verify current star counts and descriptions directly on GitHub.
export const REPOS: Repo[] = [
  { name: "n8n-io/n8n", description: "Visual workflow automation", description_zh: "可视化工作流自动化", category: "AI Coding & Workflow Systems" },
  { name: "ollama/ollama", description: "Run LLMs locally", description_zh: "在本地运行大语言模型", category: "AI Coding & Workflow Systems" },
  { name: "anthropics/claude-code", description: "The official Claude Code repo", description_zh: "Claude Code 官方仓库", category: "AI Coding & Workflow Systems" },
  { name: "langchain-ai/langchain", description: "Framework for building LLM applications", description_zh: "用于构建大语言模型应用的框架", category: "AI Coding & Workflow Systems" },
  { name: "open-webui/open-webui", description: "Extensible self-hosted AI chat UI", description_zh: "可扩展的自托管 AI 聊天界面", category: "AI Coding & Workflow Systems" },
  { name: "openai/openai-agents-python", description: "Lightweight agent orchestration framework", description_zh: "轻量级的 agent 编排框架", category: "AI Coding & Workflow Systems" },
  { name: "microsoft/markitdown", description: "File-to-Markdown conversion for LLM pipelines", description_zh: "面向大语言模型流水线的文件转 Markdown 工具", category: "AI Coding & Workflow Systems" },
  { name: "block/goose", description: "Local, extensible AI agent", description_zh: "本地运行、可扩展的 AI agent", category: "AI Coding & Workflow Systems" },
  { name: "affaan-m/everything-claude-code", description: "Community agent-harness project", description_zh: "社区维护的 agent 工作框架项目", category: "AI Coding & Workflow Systems" },
  { name: "obra/superpowers", description: "Community agent-harness project", description_zh: "社区维护的 agent 工作框架项目", category: "AI Coding & Workflow Systems" },
  { name: "gsd-build/get-shit-done", description: "Community agent-harness project", description_zh: "社区维护的 agent 工作框架项目", category: "AI Coding & Workflow Systems" },
  { name: "langchain-ai/deepagents", description: "Deep agent orchestration on LangChain", description_zh: "基于 LangChain 的深度 agent 编排", category: "AI Coding & Workflow Systems" },
  { name: "supermemoryai/supermemory", description: "Long-term memory layer for agents", description_zh: "面向 agent 的长期记忆层", category: "AI Coding & Workflow Systems" },

  { name: "anthropics/skills", description: "Official public skills collection", description_zh: "官方公开的 skills 合集", category: "Claude Code Ecosystem" },
  { name: "anthropics/knowledge-work-plugins", description: "Plugin pack for Cowork", description_zh: "面向 Cowork 的插件包", category: "Claude Code Ecosystem" },
  { name: "garry-tan/gstack", description: "Claude Code ecosystem tooling", description_zh: "Claude Code 生态工具", category: "Claude Code Ecosystem" },
  { name: "DeusData/codebase-memory-mcp", description: "MCP server for codebase memory", description_zh: "用于代码库记忆的 MCP 服务器", category: "Claude Code Ecosystem" },
  { name: "addyosmani/agent-skills", description: "Curated agent skill definitions", description_zh: "精选的 agent skill 定义合集", category: "Claude Code Ecosystem" },
  { name: "zilliztech/claude-context", description: "Context management tooling", description_zh: "上下文管理工具", category: "Claude Code Ecosystem" },
  { name: "github/spec-kit", description: "Spec-driven development toolkit", description_zh: "规格驱动开发工具包", category: "Claude Code Ecosystem" },
  { name: "hesreallyhim/awesome-claude-code", description: "Curated list of Claude Code resources", description_zh: "精选的 Claude Code 资源列表", category: "Claude Code Ecosystem" },
  { name: "rohitg00/awesome-claude-code-toolkit", description: "Curated toolkit list", description_zh: "精选工具包列表", category: "Claude Code Ecosystem" },

  { name: "makeplane/plane", description: "Jira alternative", description_zh: "Jira 的替代方案", category: "Project Management" },
  { name: "opf/openproject", description: "Open source project management", description_zh: "开源项目管理工具", category: "Project Management" },
  { name: "leantime/leantime", description: "Project management for nonlinear teams", description_zh: "面向非线性团队的项目管理工具", category: "Project Management" },

  { name: "louislam/uptime-kuma", description: "Self-hosted uptime monitoring", description_zh: "自托管的正常运行时间监控", category: "DevOps & CI/CD" },
  { name: "grafana/grafana", description: "Observability dashboards", description_zh: "可观测性仪表盘", category: "DevOps & CI/CD" },
  { name: "nektos/act", description: "Run GitHub Actions locally", description_zh: "在本地运行 GitHub Actions", category: "DevOps & CI/CD" },
  { name: "go-gitea/gitea", description: "Self-hosted git service", description_zh: "自托管的 git 服务", category: "DevOps & CI/CD" },
  { name: "getsentry/sentry", description: "Error and performance monitoring", description_zh: "错误与性能监控", category: "DevOps & CI/CD" },
  { name: "dagger/dagger", description: "Programmable CI/CD pipelines", description_zh: "可编程的 CI/CD 流水线", category: "DevOps & CI/CD" },

  { name: "nocodb/nocodb", description: "Open source Airtable alternative", description_zh: "开源的 Airtable 替代方案", category: "Automation & Low-Code" },
  { name: "appwrite/appwrite", description: "Backend-as-a-service platform", description_zh: "后端即服务平台", category: "Automation & Low-Code" },
  { name: "appsmithorg/appsmith", description: "Low-code internal tool builder", description_zh: "低代码内部工具搭建平台", category: "Automation & Low-Code" },
  { name: "Budibase/budibase", description: "Low-code platform for internal apps", description_zh: "面向内部应用的低代码平台", category: "Automation & Low-Code" },
];
