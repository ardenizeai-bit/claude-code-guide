import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { TryItCallout, WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Cowork" };

export default async function CoworkPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="cowork"
        locale={locale}
        translated
        dek="与 Claude Code 相同的智能体引擎，包裹在一个为知识工作而不是终端设计的桌面图形界面里。"
      >
        <p>
          Cowork 运行在 Claude 桌面应用内部。你描述一个想要的结果，它就会在你的本地文件和
          已连接的应用之间进行规划并执行，你则在过程中随时引导方向——底层架构和 Claude
          Code 完全一样，只是面向不同的受众。
        </p>

        <h2>心智模型</h2>
        <p>
          Cowork 不是聊天。给它带有具体交付物的任务，而不是提问。如果任务最终会产出一份
          完成的文件，那就是一个 Cowork 任务；如果只是想要一个快速答案，用聊天就够了。
        </p>

        <h2>Cowork 对比 聊天 对比 Claude Code</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th></th><th>Cowork</th><th>Claude Code</th></tr>
            </thead>
            <tbody>
              <tr><td>界面</td><td>桌面图形界面</td><td>终端命令行</td></tr>
              <tr><td>受众</td><td>知识工作者</td><td>开发者</td></tr>
              <tr><td>配置方式</td><td>应用内开关切换</td><td>手动安装</td></tr>
              <tr><td>安全性</td><td>沙箱虚拟机，仅限已批准的文件夹</td><td>完整的 shell 权限</td></tr>
              <tr><td>引擎</td><td>相同的智能体架构</td><td>相同的智能体架构</td></tr>
            </tbody>
          </table>
        </div>

        <h2>一次性配置（约 5 分钟）</h2>
        <ol>
          <li>安装或更新 Claude 桌面应用（Mac 或 Windows——仅限桌面端）</li>
          <li>在&ldquo;设置 → 功能&rdquo;中启用 Cowork（付费方案）</li>
          <li>运行 <code>/setup-cowork</code> 来安装与角色匹配的插件并连接工具</li>
          <li>给它分配一个专属文件夹（例如 <code>~/Cowork</code>），并将其权限限制在此文件夹内</li>
        </ol>

        <h2>核心循环</h2>
        <p>
          把输入文件放进文件夹 → 描述想要的结果和格式 → 在批准之前先审阅计划，
          尤其是在任何删除或覆盖操作之前 → 在任务进行中随时引导 → 回来查看完成的文件。
        </p>

        <h2>特色流程：周五报告自动生成</h2>
        <p>
          搭建一个工作区文件夹，包含一份描述要追踪什么内容的 <code>context/brief.md</code>、
          一个 <code>past-reports/</code> 文件夹（用于让格式与之前的输出保持一致），
          以及一个 <code>output/</code> 文件夹。通过 <code>/setup-cowork</code> 连接数据源，
          先构建并测试一次报告提示词——审阅计划并检查第一次的输出——然后用{" "}
          <code>/schedule</code> 设置定时执行。如果想在别处复用，可以用{" "}
          <code>/skill-creator</code> 把它打包成一个 skill。
        </p>
        <p>
          定时任务是&ldquo;尽力而为&rdquo;的：只有在机器处于唤醒状态且桌面应用打开时任务
          才会运行，错过的执行会在唤醒后补跑。
        </p>

        <h2>获得优质输出</h2>
        <p>
          做编辑，而不是做策略制定者——Cowork 执行得很好，但不会自己凭空产生判断力，
          所以要告诉它&ldquo;好&rdquo;是什么样子。把大任务拆解成具体的、可比较的子任务。
          给它一个过去的示例，让它对照样式和格式。通过插件连接工具，让它拉取实时数据，
          而不是依赖手动导出。
        </p>

        <TryItCallout locale={locale}>
          一个风险较低的入门任务：&ldquo;整理这个文件夹——按类型创建子文件夹，把文件重命名为
          YYYY-MM-DD-描述 的格式，标记出任何重复文件，并给我一份改动摘要。&rdquo;
        </TryItCallout>

        <WarningCallout locale={locale}>
          Cowork 在处理多步骤文件工作时可能很快消耗使用配额，也不适合用于受监管或敏感的数据——
          它的活动不会被记录在 Audit Logs 或 Compliance API 中，历史记录也只存储在本地。
          任何破坏性操作之前都务必先审阅。
        </WarningCallout>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="cowork"
      locale={locale}
      dek="The same agentic engine as Claude Code, wrapped in a desktop GUI built for knowledge work rather than terminals."
    >
      <p>
        Cowork runs inside the Claude desktop app. You describe an outcome, it plans and executes
        across your local files and connected apps, and you steer along the way — the same
        underlying architecture as Claude Code, aimed at a different audience.
      </p>

      <h2>Mental model</h2>
      <p>
        Cowork isn&apos;t chat. Give it jobs with a deliverable, not questions. If the task ends
        in a finished file, it&apos;s a Cowork task; if it&apos;s a quick answer, use chat instead.
      </p>

      <h2>Cowork vs. Chat vs. Claude Code</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th></th><th>Cowork</th><th>Claude Code</th></tr>
          </thead>
          <tbody>
            <tr><td>Interface</td><td>Desktop GUI</td><td>Terminal CLI</td></tr>
            <tr><td>Audience</td><td>Knowledge workers</td><td>Developers</td></tr>
            <tr><td>Setup</td><td>Toggle in app</td><td>Manual install</td></tr>
            <tr><td>Security</td><td>Sandboxed VM, approved folders only</td><td>Full shell permissions</td></tr>
            <tr><td>Engine</td><td>Same agentic architecture</td><td>Same agentic architecture</td></tr>
          </tbody>
        </table>
      </div>

      <h2>One-time setup (~5 minutes)</h2>
      <ol>
        <li>Install or update the Claude desktop app (Mac or Windows — desktop-only)</li>
        <li>Enable Cowork in Settings → Features (paid plans)</li>
        <li>Run <code>/setup-cowork</code> to install role-matched plugins and connect tools</li>
        <li>Grant it a dedicated folder (e.g. <code>~/Cowork</code>) it&apos;s restricted to</li>
      </ol>

      <h2>The core loop</h2>
      <p>
        Drop inputs into the folder → describe the outcome and format → review the plan before
        approving, especially before any delete or overwrite → steer mid-task → come back to the
        finished file.
      </p>

      <h2>Featured flow: Friday report on autopilot</h2>
      <p>
        Set up a workspace folder with a <code>context/brief.md</code> describing what to track, a{" "}
        <code>past-reports/</code> folder so the format matches prior output, and an{" "}
        <code>output/</code> folder. Connect data sources via <code>/setup-cowork</code>, build and
        test the report prompt once — reviewing the plan and checking the first output — then
        schedule it with <code>/schedule</code>. Package it into a skill with{" "}
        <code>/skill-creator</code> if you want to reuse it elsewhere.
      </p>
      <p>
        Scheduling is best-effort: tasks only run while the machine is awake and the desktop app
        is open, with missed runs executing on wake.
      </p>

      <h2>Getting good output</h2>
      <p>
        Be the editor, not the strategist — Cowork executes well but won&apos;t invent judgment on
        its own, so tell it what &ldquo;good&rdquo; looks like. Decompose big asks into specific,
        comparable sub-tasks. Give it a past example to match style and format against. Connect
        tools via plugins so it pulls live data instead of relying on manual exports.
      </p>

      <TryItCallout>
        A low-risk first task: &ldquo;Organize this folder — create subfolders by type, rename
        files as YYYY-MM-DD-description, flag any duplicates, and give me a summary of what you
        changed.&rdquo;
      </TryItCallout>

      <WarningCallout>
        Cowork can burn usage quota quickly on multi-step file work, and it isn&apos;t suited to
        regulated or sensitive data — activity isn&apos;t captured in Audit Logs or the Compliance
        API, and history is stored locally. Always review before any destructive action.
      </WarningCallout>
    </ContentPage>
  );
}
