# Vibe Coding

## 1. What is Vibe Coding?

Defined here as: describe what you want, AI writes the code. The guide attributes the term to Andrej Karpathy in 2025 and cites adoption by 92% of US developers (an unverified figure from the source site).

**The shift described:** in the old workflow you write code line by line and debug as you go; in vibe coding you describe intent, AI implements it, and you review/iterate. The framing is that specification quality now matters more than implementation skill — a clear prompt is treated as more valuable than hand-tuned code, so effort should go into describing *what* you want rather than *how* to build it.

**Why the guide argues Claude Code fits this well:** persistent memory via CLAUDE.md that survives across sessions; full project access (reads the whole codebase, runs commands, manages git — not just isolated snippets); Plan Mode to think through architecture before writing code; and multi-agent parallelism (subagents/Agent Teams) to build frontend, backend, and tests simultaneously.

**How each vibe-coding step maps to a Claude Code feature:**

| Step | Feature |
|---|---|
| Write a clear brief | Prompt Tips + CLAUDE.md |
| Plan the architecture | Plan Mode (`Shift+Tab`) |
| Connect external tools | MCP servers |
| Automate workflows | Skills (`/commands`) |
| Enforce quality | Hooks (auto-lint, test) |
| Parallelize work | Subagents + Agent Teams |
| Share with team | Plugins |

The suggested starting point: pick a real project, write a one-page brief, and start using Claude Code directly rather than reading more first.

---

## 2. Prompt Patterns

Eight patterns the guide presents as reusable, each with a short example:

1. **Context Layering** — stack the project's stack/architecture/conventions into the prompt so generated code fits in (e.g. naming the framework, ORM, and existing API-envelope pattern before asking for a new endpoint).
2. **Stepwise Prompting** — break a feature into small sequential steps, testing between each (e.g. build a static Kanban UI first, then wire it to a real DB, then add drag-and-drop).
3. **Role Assignment** — ask Claude to act as a specific expert (e.g. "a senior security engineer") to trigger domain-appropriate review patterns.
4. **Constraint Anchoring** — set explicit boundaries (forbidden libraries, max function length, backward-compatibility requirements) to reduce unwanted patterns.
5. **Comparative Prompting** — ask for multiple approaches with tradeoffs (e.g. WebSockets vs. SSE vs. polling) before committing to one.
6. **Chain-of-Thought** — ask Claude to explain its strategy for tricky edge cases (concurrent edits, sort-order maintenance) *before* writing code, to catch wrong assumptions early.
7. **Error-Forward** — paste error messages/stack traces/lint output directly rather than describing them, since pattern-matching against the raw text is faster than a paraphrase.
8. **Pattern Extension** — point at an existing file that already implements a similar feature and ask Claude to follow the same pattern (same error envelope, same validation library, same auth middleware) for a new one.

**Anti-patterns called out**, each with a better alternative:
- Asking for an entire app at once → tangled, unmaintainable output. Ask for one feature, test it, then ask for the next.
- Accepting generated code without reading it → review every file and ask "why" when something isn't understood.
- Re-explaining your stack every session → put it in CLAUDE.md once instead.
- Vague feedback like "make it better" → give a specific, concrete change instead (e.g. "the button should be full-width on mobile").

The guide's summary framing: vibe coding isn't "let AI do everything" — the person remains the architect, Claude is the builder, and output quality tracks the quality of the specification given.

---

## 3. 6-Phase Workflow

A step-by-step workflow for building a real project, illustrated throughout with a running "task tracker for freelancers" example.

1. **Define the Vibe** — write a one-page brief before opening Claude Code at all: what you're building, who it's for, and 3–5 core features (effectively a mini-PRD). *Maps to:* Prompt Tips + CLAUDE.md.
2. **Plan Before Code** — use Plan Mode (`Shift+Tab` twice) so Claude explores the codebase and proposes an architecture/data-model plan without writing code yet; review and approve before proceeding. *Maps to:* Plan Mode.
3. **Scaffold the Foundation** — have Claude set up the project structure, install dependencies, and create the base schema/auth wiring — explicitly *without* building UI yet — reviewing each created file before moving on. *Maps to:* CLI & Flags, MCP (e.g. Supabase).
4. **Build Feature by Feature** — implement one feature per prompt (never everything at once), testing manually after each before moving to the next. *Maps to:* Skills, Subagents.
5. **Test and Iterate** — after each feature, ask Claude to write tests covering create/read/update/delete, validation errors, and unauthorized access, then personally verify the output actually matches intent. *Maps to:* Hooks (auto-lint), CI/CD.
6. **Polish and Ship** — add loading states, error boundaries, empty states, and responsive layout, using Claude for the tedious mechanical parts while the person focuses on UX judgment calls; finish with a full test-suite run and fix any failures. *Maps to:* Prompt Tips, Hooks.

**Best practices reiterated at the end:** spec first, code second (a short brief upfront saves hours of back-and-forth); one feature per prompt; review everything Claude produces rather than assuming correctness; treat CLAUDE.md as a compounding "constitution" — every rule added prevents a whole category of future mistakes; use Plan Mode before anything risky (refactors, migrations, architecture changes); never put secrets in prompts — use environment variables and a `PreToolUse` hook to block dangerous commands automatically.

The guide's closing note: the best way to learn this workflow is by applying it to a real project rather than working through tutorials.
