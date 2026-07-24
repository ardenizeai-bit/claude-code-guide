import type { Locale } from "@/lib/pages";

const STATS: Record<Locale, { value: string; label: string }[]> = {
  en: [
    { value: "12x", label: "faster task completion on SWE-bench" },
    { value: "67%", label: "reduction in boilerplate-code time" },
    { value: "92%", label: "developer satisfaction score" },
    { value: "26–55%", label: "faster feature delivery" },
    { value: "70%", label: "less context-switching" },
    { value: "3,200+", label: "enterprise organizations using Claude Code" },
  ],
  zh: [
    { value: "12x", label: "SWE-bench 上任务完成速度提升" },
    { value: "67%", label: "样板代码耗时减少" },
    { value: "92%", label: "开发者满意度评分" },
    { value: "26–55%", label: "功能交付速度提升" },
    { value: "70%", label: "上下文切换减少" },
    { value: "3,200+", label: "使用 Claude Code 的企业组织数量" },
  ],
};

export function StatStrip({ locale = "en" }: { locale?: Locale }) {
  const stats = STATS[locale];
  return (
    <div className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-bg-sunken p-5 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1">
          <span className="font-heading text-xl font-semibold text-text-primary">
            {stat.value}
          </span>
          <span className="text-xs leading-snug text-text-secondary">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
