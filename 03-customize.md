# Customize

## 1. How It Fits Together

Five customization layers, each solving a different problem — most people start with CLAUDE.md and add layers only as needed.

- **CLAUDE.md** loads at session start and holds rules, conventions, and past mistakes.
- **MCP servers** connect Claude to external systems (GitHub, Slack, a DB, etc.).
- **Hooks** fire deterministically on lifecycle events (SessionStart → UserPromptSubmit → PreToolUse → tool runs → PostToolUse → Stop).
- **Skills** package a repeatable multi-step workflow behind `/skill-name`.
- **Plugins** bundle any combination of the above into one shareable, installable unit.

**Which one do I need? (decision prompts from the guide)**

| Symptom | Fix |
|---|---|
| "Claude keeps making the same mistake" | Add the rule to CLAUDE.md — loads every session |
| "Claude needs data from GitHub/Slack/DB" | Connect an MCP server |
| "I repeat the same multi-step workflow" | Write a Skill, invoke with `/name` |
| "Something must ALWAYS run, no exceptions" | Use a Hook — fires at lifecycle events, can't be skipped |

**Recommended adoption order:** 1) CLAUDE.md (5 minutes, highest impact) → 2) MCP (start with GitHub) → 3) Skills (once you retype the same prompt a third time) → 4) Hooks (when you need guarantees) → 5) Plugins (to share your setup with teammates). Most solo developers reportedly only ever need CLAUDE.md plus one MCP server.

---

## 2. CLAUDE.md

CLAUDE.md is described as the "agent constitution" — a markdown file loaded automatically every session that shapes behavior, provides persistent memory, and states conventions/rules. It's injected as a user message rather than as forced system config, so Claude treats it as strong guidance it can still weigh against safety policy. The guide suggests keeping a file to roughly 150–200 instructions before effectiveness degrades.

**3-tier scope hierarchy:** `~/.claude/CLAUDE.md` (global, every project) → `.claude/CLAUDE.md` (project, checked into git) → `src/auth/CLAUDE.md`-style local files (scoped to a subdirectory).

**3-component formula:** Past Errors (highest leverage — document mistakes Claude has made so it stops repeating them), Conventions (naming, structure, patterns, tooling), and Rules (hard constraints, e.g. "tests before commits").

**CLAUDE.md vs. settings.json**

| | CLAUDE.md | settings.json |
|---|---|---|
| Purpose | Agent behavior and memory | Tool permissions and hooks |
| Format | Markdown (free-form) | JSON (structured) |
| Scope | Global / Project / Local | User / Project |
| Version control | Yes, checked in | User-level is local only |
| When loaded | Start of every session | At CLI startup |

Example file:

```markdown
# CLAUDE.md

## Past Errors
- Do NOT use `any` in TypeScript — always define proper types.
- Never run `rm -rf` without confirming the path first.

## Conventions
- Use kebab-case for file names, PascalCase for components.
- All API responses use { data, error } envelope pattern.
- Tests live next to source: Button.tsx → Button.test.tsx.

## Rules
- Always run `npm test` before committing.
- Maximum function length: 40 lines.
- No console.log in production code — use the logger.
```

The guide cites one team trimming a 10,000-line CLAUDE.md down to 1,500 focused lines and seeing instruction-following improve noticeably — its point being that concise, specific instructions beat exhaustive documentation.

---

## 3. Writing a Good CLAUDE.md

Because Claude starts every session with no built-in memory of your project, CLAUDE.md is the only way to give it context that survives across sessions and context compaction. The system wraps CLAUDE.md with a "this may or may not be relevant" framing, so vague or irrelevant rules tend to get silently ignored.

**File locations & priority (highest to lowest):**
1. `CLAUDE.local.md` — personal overrides, gitignored
2. `./CLAUDE.md` or `.claude/CLAUDE.md` — project rules, git-tracked
3. Parent-directory CLAUDE.md — for monorepos
4. `~/.claude/CLAUDE.md` — global personal rules
5. Child-directory CLAUDE.md — loaded on demand when entering that directory

