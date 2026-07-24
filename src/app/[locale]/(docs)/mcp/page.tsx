import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { McpTopology } from "@/components/diagrams/McpTopology";
import { TipCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "MCP (Model Context Protocol)" };

export default async function McpPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="mcp"
        locale={locale}
        translated
        dek="一个开放协议，让 Claude Code 能与任何外部工具、数据库或服务对话。"
      >
        <p>
          与其让每个 AI 工具各自发明一套集成格式，MCP 把连接方式标准化了——服务器负责暴露
          自己能做什么，任何兼容 MCP 的客户端（Claude Code 也在内）都能直接使用它，
          不需要为每一次集成单独写胶水代码。
        </p>

        <McpTopology />

        <h2>四种基本构件</h2>
        <ul>
          <li><strong>Tools</strong> — 模型可以直接调用的函数</li>
          <li><strong>Resources</strong> — 可以读取的结构化数据：schema、配置、文档</li>
          <li><strong>Prompts</strong> — 服务器暴露的可复用模板</li>
          <li><strong>Apps</strong> — 具备鉴权、界面和多步骤交互的完整应用接口</li>
        </ul>

        <h2>安装一个服务器</h2>
        <CodeBlock
          language="bash"
          code={`# Install an MCP server\nclaude mcp add github -- npx -y @modelcontextprotocol/server-github\nclaude mcp add playwright -- npx @anthropic/mcp-playwright\n\n# Use in a session\n> Use the GitHub MCP to list open PRs on this repo\n> Use Playwright to test the login flow on localhost:3000`}
          locale={locale}
        />

        <h2>项目级配置</h2>
        <p>
          项目根目录下的 <code>.mcp.json</code> 声明了哪些服务器可用——把它提交到 git 中，
          整个团队就能自动获得同一套配置。
        </p>
        <CodeBlock
          language="json"
          code={`{\n  "servers": {\n    "github": {\n      "type": "stdio",\n      "command": "npx",\n      "args": ["@modelcontextprotocol/server-github"],\n      "env": { "GITHUB_TOKEN": "your-token" }\n    },\n    "postgres": {\n      "type": "stdio",\n      "command": "npx",\n      "args": ["@modelcontextprotocol/server-postgres"],\n      "env": { "DATABASE_URL": "postgresql://..." }\n    }\n  }\n}`}
          locale={locale}
        />

        <h2>传输类型</h2>
        <div className="prose-table-wrap">
          <table>
            <thead>
              <tr><th>类型</th><th>适用场景</th></tr>
            </thead>
            <tbody>
              <tr><td><code>stdio</code></td><td>本地进程——最常见</td></tr>
              <tr><td><code>http</code></td><td>远程服务器，POST/JSON</td></tr>
              <tr><td><code>sse</code></td><td>服务器推送事件，用于流式传输</td></tr>
              <tr><td><code>ws</code></td><td>全双工 WebSocket</td></tr>
            </tbody>
          </table>
        </div>

        <TipCallout locale={locale}>
          直接给 Claude 数据库访问权限，很少是正确的做法。更好的方式是暴露一个只读、
          带参数化查询的 MCP 服务器——也就是&ldquo;数据网关&rdquo;模式——这样破坏性操作
          在结构上就是不可能发生的，而不仅仅是&ldquo;不建议&rdquo;而已。
        </TipCallout>

        <h2>故障排查</h2>
        <ul>
          <li>用 <code>claude mcp list</code> 确认服务器状态是&ldquo;ready&rdquo;</li>
          <li>检查所需的环境变量和 token 是否真的已经设置好</li>
          <li>添加新服务器后重启会话——工具发现只在会话开始时进行</li>
          <li>如果调用超时，确认服务器进程确实在运行</li>
        </ul>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="mcp"
      locale={locale}
      dek="One open protocol that lets Claude Code talk to any external tool, database, or service."
    >
      <p>
        Rather than every AI tool inventing its own integration format, MCP standardizes the
        connection — a server exposes what it can do, and any MCP-compatible client (Claude Code
        included) can use it without custom glue code per integration.
      </p>

      <McpTopology />

      <h2>Four primitives</h2>
      <ul>
        <li><strong>Tools</strong> — functions the model can call directly</li>
        <li><strong>Resources</strong> — structured data it can read: schemas, config, docs</li>
        <li><strong>Prompts</strong> — reusable templates a server exposes</li>
        <li><strong>Apps</strong> — full application interfaces with auth, UI, and multi-step interaction</li>
      </ul>

      <h2>Installing a server</h2>
      <CodeBlock
        language="bash"
        code={`# Install an MCP server\nclaude mcp add github -- npx -y @modelcontextprotocol/server-github\nclaude mcp add playwright -- npx @anthropic/mcp-playwright\n\n# Use in a session\n> Use the GitHub MCP to list open PRs on this repo\n> Use Playwright to test the login flow on localhost:3000`}
      />

      <h2>Project-level config</h2>
      <p>
        <code>.mcp.json</code> at the project root declares which servers are available — check
        it into git so the whole team gets the same setup automatically.
      </p>
      <CodeBlock
        language="json"
        code={`{\n  "servers": {\n    "github": {\n      "type": "stdio",\n      "command": "npx",\n      "args": ["@modelcontextprotocol/server-github"],\n      "env": { "GITHUB_TOKEN": "your-token" }\n    },\n    "postgres": {\n      "type": "stdio",\n      "command": "npx",\n      "args": ["@modelcontextprotocol/server-postgres"],\n      "env": { "DATABASE_URL": "postgresql://..." }\n    }\n  }\n}`}
      />

      <h2>Transport types</h2>
      <div className="prose-table-wrap">
        <table>
          <thead>
            <tr><th>Type</th><th>Use case</th></tr>
          </thead>
          <tbody>
            <tr><td><code>stdio</code></td><td>Local process — most common</td></tr>
            <tr><td><code>http</code></td><td>Remote server, POST/JSON</td></tr>
            <tr><td><code>sse</code></td><td>Server-sent events, for streaming</td></tr>
            <tr><td><code>ws</code></td><td>Full-duplex WebSocket</td></tr>
          </tbody>
        </table>
      </div>

      <TipCallout>
        Giving Claude direct database access is rarely the right call. Expose a read-only MCP
        server with parameterized queries instead — the &ldquo;data gateway&rdquo; pattern — so
        destructive operations are structurally impossible, not just discouraged.
      </TipCallout>

      <h2>Troubleshooting</h2>
      <ul>
        <li>Confirm a server&apos;s status is &ldquo;ready&rdquo; with <code>claude mcp list</code></li>
        <li>Check that required env vars and tokens are actually set</li>
        <li>Restart the session after adding a new server — tool discovery happens at session start</li>
        <li>If calls are timing out, verify the server process is actually running</li>
      </ul>
    </ContentPage>
  );
}
