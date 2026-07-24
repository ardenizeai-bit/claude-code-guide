# Basics

## 1. CLI & Flags

**Install & auth**

```bash
curl -fsSL https://claude.ai/install.sh | sh   # install via shell script
npm i -g @anthropic-ai/claude-code             # install via npm
claude auth login                              # authenticate with Anthropic
claude --version                               # print installed version
claude update                                  # update to latest release
```

**Starting a session**

```bash
claude                # open interactive REPL
claude "prompt"       # start with an initial prompt
claude -c             # continue the most recent conversation
claude -r ID          # resume a specific conversation by ID
claude -n             # start a new session (skip resume prompt)
```

**Non-interactive / SDK mode**

```bash
claude -p "prompt"                 # print mode — run one prompt and exit
cat file | claude -p "summarize"   # pipe stdin as context
claude -p --output-format json     # return structured JSON output
claude -c -p "follow up"           # continue previous session in print mode
```

**Models & permissions**

```bash
claude --model sonnet
claude --model opus
claude --permission-mode auto   # auto-approve safe tool calls
claude --permission-mode plan   # require approval for writes
```

**Worktrees & multi-agent**

```bash
claude -w                 # create and work inside a git worktree
claude -w --tmux           # run worktree session in tmux
claude --add-dir ../other  # add extra directories to context
claude --from-pr 123       # start session from a PR number
```

**Debug & config**

```bash
claude --debug       # verbose debug logging
claude doctor        # check environment/config health
claude mcp list       # list connected MCP servers
claude config list    # show all configuration values
```

---

## 2. Slash Commands

**Session management:** `/help`, `/clear`, `/compact` (compress context), `/status` (model/tokens/cost), `/context` (usage), `/exit`, `/rewind` (undo last assistant turn).

**Planning & execution:** `/plan` (toggle plan mode), `/execute` (exit plan mode and begin executing), `/model sonnet` / `/model opus`.

**Project setup:** `/init` (create project CLAUDE.md and config), `/doctor`, `/config`, `/hooks`.

**MCP & extensions:** `/mcp` (list/manage servers), `/mcp__server__tool` (call a specific MCP tool directly), `/skill-name` (invoke a registered skill), `@agent-name` (dispatch to a named subagent).

**Utilities:** `# Remember ...` (quick session-memory note), `/insights` (learned project patterns), `/batch` (run a command across multiple files), `/export` (export conversation to a file).

---

## 3. Keyboard Shortcuts

`Shift+Tab` is called out as the single most important shortcut.

**Core controls:** `Ctrl+C` cancel generation · `Ctrl+D` exit session · `Tab` accept autocomplete · `Up/Down` navigate prompt history · `Esc Esc` toggle single/multi-line input.

**Mode switching:** `Shift+Tab` toggle plan mode · `Shift+Tab, Shift+Tab` cycle through available models · `Alt+T` toggle light/dark theme.

**Context management:** `Ctrl+O` open file picker to add context · `Ctrl+L` clear terminal screen · `Ctrl+R` search prompt history.

**Quick memory:** `# text` + `Enter` saves a quick note to session memory.

---

## 4. File Locations

`settings.json` is executable configuration — it controls which tools Claude can use, which MCP servers connect, and which hooks run, so the guide stresses reviewing it carefully since a malicious settings file could grant unintended permissions.

**User-level**

| Path | Purpose |
|---|---|
| `~/.claude/CLAUDE.md` | Global memory, loaded every session |
| `~/.claude/settings.json` | User preferences, permissions, MCP servers |
| `~/.claude/agents/` | Global agent definitions |
| `~/.claude/skills/` | Reusable skill files available everywhere |
| `~/.claude/commands/` | Custom slash commands (global) |
| `~/.claude/.mcp.json` | User-level MCP server configuration |
| `~/.claude/tasks/` | Scheduled task definitions and history |

**Project-level**

| Path | Purpose |
|---|---|
| `.claude/CLAUDE.md` | Project memory, shared with team via git |
| `.claude/settings.json` | Project settings (committed to repo) |
| `.claude/settings.local.json` | Local overrides (gitignored) |
| `.claude/agents/` | Project-specific agent definitions |
| `.claude/skills/` | Project-specific skills |
| `.claude/commands/` | Custom slash commands (project) |
| `.claude/.mcp.json` | Project MCP server configuration |
| `.claude/rules/` | Modular instruction files loaded by glob |

**Sub-directory overrides:** e.g. `src/auth/CLAUDE.md`, `src/api/CLAUDE.md` — rules scoped only to that module.

**Agent Teams:** `~/.claude/tasks/{team}/` team task directory for scheduled agents; `team.json` team agent configuration and roles.

---

## 5. Debugging

The guide frames three techniques as covering most bugs: fixing known bugs (expected vs. actual), reading full error messages, and step-by-step logic tracing.

### Fixing known bugs

Give Claude the code plus a description of expected vs. actual behavior. Example: a `get_average` function that raises `ZeroDivisionError` on an empty list. The fix adds an early return for empty input and wraps each value in a try/except to skip non-numeric entries.

### Reading error messages

Paste the **full** stack trace plus the relevant code — not a summary. Example: a `TypeError: Cannot read properties of undefined (reading 'name')` traced to `getUserName`, fixed by adding a null-check before accessing `user.name`.

### Step-by-step tracing

For logic bugs that don't throw (e.g. a `findMax` function that initializes `max = 0` and starts its loop at index 1, so it silently returns 0 for all-negative arrays), ask Claude to trace through the code with a specific input and track every variable at each iteration. This surfaces both the wrong initial value and the skipped first index.

### Debugging test failures

- **Failed assertion** (e.g. Playwright expecting "Welcome, John" but getting "Welcome, null"): the API call hadn't resolved before the assertion ran; fix by awaiting the relevant response before asserting.
- **Flaky CI-only failures**: often caused by slower CI rendering plus animations/lazy loading; fix by waiting for network idle and raising the timeout for CI.

**Key takeaway (per the source):** three patterns — fix (expected vs. actual), errors (full trace), logic (step-by-step trace) — cover the large majority of debugging work.
