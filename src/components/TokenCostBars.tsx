import type { Locale } from "@/lib/pages";

const BARS = [
  {
    label: "1x",
    height: 24,
    color: "var(--color-accent)",
    scenario: { en: "Single session", zh: "单个会话" },
  },
  {
    label: "3x",
    height: 72,
    color: "var(--color-accent)",
    scenario: { en: "Subagents (tree)", zh: "Subagents（树状）" },
  },
  {
    label: "5x",
    height: 120,
    color: "var(--color-amber)",
    scenario: { en: "Agent team, 3 peers", zh: "Agent Team，3 个对等节点" },
  },
  {
    label: "7x",
    height: 168,
    color: "var(--color-rose)",
    scenario: { en: "Agent team, 5+ peers", zh: "Agent Team，5 个以上对等节点" },
  },
];

const CAPTION: Record<Locale, string> = {
  en: "Approximate token cost relative to a single session, not a measured benchmark — mesh topologies (agent teams) re-share more state than a strict tree (subagents), so cost climbs faster as peers are added.",
  zh: "相对于单个会话的大致 token 成本，并非精确的基准测试结果——网状拓扑（agent team）比严格的树状结构（subagents）会重复共享更多状态，因此随着对等节点增加，成本攀升得更快。",
};

export function TokenCostBars({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="rounded-lg border border-border bg-bg-raised p-6">
      <div className="flex items-end gap-6">
        {BARS.map((bar) => (
          <div key={bar.label} className="flex flex-col items-center gap-2">
            <div className="flex h-44 items-end">
              <div
                className="w-9 rounded-t-md"
                style={{ height: bar.height, backgroundColor: bar.color }}
              />
            </div>
            <span className="font-mono text-sm font-semibold text-text-primary">{bar.label}</span>
            <span className="max-w-28 text-center text-xs text-text-muted">
              {bar.scenario[locale]}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-text-muted">{CAPTION[locale]}</p>
    </div>
  );
}
