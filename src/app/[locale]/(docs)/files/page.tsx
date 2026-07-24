import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "File Locations" };

export default async function FilesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="files"
        locale={locale}
        translated
        dek="Claude Code 在哪里寻找配置、记忆和扩展——用户级和项目级。"
      >
        <WarningCallout locale={locale}>
          <code>settings.json</code> 是可执行的配置，不是被动的偏好设置——它决定 Claude 能使用
          哪些工具、连接哪些 MCP 服务器、触发哪些 hooks。一个恶意或粗心编写的 settings 文件，
          可能授予你并不打算给出的权限。请像审查任何拥有 shell 写入权限的文件一样审查它。
        </WarningCallout>

        <h2>用户级（全局生效）</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>路径</th><th>用途</th></tr>
            </thead>
            <tbody>
              <tr><td><code>~/.claude/CLAUDE.md</code></td><td>全局记忆，每次会话都会加载</td></tr>
              <tr><td><code>~/.claude/settings.json</code></td><td>用户偏好、权限、MCP 服务器</td></tr>
              <tr><td><code>~/.claude/agents/</code></td><td>全局 agent 定义</td></tr>
              <tr><td><code>~/.claude/skills/</code></td><td>随处可用的可复用 skill 文件</td></tr>
              <tr><td><code>~/.claude/commands/</code></td><td>自定义斜杠命令（全局）</td></tr>
              <tr><td><code>~/.claude/.mcp.json</code></td><td>用户级 MCP 服务器配置</td></tr>
              <tr><td><code>~/.claude/tasks/</code></td><td>定时任务的定义与历史记录</td></tr>
            </tbody>
          </table>
        </div>

        <h2>项目级（仅限本仓库）</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>路径</th><th>用途</th></tr>
            </thead>
            <tbody>
              <tr><td><code>.claude/CLAUDE.md</code></td><td>项目记忆，通过 git 与团队共享</td></tr>
              <tr><td><code>.claude/settings.json</code></td><td>项目设置（提交到仓库中）</td></tr>
              <tr><td><code>.claude/settings.local.json</code></td><td>本地覆盖项（已加入 gitignore）</td></tr>
              <tr><td><code>.claude/agents/</code></td><td>项目专属的 agent 定义</td></tr>
              <tr><td><code>.claude/skills/</code></td><td>项目专属的 skills</td></tr>
              <tr><td><code>.claude/commands/</code></td><td>自定义斜杠命令（项目级）</td></tr>
              <tr><td><code>.claude/.mcp.json</code></td><td>项目 MCP 服务器配置</td></tr>
              <tr><td><code>.claude/rules/</code></td><td>按 glob 规则加载的模块化指令文件</td></tr>
            </tbody>
          </table>
        </div>

        <h2>子目录覆盖</h2>
        <p>
          放在子目录里的 <code>CLAUDE.md</code>——例如 <code>src/auth/CLAUDE.md</code>、
          <code>src/api/CLAUDE.md</code>——只在该模块内生效，在项目级记忆之上叠加针对该模块的规则。
        </p>

        <h2>Agent Teams</h2>
        <p>
          定时运行的团队 agent 拥有自己的专属目录：<code>~/.claude/tasks/{"{team}"}/</code>{" "}
          存放该团队的任务队列，其中的 <code>team.json</code> 文件定义了该团队的 agent
          配置和各自角色。
        </p>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="files"
      locale={locale}
      dek="Where Claude Code looks for configuration, memory, and extensions — user-level and project-level."
    >
      <WarningCallout>
        <code>settings.json</code>{" "}is executable configuration, not passive preferences — it
        controls which tools Claude can use, which MCP servers connect, and which hooks fire. A
        malicious or careless settings file can grant permissions you didn&apos;t intend. Review
        it the way you&apos;d review any file with write access to your shell.
      </WarningCallout>

      <h2>User-level (applies everywhere)</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Path</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td><code>~/.claude/CLAUDE.md</code></td><td>Global memory, loaded every session</td></tr>
            <tr><td><code>~/.claude/settings.json</code></td><td>User preferences, permissions, MCP servers</td></tr>
            <tr><td><code>~/.claude/agents/</code></td><td>Global agent definitions</td></tr>
            <tr><td><code>~/.claude/skills/</code></td><td>Reusable skill files available everywhere</td></tr>
            <tr><td><code>~/.claude/commands/</code></td><td>Custom slash commands (global)</td></tr>
            <tr><td><code>~/.claude/.mcp.json</code></td><td>User-level MCP server configuration</td></tr>
            <tr><td><code>~/.claude/tasks/</code></td><td>Scheduled task definitions and history</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Project-level (scoped to this repo)</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Path</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td><code>.claude/CLAUDE.md</code></td><td>Project memory, shared with the team via git</td></tr>
            <tr><td><code>.claude/settings.json</code></td><td>Project settings (committed to the repo)</td></tr>
            <tr><td><code>.claude/settings.local.json</code></td><td>Local overrides (gitignored)</td></tr>
            <tr><td><code>.claude/agents/</code></td><td>Project-specific agent definitions</td></tr>
            <tr><td><code>.claude/skills/</code></td><td>Project-specific skills</td></tr>
            <tr><td><code>.claude/commands/</code></td><td>Custom slash commands (project)</td></tr>
            <tr><td><code>.claude/.mcp.json</code></td><td>Project MCP server configuration</td></tr>
            <tr><td><code>.claude/rules/</code></td><td>Modular instruction files, loaded by glob</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Sub-directory overrides</h2>
      <p>
        A <code>CLAUDE.md</code> placed inside a subdirectory — <code>src/auth/CLAUDE.md</code>,{" "}
        <code>src/api/CLAUDE.md</code> — applies only within that module, layering module-specific
        rules on top of the project-wide memory.
      </p>

      <h2>Agent Teams</h2>
      <p>
        Scheduled team agents get their own directory: <code>~/.claude/tasks/{"{team}"}/</code>{" "}
        holds the team&apos;s task queue, and a <code>team.json</code> file inside it defines the
        team&apos;s agent configuration and roles.
      </p>
    </ContentPage>
  );
}
