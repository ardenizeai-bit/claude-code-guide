"use client";

import { useState } from "react";
import { INSIGHTS, INSIGHT_LAYERS, type InsightLayer } from "@/lib/insights";
import type { Locale } from "@/lib/pages";

const LAYER_COLOR_VAR: Record<InsightLayer, string> = {
  Subagents: "var(--color-accent)",
  "Agent Teams": "var(--color-mint)",
  "CLAUDE.md": "var(--color-amber)",
  Hooks: "var(--color-rose)",
};

const ALL_LABEL: Record<Locale, string> = { en: "All", zh: "全部" };

export function InsightsGrid({ locale = "en" }: { locale?: Locale }) {
  const [active, setActive] = useState<InsightLayer | "All">("All");
  const filtered = active === "All" ? INSIGHTS : INSIGHTS.filter((i) => i.layer === active);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {(["All", ...INSIGHT_LAYERS] as const).map((layer) => {
          const isActive = layer === active;
          const colorVar = layer === "All" ? "var(--color-text-primary)" : LAYER_COLOR_VAR[layer];
          return (
            <button
              key={layer}
              type="button"
              onClick={() => setActive(layer)}
              className="rounded-full border px-3 py-1 font-mono text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              style={
                isActive
                  ? { borderColor: colorVar, backgroundColor: `color-mix(in srgb, ${colorVar} 14%, transparent)`, color: colorVar }
                  : { borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }
              }
            >
              {layer === "All" ? ALL_LABEL[locale] : layer}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map((insight, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-lg border-l-4 bg-bg-raised p-4"
            style={{ borderLeftColor: LAYER_COLOR_VAR[insight.layer] }}
          >
            <span
              className="font-mono text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: LAYER_COLOR_VAR[insight.layer] }}
            >
              {insight.layer}
            </span>
            <p className="text-sm leading-relaxed text-text-secondary">
              {locale === "zh" ? insight.text_zh ?? insight.text : insight.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
