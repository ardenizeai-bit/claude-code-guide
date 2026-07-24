# Use Cases

## 1. Cowork

Cowork is described as Anthropic's agentic tool for knowledge work — a session inside the Claude desktop app, running on the same agentic engine as Claude Code but with a GUI aimed at non-technical work: you describe an outcome, Claude plans and executes across local files and connected apps, and you steer along the way.

**Mental model:** Cowork is not chat — give it jobs with a deliverable, not questions. If the task ends in a finished file, it's a Cowork task; if it's a quick answer, use chat instead.

**Cowork vs. Chat vs. Claude Code**

| | Cowork | Claude Code |
|---|---|---|
| Interface | Desktop GUI | Terminal CLI |
| Audience | Knowledge workers | Developers |
| Setup | Toggle in app | Manual install |
| Security | Sandboxed VM, approved folders only | Full shell permissions |
| Engine | Same agentic architecture | Same agentic architecture |

**One-time setup (~5 min):** install/update the Claude desktop app (Mac or Windows — desktop-only) → enable Cowork in Settings → Features (paid plans) → run `/setup-cowork` to install role-matched plugins and connect tools → grant it a dedicated folder (e.g. `~/Cowork`) it's restricted to.

**The core loop:** drop inputs into the folder → describe the outcome + format → review the plan before approving (especially before deletes/overwrites) → steer mid-task → come back to the finished file.

**Featured flow — "Friday Report on Autopilot":** set up a workspace folder with a `context/brief.md` describing what to track, a `past-reports/` folder so the format matches, and an `output/` folder; connect data sources via `/setup-cowork`; build and test the report prompt once (reviewing the plan, checking the first output); schedule it via `/schedule`; optionally package it into a skill with `/skill-creator` for reuse. Scheduling is noted as best-effort — tasks only run while the machine is awake and the desktop app is open, with missed runs executing on wake.

**More flows suggested:** receipts → expense report (Excel with a totals tab); market PDFs + projections → a branded slide deck; email/calendar scan → a one-page morning briefing; stakeholder transcripts → a BRD grouped by feature.

**Getting good output:** be the editor, not the strategist (Cowork executes well but won't invent judgment — tell it what "good" looks like); decompose big asks into specific, comparable sub-tasks; give it a past example to match style/format against; connect tools via plugins so it pulls live data instead of manual exports.

**Try-it prompt for a low-risk first task:** "Organize this folder: create subfolders by type, rename files as YYYY-MM-DD-description, flag any duplicates, and give me a summary of what you changed."

**Caveats flagged by the guide:** Cowork can burn usage quota quickly on multi-step file work, and it's described as **not suited to regulated/sensitive data** — activity isn't captured in Audit Logs/Compliance API, and history is stored locally, so always review before destructive actions.

---

## 2. Use Cases by Role

**Solo Developer:** rapid prototyping of full-stack features from natural language; legacy refactoring/modernization; automated test generation; git workflow automation (branches, commit messages, changelogs, rebases); debugging from a pasted stack trace.

**Engineering Team:** a shared project-level CLAUDE.md for consistent standards; PR review automation in CI; fleet-wide migrations across many repos; cross-layer feature work (frontend+backend+DB in one session); triggering Claude Code from Slack to investigate production alerts.

**QA Engineer:** test-case generation from requirements (including edge cases manual review misses); Playwright Page Object Models/specs/fixtures and flaky-test debugging; REST API test suites (validation, auth, status-code matrix, contract testing); edge-case discovery from a feature description; turning resolved bugs into permanent regression tests.

**Engineering Manager:** "director mode" orchestrating multiple agents on parallel sub-tasks; incident response via logs/metrics fed to Claude Code; CI-integrated code-quality gates enforcing architecture rules; generating interactive codebase walkthroughs for onboarding.

**Product Manager / Designer:** describing a feature to get a working prototype; enumerating edge cases from a spec plus generating test stubs; natural-language-to-SQL data queries; building internal admin tools/dashboards without an engineering sprint.

**Try-it prompt templates given** for QA ("Generate comprehensive test cases for [feature]... Format as a table"), Data Analyst ("Write a PostgreSQL query to find the top 5 customers by total order value in the last 30 days..."), and Developer ("Build a REST API endpoint for user registration. Use Express + Prisma...").

---

## 3. Real-World Examples

The guide presents these as "verified production case studies," though as with the site's other statistics they should be read as claims from an unofficial third-party source rather than independently confirmed figures:

| Company | Cited result |
|---|---|
| Stripe | 10,000-line Scala→Java payments migration completed in 4 days |
| Ramp | 80% faster incident investigation after integrating Claude Code into on-call |
| Anthropic | ~90% of shipped code described as AI-written or AI-assisted internally |
| Fountain | 50% faster developer velocity after adoption |
| TELUS | 500K+ hours saved organization-wide, cited |
| CRED | 2x development speed after embedding Claude Code through the SDLC |

**Industry-wide figures cited by the site:** 12x faster task completion on SWE-bench; 67% reduction in boilerplate-code time; 92% developer satisfaction score; 26–55% faster feature delivery; 70% less context-switching; 3,200+ enterprise organizations using Claude Code.

---

## 4. CI/CD & Automation

The `-p` (print) flag turns any prompt into a single-shot CLI command suited to pipelines, cron jobs, and GitHub Actions.

**GitHub Actions example — automated PR review:**

```yaml
name: claude-code-review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Claude Code review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          npm install -g @anthropic-ai/claude-code
          claude -p "Review this PR for bugs, security issues, \
            and style violations. Output as GitHub-flavored markdown." \
            > review.md
      - name: Post review comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const body = fs.readFileSync('review.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body
            });
```

**Print-mode one-liners** for: automated code review (`claude -p "Review this diff...: $(git diff HEAD~1)"`), log analysis, test generation to a file, changelog generation from `git log`, and mass refactors ("Rename all instances of userId to accountId across the codebase and update tests").

**Production agentic pipeline shape (as diagrammed):** Trigger → GitHub Action → Hooks → Output → Flywheel.

---

## 5. Non-Technical Use Cases

Framed around the idea that at Anthropic, every department — not just engineering — uses Claude Code:

**Marketing:** ad-copy/landing-page/A-B-hypothesis generation from a campaign brief; repurposing one long-form piece into blog/social/email/video-script variants; SEO audits and keyword-optimized rewrite outlines.

**Operations:** extracting structured data from PDFs/invoices/spreadsheets into internal systems; lightweight adapters between legacy tools and modern APIs; automatically compiled weekly/monthly operational reports.

**Finance / Legal:** drafting compliance documents/regulatory filings from templates and prior submissions; contract analysis (key clauses, deviations, obligation summaries); parsing bank statements/invoices into structured accounting entries with validation.

**Product / Design:** turning a described Figma mockup into a working React prototype; exhaustive edge-case/failure-mode lists from a product spec; visual-regression and accessibility audits generated from existing component libraries.
