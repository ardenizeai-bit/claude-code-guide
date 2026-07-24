import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Slash Commands" };

export default async function SlashPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="slash"
        locale={locale}
        translated
        dek="所有值得了解的内置命令，按用途分组整理。"
      >
        <h2>会话管理</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>命令</th><th>作用</th></tr>
            </thead>
            <tbody>
              <tr><td><code>/help</code></td><td>显示可用命令</td></tr>
              <tr><td><code>/clear</code></td><td>完全清空当前对话</td></tr>
              <tr><td><code>/compact</code></td><td>压缩上下文，保留要点</td></tr>
              <tr><td><code>/status</code></td><td>显示模型、token 用量和费用</td></tr>
              <tr><td><code>/context</code></td><td>显示上下文窗口的使用情况</td></tr>
              <tr><td><code>/exit</code></td><td>结束会话</td></tr>
              <tr><td><code>/rewind</code></td><td>撤销上一轮 AI 的操作</td></tr>
            </tbody>
          </table>
        </div>

        <h2>规划与执行</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>命令</th><th>作用</th></tr>
            </thead>
            <tbody>
              <tr><td><code>/plan</code></td><td>切换计划模式</td></tr>
              <tr><td><code>/execute</code></td><td>退出计划模式并开始执行</td></tr>
              <tr><td><code>/model sonnet</code> / <code>/model opus</code></td><td>切换所用模型</td></tr>
            </tbody>
          </table>
        </div>

        <h2>项目设置</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>命令</th><th>作用</th></tr>
            </thead>
            <tbody>
              <tr><td><code>/init</code></td><td>创建项目的 CLAUDE.md 和配置</td></tr>
              <tr><td><code>/doctor</code></td><td>检查环境／配置健康状况</td></tr>
              <tr><td><code>/config</code></td><td>查看或编辑配置</td></tr>
              <tr><td><code>/hooks</code></td><td>管理生命周期 hooks</td></tr>
            </tbody>
          </table>
        </div>

        <h2>MCP 与扩展</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>命令</th><th>作用</th></tr>
            </thead>
            <tbody>
              <tr><td><code>/mcp</code></td><td>列出并管理已连接的 MCP 服务器</td></tr>
              <tr><td><code>/mcp__server__tool</code></td><td>直接调用某个具体的 MCP 工具</td></tr>
              <tr><td><code>/skill-name</code></td><td>调用一个已注册的 skill</td></tr>
              <tr><td><code>@agent-name</code></td><td>分派任务给指定的 subagent</td></tr>
            </tbody>
          </table>
        </div>

        <h2>实用工具</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>命令</th><th>作用</th></tr>
            </thead>
            <tbody>
              <tr><td><code># Remember ...</code></td><td>快速写入会话记忆的笔记</td></tr>
              <tr><td><code>/insights</code></td><td>显示已学习到的项目模式</td></tr>
              <tr><td><code>/batch</code></td><td>跨多个文件批量执行命令</td></tr>
              <tr><td><code>/export</code></td><td>把对话导出为文件</td></tr>
            </tbody>
          </table>
        </div>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="slash"
      locale={locale}
      dek="Every built-in command worth knowing, grouped by what it's actually for."
    >
      <h2>Session management</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Command</th><th>What it does</th></tr>
          </thead>
          <tbody>
            <tr><td><code>/help</code></td><td>Show available commands</td></tr>
            <tr><td><code>/clear</code></td><td>Clear the conversation entirely</td></tr>
            <tr><td><code>/compact</code></td><td>Compress context, keeping the gist</td></tr>
            <tr><td><code>/status</code></td><td>Show model, token usage, and cost</td></tr>
            <tr><td><code>/context</code></td><td>Show context window usage</td></tr>
            <tr><td><code>/exit</code></td><td>End the session</td></tr>
            <tr><td><code>/rewind</code></td><td>Undo the last assistant turn</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Planning &amp; execution</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Command</th><th>What it does</th></tr>
          </thead>
          <tbody>
            <tr><td><code>/plan</code></td><td>Toggle plan mode</td></tr>
            <tr><td><code>/execute</code></td><td>Exit plan mode and begin executing</td></tr>
            <tr><td><code>/model sonnet</code> / <code>/model opus</code></td><td>Switch the active model</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Project setup</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Command</th><th>What it does</th></tr>
          </thead>
          <tbody>
            <tr><td><code>/init</code></td><td>Create a project CLAUDE.md and config</td></tr>
            <tr><td><code>/doctor</code></td><td>Check environment/config health</td></tr>
            <tr><td><code>/config</code></td><td>View or edit configuration</td></tr>
            <tr><td><code>/hooks</code></td><td>Manage lifecycle hooks</td></tr>
          </tbody>
        </table>
      </div>

      <h2>MCP &amp; extensions</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Command</th><th>What it does</th></tr>
          </thead>
          <tbody>
            <tr><td><code>/mcp</code></td><td>List and manage connected MCP servers</td></tr>
            <tr><td><code>/mcp__server__tool</code></td><td>Call a specific MCP tool directly</td></tr>
            <tr><td><code>/skill-name</code></td><td>Invoke a registered skill</td></tr>
            <tr><td><code>@agent-name</code></td><td>Dispatch to a named subagent</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Utilities</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Command</th><th>What it does</th></tr>
          </thead>
          <tbody>
            <tr><td><code># Remember ...</code></td><td>Quick session-memory note</td></tr>
            <tr><td><code>/insights</code></td><td>Show learned project patterns</td></tr>
            <tr><td><code>/batch</code></td><td>Run a command across multiple files</td></tr>
            <tr><td><code>/export</code></td><td>Export the conversation to a file</td></tr>
          </tbody>
        </table>
      </div>
    </ContentPage>
  );
}
