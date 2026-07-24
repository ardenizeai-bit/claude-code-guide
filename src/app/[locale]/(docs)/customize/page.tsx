import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { LifecycleFlow } from "@/components/diagrams/LifecycleFlow";
import { LayerStack } from "@/components/diagrams/LayerStack";
import { TipCallout } from "@/components/Callout";
import { SeeAlso } from "@/components/SeeAlso";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "How It Fits Together" };

export default async function CustomizePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="customize"
        locale={locale}
        translated
        dek="五种自定义层，五种不同的问题——大多数人先从一种入手，需要时再逐步添加其他几种。"
      >
        <p>
          CLAUDE.md、MCP、Skills、Hooks、Subagents 和 Plugins 都在扩展 Claude Code，
          但它们解决的是形状完全不同的问题。用错了层是最常见的挫败感来源——如果真正的问题是
          Claude 不知道你的命名约定，Hook 帮不上忙；一条 CLAUDE.md 规则，也无法保证每次编辑
          都会运行 lint 检查。
        </p>

        <h2>每一层在会话中所处的位置</h2>
        <p>
          CLAUDE.md 只在会话开始时加载一次。Hooks 在会话运行过程中的特定节点触发。
          MCP 和 Skills 是按需调用的。Plugins 只是把其余几层打包起来的一种封装格式。
        </p>
        <LifecycleFlow locale={locale} />

        <h2>一种更简单的方式来记住整套体系</h2>
        <p>
          Skills 就像 agent 只有在任务需要时才会翻出来的操作手册——它不会一次性加载所有
          skill，只调用适用的那一个（&ldquo;渐进式披露&rdquo;）。MCP 是那个 USB-C 接口：
          一种标准接口，用来连接 GitHub、Slack、数据库，或代码库之外的任何东西。Subagents
          是队友，各自在自己的空间里工作、拥有各自的权限，彼此不会互相干扰。Hooks 是绊线——
          不是模型临时决定的，它们就是会触发。CLAUDE.md 是贴在显示器上的便利贴：任何绝不能
          忘记的事情。Plugins 把以上所有内容打包成一个可安装的整体。
        </p>
        <LayerStack locale={locale} />

        <h2>基本的 agent 循环</h2>
        <p>
          在所有这些层之下，每一个任务都会经过同一套循环：
        </p>
        <ol>
          <li><strong>感知</strong> — 接收输入和上下文</li>
          <li><strong>推理</strong> — 决定接下来该做什么</li>
          <li><strong>行动</strong> — 真正去做：调用工具、运行代码、请求 API</li>
          <li><strong>观察</strong> — 检查结果如何</li>
          <li><strong>重复</strong> — 回到循环起点</li>
        </ol>
        <p>
          Skills、MCP、Subagents 和 Hooks 并不会取代这个循环——它们塑造的是每一步内部发生的
          事情：给 agent 更多推理的素材、更多行动的手段，或者保证某件事无论模型怎么决定都会发生。
        </p>

        <h2>实例演练：&ldquo;分析竞争对手并撰写报告&rdquo;</h2>
        <ol>
          <li><strong>CLAUDE.md 加载</strong> — 拉取项目和公司背景信息</li>
          <li><strong>一个 skill 被触发</strong> — 启动&ldquo;竞品分析&rdquo;工作流</li>
          <li><strong>MCP 建立连接</strong> — 在 Google Drive 中搜索过往的简报</li>
          <li><strong>一个 subagent 启动</strong> — 研究市场情况</li>
          <li><strong>另一个 subagent 启动</strong> — 审查竞争对手的代码仓库</li>
          <li><strong>一个 hook 触发</strong> — 自动格式化最终报告并运行 linter</li>
        </ol>
        <p>
          六个层，一个任务——没有哪一层是单独完成全部工作的。
        </p>

        <SeeAlso
          slug="subagents"
          locale={locale}
          note="Subagents 是这套体系中&ldquo;谁来干活&rdquo;的那一层——看看它们具体是如何被定义和调用的。"
        />

        <h2>我该用哪一个？</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>症状</th><th>解决办法</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>&ldquo;Claude 一直重复同一个错误&rdquo;</td>
                <td>把规则加进 CLAUDE.md——它每次会话都会加载</td>
              </tr>
              <tr>
                <td>&ldquo;Claude 需要来自 GitHub / Slack / 数据库的数据&rdquo;</td>
                <td>连接一个 MCP 服务器</td>
              </tr>
              <tr>
                <td>&ldquo;我总在重复输入同一套多步骤工作流&rdquo;</td>
                <td>写一个 Skill，用 <code>/name</code> 调用它</td>
              </tr>
              <tr>
                <td>&ldquo;有件事必须始终执行，没有例外&rdquo;</td>
                <td>用 Hook——在生命周期事件上触发，无法被跳过</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>推荐的采用顺序</h2>
        <ol>
          <li><strong>CLAUDE.md</strong> — 只需五分钟配置，单位时间投入产出比最高。</li>
          <li><strong>MCP</strong> — 先接入一个服务器（GitHub 通常是最常见的第一选择）。</li>
          <li><strong>Skills</strong> — 当你第三次重复输入同一段提示词时。</li>
          <li><strong>Hooks</strong> — 当你需要的是保证，而不只是建议时。</li>
          <li><strong>Plugins</strong> — 用来打包配置并与团队共享。</li>
        </ol>

        <TipCallout locale={locale}>
          大多数独立开发者从未走到第 2 步之后——一份优秀的 CLAUDE.md 加上一个 MCP 服务器，
          就能覆盖日常工作中的大部分摩擦。除非有明确的理由，否则不必急着用 Hooks 或 Plugins。
        </TipCallout>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="customize"
      locale={locale}
      dek="Five customization layers, five different problems — most people start with one and add the rest only as needed."
    >
      <p>
        CLAUDE.md, MCP, Skills, Hooks, Subagents, and Plugins all extend Claude Code, but they
        solve different shaped problems. Reaching for the wrong one is the most common source of
        frustration — a Hook won&apos;t help if the real issue is that Claude doesn&apos;t know
        your naming convention, and a CLAUDE.md rule won&apos;t guarantee a lint step runs on
        every single edit.
      </p>

      <h2>Where each layer sits in a session</h2>
      <p>
        CLAUDE.md loads once, at the start. Hooks fire at specific points as the session runs.
        MCP and Skills are invoked on demand. Plugins are just a packaging format for the rest.
      </p>
      <LifecycleFlow />

      <h2>A simpler way to hold the whole stack in your head</h2>
      <p>
        Skills are like manuals the agent pulls out only when a task needs them — it doesn&apos;t
        load every skill at once, just the one that applies (&ldquo;progressive
        disclosure&rdquo;). MCP is the USB-C port: one standard plug for connecting to GitHub,
        Slack, a database, or anything else outside the codebase. Subagents are teammates, each
        working in their own space with their own permissions, so they don&apos;t step on each
        other. Hooks are tripwires — not decided by the model in the moment, they just fire.
        CLAUDE.md is the sticky note on the monitor: whatever should never be forgotten. Plugins
        bundle all of the above into one installable package.
      </p>
      <LayerStack />

      <h2>The basic agent loop</h2>
      <p>
        Underneath all of these layers, every task runs through the same cycle:
      </p>
      <ol>
        <li><strong>Perceive</strong> — take in the input and context</li>
        <li><strong>Reason</strong> — decide what to do next</li>
        <li><strong>Act</strong> — actually do it: call a tool, run code, hit an API</li>
        <li><strong>Observe</strong> — check how it went</li>
        <li><strong>Repeat</strong> — loop back to the start</li>
      </ol>
      <p>
        Skills, MCP, Subagents, and Hooks don&apos;t replace this loop — they shape what happens
        inside each step, giving the agent more to reason with, more to act through, or a
        guarantee that something happens regardless of what it decides.
      </p>

      <h2>Worked example: &ldquo;Analyze competitors and write a report&rdquo;</h2>
      <ol>
        <li><strong>CLAUDE.md loads</strong> — pulls in project and company context</li>
        <li><strong>A skill kicks in</strong> — the &ldquo;competitive analysis&rdquo; workflow</li>
        <li><strong>MCP connects</strong> — searches Google Drive for past briefs</li>
        <li><strong>A subagent spins up</strong> — researches the market</li>
        <li><strong>Another subagent spins up</strong> — reviews competitor repos</li>
        <li><strong>A hook fires</strong> — auto-formats the final report and runs a linter</li>
      </ol>
      <p>
        Six layers, one task — none of them doing the whole job alone.
      </p>

      <SeeAlso
        slug="subagents"
        note="Subagents are the 'who does the work' layer in this stack — see how they're actually defined and invoked."
      />

      <h2>Which one do I need?</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Symptom</th><th>Fix</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>&ldquo;Claude keeps making the same mistake&rdquo;</td>
              <td>Add the rule to CLAUDE.md — it loads every session</td>
            </tr>
            <tr>
              <td>&ldquo;Claude needs data from GitHub / Slack / a database&rdquo;</td>
              <td>Connect an MCP server</td>
            </tr>
            <tr>
              <td>&ldquo;I keep retyping the same multi-step workflow&rdquo;</td>
              <td>Write a Skill, invoke it with <code>/name</code></td>
            </tr>
            <tr>
              <td>&ldquo;Something must ALWAYS run, no exceptions&rdquo;</td>
              <td>Use a Hook — fires at lifecycle events, can&apos;t be skipped</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Recommended adoption order</h2>
      <ol>
        <li><strong>CLAUDE.md</strong> — five minutes of setup, the highest impact per minute spent.</li>
        <li><strong>MCP</strong> — start with one server (GitHub is the common first choice).</li>
        <li><strong>Skills</strong> — once you&apos;ve retyped the same prompt for the third time.</li>
        <li><strong>Hooks</strong> — once you need a guarantee, not just a suggestion.</li>
        <li><strong>Plugins</strong> — to package and share your setup with a team.</li>
      </ol>

      <TipCallout>
        Most solo developers never get past step 2 — a good CLAUDE.md plus a single MCP server
        covers the majority of day-to-day friction. Don&apos;t reach for Hooks or Plugins until
        you have a concrete reason.
      </TipCallout>
    </ContentPage>
  );
}
