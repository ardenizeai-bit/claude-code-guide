# CLAUDE.md — Claude Code Reference Site (Rebuild)

## Project Summary

Build a static, multi-page documentation site — a reference guide for "Claude Code" — modeled on the structure of an existing 41-page site, but with **original visual design** (not a visual clone). Content source: the 10 archived markdown files (`00-index.md` through `09-reference.md`) already produced for this project — treat them as the content source of truth, not the live third-party site.

This is a documentation/reference site, similar in spirit to a product docs site (think Stripe Docs, Tailwind Docs) with a persistent left sidebar, a linear reading order, and prev/next pagination through all pages.

---

## Tech Stack (suggested — adjust to preference)

- **Framework:** Next.js (App Router) or Astro — either suits a static content site with per-page routing well. Vercel-deployable.
- **Content:** MDX or plain Markdown files per page, one file per route, parsed at build time. Frontmatter per page: `title`, `section`, `order`, `description`.
- **Styling:** Tailwind CSS (or plain CSS modules) — but see **Design Direction** below; do not default to generic Tailwind starter aesthetics.
- **Code blocks:** a syntax highlighter (Shiki or Prism) with a **copy-to-clipboard button** on every block (this appeared on every code sample in the source and is a expected baseline feature).
- **Icons:** lucide-react or similar, used sparingly (nav section icons, copy icon, prev/next chevrons).

---

## Site Structure — Full Page List (41 pages)

Organize as an ordered array of page objects: `{ slug, title, section, order }`. Order is global (1–41) and also determines prev/next linking. Section groups become the sidebar's collapsible groups.

### Section: Start Here (1–3)
1. `getting-started` — Getting Started
2. `overview` — Overview
3. `prompts` — Prompt Tips

### Section: Basics (4–8)
4. `cli` — CLI & Flags
5. `slash` — Slash Commands
6. `keys` — Keyboard Shortcuts
7. `files` — File Locations
8. `debugging` — Debugging

### Section: Customize (9–16)
9. `customize` — How It Fits Together
10. `claude-md` — CLAUDE.md
11. `write-claude-md` — Writing CLAUDE.md
12. `mcp` — MCP (Model Context Protocol)
13. `skills` — Skills
14. `write-skill` — Writing Perfect Skills
15. `hooks` — Hooks
16. `plugins` — Plugins

### Section: Multi-Agent (17–21)
17. `subagents` — Subagents
18. `write-agent` — Writing Perfect Subagents
19. `teams` — Agent Teams
20. `write-team` — Writing Agent Teams
21. `comparison` — Subagents vs Agent Teams

### Section: Use Cases (22–26)
22. `cowork` — Cowork
23. `by-role` — Use Cases by Role
24. `real-world` — Real-World Examples
25. `cicd` — CI/CD & Automation
26. `non-tech` — Non-Technical Use Cases

### Section: QA & Testing (27–31)
27. `qa-overview` — QA with Claude Code
28. `qa-test-cases` — Test Case Generation
29. `qa-playwright` — Playwright Automation
30. `qa-api-testing` — API Testing
31. `qa-edge-cases` — Edge Cases & Regression

### Section: Vibe Coding (32–34)
32. `vibe-intro` — What is Vibe Coding?
33. `vibe-patterns` — Prompt Patterns
34. `vibe-workflow` — 6-Phase Workflow

### Section: Resources (35–36)
35. `open-source-repos` — Open-Source Repos
36. `changelog` — Changelog

### Section: Reference (37–41)
37. `decision` — Decision Guide
38. `insights` — Top Insights
39. `whats-new` — What's New in 2026
40. `calendar` — Release Calendar
41. `ai-trends` — AI Trends & News

**Important:** content for all 41 pages already exists (condensed/paraphrased) across the 9 archived `.md` files. Map each numbered page above to its source section file when migrating content in. Some pages will need original example content re-derived rather than copy-pasted, since the archive files summarize rather than reproduce the original site verbatim — write fresh copy in the site's own voice using the archive as a factual outline, not a copy source.

