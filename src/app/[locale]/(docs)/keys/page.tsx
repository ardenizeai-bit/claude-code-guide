import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { TipCallout } from "@/components/Callout";
import type { Locale } from "@/lib/pages";

export const metadata: Metadata = { title: "Keyboard Shortcuts" };

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="rounded border border-border-strong bg-bg-sunken px-1.5 py-0.5 font-mono text-xs">
      {children}
    </kbd>
  );
}

export default async function KeysPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (locale === "zh") {
    return (
      <ContentPage
        slug="keys"
        locale={locale}
        translated
        dek="有一个快捷键的作用超过本页其余所有条目的总和——从它开始学。"
      >
        <TipCallout locale={locale}>
          <Kbd>Shift+Tab</Kbd> 是 Claude Code 中最重要的一个快捷键。先学会它，再看本页其他内容。
        </TipCallout>

        <h2>核心操作</h2>
        <ul>
          <li><Kbd>Ctrl+C</Kbd> — 取消当前生成</li>
          <li><Kbd>Ctrl+D</Kbd> — 退出会话</li>
          <li><Kbd>Tab</Kbd> — 接受自动补全建议</li>
          <li><Kbd>Up</Kbd> / <Kbd>Down</Kbd> — 浏览提示词历史</li>
          <li><Kbd>Esc Esc</Kbd> — 在单行和多行输入之间切换</li>
        </ul>

        <h2>模式切换</h2>
        <ul>
          <li><Kbd>Shift+Tab</Kbd> — 切换计划模式</li>
          <li><Kbd>Shift+Tab, Shift+Tab</Kbd> — 循环切换可用模型</li>
          <li><Kbd>Alt+T</Kbd> — 切换浅色／深色主题</li>
        </ul>

        <h2>上下文管理</h2>
        <ul>
          <li><Kbd>Ctrl+O</Kbd> — 打开文件选择器以添加上下文</li>
          <li><Kbd>Ctrl+L</Kbd> — 清空终端屏幕</li>
          <li><Kbd>Ctrl+R</Kbd> — 搜索提示词历史</li>
        </ul>

        <h2>快速记忆</h2>
        <p>
          在一行前面加上 <code>#</code> 再按 <Kbd>Enter</Kbd>，就能把这行内容直接存入会话记忆——
          不必写成正式的提示词。适合用来记录团队规定，比如&ldquo;我们用 pnpm，不用 npm。&rdquo;
        </p>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      slug="keys"
      locale={locale}
      dek="One shortcut does more work than the rest of this list combined — start there."
    >
      <TipCallout>
        <Kbd>Shift+Tab</Kbd> is the single most important shortcut in Claude Code. Learn it before
        anything else on this page.
      </TipCallout>

      <h2>Core controls</h2>
      <ul>
        <li><Kbd>Ctrl+C</Kbd> — cancel the current generation</li>
        <li><Kbd>Ctrl+D</Kbd> — exit the session</li>
        <li><Kbd>Tab</Kbd> — accept an autocomplete suggestion</li>
        <li><Kbd>Up</Kbd> / <Kbd>Down</Kbd> — navigate prompt history</li>
        <li><Kbd>Esc Esc</Kbd> — toggle single-line and multi-line input</li>
      </ul>

      <h2>Mode switching</h2>
      <ul>
        <li><Kbd>Shift+Tab</Kbd> — toggle plan mode</li>
        <li><Kbd>Shift+Tab, Shift+Tab</Kbd> — cycle through available models</li>
        <li><Kbd>Alt+T</Kbd> — toggle light/dark theme</li>
      </ul>

      <h2>Context management</h2>
      <ul>
        <li><Kbd>Ctrl+O</Kbd> — open a file picker to add context</li>
        <li><Kbd>Ctrl+L</Kbd> — clear the terminal screen</li>
        <li><Kbd>Ctrl+R</Kbd> — search prompt history</li>
      </ul>

      <h2>Quick memory</h2>
      <p>
        Prefix a line with <code>#</code> and press <Kbd>Enter</Kbd> to save it straight to
        session memory — no need to phrase it as a prompt. Useful for house rules like
        &ldquo;we use pnpm, not npm.&rdquo;
      </p>
    </ContentPage>
  );
}
