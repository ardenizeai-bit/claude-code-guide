# Reference

## 1. Decision Guide

Five sequential questions the guide offers for picking the right customization layer:

1. **Does Claude need to always know this about the project?** Yes → CLAUDE.md. No → continue.
2. **Does Claude need to connect to an external system (GitHub, DB, Slack)?** Yes → an MCP server. No → continue.
3. **Is this a repeatable multi-step workflow you want to trigger consistently?** Yes → a Skill (`SKILL.md`, called via `/skill-name`). No → continue.
4. **Must something run deterministically on every matching tool call, regardless of what the model decides?** Yes → a Hook (`PreToolUse`/`PostToolUse`). No → continue.
5. **Do the parallel workers need to communicate with each other mid-task?** Yes → Agent Teams (peer-to-peer). No → Subagents (isolated workers that report back).

**Quick-reference cheat sheet:** coding standards every session → CLAUDE.md; pulling data from Jira/Slack/DB → MCP; PR review against a fixed checklist → Skill; auto-format on save → Hook; three agents reviewing different files → Agent Teams; parallel test+lint+type-check → Subagents; project-specific linter config → CLAUDE.md; a database-migration generator → Skill; blocking commits without a ticket ID → Hook.

---

## 2. Top Insights

Ten points the guide frames as "non-obvious," grouped by layer:

**Subagents**
- Context compression is lossy — if exact line numbers, file paths, or code snippets need to survive back to the parent, tell the subagent to state them explicitly in its final answer rather than leaving them in working notes.
- Put shared definitions that multiple subagents need in CLAUDE.md (which every agent reads automatically) instead of repeating them across each agent's own description.
- Specialization trades off against breadth — an agent scoped to one file won't catch a cross-module issue like an auth bypass spanning three files.

**Agent Teams**
- Plan before you team — teams shine on genuinely parallelizable work with independent units; teams that collide on the same files waste more tokens than they save.
- Put explicit acceptance criteria in the team definition so every member shares the same idea of "done."
- Use file locking (or partition work by directory) to prevent two agents silently overwriting or conflicting on the same file.

**CLAUDE.md**
- Write it as guidance, not commands — "prefer early returns over deep nesting" adapts better to edge cases than "always use early returns."
- When Claude repeats a mistake, the fix is usually a new line in CLAUDE.md, not a longer prompt — treat it as a living document updated every time a recurring behavior gets corrected.

**Hooks**
- Hooks guarantee execution — unlike CLAUDE.md guidance Claude might interpret loosely, a hook's deterministic code runs on every matching event; use hooks for things that must happen (formatting, validation, security checks), not things that are merely suggested.
- `settings.json`-defined hooks run outside Claude's own context and can't be overridden by prompt injection, making them a reasonable place to enforce security boundaries — blocking dangerous commands, requiring commit signing, protecting certain paths.

---

## 3. What's New in 2026

