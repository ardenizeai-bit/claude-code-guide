# Multi-Agent

## 1. Subagents

Subagents are isolated Claude instances spawned by a parent session, each with its own context window and tools; when one finishes, its result is *compressed* before returning to the caller — so the parent only pays for a summary, not the full exploration. The guide illustrates this with a hypothetical: a parent with 200k tokens left spawns a subagent that burns 80k tokens exploring a codebase, but the compressed result handed back might be only 3–5k tokens.

**Built-in subagent types:** **Explore Haiku** (Haiku model, read-only tools — fast codebase search), **Plan** (inherits parent model, read-only — used during `/plan` mode), **General-purpose** (inherits parent model and all tools — for complex multi-step work).

```yaml
# .claude/agents/security-reviewer.md
---
name: security-reviewer
model: claude-sonnet-4-20250514
tools:
  - Read
  - Grep
  - Glob
description: >
  Reviews code for bugs, style violations,
  and security issues. Returns a markdown
  report with severity ratings.
maxTurns: 15
permissionMode: plan
---
You are a security-focused code reviewer.
Scan every file for: SQL injection, XSS,
auth bypass, secrets in source, and unsafe
deserialization. Rate each finding as
critical / high / medium / low.
```

**Field reference (selected):** `name`/`description` required; `tools` (allowlist, inherits parent's tools if omitted), `disallowedTools` ("everything except X"), `model` (`sonnet`/`opus`/`haiku`/full ID/inherit), `permissionMode` (`default`/`acceptEdits`/`auto`/`dontAsk`/`bypassPermissions`/`plan`), `maxTurns`, `skills` (preloaded slash commands), `mcpServers` (scoped to that agent only), `hooks`, `memory` (`user`/`project`/`local`), `background`, `effort` (`low`/`medium`/`high`/`max` — max is Opus-only), `isolation: worktree` (own git branch/files), `color`, `initialPrompt` (for `--agent` headless invocation).

**Folder resolution order:** Managed (org admin) > CLI flag > `.claude/agents/` (project) > `~/.claude/agents/` (user) > Plugin agents.

**Invocation methods:** `@agent-name` (explicit), natural language (Claude auto-matches intent to descriptions), `/agent-name` (direct slash command), `--agent` flag (headless, CI/scripts).

**Practical rules:** give each subagent only the tools it needs (least privilege); spawning has ~5–10s overhead, so reserve subagents for exploration that would otherwise burn significant parent context; mix models — run cheap exploration on Haiku/Sonnet while the orchestrator stays on Opus.

**Reuse as Agent Teams teammates:** a subagent definition's tools, model, and body can be reused as a teammate — "Spawn a teammate using the security-reviewer agent type to audit auth" inherits the definition automatically.

**Error handling:** hitting `maxTurns` returns partial (still-compressed) results; a permission error (e.g. trying to write with read-only tools) bubbles to the parent; a subagent's own context auto-compacts transparently if it fills up mid-task.

---

## 2. Writing Perfect Subagents

Subagent definitions live in `.claude/agents/` (project, higher priority) or `~/.claude/agents/` (personal, lower priority), as Markdown files with YAML frontmatter. The core principle: **focused scope** — one domain, one job, one clear output format.

**Priority order when names collide:** Managed settings (org admin) > `--agents` CLI flag > `.claude/agents/` (project) > `~/.claude/agents/` (user) > Plugin agents.

Only `name` and `description` are required; everything else (tools, model, permissionMode, maxTurns, skills, mcpServers, hooks, memory, background, effort, isolation, color, initialPrompt) is optional — see the field table in `03-customize.md`'s Skills section for the analogous pattern.

**Model selection guidance:**

| Role | Model | Use for |
|---|---|---|
| Orchestrator | Opus | Complex reasoning, architecture, security audits, multi-step planning |
| Workhorse | Sonnet | Implementation, test writing, documentation, most coding |
| Scout | Haiku | Fast exploration, file search, simple classification |

**System-prompt design principles:** open with "You are a [role] specialist" to frame reasoning; give numbered *process* steps rather than vague principles ("be thorough"); always define the exact output format (otherwise every invocation returns a different shape); add explicit constraints (what the agent must *not* do); keep instructions under ~30 lines — if you need more, split into two agents.

**Do:** one agent = one job; cheapest model that can do the job; least-privilege tools; strict output format; constraints against scope creep; test with edge cases before relying on it.
**Don't:** give all tools to a read-only agent; write a vague description; use Opus for exploration; skip the output format; create an agent for a one-off task (just prompt directly); put project-wide rules in the agent instead of CLAUDE.md.

**Three complete examples** are given: a **Security Reviewer** (Opus, read-only + `Bash(git diff *)`, `permissionMode: plan`, `isolation: worktree`, severity-tiered CRITICAL/HIGH/MEDIUM output), a **Test Writer** (Sonnet, Read/Write/Grep/Glob + scoped test-running Bash, prioritizes error paths → boundaries → integration → happy path → regression), and a **Documentation Writer** (Sonnet, Read/Write/Grep/Glob, documents only public APIs with runnable examples).

**Context tradeoff noted:** every subagent hides its working context from the parent — e.g. a dedicated test-writer agent means the parent can't reason holistically about test coverage. Only create an agent when the domain is genuinely isolated.

---

## 3. Agent Teams

Agent Teams introduce peer-to-peer communication between multiple Claude instances — unlike subagents, teammates can observe each other's work and coordinate in real time instead of routing everything through one parent. The guide labels this feature **experimental**, shipped with Opus 4.6, expecting API changes and higher token costs — recommended for non-critical workflows first.

**Architecture:** a Team Lead (orchestrator) plus Agents A/B/C communicating directly via `SendMessage` and a shared task list.

```json
// .claude/settings.json
{
  "enable_agent_teams": true,
  "agent_teams": {
    "max_agents": 5,
    "model": "claude-opus-4-6-20260401"
  }
}
```

**When to use Agent Teams:** tasks are parallelizable with shared-context needs; agents must coordinate mid-flight; you need real-time peer visibility; peer review before merge adds value.
**When to skip them:** a single agent can do it in one pass; sub-tasks are fully independent (use subagents); token budget is tight (teams cost roughly 5–7x a single session per the guide); the task is exploratory with no clear decomposition.

**Communication mechanisms:** `SendMessage` (to one named teammate), `Broadcast` (to all — costs scale with team size, so use sparingly), a **shared task list** (states: pending → in progress → completed; tasks can have dependencies; teammates self-claim unassigned, unblocked work), and **file locking** (prevents two teammates writing the same file at once).

**Display modes:** in-process (all teammates in one terminal, `Shift+Down` to cycle) or split panes (each teammate in its own tmux/iTerm2 pane); default is `auto`.

**Team-specific hooks:** `TeammateIdle` (fires when a teammate is about to go idle; exit 2 keeps it working), `TaskCreated` (exit 2 blocks creation with feedback), `TaskCompleted` (exit 2 rejects the completion and sends feedback back to the teammate).

**Cost and sizing:** each teammate has its own context window, so cost scales roughly linearly with team size; 3–5 teammates is called the sweet spot; beyond 5, coordination overhead outweighs parallelism; aim for 5–6 tasks per teammate; typical total cost is cited as ~5–7x a single session.

**Cleanup:** ask individual teammates to shut down, then ask the lead to "clean up the team" — the lead (not individual teammates) tracks and safely removes shared state like the task list and file locks.

---

## 4. Writing Agent Teams

Requires Claude Code v2.1.32+, the Opus 4.6 model, and a feature flag:

```json
// ~/.claude/settings.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

**Golden rule: plan first.** Spawning a team from a vague prompt causes teammates to duplicate work, edit the same files, and waste tokens on conflicting effort. The recommended flow: run `/plan` to design the work, review/approve it, then hand the approved plan to a team with named roles, assigned files, and communication triggers.

**Writing a team prompt (no YAML needed — plain natural language, but structured):**
1. Name each teammate and their role (helps teammates reference each other).
2. Assign specific files to each teammate — file locking is enforced, so design for domain separation.
3. Define communication triggers ("share API types once defined," "if findings conflict, debate").
4. Set shared constraints ("follow CLAUDE.md," "run lint before done," "message all teammates if you change a shared type").
5. Define the output explicitly (a PR? a consolidated review? a root-cause report?).

**Teams vs. Subagents — when to use each:**

| Use Teams when | Use Subagents when |
|---|---|
| A worker discovers something another needs *now* | Workers are fully independent |
| Frontend/backend must negotiate an API contract | Tasks are sequential (B depends on A) |
| Multiple reviewers should challenge each other | Same-file edits are needed |
| Bug investigation has competing hypotheses | Cost-sensitive (subagents ≈3x vs. teams ≈5–7x) |

**Do:** always `/plan` before spawning; assign separate files per teammate; define messaging triggers; set shared constraints; keep teams to 2–4; use for cross-layer work.
**Don't:** spawn from a vague one-liner; assign the same file to two teammates; exceed 5 teammates; use teams for sequential work; skip defining the output format; skip the plan step to "save time."

**Three complete example team prompts** given: a **Full-Stack Feature** build (backend/frontend/tests teammates coordinating a payments endpoint via shared API types), a **Parallel Code Review** (security/performance/correctness reviewers, read-only tools, consolidating into one review after debating conflicts), and a **Scientific Debugging** team (four teammates each testing a different hypothesis for an intermittent 500 error, actively trying to disprove each other's theories before the lead synthesizes a root-cause report).

---

## 5. Subagents vs. Agent Teams — Comparison

| | Subagents | Agent Teams |
|---|---|---|
| Communication | Parent–child only | Peer-to-peer (SendMessage) |
| Config | agents.yaml | settings.json + CLAUDE.md |
| Can observe? | No — isolated | Yes — shared visibility |
| Can interrupt? | No — runs to completion | Yes — via messages |
| Token cost | ~3x a single session | ~5–7x a single session |
| Spawn speed | Fast (~5–10s) | Slower (~15–30s) |
| Requires | Claude Code (any model) | Opus 4.6+ |
| Status | Stable (Jul 2025) | Experimental (Feb 2026) |
| Best for | Independent parallel work | Coordinated multi-agent work |

**The one decision test:** do the sub-tasks need to talk to each other while running? Yes → Agent Teams; No → Subagents. When in doubt, start with Subagents (cheaper, faster, stable).

**Model mixing guidance repeated here:** Opus for the orchestrator/planning/final review; Sonnet for implementation; Haiku for cheap, fast exploration. Teams are said to justify their extra cost when a coordinated team of 3 finishes in one pass versus a single agent needing several retry cycles from lost context — worth measuring in wall-clock time and total tokens, not just per-agent cost.
