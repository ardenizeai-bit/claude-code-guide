import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { DecisionTree } from "@/components/diagrams/DecisionTree";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Decision Guide" };

export default async function DecisionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="decision"
        locale={locale}
        translated
        dek="一份分支式的实操向导——而不是又一篇解释文章。针对你的具体情况顺着树走一遍，而不必再读一遍全貌。"
      >
        <h2>选择 AI 架构</h2>
        <p>
          在选择工作流自动化、LLM ＋ RAG、AI 工作流自动化、单一 agent，还是多 agent 系统之前，
          先从这条总原则出发。
        </p>
        <p>
          <strong>从能够可靠解决问题的、自主程度最低的架构开始。</strong>多 agent 并不是&ldquo;更先进的默认选项&rdquo;。
          自主程度每提升一级，都会带来更高的成本、更高的延迟，以及更大的可观测性负担。
          只有当动态任务分解和专家协同能实质性提升结果时，自主性才值得投入——而不是因为
          更新的模式听起来更强大。
        </p>

        <h3>如何顺着这条决策路径走</h3>
        <ol>
          <li>
            <strong>确定性的规则或 API 能解决这个问题吗？</strong>能——用<strong>工作流自动化</strong>
            （审批路由、通知、记录同步、定期报告）。不能——往下看。
          </li>
          <li>
            <strong>核心需求是回答、总结、提取、分类还是起草内容？</strong>是——继续第 3 步。
            不是——跳到第 4 步。
          </li>
          <li>
            <strong>答案必须基于可信、私有或频繁变化的数据源吗？</strong>是——用
            <strong>LLM ＋ RAG</strong>（政策问答助手、文档问答、支持知识库）。不是——用
            <strong>LLM 应用／提示词工作流</strong>（文案起草、翻译、会议纪要总结）。
          </li>
          <li>
            <strong>流程是否可预测、步骤是否能明确定义？</strong>是——用<strong>AI 工作流自动化</strong>
            （在确定性编排中嵌入 LLM 节点、工具调用、RAG、校验环节；例如发票审核、
            线索资格判断、理赔分诊、报告生成）。不是——继续第 5 步。
          </li>
          <li>
            <strong>系统必须在运行时自行选择工具、决定步骤顺序或调整计划吗？</strong>不需要——回到
            第 4 步的 AI 工作流自动化。需要——继续第 6 步。
          </li>
          <li>
            <strong>一个配备工具、RAG 和护栏的agent 能独立处理吗？</strong>能——用
            <strong>单一 LLM agent</strong>（服务台 agent、销售调研、数据分析助手）。不能——
            继续第 7 步。
          </li>
          <li>
            <strong>是否存在不同的专家角色、领域或可并行的工作线？</strong>没有——回到单一
            agent 就够了。有——用<strong>多 agent 系统</strong>（尽职调查、复杂调查、跨领域支持）；
            再进一步判断：交接顺序是否提前已知？已知——多 agent ＋工作流编排；未知——
            动态多 agent 编排。
          </li>
        </ol>

        <h3>选型指南</h3>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr>
                <th>方案</th>
                <th>适用场景</th>
                <th>不适用场景</th>
                <th>典型模式</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>工作流自动化</td>
                <td>输入、规则、动作和异常路径都已知且稳定</td>
                <td>系统必须理解模糊的语言或自行决定下一步动作</td>
                <td>触发 → 规则 → API／动作 → 审计日志</td>
              </tr>
              <tr>
                <td>LLM ＋ RAG</td>
                <td>用户需要基于内部或不断变化的知识给出有依据的答案</td>
                <td>主要目标是执行多步骤的业务动作</td>
                <td>提问 → 检索经审批的来源 → 生成带引用的答案</td>
              </tr>
              <tr>
                <td>AI 工作流自动化</td>
                <td>路径固定，但单个步骤需要语言理解能力</td>
                <td>无法提前列举出所有步骤</td>
                <td>接收 → 分类 → 检索 → 生成 → 校验 → 人工审批</td>
              </tr>
              <tr>
                <td>单一 LLM agent</td>
                <td>任务需要在单一领域内进行工具选择、迭代推理或自适应规划</td>
                <td>需要多个独立的领域专家，或涉及高风险、不受限的自主行为</td>
                <td>Agent → 规划 → 调用工具／RAG → 检查结果 → 响应</td>
              </tr>
              <tr>
                <td>多 agent</td>
                <td>专家之间需要协作、并行工作、互相评审，或跨不同领域路由任务</td>
                <td>单一工作流或单一 agent 已能胜任；延迟、成本和可观测性是关键考量</td>
                <td>编排者 → 各专家 agent → 评审／风控 agent → 最终整合</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>五个决策自检</h3>
        <p>在敲定 agentic 设计方案之前，先跑一遍这五个自检：</p>
        <ol>
          <li><strong>流程是否已知？</strong>已知——用工作流，而不是 agent 自主性。</li>
          <li><strong>知识检索是否才是真正的瓶颈？</strong>是——先加 RAG，再考虑加 agent。</li>
          <li><strong>系统是否需要自行选择下一步或所用工具？</strong>是——考虑单一 agent。</li>
          <li><strong>不同专家分工是否真的比一个配备工具的 agent 效果更好？</strong>是——考虑多 agent。</li>
          <li>
            <strong>做错一个动作的代价是什么？</strong>对于高风险动作——支付、生产环境变更、
            受监管的决策——无论选择哪种架构，都要加上确定性的关卡和人工审批。
          </li>
        </ol>

        <h3>落地阶梯</h3>
        <p>对于企业项目，按以下顺序搭建，一旦问题解决就停止：</p>
        <ol>
          <li><strong>工作流 ＋ API</strong>——用于可预测的事务性场景。</li>
          <li><strong>加入一个 LLM 节点</strong>——用于分类、提取、起草或总结。</li>
          <li><strong>加入 RAG</strong>——当答案必须基于内部政策、文档或最新的企业数据时。</li>
          <li><strong>升级为单一工具调用 agent</strong>——仅当动作顺序无法被可靠地预先确定时。</li>
          <li>
            <strong>引入多 agent</strong>——仅当专家分工、并行调研、独立验证或动态路由能带来
            可衡量的价值时。
          </li>
        </ol>

        <h3>实例参考</h3>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr>
                <th>问题</th>
                <th>架构</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>为采购申请安排审批流程</td>
                <td>工作流自动化</td>
              </tr>
              <tr>
                <td>基于已批准的文档回答 HR 政策问题</td>
                <td>LLM ＋ RAG</td>
              </tr>
              <tr>
                <td>读取发票、校验字段、与采购订单记录比对、异常情况升级处理</td>
                <td>AI 工作流自动化</td>
              </tr>
              <tr>
                <td>跨 CRM、工单系统、文档和配送状态调查一个客户问题</td>
                <td>配备工具和 RAG 的单一 agent</td>
              </tr>
              <tr>
                <td>
                  开展投资尽职调查：研究申报文件、分析财务数据、识别风险、核实说法、撰写备忘录
                </td>
                <td>多 agent（研究员、财务分析师、风控评审员、报告撰写者），最终由人工审批</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-text-secondary">
          这一框架的思路，与腾讯 Agent Development Platform 划分能力的方式一致：用工作流编排
          处理稳定、可控的流程；用 LLM／RAG 处理知识驱动型应用；用多 agent 模式处理需要灵活
          规划、多次工具调用和专家协同的任务。参考：
          <a
            href="https://intl.cloud.tencent.com/document/product/1254"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-accent"
          >
            腾讯云 ADP 文档
          </a>
          、
          <a
            href="https://www.tencentcloud.com/document/product/1254/69956"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-accent"
          >
            腾讯云 ADP 产品指南
          </a>
          、
          <a
            href="https://github.com/TencentCloudADP"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-accent"
          >
            腾讯云 ADP GitHub
          </a>
          （外部链接，非官方内容）。
        </p>

        <h2>Claude Code 分层决策树</h2>
        <p>下面这棵树针对的是更具体的问题：在 Claude Code 内部该用哪一层扩展能力。</p>

        <DecisionTree locale={locale} />

        <h2>如何读这棵树</h2>
        <ol>
          <li><strong>需要每次会话都记住这件事吗？</strong>无论任务是什么，都应该影响每一次会话的内容 → CLAUDE.md。</li>
          <li><strong>需要连接外部系统吗？</strong>GitHub、数据库、Slack——代码库之外的任何东西 → 一个 MCP 服务器。</li>
          <li><strong>是可重复的多步骤工作流吗？</strong>一段你原本每次都要重新输入的流程 → 一个 Skill，通过 <code>/skill-name</code> 调用。</li>
          <li><strong>必须始终执行，没有例外吗？</strong>某件事必须在每一次匹配的工具调用上确定性地发生 → 一个 Hook（<code>PreToolUse</code>/<code>PostToolUse</code>）。</li>
          <li><strong>各个工作者需要在过程中互相沟通吗？</strong>如果并行的各部分需要在运行过程中协调 → Agent Teams（点对点）。如果它们完全独立 → Subagents（各自隔离、最后汇报结果的工作者）。</li>
        </ol>

        <h2>速查表</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>场景</th><th>对应层</th></tr>
            </thead>
            <tbody>
              <tr><td>每次会话都要遵循的编码规范</td><td>CLAUDE.md</td></tr>
              <tr><td>从 Jira/Slack/数据库拉取数据</td><td>MCP</td></tr>
              <tr><td>对照固定清单进行 PR 评审</td><td>Skill</td></tr>
              <tr><td>保存时自动格式化</td><td>Hook</td></tr>
              <tr><td>三个 agent 评审不同的文件</td><td>Agent Teams</td></tr>
              <tr><td>并行运行测试＋lint＋类型检查</td><td>Subagents</td></tr>
              <tr><td>项目专属的 linter 配置</td><td>CLAUDE.md</td></tr>
              <tr><td>一个数据库迁移生成器</td><td>Skill</td></tr>
              <tr><td>拦截没有工单 ID 的提交</td><td>Hook</td></tr>
            </tbody>
          </table>
        </div>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="decision"
      locale={locale}
      dek="A branching walkthrough — not another explainer. Follow the tree for your specific situation instead of reading the whole picture again."
    >
      <h2>Choosing an AI architecture</h2>
      <p>
        Before picking between workflow automation, LLM + RAG, AI workflow automation, a single
        agent, or a multi-agent system, start from this governing principle.
      </p>
      <p>
        <strong>Start with the least autonomous architecture that can reliably solve the
        problem.</strong> Multi-agent is not the &ldquo;more advanced default.&rdquo; Each step up
        the autonomy ladder adds cost, latency, and observability burden. Autonomy is justified
        only when dynamic decomposition and specialist coordination materially improve the
        outcome — not because the newer pattern feels more capable.
      </p>

      <h3>Walking the decision path</h3>
      <ol>
        <li>
          <strong>Can deterministic rules or APIs solve it?</strong> Yes — use{" "}
          <strong>workflow automation</strong> (approval routing, notifications, record sync,
          scheduled reports). No — keep going.
        </li>
        <li>
          <strong>Is the core need to answer, summarize, extract, classify, or draft?</strong>{" "}
          Yes — continue to step 3. No — skip to step 4.
        </li>
        <li>
          <strong>Must answers be grounded in trusted, private, or frequently changing
          sources?</strong> Yes — use <strong>LLM + RAG</strong> (policy copilot, document Q&amp;A,
          support knowledge assistant). No — use <strong>LLM application / prompt workflow</strong>{" "}
          (copy drafting, translation, meeting summarization).
        </li>
        <li>
          <strong>Is the process predictable, with steps you can define explicitly?</strong> Yes —
          use <strong>AI workflow automation</strong> (deterministic orchestration with LLM nodes,
          tools, RAG, and validation — invoice review, lead qualification, claims triage, report
          generation). No — continue to step 5.
        </li>
        <li>
          <strong>Must the system choose tools, sequence steps, or adapt its plan at
          runtime?</strong> No — go back to AI workflow automation from step 4. Yes — continue to
          step 6.
        </li>
        <li>
          <strong>Can one well-scoped agent with tools, RAG, and guardrails handle it?</strong>{" "}
          Yes — use a <strong>single LLM agent</strong> (service desk agent, sales research,
          data-analysis assistant). No — continue to step 7.
        </li>
        <li>
          <strong>Are there distinct specialist roles, domains, or parallel workstreams?</strong>{" "}
          No — a single agent is enough. Yes — use a <strong>multi-agent system</strong> (due
          diligence, complex investigations, multi-domain support); then check whether the handoff
          sequence is known in advance — if so, multi-agent with workflow orchestration; if not,
          dynamic multi-agent orchestration.
        </li>
      </ol>

      <h3>Selection guide</h3>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Approach</th>
              <th>Select it when</th>
              <th>Avoid it when</th>
              <th>Typical pattern</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Workflow automation</td>
              <td>Inputs, rules, actions, and exception paths are known and stable</td>
              <td>The system must interpret ambiguous language or decide the next action</td>
              <td>Trigger → rules → API/action → audit log</td>
            </tr>
            <tr>
              <td>LLM + RAG</td>
              <td>Users need grounded answers from internal or changing knowledge</td>
              <td>The primary goal is executing multi-step business actions</td>
              <td>Question → retrieve approved sources → generate cited answer</td>
            </tr>
            <tr>
              <td>AI workflow automation</td>
              <td>The path is fixed, but individual steps need language intelligence</td>
              <td>You cannot enumerate the steps ahead of time</td>
              <td>Intake → classify → retrieve → generate → validate → human approval</td>
            </tr>
            <tr>
              <td>Single LLM agent</td>
              <td>
                The task needs tool selection, iterative reasoning, or adaptive planning within
                one domain
              </td>
              <td>
                It requires many independent domain experts, or involves high-stakes unbounded
                autonomy
              </td>
              <td>Agent → plan → call tools/RAG → check result → respond</td>
            </tr>
            <tr>
              <td>Multi-agent</td>
              <td>
                Specialists must collaborate, work in parallel, critique outputs, or route across
                distinct domains
              </td>
              <td>
                A workflow or single agent can do the job; latency, cost, and observability matter
              </td>
              <td>Orchestrator → specialists → reviewer/risk agent → final synthesis</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Five decision tests</h3>
      <p>Run these before committing to an agentic design:</p>
      <ol>
        <li><strong>Is the process known?</strong> If yes, use a workflow, not agent autonomy.</li>
        <li>
          <strong>Is knowledge retrieval the actual bottleneck?</strong> If yes, add RAG before
          adding agents.
        </li>
        <li>
          <strong>Does the system need to choose its own next step or tool?</strong> If yes,
          consider a single agent.
        </li>
        <li>
          <strong>Would distinct specialists produce meaningfully better work than one agent with
          tools?</strong> If yes, consider multi-agent.
        </li>
        <li>
          <strong>What is the cost of an incorrect action?</strong> For high-risk actions —
          payments, production changes, regulated decisions — use deterministic gates and human
          approval regardless of which architecture you pick.
        </li>
      </ol>

      <h3>Implementation ladder</h3>
      <p>For enterprise projects, build in this order and stop as soon as the problem is solved:</p>
      <ol>
        <li><strong>Workflow + APIs</strong> for predictable, transactional use cases.</li>
        <li>
          <strong>Add an LLM node</strong> for classification, extraction, drafting, or
          summarization.
        </li>
        <li>
          <strong>Add RAG</strong> when answers must be grounded in internal policies, documents,
          or fresh enterprise data.
        </li>
        <li>
          <strong>Upgrade to a single tool-using agent</strong> only when the order of actions
          cannot be reliably predetermined.
        </li>
        <li>
          <strong>Introduce multi-agent</strong> only when measurable value comes from specialist
          decomposition, parallel research, independent verification, or dynamic routing.
        </li>
      </ol>

      <h3>Worked examples</h3>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Problem</th>
              <th>Architecture</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Route a purchase request for approval</td>
              <td>Workflow automation</td>
            </tr>
            <tr>
              <td>Answer HR-policy questions from approved documents</td>
              <td>LLM + RAG</td>
            </tr>
            <tr>
              <td>
                Read invoices, validate fields, match against PO records, escalate exceptions
              </td>
              <td>AI workflow automation</td>
            </tr>
            <tr>
              <td>
                Investigate a customer issue across CRM, tickets, docs, and delivery status
              </td>
              <td>Single agent with tools and RAG</td>
            </tr>
            <tr>
              <td>
                Run investment due diligence: research filings, analyse financials, identify
                risks, validate claims, write a memo
              </td>
              <td>
                Multi-agent (researcher, financial analyst, risk reviewer, report writer) with a
                human final approver
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm text-text-secondary">
        This framing aligns with how Tencent&apos;s Agent Development Platform separates its
        capabilities: workflow orchestration for stable, controllable processes; LLM/RAG for
        knowledge-grounded applications; and multi-agent mode for tasks requiring flexible
        planning, multiple tool calls, and specialist coordination. References:{" "}
        <a
          href="https://intl.cloud.tencent.com/document/product/1254"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent"
        >
          Tencent Cloud ADP documentation
        </a>
        ,{" "}
        <a
          href="https://www.tencentcloud.com/document/product/1254/69956"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent"
        >
          Tencent Cloud ADP product guide
        </a>
        ,{" "}
        <a
          href="https://github.com/TencentCloudADP"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent"
        >
          Tencent Cloud ADP on GitHub
        </a>{" "}
        (external links, not official Claude Code content).
      </p>

      <h2>Claude Code&apos;s layer decision tree</h2>
      <p>The tree below covers a narrower question: which extension layer to reach for inside Claude Code.</p>

      <DecisionTree />

      <h2>Reading the tree</h2>
      <ol>
        <li><strong>Always know this about the project?</strong> Something that should shape every session, no matter the task → CLAUDE.md.</li>
        <li><strong>Connects to an external system?</strong> GitHub, a database, Slack — anything outside the codebase itself → an MCP server.</li>
        <li><strong>Repeatable multi-step workflow?</strong> A sequence you'd otherwise retype every time → a Skill, called via <code>/skill-name</code>.</li>
        <li><strong>Must always run, no exceptions?</strong> Something that has to happen deterministically on every matching tool call → a Hook (<code>PreToolUse</code>/<code>PostToolUse</code>).</li>
        <li><strong>Workers must talk mid-task?</strong> If the parallel pieces need to coordinate while running → Agent Teams (peer-to-peer). If they're fully independent → Subagents (isolated workers that report back).</li>
      </ol>

      <h2>Quick-reference cheat sheet</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Scenario</th><th>Layer</th></tr>
          </thead>
          <tbody>
            <tr><td>Coding standards every session</td><td>CLAUDE.md</td></tr>
            <tr><td>Pulling data from Jira/Slack/DB</td><td>MCP</td></tr>
            <tr><td>PR review against a fixed checklist</td><td>Skill</td></tr>
            <tr><td>Auto-format on save</td><td>Hook</td></tr>
            <tr><td>Three agents reviewing different files</td><td>Agent Teams</td></tr>
            <tr><td>Parallel test + lint + type-check</td><td>Subagents</td></tr>
            <tr><td>Project-specific linter config</td><td>CLAUDE.md</td></tr>
            <tr><td>A database-migration generator</td><td>Skill</td></tr>
            <tr><td>Blocking commits without a ticket ID</td><td>Hook</td></tr>
          </tbody>
        </table>
      </div>
    </ContentPage>
  );
}