A running log of platform updates the site describes as "the biggest quarter yet" for the Claude ecosystem — Agent Teams, a 1M-token context window, remote dispatch, and various platform improvements. Selected highlights, newest first (again, treat exact dates/version numbers as the source site's own claims):

- **v2.1.198 (Jul 2026)** — Claude in Chrome reaches general availability; subagents run in the background by default so the main session isn't blocked while they work; a new `/dataviz` skill for charts/dashboards.
- **v2.1.197 (Jul 2026)** — Claude Sonnet 5 becomes the new default model, described as near-Opus-4.8 agentic quality with a native 1M-token context, at promotional pricing through Aug 31.
- **v2.1.183 (Jun 2026)** — Auto mode starts blocking destructive git commands (`reset --hard`, `clean -fd`, etc.) and infra-destroy commands (`terraform`/`pulumi`/`cdk destroy`) unless explicitly requested, and won't amend commits it didn't create in the current session.
- **v2.1.181 (Jun 2026)** — `/config key=value` to set any setting inline from the prompt.
- **Fallback models (Jun 2026, v2.1.166)** — a `fallbackModel` setting lets you configure up to three backup models tried in order if the primary is overloaded.
- **v2.1.158 (May 2026)** — Auto mode extended to AWS Bedrock, Google Vertex, and Azure Foundry deployments, choosing between Opus 4.7 and 4.8.
- **v2.1.157 (May 2026)** — plugins dropped into `.claude/skills` now auto-load without a marketplace; a `claude plugin init` scaffolder.
- **v2.1.154 (May 2026)** — Opus 4.8 becomes the default (high effort), alongside Dynamic Workflows (`/workflows`) for orchestrating many agents, a faster "Fast Mode," and background shell execution.
- **v2.1.149 (May 2026)** — per-category usage-cost breakdown (skills/subagents/plugins/MCP); keyboard-driven diff navigation; proper task-list checkbox rendering.
- **v2.1.147 (May 2026)** — pinned background sessions that survive memory pressure; `/simplify` renamed to `/code-review`, now able to post inline GitHub PR comments.
- **v2.1.143 (May 2026)** — plugin dependency enforcement (`claude plugin disable` refuses if another enabled plugin depends on it); projected token cost shown in the plugin marketplace.
- **v2.1.119 (Apr 2026)** — GitLab and Bitbucket PR support alongside GitHub.
- **v2.1.111 (Apr 2026)** — a new `xhigh` reasoning-effort level (between high and max) for Opus 4.7; `/ultrareview` for a cloud-based multi-agent deep code review; Auto mode for Max subscribers.
- **Opus 4.7 (Apr 2026)** — general availability with the new `xhigh` effort level and an interactive `/effort` slider.
- **Agent Teams (Feb 2026)** — introduced as experimental: multiple Claude instances collaborating with shared context and coordinated tool use.
- **Opus 4.6 + 1M context (Feb 2026)** — described as the most capable model at the time, with a 1-million-token context window for full-codebase understanding in one session.
- **Remote Control + Dispatch, Channels, Computer Use, Auto Mode (Q1 2026)** — remote session management/headless dispatch; persistent pub/sub-style communication channels between agents; screenshot-based desktop/browser interaction (beta); a mode where Claude learns when to ask for confirmation vs. proceed.
- **Tasks system (Jan 2026)** — structured task tracking with pending/in_progress/completed states replaced the earlier TodoWrite tool.
- **Claude Code on all Team seats (Jan 2026)** — included at no extra cost on every Team-plan seat.

---

## 4. Release Calendar

The site includes a month-by-month calendar of releases; the only fully-populated month shown at time of archiving was **July 2026**, listing two entries on **July 1**: "Fable 5 redeployed globally; Mythos 5 restored to select US orgs" and "Claude in Chrome generally available (Claude Code v2.1.198)." The page's timeline axis spans **Nov '24 through May '26** across categories Launch / Model / Feature / Multi-Agent / Platform / Infra / Pricing, but the underlying calendar entries for those categories weren't rendered as text in the fetched page — only the July 2026 month view was.

---

## 5. AI Trends & News

A weekly digest the site says is "updated every Monday by the scheduled agent," covering model releases, policy, research, and open-source milestones across the industry (not just Anthropic). Selected items by week, newest first — these are news summaries from the source and should be checked against primary sources (linked on the original page) before being relied on:

**Week of Jul 3, 2026**
- Claude Sonnet 5 launched (30 Jun), positioned as near-Opus-4.8 quality at roughly a fifth of Opus pricing, now the default for Free/Pro and in Claude Code.
- The US Commerce Department rescinded its 12 Jun export-control directive on Fable 5/Mythos 5 on 30 Jun, ending an ~18-day global blackout; Fable 5 returned to all users 1 Jul, Mythos 5 to select vetted US organizations.
- Anthropic proposed a cross-lab jailbreak-severity framework (with Amazon, Microsoft, Google, and other Project Glasswing partners) after an Amazon-found jailbreak had triggered the Fable 5 suspension.
- Anthropic launched "Claude Science," a research workbench wiring in 60+ scientific databases and funding up to 50 projects with $30,000 in credits each.
- OpenAI restricted its new GPT-5.6 family's rollout to a small group of partners at a US government request over cyber-capability concerns.

**Week of Jun 22, 2026**
- Claude Fable 5 (public) and Mythos 5 (restricted) launched 9 Jun at $10/$50 per M tokens.
- A binding US export-control directive (12 Jun) suspended both models for all foreign nationals; still down as of 22 Jun.
- OpenAI confidentially filed for an IPO (8 Jun), a week after Anthropic's own June 1 filing toward an ~Oct 2026 Nasdaq listing at a cited $965B valuation.
- A community CLAUDE.md repo (`forrestchang/andrej-karpathy-skills`) encoding four rules to reduce agent-coding failures reached roughly 144k stars.

**Week of Jun 18, 2026** — Anthropic reportedly secured all capacity at a Tennessee data center (300+ MW, 220,000+ GPUs); OpenAI introduced "Deployment Simulation" tooling to test deployments pre-production; `addyosmani/agent-skills` trended on GitHub.

**Week of Jun 8, 2026** — Andrej Karpathy joined Anthropic; a next-tier "Claude Mythos 1" model was said to be weeks from wide release at roughly $16/$80 per M tokens; `chopratejas/headroom` (a tool-output/log/RAG-chunk compression library) trended, citing 60–95% token reduction.

**Week of Jun 1, 2026** — Claude Opus 4.8 shipped alongside Dynamic Workflows; Anthropic raised a cited $65B at a $965B valuation with "Mythos" teased for wide release; Google announced Gemini Omni (multimodal video editing) and a "Gemini Spark" agent for AI Ultra subscribers; `anthropics/knowledge-work-plugins` trended.

**Week of May 25, 2026** — KPMG reportedly deployed Claude across a 276,000-person workforce; Anthropic acquired Stainless (the SDK-generation company behind several major API SDKs); Managed Agents gained async "dreaming" agents, sub-agent orchestration, webhooks, and MCP tunnels; Google shipped Gemini 3.5 Flash.

**Week of May 18, 2026** — "Claude for Small Business" launched inside Cowork with 15 prebuilt skills and SMB-tool connectors; OpenAI shipped a less-restricted "GPT-5.5-Cyber" model to vetted cybersecurity defenders; Anthropic's ARR was cited at $30B (up from $9B at end of 2025); an open-source desktop agent (`tinyhumansai/openhuman`) topped GitHub trending.

**Week of Apr 27, 2026** — the viral Karpathy-style CLAUDE.md repo continued trending (cited ~90k stars); a "free-claude-code" access tool gained traction; Google unveiled an enterprise AI agent suite at Cloud Next 2026; OpenAI extended Codex beyond coding into document/data/API automation.

**Week of Apr 20, 2026** — an open-source self-improving agent framework (`NousResearch/hermes-agent`) trended; Anthropic was reported leading a cross-industry security consortium ("Project Glasswing," with Amazon, Microsoft, Apple, Google, Nvidia) testing an unreleased Mythos model for defensive cybersecurity use; a Claude Code session-memory plugin (`thedotmack/claude-mem`) trended.

**Week of Apr 17, 2026** — Anthropic reportedly withheld a very large ("10-trillion-parameter") Mythos model from general release over cybersecurity risk after it reportedly discovered thousands of previously-unknown zero-day vulnerabilities; OpenAI was reported to have finished GPT-6 ("Spud") pre-training with release "imminent"; Meta released open-weight Llama 4 Scout & Maverick with a 10M-token context window; Google released Gemma 4 under Apache 2.0; Stanford HAI published its AI Index 2026; a US federal court ruled that platforms with "ultimate authority" over AI-assembled ad content can be liable as content-makers; Microsoft researchers described a cancer-imaging AI trained on standard $10 tissue slides.

(As with the rest of this archive, all of the above are the source site's own summaries of external reporting — check the original linked articles for anything you plan to rely on.)
