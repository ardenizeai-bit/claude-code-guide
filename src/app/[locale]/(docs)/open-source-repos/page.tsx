import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { RepoDirectory } from "@/components/RepoDirectory";
import { WarningCallout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { SeeAlso } from "@/components/SeeAlso";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Open-Source Repos" };

export default async function OpenSourceReposPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="open-source-repos"
        locale={locale}
        translated
        dek="一份精选目录，收录了如果你在围绕 Claude Code 做开发，值得了解的活跃维护仓库。"
      >
        <WarningCallout locale={locale}>
          这是一份快照，不是实时数据流——这个领域的描述和维护状态变化很快。
          在依据这里的任何内容做决定之前，请直接去 GitHub 上核实。
        </WarningCallout>

        <RepoDirectory locale={locale} />

        <SeeAlso
          slug="customize"
          locale={locale}
          note="想先看这几层如何组合成一套完整体系，配有会话生命周期图示？参见《各层如何协同工作》。"
        />

        <h2>Agent 架构参考</h2>
        <p>
          四个协同工作、让 AI agent 真正好用的构建模块：Skills、MCP、Subagents 和 Hooks。
          上面列出的大多数仓库，都是在扩展或对接这四者中的某一个。
        </p>

        <h3>1. Skills —— agent 知道什么</h3>
        <p>
          Skills 就像 agent 需要时才拿出来的<strong>说明手册</strong>。它们是存在磁盘上的
          指令文件（附带脚本、模板等），agent 不会一次性把它们全部加载——只在需要的时候，
          加载需要的那一个（这被称为&ldquo;渐进式披露&rdquo;）。可以想象成一名维修工，
          只取出对应的维修手册，而不是把所有手册都背下来。
        </p>
        <CodeBlock
          language="text"
          code={`.claude/skills/\n├── deploy/\n│   └── SKILL.md\n├── code-review/\n│   └── SKILL.md`}
        />
        <p>
          <strong>工作方式：</strong>任务进来 → agent 判断哪个 skill 适用 → 加载该 skill → 开始执行。
        </p>

        <h3>2. MCP —— agent 如何连接其他工具</h3>
        <p>
          MCP 让 agent 能与外部服务对话——GitHub、Notion、Slack、GitLab、AWS、数据库等等。
          agent 连接的每一个服务都叫一个&ldquo;MCP server&rdquo;（例如一个用于 GitHub，
          一个用于 Slack，一个用于数据库）。可以把 MCP 想象成一个<strong>USB-C 接口</strong>——
          一种标准插口，能连接各种各样不同的设备。这是一个快速增长的领域——已经有数千个
          这样的连接器，而且这套标准目前由 Linux 基金会负责维护。
        </p>

        <h3>3. Subagents —— 谁在实际干活</h3>
        <p>
          Subagent 是更小、更聚焦的帮手，主 agent 可以把任务交给它们。每一个都在自己独立的
          空间里工作，拥有自己的权限和工具——彼此互不干扰。可以把它们想象成<strong>队友</strong>，
          各自负责自己的那一块。
        </p>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Subagent</th>
                <th>被授予的访问权限</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>代码审查员</td>
                <td>读取文件、搜索代码</td>
              </tr>
              <tr>
                <td>研究员</td>
                <td>网页搜索、抓取页面</td>
              </tr>
              <tr>
                <td>部署员</td>
                <td>运行命令、SSH 访问</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>4. Hooks —— 自动运行的规则</h3>
        <p>
          Hooks 是在设定时机自动触发的检查或动作。它们<strong>不是</strong>由 AI 临场决定的——
          它们只是运行，就像一根绊线。
        </p>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Hook</th>
                <th>触发时机</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pre-Tool</td>
                <td>agent 使用工具之前</td>
              </tr>
              <tr>
                <td>Post-Tool</td>
                <td>agent 使用工具之后</td>
              </tr>
              <tr>
                <td>On-Edit</td>
                <td>文件发生变更时</td>
              </tr>
              <tr>
                <td>On-Notification</td>
                <td>需要提醒某人或记录日志时</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>示例：</strong>有人修改了代码 → 一个 hook 察觉到 → 自动格式化该文件 →
          检查是否存在不安全的提交 → 运行一次安全扫描。
        </p>

        <h3>CLAUDE.md —— agent 常驻的笔记</h3>
        <p>
          CLAUDE.md 是 agent 始终保持可见的一份文件，就像贴在<strong>显示器上的便利贴</strong>——
          项目背景、公司信息，任何绝不该被遗忘的内容。从这里出发，它再指向具体的 skills
          和参考文档，按需调用。
        </p>
        <p>记住三者区别最简单的方式：</p>
        <ul>
          <li>
            <strong>Skills</strong> —— agent 应该知道什么
          </li>
          <li>
            <strong>MCP</strong> —— agent 能连接什么
          </li>
          <li>
            <strong>Hooks</strong> —— 什么时候该自动发生什么
          </li>
        </ul>

        <h3>Plugins —— 把这一切打包起来</h3>
        <p>
          一个 plugin 把 Skills + MCP + Hooks + Subagents 打包成一个可安装的整体——
          就像安装一个 App，而不是逐一单独配置每一块。
        </p>
        <CodeBlock language="text" code={`Skills + MCP + Hooks + Subagents  →  一个 Plugin`} />

        <h3>各层如何叠加</h3>
        <CodeBlock
          language="text"
          code={`Plugins        → 把一切打包成一个整体\n   ↓\nSkills         → 知识与工作流\n   ↓\nMCP ↔ Tools    → 外部连接 ＋ 内置能力\n   ↓\nSubagents      → 谁来实际执行\n   ↓\nHooks          → 过程中的自动检查\n   ↓\nCLAUDE.md      → 始终可见的笔记`}
        />

        <h3>基本的 agent 循环</h3>
        <p>这是 agent 在每个任务中会经历的循环：</p>
        <CodeBlock
          language="text"
          code={`Perceive（感知）  →  接收输入与上下文\nReason（推理）    →  决定下一步做什么\nAct（行动）       →  实际执行（调用工具、运行代码、请求 API）\nObserve（观察）   →  检查结果如何\nRepeat（重复）    →  回到起点，继续循环`}
        />

        <h3>速查表：各自的用途</h3>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr>
                <th>模块</th>
                <th>用途</th>
                <th>可以类比为</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Skills</td>
                <td>赋予 agent 专业能力</td>
                <td>一本说明手册</td>
              </tr>
              <tr>
                <td>MCP</td>
                <td>连接外部服务</td>
                <td>一个 USB-C 接口</td>
              </tr>
              <tr>
                <td>Subagents</td>
                <td>分派具体任务</td>
                <td>队友</td>
              </tr>
              <tr>
                <td>Hooks</td>
                <td>自动化日常检查</td>
                <td>绊线</td>
              </tr>
              <tr>
                <td>CLAUDE.md</td>
                <td>让关键上下文始终可见</td>
                <td>一张便利贴</td>
              </tr>
              <tr>
                <td>Plugins</td>
                <td>把一切打包在一起</td>
                <td>一个 App</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>实例演练：&ldquo;分析竞争对手并撰写报告&rdquo;</h3>
        <ol>
          <li>
            <strong>CLAUDE.md 加载</strong> —— 引入项目与公司背景信息
          </li>
          <li>
            <strong>某个 skill 被触发</strong> —— &ldquo;竞品分析&rdquo;工作流启动
          </li>
          <li>
            <strong>MCP 连接</strong> —— 在 Google Drive 中搜索过往的简报
          </li>
          <li>
            <strong>一个 subagent 启动</strong> —— 研究市场情况
          </li>
          <li>
            <strong>另一个 subagent 启动</strong> —— 审查竞品的代码仓库
          </li>
          <li>
            <strong>一个 hook 触发</strong> —— 自动格式化最终报告并运行代码检查
          </li>
        </ol>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="open-source-repos"
      locale={locale}
      dek="A curated directory of actively-maintained repos worth knowing about if you're building around Claude Code."
    >
      <WarningCallout>
        This is a snapshot, not a live feed — descriptions and maintenance status drift fast in
        this space. Verify directly on GitHub before relying on anything here for a decision.
      </WarningCallout>

      <RepoDirectory />

      <SeeAlso
        slug="customize"
        note="Want to see these layers combined into one system first, with a session-lifecycle diagram? See How It Fits Together."
      />

      <h2>Agent architecture reference</h2>
      <p>
        Four building blocks that work together to make an AI agent useful: Skills, MCP,
        Subagents, and Hooks. Most of the repos above extend or plug into one of these four.
      </p>

      <h3>1. Skills — what the agent knows</h3>
      <p>
        Skills are like <strong>manuals</strong> the agent can pull out when it needs them. They&apos;re
        instruction files (with scripts, templates, etc.) that live on disk, and the agent doesn&apos;t
        load them all at once — it only loads the ones it needs, when it needs them (&ldquo;progressive
        disclosure&rdquo;). Think of it like a mechanic grabbing the right repair manual instead of
        memorizing every manual ever written.
      </p>
      <CodeBlock
        language="text"
        code={`.claude/skills/\n├── deploy/\n│   └── SKILL.md\n├── code-review/\n│   └── SKILL.md`}
      />
      <p>
        <strong>How it works:</strong> a task comes in → the agent notices which skill applies → it
        loads that skill → then does the work.
      </p>

      <h3>2. MCP — how the agent connects to other tools</h3>
      <p>
        MCP is what lets the agent talk to outside services — GitHub, Notion, Slack, GitLab, AWS, a
        database, etc. Each service the agent connects to is called an &ldquo;MCP server&rdquo; (e.g. one
        for GitHub, one for Slack, one for a database). Think of MCP like a{" "}
        <strong>USB-C port</strong> — one standard plug that lets you connect all sorts of different
        devices. This is a fast-growing space — thousands of these connectors already exist, and
        the standard is now overseen by the Linux Foundation.
      </p>

      <h3>3. Subagents — who actually does the work</h3>
      <p>
        Subagents are smaller, focused helpers the main agent can hand tasks off to. Each one works
        in its own separate space, with its own permissions and tools — they don&apos;t step on each
        other. Think of them like <strong>teammates</strong>, each with their own job.
      </p>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Subagent</th>
              <th>What it&apos;s given access to</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Code Reviewer</td>
              <td>Read files, search code</td>
            </tr>
            <tr>
              <td>Researcher</td>
              <td>Web search, fetch pages</td>
            </tr>
            <tr>
              <td>Deployer</td>
              <td>Run commands, SSH access</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>4. Hooks — rules that run automatically</h3>
      <p>
        Hooks are automatic checks or actions that fire at set moments. They&apos;re{" "}
        <strong>not</strong> decided by the AI in the moment — they just run, like a tripwire.
      </p>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Hook</th>
              <th>Fires when</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pre-Tool</td>
              <td>Right before the agent uses a tool</td>
            </tr>
            <tr>
              <td>Post-Tool</td>
              <td>Right after the agent uses a tool</td>
            </tr>
            <tr>
              <td>On-Edit</td>
              <td>Whenever a file changes</td>
            </tr>
            <tr>
              <td>On-Notification</td>
              <td>When it&apos;s time to alert someone or log something</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Example:</strong> someone edits code → a hook notices → auto-formats the file →
        checks for unsafe commits → runs a security scan.
      </p>

      <h3>CLAUDE.md — the agent&apos;s always-on notes</h3>
      <p>
        CLAUDE.md is a file the agent always keeps in view, like a{" "}
        <strong>sticky note on your monitor</strong> — project background, company info, anything
        that should never be forgotten. From there, it points to specific skills and reference
        docs as needed.
      </p>
      <p>The simplest way to remember the difference:</p>
      <ul>
        <li>
          <strong>Skills</strong> — what the agent should know
        </li>
        <li>
          <strong>MCP</strong> — what the agent can connect to
        </li>
        <li>
          <strong>Hooks</strong> — when something should happen automatically
        </li>
      </ul>

      <h3>Plugins — packaging it all up</h3>
      <p>
        A plugin bundles Skills + MCP + Hooks + Subagents into one installable package — like an
        app you install once instead of setting up each piece separately.
      </p>
      <CodeBlock language="text" code={`Skills + MCP + Hooks + Subagents  →  one Plugin`} />

      <h3>How the pieces stack</h3>
      <CodeBlock
        language="text"
        code={`Plugins        → bundles everything into one package\n   ↓\nSkills         → the knowledge and workflows\n   ↓\nMCP ↔ Tools    → outside connections + built-in abilities\n   ↓\nSubagents      → who does the actual work\n   ↓\nHooks          → automatic checks along the way\n   ↓\nCLAUDE.md      → the notes that are always visible`}
      />

      <h3>The basic agent loop</h3>
      <p>This is the cycle the agent runs through on every task:</p>
      <CodeBlock
        language="text"
        code={`Perceive  →  take in the input and context\nReason    →  decide what to do next\nAct       →  actually do it (call a tool, run code, hit an API)\nObserve   →  check how it went\nRepeat    →  loop back to the start`}
      />

      <h3>Quick reference: what&apos;s for what</h3>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Piece</th>
              <th>What it&apos;s for</th>
              <th>Think of it as</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Skills</td>
              <td>Give the agent expertise</td>
              <td>A manual</td>
            </tr>
            <tr>
              <td>MCP</td>
              <td>Connect to outside services</td>
              <td>A USB-C port</td>
            </tr>
            <tr>
              <td>Subagents</td>
              <td>Hand off specific tasks</td>
              <td>Teammates</td>
            </tr>
            <tr>
              <td>Hooks</td>
              <td>Automate routine checks</td>
              <td>Tripwires</td>
            </tr>
            <tr>
              <td>CLAUDE.md</td>
              <td>Keep key context always visible</td>
              <td>A sticky note</td>
            </tr>
            <tr>
              <td>Plugins</td>
              <td>Package everything together</td>
              <td>An app</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Worked example: &ldquo;Analyze competitors and write a report&rdquo;</h3>
      <ol>
        <li>
          <strong>CLAUDE.md loads</strong> — pulls in project and company context
        </li>
        <li>
          <strong>A skill kicks in</strong> — the &ldquo;competitive analysis&rdquo; workflow
        </li>
        <li>
          <strong>MCP connects</strong> — searches Google Drive for past briefs
        </li>
        <li>
          <strong>A subagent spins up</strong> — researches the market
        </li>
        <li>
          <strong>Another subagent spins up</strong> — reviews competitor repos
        </li>
        <li>
          <strong>A hook fires</strong> — auto-formats the final report and runs a linter
        </li>
      </ol>
    </ContentPage>
  );
}
