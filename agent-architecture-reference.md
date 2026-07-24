# AI Agent Architecture Reference
### Skills, MCP, Subagents, Hooks — How It All Fits Together

Four building blocks that work together to make an AI agent useful.

---

## 1. Skills — what the agent knows

Skills are like **manuals** the agent can pull out when it needs them.

- They're instruction files (with scripts, templates, etc.) that live on disk
- The agent doesn't load them all at once — it only loads the ones it needs, when it needs them (this is called "progressive disclosure")
- Think of it like a mechanic grabbing the right repair manual instead of memorizing every manual ever written

**Where they live:**
```
.claude/skills/
├── deploy/
│   └── SKILL.md
├── code-review/
│   └── SKILL.md
```

**How it works:** A task comes in → the agent notices which skill applies → it loads that skill → then does the work.

---

## 2. MCP — how the agent connects to other tools

MCP is what lets the agent talk to outside services — GitHub, Notion, Slack, GitLab, AWS, a database, etc.

- Each service the agent connects to is called an "MCP server" (e.g. an MCP server for GitHub, one for Slack, one for a database)
- Think of MCP like a **USB-C port** — one standard plug that lets you connect all sorts of different devices
- This is a fast-growing space — thousands of these connectors already exist, and the standard is now overseen by the Linux Foundation

---

## 3. Subagents — who actually does the work

Subagents are smaller, focused helpers the main agent can hand tasks off to.

- Each one works in its own separate space, with its own permissions and tools — they don't step on each other
- Think of them like **teammates**, each with their own job

**Example team:**
| Subagent | What it's given access to |
|---|---|
| Code Reviewer | Read files, search code |
| Researcher | Web search, fetch pages |
| Deployer | Run commands, SSH access |

---

## 4. Hooks — rules that run automatically

Hooks are automatic checks or actions that fire at set moments. They're **not** decided by the AI in the moment — they just run, like a tripwire.

| Hook | Fires when |
|---|---|
| Pre-Tool | Right before the agent uses a tool |
| Post-Tool | Right after the agent uses a tool |
| On-Edit | Whenever a file changes |
| On-Notification | When it's time to alert someone or log something |

**Example:** Someone edits code → a hook notices → auto-formats the file → checks for unsafe commits → runs a security scan.

---

## CLAUDE.md — the agent's always-on notes

- CLAUDE.md is a file the agent always keeps in view, like a **sticky note on your monitor** — project background, company info, anything that should never be forgotten
- From there, it points to specific skills and reference docs as needed

**The simplest way to remember the difference:**
- **Skills** — what the agent should know
- **MCP** — what the agent can connect to
- **Hooks** — when something should happen automatically

---

## Plugins — packaging it all up

A plugin bundles Skills + MCP + Hooks + Subagents into one installable package — like an app you install once instead of setting up each piece separately.

```
Skills + MCP + Hooks + Subagents  →  one Plugin
```

---

## How the pieces stack

```
Plugins        → bundles everything into one package
   ↓
Skills         → the knowledge and workflows
   ↓
MCP ↔ Tools    → outside connections + built-in abilities
   ↓
Subagents      → who does the actual work
   ↓
Hooks          → automatic checks along the way
   ↓
CLAUDE.md      → the notes that are always visible
```

---

## The basic agent loop

This is the cycle the agent runs through on every task:

```
Perceive  →  take in the input and context
Reason    →  decide what to do next
Act       →  actually do it (call a tool, run code, hit an API)
Observe   →  check how it went
Repeat    →  loop back to the start
```

---

## Quick reference: what's for what

| Piece | What it's for | Think of it as |
|---|---|---|
| Skills | Give the agent expertise | A manual |
| MCP | Connect to outside services | A USB-C port |
| Subagents | Hand off specific tasks | Teammates |
| Hooks | Automate routine checks | Tripwires |
| CLAUDE.md | Keep key context always visible | A sticky note |
| Plugins | Package everything together | An app |

---

## Worked example: "Analyze competitors and write a report"

1. **CLAUDE.md loads** — pulls in project and company context
2. **A skill kicks in** — the "competitive analysis" workflow
3. **MCP connects** — searches Google Drive for past briefs
4. **A subagent spins up** — researches the market
5. **Another subagent spins up** — reviews competitor repos
6. **A hook fires** — auto-formats the final report and runs a linter
