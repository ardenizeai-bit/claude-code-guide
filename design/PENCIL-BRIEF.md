# Pencil.dev Design Brief — Claude Code Reference Site

## What this is

A 41-page developer documentation/reference site for "Claude Code" (Anthropic's CLI coding agent). Think Stripe Docs or Tailwind Docs in spirit: persistent left sidebar, linear reading order, prev/next pagination through all pages. Framework target: **Next.js (App Router) + Tailwind CSS**. Output should be React components I can drop into a Next.js app.

**Do not visually clone any existing docs site.** This needs an original point of view — a deliberate palette, a distinct type pairing, and one signature element the design gets remembered for. Explicitly avoid the generic-AI-docs-site defaults: no cream+terracotta, no near-black+neon-green, no hairline-rule broadsheet look — unless arrived at deliberately and justified.

## Design decisions already locked (don't re-litigate these)

- **Dark/light mode:** required, with a toggle. Style both modes fully.
- **Responsive:** sidebar collapses behind a hamburger under ~768px; code blocks scroll horizontally (never wrap/break layout); tables scroll horizontally on narrow viewports.
- **Accessibility baseline:** visible keyboard focus states, sufficient contrast in both themes, reduced-motion support for any animation (accordion expand, page-load reveals, etc.)

## What to design in this pass (4 pieces)

### 1. Sidebar / nav shell
- Left sidebar, ~260–300px wide.
- Site logo/mark + product name at top (design an original mark — not the Anthropic/Claude logo).
- Grouped nav list, 9 section groups (see list below), each with a group label.
- Active page state clearly highlighted.
- Collapsible on mobile behind a hamburger/menu toggle.
- Scrolls independently from main content on long viewports.

**The 9 section groups** (for realistic nav content — use these labels/counts, don't invent different ones):
1. Start Here (3 pages)
2. Basics (5 pages)
3. Customize (8 pages)
4. Multi-Agent (5 pages)
5. Use Cases (5 pages)
6. QA & Testing (5 pages)
7. Vibe Coding (3 pages)
8. Resources (2 pages)
9. Reference (5 pages)

### 2. Standard content page template
Every one of the 41 pages uses this template at minimum. Needs to support:
- A small **"N/41 · Section Name"** breadcrumb/progress indicator above the H1 (e.g. "12/41 · Customize"). This is a signature-element candidate — make it feel considered, not an afterthought label.
- H1 title + one-line dek/summary directly below.
- Prose sections with H2/H3 subheadings.
- Code blocks: language label, syntax highlighting, and a **copy-to-clipboard button** — this is a signature-element candidate too. Every code sample needs this; make the treatment distinctive.
- Tables (used for comparisons — e.g. "CLAUDE.md vs settings.json" style two-column feature tables). Must scroll horizontally on narrow viewports rather than break.
- Callout boxes for tips/warnings — visually distinct bordered/tinted boxes (e.g. "Never hardcode wait times," "Security consideration").
- A bordered/tinted "Try it yourself" prompt box style — visually distinct from a plain paragraph, distinct from the tip/warning callout.
- A two-button **prev/next pagination footer** at the very bottom: "← Previous [Title]" and "Next → [Title]".

### 3. Comparison page (bespoke layout example — "Subagents vs Agent Teams")
Stress-test the design system with a non-standard layout:
- A side-by-side diagram: one side shows a parent→children tree structure (subagents), the other shows a peer-to-peer mesh (agent teams). Design your own visual treatment for these — not literal box-and-arrow diagrams, something with more character.
- An expandable/accordion list below the diagram, labeled "Patterns" — several collapsed rows that expand to reveal content.
- A small bar-style visual titled "Token Cost" comparing four relative values: 1x / 3x / 5x / 7x.

### 4. Calendar page (bespoke layout example — "Release Calendar")
- A literal month-grid calendar UI: day cells, with event dots or small labels on specific days.
- Prev/next month navigation controls.
- A separate horizontal category-filter row above or below the grid, with these 7 filter labels: Launch, Model, Feature, Multi-Agent, Platform, Infra, Pricing.
- A small horizontal timeline strip along the bottom spanning Nov '24 to May '26 (roughly 18 months), showing relative position/density rather than exact placement.
- Only one month (July 2026) needs real-looking sample event data; other months can be shown empty/placeholder — design should make clear both states look intentional, not broken.

## Deliverables

For each of the 4 pieces above, produce:
- Both light and dark mode variants
- Desktop and mobile (< 768px) viewport variants for the sidebar/shell and the standard template
- React component code (Next.js + Tailwind compatible) I can integrate directly

## Design direction inputs to commit to (state your choices explicitly)

- **Palette:** 4–6 named hex values, chosen deliberately for a developer-tool/reference-manual subject.
- **Type pairing:** a distinct heading font, body font, and code/monospace font — this is a text-and-code-heavy site, type quality matters more than usual.
- **Signature element:** pick ONE thing from this brief to make the standout detail — the page-counter badge, the code block treatment, or something else — and make it clearly the most considered piece of the system.
