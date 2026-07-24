import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { TipCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Getting Started" };

const INSTALL_CODE = `# macOS / Linux\ncurl -fsSL https://claude.ai/install.sh | bash\n\n# or via npm\nnpm install -g @anthropic-ai/claude-code`;

export default async function GettingStartedPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="getting-started"
        locale={locale}
        translated
        dek="安装 Claude Code，打开一个项目，五分钟内完成你的第一次改动。"
      >
        <p>
          Claude Code 运行在你的终端里，而不是聊天窗口中。你用自然语言描述任务，它会读取项目中相关的文件、
          进行修改、运行必要的检查，然后向你汇报结果——每次只推进一步，你全程参与其中。
        </p>

        <h2>安装</h2>
        <CodeBlock language="bash" code={INSTALL_CODE} locale={locale} />
        <p>
          安装完成后，在任意项目目录下运行 <code>claude</code> 即可。首次启动会引导你登录——之后每次只需输入{" "}
          <code>claude</code> 就能开始一次会话。
        </p>

        <h2>你的第一次会话</h2>
        <ol>
          <li>
            打开你要处理的项目：<code>cd my-project &amp;&amp; claude</code>
          </li>
          <li>
            具体地描述任务——&ldquo;修复移动端 Safari 上的登录跳转问题&rdquo;比&ldquo;修个 bug&rdquo;
            能得到更好的结果。
          </li>
          <li>
            落地前先审阅。Claude 会展示每一处修改的 diff；未经你确认，不会写入任何文件。
          </li>
          <li>
            迭代。如果第一版不太对，告诉它哪里不对——它会在原有基础上调整，而不是从头再来。
          </li>
        </ol>

        <h2>今天就该学会的三个快捷键</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr>
                <th>快捷键</th>
                <th>作用</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>Shift+Tab</code></td>
                <td>在普通模式、自动接受模式和计划模式之间切换</td>
              </tr>
              <tr>
                <td><code>Ctrl+C</code></td>
                <td>取消当前操作——已完成的工作不会丢失</td>
              </tr>
              <tr>
                <td><code>/compact</code></td>
                <td>压缩对话以释放上下文，同时保留已学到的内容</td>
              </tr>
            </tbody>
          </table>
        </div>

        <TipCallout locale={locale}>
          不知道接下来看什么？先读
          <Link href="/zh/prompts" className="font-semibold underline underline-offset-2">
            《提示技巧》
          </Link>
          ——你描述任务的方式，比这份清单上几乎任何一条都更影响结果。
        </TipCallout>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="getting-started"
      locale={locale}
      dek="Install Claude Code, open a project, and ship your first change in under five minutes."
    >
      <p>
        Claude Code runs in your terminal, not in a chat window. You describe a task in plain
        language, it reads the relevant files in your project, makes the edits, runs whatever
        checks make sense, and reports back — one iteration at a time, with you in the loop at
        every step.
      </p>

      <h2>Install it</h2>
      <CodeBlock language="bash" code={INSTALL_CODE} />
      <p>
        Once installed, run <code>claude</code> from inside any project directory. The first
        launch walks you through logging in — after that, it&apos;s just <code>claude</code>{" "}
        every time you want to start a session.
      </p>

      <h2>Your first session</h2>
      <ol>
        <li>
          Open the project you want to work in: <code>cd my-project &amp;&amp; claude</code>
        </li>
        <li>
          Describe the task with specifics — &ldquo;fix the login redirect on mobile Safari&rdquo;
          gets a better result than &ldquo;fix the bug.&rdquo;
        </li>
        <li>
          Review before anything lands. Claude shows you the diff for every edit it wants to
          make; nothing is written to disk without your approval.
        </li>
        <li>
          Iterate. If the first pass isn&apos;t quite right, tell it what&apos;s off — it adjusts
          in place rather than starting over.
        </li>
      </ol>

      <h2>Three shortcuts worth learning today</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Shortcut</th>
              <th>What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Shift+Tab</code></td>
              <td>Cycle between Normal, Auto-Accept, and Plan mode</td>
            </tr>
            <tr>
              <td><code>Ctrl+C</code></td>
              <td>Cancel the current operation — your work isn&apos;t lost</td>
            </tr>
            <tr>
              <td><code>/compact</code></td>
              <td>Compress the conversation to free up context, without losing the thread</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TipCallout>
        Not sure where to go next? Read{" "}
        <Link href="/en/prompts" className="font-semibold underline underline-offset-2">
          Prompt Tips
        </Link>{" "}
        first — how you phrase a task changes the result more than almost anything else on this
        list.
      </TipCallout>
    </ContentPage>
  );
}
