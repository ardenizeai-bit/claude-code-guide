import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { CodeBlock } from "@/components/CodeBlock";
import { WarningCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Plugins" };

export default async function PluginsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="plugins"
        locale={locale}
        translated
        dek="打包层——把 skills、agents、hooks 和 MCP 服务器打包成一个可安装、有版本号的整体单元。"
      >
        <p>
          一旦你已经写出几个配合良好的 skill 和 hook，Plugin 就能让你把整套东西打包成
          一次性安装，而不必让团队成员各自手动重新搭建每一个部分。
        </p>

        <CodeBlock
          language="text"
          code={`my-plugin/\n├── plugin.json          # Manifest: name, version, permissions\n├── skills/\n│   ├── review-pr/SKILL.md\n│   └── fix-ci/SKILL.md\n├── agents/\n│   └── code-reviewer/agent.yaml\n├── hooks/\n│   ├── pre-commit.sh\n│   └── post-write.sh\n└── mcp-servers/\n    └── custom-db/\n        ├── index.js\n        └── package.json`}
          locale={locale}
        />

        <WarningCallout locale={locale}>
          Plugin 会以其 <code>plugin.json</code> 清单中声明的权限运行。安装前请审查它
          请求的工具权限——一个拥有 Bash 访问权限的插件，可以在你的机器上运行任意命令。
          只从你信任的来源安装插件。
        </WarningCallout>

        <h2>为什么要打包</h2>
        <p>
          插件作为一个整体统一管理版本，所以打包在一起的 skill 和它配套的 hook 会一起
          更新发布——不存在团队成员用新版 skill 配旧版 hook 的风险。如果你想把某套工作流
          分享到团队之外，插件也正是你会发布出去的那个单元。
        </p>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="plugins"
      locale={locale}
      dek="The packaging layer — bundle skills, agents, hooks, and MCP servers into one installable, versioned unit."
    >
      <p>
        Once you&apos;ve built a few skills and hooks that work well together, a Plugin lets you
        ship the whole bundle as a single install rather than asking teammates to recreate each
        piece by hand.
      </p>

      <CodeBlock
        language="text"
        code={`my-plugin/\n├── plugin.json          # Manifest: name, version, permissions\n├── skills/\n│   ├── review-pr/SKILL.md\n│   └── fix-ci/SKILL.md\n├── agents/\n│   └── code-reviewer/agent.yaml\n├── hooks/\n│   ├── pre-commit.sh\n│   └── post-write.sh\n└── mcp-servers/\n    └── custom-db/\n        ├── index.js\n        └── package.json`}
      />

      <WarningCallout>
        Plugins run with whatever permissions their <code>plugin.json</code> manifest declares.
        Review the requested tool permissions before installing — a plugin with Bash access can
        run arbitrary commands on your machine. Only install plugins from sources you trust.
      </WarningCallout>

      <h2>Why bundle at all</h2>
      <p>
        A plugin is versioned as a single unit, so an update to the bundled skill and its
        supporting hook ship together — no risk of a teammate running a newer skill against an
        older hook. It&apos;s also the unit you&apos;d publish if you wanted to share a workflow
        outside your own team.
      </p>
    </ContentPage>
  );
}