---

## Layout & Navigation Requirements

### Persistent sidebar (left, ~260–300px)
- Site logo/mark + product name at top.
- Grouped nav list matching the 9 sections above, each with a group label.
- Active page highlighted.
- Collapsible on mobile behind a hamburger/menu toggle (breakpoint ~768px).
- Should be scrollable independently of main content on long viewports.

### Page header / progress indicator
Every content page in the source displayed a small **"N/41 · Section Name"** breadcrumb-style indicator above the H1. Replicate this pattern — it doubles as a progress cue for readers going through linearly.

### Prev/Next pagination footer
Every page ends with a two-button footer: **"← Previous [Title]"** and **"Next → [Title]"**, linking to the adjacent page in **global reading order** (not just within-section — e.g. last page of one section links forward into the first page of the next section). First page has no "Previous"; last page (`ai-trends`) has no "Next."

### Content page template
Each page should support, at minimum:
- H1 title + one-line dek/summary
- Prose sections with H2/H3 subheadings
- Code blocks with language labels + copy button
- Tables (many pages use comparison tables — CLAUDE.md vs settings.json, Subagents vs Teams, status-code matrices, etc.)
- Callout boxes for tips/warnings (e.g. "Never hardcode wait times," "Security consideration")
- Occasional inline "Try it yourself" prompt boxes (seen on Debugging, By Role pages) — style as a distinct bordered/tinted box, not a plain paragraph.
- Occasional interactive quiz blocks (seen on the Debugging page — multiple choice Q&A) — build as a reusable `<Quiz>` component (question + 3 options, no need to grade/store — could be a simple click-to-reveal or just a static reference layout, your call).

---

## Special Page Types (non-standard layouts)

These pages need bespoke components beyond the standard prose template:

1. **`customize` (How It Fits Together)** — contains several small architecture diagrams (session lifecycle, MCP client/server topology, hook lifecycle, plugin bundling). Build as simple SVG or CSS-based flow diagrams, not literal recreations of the source's diagrams — design your own visual treatment.
2. **`comparison` (Subagents vs Agent Teams)** — has a side-by-side diagram (parent→children vs. peer-to-peer mesh) plus an expandable "Patterns" accordion list and a small bar-style "Token Cost" visual (1x / 3x / 5x / 7x).
3. **`real-world`** — a grid/card layout of company case studies (logo/name, big stat, one-line description) plus a strip of "industry-wide numbers."
4. **`open-source-repos`** — a filterable/grouped repo directory (5 categories) with repo name, description, and star count per entry; consider a simple client-side filter by category.
5. **`changelog`** — a reverse-chronological version timeline; group entries by version range/date, support a "breaking change" visual flag (the source used ⚠️ inline).
6. **`whats-new`** — similar timeline but tagged by type (New/GA/Experimental/Pricing) with colored pill badges, each entry expandable to a "Setup" instructions sub-block.
7. **`calendar`** — a literal month-grid calendar UI with day cells, event dots/labels on specific days, and prev/next month navigation, plus a separate horizontal category-filter row (Launch/Model/Feature/Multi-Agent/Platform/Infra/Pricing) and a small timeline strip along the bottom (Nov '24–May '26). **Note:** only July 2026 had actual populated entries in the archive — you'll need to decide whether to seed placeholder months or only build out July initially.
8. **`ai-trends`** — a weekly digest feed, grouped by "Week of [date]," each item tagged by category (New Model / Policy / AI Safety / Research / Industry / Open Source) with an external source link, a one-line "why it matters" note, and a company/org tag.
9. **`decision` (Decision Guide)** — a 5-question decision-tree layout (question → Yes/No branches) plus a separate "quick-reference cheat sheet" table at the bottom. Could be built as a literal clickable tree or a simple stacked Q&A list — your call on interactivity.
10. **`insights` (Top Insights)** — a card grid of ~10 short tips, each tagged by which layer it belongs to (Subagents/Agent Teams/CLAUDE.md/Hooks) — consider a filter-by-tag control.

