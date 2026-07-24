# Resources

## 1. Open-Source Repos for Teams

A curated list the site presents as 44 actively-maintained repos across 5 categories (star counts as reported by the source, last updated 20 Apr 2026 per the page — check GitHub directly for current numbers):

**AI Coding & Workflow Systems (19 repos)** — highlights include `n8n-io/n8n` (visual workflow automation), `ollama/ollama` (run LLMs locally), `anthropics/claude-code` (the official Claude Code repo), `langchain-ai/langchain`, `open-webui/open-webui`, `openai/openai-agents-python`, `microsoft/markitdown` (file-to-Markdown conversion for LLM pipelines), `block/goose`, and several community agent-harness projects (`affaan-m/everything-claude-code`, `obra/superpowers`, `shareAI-lab/learn-claude-code`, `gsd-build/get-shit-done`, `Yeachan-Heo/oh-my-claudecode`, `langchain-ai/deepagents`, `supermemoryai/supermemory`).

**Claude Code Ecosystem (11 repos)** — `anthropics/skills` (official public skills collection), `anthropics/knowledge-work-plugins` (plugin pack for Cowork), `garry-tan/gstack`, `DeusData/codebase-memory-mcp`, `addyosmani/agent-skills`, `zilliztech/claude-context`, `github/spec-kit`, `hesreallyhim/awesome-claude-code`, `VoltAgent/awesome-design-md`, `VoltAgent/awesome-agent-skills`, `rohitg00/awesome-claude-code-toolkit`.

**Project Management (3 repos)** — `makeplane/plane` (Jira alternative), `opf/openproject`, `leantime/leantime`.

**DevOps & CI/CD (7 repos)** — `louislam/uptime-kuma`, `grafana/grafana`, `nektos/act` (run GitHub Actions locally), `go-gitea/gitea`, `getsentry/sentry`, `lightpanda-io/browser`, `dagger/dagger`.

**Automation & Low-Code (4 repos)** — `nocodb/nocodb`, `appwrite/appwrite`, `appsmithorg/appsmith`, `Budibase/budibase`.

(Full repo descriptions and exact star counts are in the original page; treat the numbers as a snapshot rather than current, and verify directly on GitHub if precision matters.)

---

## 2. Changelog

A version history the site maintains for "this platform" (i.e., Claude Code). Selected entries, newest first:

- **v2.1.186–2.1.198 (1 Jul 2026)** — Claude Sonnet 5 becomes the default model; Claude in Chrome reaches general availability; subagents run in the background by default; a new `/dataviz` skill; MCP auth CLI (`claude mcp login`/`logout`); org-level default models; `/rewind` to resume from before `/clear`; a breaking change making hook matchers with hyphens exact-match instead of substring-match.
- **v2.1.182–2.1.185 (20 Jun 2026)** — auto-mode guardrails against destructive commands; model-deprecation warnings in print mode; longer stream-stall hint (20s vs. 10s); fixed a bug where thinking blocks could end a turn with no output.
- **v2.1.173–2.1.181 (17 Jun 2026)** — `/config key=value`; `Tool(param:value)`-style permission rules (e.g. `Agent(model:opus)`); nested `.claude/skills` directories; session titles generated in the conversation's language; an `enforceAvailableModels` managed setting; reliability fixes for mid-stream connection drops and a WSL2 scroll bug.
- **v2.1.166 (6 Jun 2026)** — `fallbackModel` setting (up to three fallback models tried in order on overload); glob patterns in deny rules; hardened cross-session messaging so relayed messages can't carry the original user's authority; version guardrails via `requiredMinimumVersion`/`requiredMaximumVersion`; Windsurf renamed to Devin Desktop; parallel-tool-call fix so one failed Bash command no longer cancels other in-flight calls.
- **v2.1.154–2.1.159 (31 May 2026)** — Opus 4.8 becomes default with high effort; Dynamic Workflows (`/workflows`); Fast Mode on Opus 4.8; `claude --bg --exec`; plugins in `.claude/skills` auto-load; Auto mode extended to Bedrock/Vertex/Foundry deployments.
- **v2.1.149 (23 May 2026)** — usage-insights breakdown by category (skills, subagents, plugins, MCP costs); keyboard navigation for diff scrolling; Markdown task-list checkboxes render properly; an enterprise setting for Claude.ai cloud MCP connectors.
- **v2.1.148 (22 May 2026)** — hotfix for a regression where the Bash tool always returned exit code 127.
- **v2.1.147 (22 May 2026)** — pinned background sessions survive memory pressure longer than unpinned ones; breaking rename of `/simplify` to `/code-review` (now reports correctness bugs at a chosen effort level and can post inline GitHub PR comments).
- **v2.1.143 (15 May 2026)** — `claude plugin disable` now refuses when another enabled plugin depends on the target; projected per-turn/per-invocation token cost shown in the plugin marketplace browser.
- **v2.1.142 (7 May 2026)** — `worktree.baseRef` setting controlling where worktrees branch from; Linux sandbox path override settings; hooks now receive an `effort.level` field and `$CLAUDE_EFFORT` env var.
- **v1.0.0 (8 Apr 2026)** — initial release of the reference site itself: 34 pages, an Open-Source Repos list, a Version Control guide, and this changelog.

(Version numbers, dates, and feature claims above are exactly as presented on the source site; they have not been independently verified against Anthropic's own release notes.)
