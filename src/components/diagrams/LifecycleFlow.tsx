import type { Locale } from "@/lib/pages";

const STAGES: Record<Locale, string[]> = {
  en: ["Session Start", "Prompt Submit", "Pre-Tool", "Tool Runs", "Post-Tool", "Stop"],
  zh: ["会话开始", "提交提示词", "工具调用前", "工具运行", "工具调用后", "结束"],
};

export function LifecycleFlow({ locale = "en" }: { locale?: Locale }) {
  const stages = STAGES[locale];
  return (
    <div className="flex items-center gap-1 overflow-x-auto rounded-lg border border-border bg-bg-raised p-4">
      {stages.map((stage, i) => (
        <div key={stage} className="flex shrink-0 items-center gap-1">
          <div className="flex flex-col items-center gap-1.5 rounded-md bg-bg-sunken px-3 py-2">
            <span className="font-mono text-[11px] whitespace-nowrap text-text-primary">{stage}</span>
          </div>
          {i < stages.length - 1 && (
            <div className="h-px w-6 bg-border-strong" />
          )}
        </div>
      ))}
    </div>
  );
}