---

## Design Direction

**Do not visually clone the source site.** Bring your own point of view — palette, type pairing, and one distinctive layout choice — rather than reaching for a generic docs-site template. Some things to decide deliberately before coding (per standard design practice: pick a lane, don't default):

- **Palette:** choose 4–6 named hex values deliberately for this subject (a developer tool / reference manual) — avoid the common AI-generated defaults (cream+terracotta, near-black+neon-green, or a hairline-rule broadsheet look) unless you've deliberately chosen one and can justify it.
- **Type:** a distinct pairing for headings vs. body vs. code/monospace — this is a text-and-code-heavy site, so type quality matters more than usual.
- **Signature element:** pick one thing this design will be remembered for — e.g. how code blocks are treated, how the sidebar progress indicator looks, or how the page-counter badge is styled.
- **Dark/light mode:** the source referenced an `Alt+T` theme toggle in its own product (Claude Code itself) — consider whether the *site* should also support light/dark, independent of that being a documented product feature.
- **Responsive:** sidebar collapses on mobile; code blocks scroll horizontally rather than wrapping/breaking layout; tables scroll horizontally on narrow viewports.
- **Accessibility baseline:** visible keyboard focus states, sufficient contrast, reduced-motion support if any animation is added (e.g. accordion expands, page-load reveals).

---

## Content/Data Notes & Gaps to Resolve Before Coding

- **Source of truth for copy:** use the 9 archived markdown files as the factual/structural reference. Do not attempt to scrape or reproduce the original third-party site's exact wording — write original copy per page using the archive's factual content as an outline (facts, code samples' *shape*, table structure) rather than verbatim text.
- **Unverified statistics:** several pages (Overview, Real-World Examples, AI Trends & News, Changelog, What's New) cite adoption/revenue/performance figures and specific version numbers attributed to the source site, not confirmed against any official documentation. Decide whether to keep these as flavor/placeholder content, clearly relabel them as illustrative, or replace them with your own placeholder figures.
- **Changelog/Calendar dynamic data (flagged back in your original notes):** you'd mentioned wanting dynamic data for changelog/calendar pages eventually — decide now whether v1 is static content baked into markdown, or whether you want a small JSON/CMS-backed data file for entries so future updates don't require touching page templates.
- **Search:** not present in the source pages fetched, but worth deciding upfront — a 41-page reference site benefits from at least basic client-side search (e.g. a simple Fuse.js/Cmd-K palette over page titles + headings).
- **SEO/meta:** the source set per-page `<title>`, `meta-description`, and OpenGraph/Twitter card tags identically across all pages (site-wide description) but with a per-page `<title>`. Replicate at minimum: unique `<title>` per page, shared site-wide `og:description`/`twitter:description`.
- **"Try it yourself" exercises:** confirm whether these should be purely illustrative (static text) or need any interactivity (e.g. a copyable prompt block, a "mark as done" checkbox for readers working through the guide linearly).
- **Quiz component (Debugging page):** confirm scope — the source had numbered multiple-choice questions with no visible scoring; decide if you want them to be answerable/checkable or purely reference material.
- **Analytics/telemetry:** not addressed in the source content — decide if you want pageview analytics given this is a multi-page docs site.

---

## Build Order (suggested)

1. Scaffold routing + the 9-section sidebar nav + prev/next pagination logic (get the "boring" structural plumbing working first, using placeholder Lorem content).
2. Build the standard content-page template (prose, code blocks w/ copy button, tables, callouts) and pipe in real copy for the simplest pages first (`getting-started`, `overview`, `cli`, `keys`, `files`).
3. Build the "Try it yourself" and quiz components; apply to `debugging`, `by-role`.
4. Build the bespoke components list (diagrams, case-study cards, repo directory, changelog timeline, calendar grid, trends feed, decision tree, insights grid) one at a time, applying real copy as each is finished.
5. Pass for responsive/mobile, dark-mode (if in scope), and accessibility.
6. Add search last, once all page content and routes are final (so the search index has real headings to work against).
