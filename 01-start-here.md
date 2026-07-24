# Start Here

## 1. Getting Started

Claude Code is described as an AI coding agent that runs in your terminal: you describe what you want, it reads your files, writes code, and iterates until the task is done.

**Install**

```bash
# macOS / Linux
curl -fsSL https://claude.ai/install.sh | bash

# or via npm
npm install -g @anthropic-ai/claude-code
```

Run `claude` inside any project directory. The first launch prompts you to log in.

**Your first session**

1. Open your project: `cd my-project && claude`
2. Describe what you want, specifically — e.g. "Fix the login bug on mobile" rather than "fix the bug"
3. Review and approve — Claude shows every edit before applying it; nothing happens without your OK
4. Iterate — give specific feedback if the result isn't right, and Claude adjusts

**Three shortcuts to learn immediately**

| Shortcut | Effect |
|---|---|
| `Shift+Tab` | Cycle between Normal, Auto-Accept, and Plan mode |
| `Ctrl+C` | Cancel the current operation (work is not lost) |
| `/compact` | Compress the conversation to free up context |

**Where to go next:** Prompt Tips → ecosystem Overview → CLI cheatsheet → Vibe Coding workflow.

---

## 2. Overview

Per the site, Claude Code launched in February 2025 as Anthropic's agentic coding tool, and the page cites adoption figures (135,000 commits/day across deployments, $1B+ in annualized revenue) that are the source site's own claims — treat these as unverified marketing figures rather than confirmed facts.

**The 7 extension layers** the site describes as making up the Claude Code ecosystem:

| Layer | Role | Nature |
|---|---|---|
| CLAUDE.md | Agent constitution / memory | Always-on |
| MCP | Universal tool/data integration protocol | External |
| Skills | Reusable markdown-driven task macros | On-demand |
| Hooks | Deterministic lifecycle event handlers | Automatic |
| Subagents | Isolated child sessions with context compression | Delegated |
| Agent Teams | Multi-agent orchestration for parallel work | Collaborative |
| Plugins | Packaged bundles of skills, hooks, agents, MCP servers | Packaged |

**Release timeline (as presented by the site):**
- Feb 2025 — Claude Code launches as a research preview
- May 2025 — MCP reaches 3,000+ integrations
- Jul 2025 — Subagents and Agent Teams ship
- Sep 2025 — Hooks and lifecycle events go GA
- Nov 2025 — Skills system and slash commands
- Feb 2026 — cited $1B annualized revenue milestone

---

## 3. Prompt Tips

Core prompting patterns the guide recommends, each contrasted with a weaker version:

1. **Be specific, not vague** — "Fix the failing test in auth.test.ts — the JWT mock returns undefined instead of a valid token" beats "Fix the tests."
2. **Give context with the task** — name the exact endpoint, library, and existing conventions (e.g. "Add a Redis cache to `/api/products`; we use ioredis and cache keys follow `product:{id}`").
3. **Let Claude plan; don't micromanage** — describe the outcome ("Rename `foo` to `bar` across the project, update tests and imports") rather than dictating each file/line edit.
4. **Use plan mode for risky changes** — `Shift+Tab` into plan mode before large refactors, and ask Claude to show the plan before making changes.
5. **Quick memory add** — prefix a line with `#` (e.g. `# We use pnpm, not npm. Lock file is pnpm-lock.yaml.`) to add a fast note to session memory instead of typing it as a normal prompt.
6. **Opus→Sonnet workflow** — `/model opus` for planning, then `/model sonnet` for execution, rather than coding the whole feature on one model.
7. **Pipe data for automation** — e.g. `npm test 2>&1 | claude -p "fix the failing tests"` instead of manually pasting logs.
8. **Don't just `/clear` a full context** — use `/compact` to summarize and free tokens while keeping learned context intact.

**Team & QA prompt patterns** it highlights:

- **QA test-case generation:** give explicit requirements and ask for boundary values (e.g. price 0, 0.01, 9999.99; quantity 0, 1, 100) formatted as a prioritized table.
- **QA flaky-test debugging:** paste the failing Playwright test, the CI error, and relevant context (e.g. React lazy loading) and ask Claude to find the race condition.
- **QA API validation:** ask for negative tests covering missing fields, invalid types, boundary values, SQL injection, and oversized payloads.
- **Team PR review:** ask for a structured review covering security, missing error handling, breaking API changes, and test-coverage gaps, formatted as a severity table.
- **Team shared context:** instruct Claude to read `CLAUDE.md` first, then implement a feature following the patterns already used elsewhere in the codebase.
