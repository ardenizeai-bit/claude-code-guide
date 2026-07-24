import type { Locale } from "@/lib/pages";

const LAYERS: Record<Locale, { label: string; detail: string }[]> = {
  en: [
    { label: "Plugins", detail: "bundles everything into one package" },
    { label: "Skills", detail: "the knowledge and workflows" },
    { label: "MCP ↔ Tools", detail: "outside connections + built-in abilities" },
    { label: "Subagents", detail: "who does the actual work" },
    { label: "Hooks", detail: "automatic checks along the way" },
    { label: "CLAUDE.md", detail: "the notes that are always visible" },
  ],
  zh: [
    { label: "Plugins", detail: "把以上所有内容打包成一个整体" },
    { label: "Skills", detail: "知识与工作流" },
    { label: "MCP ↔ Tools", detail: "对外连接 + 内置能力" },
    { label: "Subagents", detail: "实际动手干活的角色" },
    { label: "Hooks", detail: "过程中自动触发的检查" },
    { label: "CLAUDE.md", detail: "始终可见的笔记" },
  ],
};

export function LayerStack({ locale = "en" }: { locale?: Locale }) {
  const layers = LAYERS[locale];
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-bg-raised p-4">
      {layers.map((layer, i) => (
        <div key={layer.label} className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3 rounded-md bg-bg-sunken px-4 py-2.5">
            <span className="w-28 shrink-0 font-mono text-sm font-semibold text-accent">
              {layer.label}
            </span>
            <span className="text-sm text-text-secondary">{layer.detail}</span>
          </div>
          {i < layers.length - 1 && (
            <div className="ml-[70px] h-3 w-px bg-border-strong" />
          )}
        </div>
      ))}
    </div>
  );
}