**The 4 categories worth writing:**
1. **Code standards** — only what Claude can't infer from your existing code (e.g. "named exports only," "use zod at API boundaries").
2. **Project conventions** — directory structure, API contract shape, non-obvious architecture decisions.
3. **Common commands** — exact `npm run` / test / lint commands Claude can't guess.
4. **Collaboration preferences** — how Claude should work (read before editing, propose minimal fix first, don't commit until told).

**Instruction budget:** frontier models are described as reliably following roughly 150–200 instructions, with Claude Code's own system prompt already using ~50 of those — leaving roughly 100–150 slots for your file. Target 60–100 lines; treat 300 as a hard ceiling beyond which rules start being ignored uniformly. Emphasis words ("IMPORTANT," "YOU MUST") and placement at the start/end of the file are both said to improve adherence.

**Progressive disclosure via `@imports`:** keep CLAUDE.md short and reference detailed docs Claude reads only on demand:

```markdown
# CLAUDE.md (keep this SHORT — under 100 lines)
## Stack
- Next.js 15, TypeScript, Playwright, Supabase

## Commands
- `npm run dev` — start dev server
- `npm run test` — run tests
- `npx playwright test` — run E2E

## Key rules
- No raw SQL — use Supabase client
- Named exports only
- Run lint + test before committing

## Detailed docs (Claude reads these on demand)
- Architecture: @docs/architecture.md
- API conventions: @docs/api-conventions.md
- Testing patterns: @docs/testing-guide.md
- Database schema: @docs/database.md
```

`@README.md`, `@docs/api-conventions.md`, and `@~/.claude/my-overrides.md` are all valid `@import` targets; Claude reads the referenced file only when it needs that context, not at startup.

**CLAUDE.md vs. settings.json vs. AGENTS.md:** CLAUDE.md is described as an "employee handbook" Claude can judge the relevance of; settings.json as a firewall/machine config Claude cannot override; AGENTS.md as a cross-tool (Cursor/Copilot/Claude-agnostic) advisory standard. Rule of thumb given: security/data-loss-relevant rules → settings.json; rules that must also apply to other AI tools → AGENTS.md; everything else → CLAUDE.md.

**Anti-patterns:** using CLAUDE.md as a linter substitute ("use semicolons" belongs in ESLint/hooks, not here); accepting `/init`'s auto-generated draft without editing; stuffing 500+ lines into one file instead of using `@imports`; vague, unactionable rules like "write clean code."

**Complete examples given** cover a solo-developer file (~25 lines: stack, past mistakes with PR references, conventions, workflow gates), a team/monorepo file (architecture decisions, dated past incidents, review standards), a QA-focused file (testing conventions, QA workflow, past bugs, test commands), and a subdirectory file scoped to `src/auth/` (auth-specific security rules only).

**Lifecycle:** start with `/init` and trim aggressively → add rules organically as Claude makes real mistakes → prune quarterly (remove rules Claude no longer violates) → share via git, keep personal exceptions in `CLAUDE.local.md` → update immediately when architecture changes. The suggested acid test for any rule: "would removing this line cause Claude to make a mistake?"

---

## 4. MCP (Model Context Protocol)

MCP is described as "the USB-C port for AI" — a single open protocol letting Claude Code connect to any external tool, database, or service, with 3,000+ integrations cited by the source.

**4 primitives:** Tools (functions the model can call), Resources (structured data it can read — schemas, config, docs), Prompts (reusable templates servers expose), Apps (full application interfaces with auth/UI/multi-step interaction).

```bash
# Install an MCP server
claude mcp add github -- npx -y @modelcontextprotocol/server-github
claude mcp add playwright -- npx @anthropic/mcp-playwright

# Use in a session
> Use the GitHub MCP to list open PRs on this repo
> Use Playwright to test the login flow on localhost:3000
```

**High-value servers cited:** GitHub, Playwright, Supabase/Postgres, Slack, Jira/Linear, Sentry, and a persistent "Memory" key-value server. The "data gateway pattern" recommendation: expose a read-only MCP server with parameterized queries instead of giving Claude direct DB access, to enforce guardrails and block destructive operations.

**`.mcp.json`** at the project root declares which servers are available, team-shared and git-tracked:

```json
{
  "servers": {
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "your-token" }
    },
    "postgres": {
      "type": "stdio",
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": { "DATABASE_URL": "postgresql://..." }
    }
  }
}
```

**Server transport types:** `stdio` (local process, most common), `http` (remote server, POST/JSON), `sse` (server-sent events for streaming), `ws` (full-duplex WebSocket).

**Config locations:** `.mcp.json` (project, team-shared) · `~/.claude/.mcp.json` (personal, all projects) · `mcpServers` inline in a subagent's YAML (scoped to that agent only).

**Playwright MCP for QA:** install with `claude mcp add playwright npx @playwright/mcp@latest`; once registered, natural-language prompts can drive a real browser (navigate, fill forms, click, screenshot) without hand-written Selenium scripts.

**Scoping MCP to subagents** — reference an existing `.mcp.json` server by name, or define one inline in an agent's YAML:

```yaml
name: e2e-tester
description: Runs end-to-end browser tests
model: claude-sonnet-4-20250514
mcpServers:
  - playwright:
      type: stdio
      command: npx
      args: ["-y", "@playwright/mcp@latest"]
  - github
```

**Troubleshooting:** confirm a server's status is "ready" with `claude mcp list`; check required env vars/tokens are set; restart the session after adding a new server (tool discovery happens at session start); verify the server process is actually running if calls time out.

---

## 5. Skills

Skills are reusable `SKILL.md` files that bundle a prompt, tool permissions, and step-by-step instructions behind a single slash command, turning multi-step workflows into one-line invocations.

**Activation modes:** `manual` (invoked explicitly via `/slash-command`, can take arguments) vs. `auto` (fires automatically when Claude's read of the task matches the skill's `description` field — no slash command needed). Auto-activation depends entirely on how precise that description is; vague descriptions cause misfires or missed activations, and overlapping descriptions across skills can cause Claude to pick the wrong one.

```yaml
---
name: review-pr
description: >
  Review a pull request for bugs, style, and security.
  Activates when reviewing PRs, diffs, or when asked
  to check code quality.
trigger: auto
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash(gh pr view *)
  - Bash(gh pr diff *)
---

# PR Review Skill
1. Fetch the PR diff using `gh pr diff`.
2. Read every changed file in full for context.
3. Check for logic errors, style-guide violations, and security issues.
4. Output a markdown report with severity ratings.
```

**Frontmatter fields:** `name` and `description` are required; `trigger` (`manual`/`auto`), `allowed-tools` (whitelist — always prefer least privilege), `hooks` (lifecycle hooks during skill execution), `context: fork` (run the skill in a subagent to keep its work out of main context), and `disable-model-invocation: true` (for side-effect-heavy manual-only workflows like deploy/publish) are all optional.

**Skills vs. CLAUDE.md:** put universal, always-relevant rules in CLAUDE.md; put domain-specific, on-demand workflows (PR review, deployment, migration, test generation) in a Skill.

`$ARGUMENTS` captures everything typed after the slash command, e.g. `/fix-issue 1234` sets `$ARGUMENTS` to `"1234"`.

**High-value skills suggested:** `/review-pr`, `/fix-ci`, `/migrate-db`, `/refactor`, `/test-gen`, `/deploy-check`, `/doc-gen`.

Three worked examples are given: `/fix-issue` (manual trigger; reads a GitHub issue, implements a fix, writes a regression test, opens a PR), `/review-security` (auto trigger, read-only tools only, structured severity output), and `/generate-tests` (manual trigger; learns from existing test patterns before writing new tests).

---

## 6. Writing Perfect Skills

Every skill has YAML frontmatter (metadata controlling when/how it runs) plus a Markdown body (the actual instructions). The starter template:

```yaml
---
name: my-skill
description: >
  One sentence that tells Claude WHEN to activate this skill.
  Be specific — Claude matches this against the current task.
trigger: manual          # or "auto" for context-based activation
allowed-tools:            # least-privilege — only what the skill needs
  - Read
  - Grep
  - Glob
hooks:
  PostToolUse:
    - matcher: "Write"
      hooks:
        - type: command
          command: "npx eslint --fix"
---

## Context
## Steps
## Output format
## Constraints
```

**The description is everything for auto skills** — a vague one ("Helps with code review") either never fires or fires at the wrong time; a good one names concrete triggers and focus areas ("Review code changes for security vulnerabilities, performance issues, and style violations. Activates when reviewing PRs, diffs, or when asked to check code quality").

**Trigger rule of thumb:** if the skill changes files or has side effects, use `manual`; if it's read-only or a quality gate, `auto` is reasonable.

**Tool-permission guidance by skill type:**

| Skill type | Recommended tools |
|---|---|
| Code review | Read, Grep, Glob, `Bash(gh pr diff *)` |
| Test generation | Read, Write, Grep, Glob, `Bash(npm test *)` |
| Documentation | Read, Write, Grep, Glob |
| Deployment | Read, Grep, `Bash(npm run *)`, `Bash(git *)` |
| Exploration | Read, Grep, Glob (read-only) |

Always scope Bash to a command pattern (`Bash(npm test *)`) rather than granting unrestricted `Bash(*)`.

**Do:** write a trigger-rich description; scope tools to the minimum; define an explicit output format; add constraints on what the skill should *not* do; include a verification step; keep instructions under ~50 lines.
**Don't:** write a one-line description; grant all tools when only Read is needed; leave output format undefined; write a 200-line instruction novel; duplicate CLAUDE.md content; use `auto` for dangerous operations.

**Testing workflow:** start with `trigger: manual`, test with sample inputs, confirm the output format is right, and only then switch to `auto`. Dangerous skills (deploy, migrate, publish) should stay `manual` permanently.

Complete examples given: a read-only auto-triggered **Code Review** skill with severity-tiered output; a manual **Pre-Deploy Validation** skill (test suite, lint, git status, migrations, build) that outputs a Ready/Not Ready verdict; and an auto **Documentation Sync** skill with a `PostToolUse` hook that runs a docs-sync check after every write.

---

## 7. Hooks

Hooks are the deterministic layer: lifecycle event handlers that run unconditionally, unlike CLAUDE.md guidance that Claude interprets flexibly.

**Complete lifecycle:** `SessionStart` → `UserPromptSubmit` → `PreToolUse` → (tool executes) → `PostToolUse` → `Stop` → `SubagentStop` (when a spawned subagent finishes).

**4 handler types:** `command` (shell command, receives context via env vars + stdin JSON), `http` (POST to a URL with the hook payload as the body), `prompt` (inject text into the conversation), `agent` (spawn a subagent to handle the hook logic).

**Exit-code contract:** `0` = success, proceed; `1` = error, halt the operation (Claude sees stderr as context); `2` = modify — the hook's stdout replaces the original tool input/output.

```json
// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash", "handler": { "type": "command", "command": "python3 .claude/hooks/lint-bash.py" } }
    ],
    "PostToolUse": [
      { "matcher": "Write", "handler": { "type": "command", "command": "npx prettier --write $CLAUDE_FILE_PATH" } }
    ],
    "Stop": [
      { "matcher": "", "handler": { "type": "command", "command": "npm test" } }
    ]
  }
}
```

**Golden rule (per the guide):** use hooks for things that must *always* happen (formatting, linting, security checks); use CLAUDE.md for things that should *usually* happen. If you catch yourself writing "always do X" in CLAUDE.md, it probably belongs in a hook instead.

**Hook event reference (selected):** `SessionStart` (matcher: startup/resume/clear/compact, cannot block), `UserPromptSubmit` and `PreToolUse`/`PostToolUse` (can block via exit 2), `Stop` (can block), `SubagentStop`/`FileChanged` (cannot block), and the Agent-Teams-specific `TeammateIdle`/`TaskCreated`/`TaskCompleted` (can block).

**Environment variables available in every hook:** `$CLAUDE_PROJECT_DIR`, `$CLAUDE_CODE_REMOTE` ("true" in web/headless), `$CLAUDE_ENV_FILE` (write `KEY=VALUE` lines here — SessionStart only).

**stdin/stdout contract:** command hooks receive JSON on stdin (session id, cwd, event name, tool name/input) and can write JSON to stdout with a `hookSpecificOutput.permissionDecision` field (e.g. `"deny"` with a `reason`) on exit 0/2.

**Example handler scripts** given: `auto-lint.sh` (PostToolUse — runs eslint/ruff depending on file extension), `security-check.sh` (PreToolUse — blocks patterns like `rm -rf /`, `chmod 777`, `curl | bash`), `slack-notify.sh` (Stop — posts a webhook message when a session ends).

**Matcher patterns** are regexes tested against the tool name (or session type for SessionStart): `"Bash"` exact match, `"Edit|Write"` either, `"mcp__memory__.*"` any tool from a specific MCP server, `".*"` or `""` match everything.

**Async hooks:** set `"async": true` to fire in the background; async hooks can't block or modify the action (their exit code is ignored) but are suited to logging/telemetry that shouldn't slow the session.

**Debugging hooks:** check the script is executable (`chmod +x`), the shebang is correct, `jq` is installed if used, and that stderr on exit 1 is what surfaces back to Claude.

---

## 8. Plugins

Plugins are the packaging layer — they bundle skills, agents, hooks, and MCP servers into one installable, versioned unit.

```
my-plugin/
├── plugin.json          # Manifest: name, version, permissions
├── skills/
│   ├── review-pr/SKILL.md
│   └── fix-ci/SKILL.md
├── agents/
│   └── code-reviewer/agent.yaml
├── hooks/
│   ├── pre-commit.sh
│   └── post-write.sh
└── mcp-servers/
    └── custom-db/
        ├── index.js
        └── package.json
```

**Security note (per the guide):** plugins run with the permissions declared in their `plugin.json` manifest — review requested tool permissions before installing, since a plugin with Bash access can run arbitrary commands on your machine; only install from trusted sources.
