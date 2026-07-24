"use client";

import { useState } from "react";
import { REPOS, REPO_CATEGORIES, REPO_CATEGORY_LABEL_ZH, type RepoCategory } from "@/lib/repos";
import type { Locale } from "@/lib/pages";

const ALL_LABEL: Record<Locale, string> = { en: "All", zh: "全部" };

export function RepoDirectory({ locale = "en" }: { locale?: Locale }) {
  const [active, setActive] = useState<RepoCategory | "All">("All");
  const filtered = active === "All" ? REPOS : REPOS.filter((r) => r.category === active);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {(["All", ...REPO_CATEGORIES] as const).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              active === category
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-text-secondary hover:bg-bg-sunken"
            }`}
          >
            {category === "All" ? ALL_LABEL[locale] : locale === "zh" ? REPO_CATEGORY_LABEL_ZH[category] : category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {filtered.map((repo) => (
          <div
            key={repo.name}
            className="flex flex-col gap-1 rounded-lg border border-border bg-bg-raised p-3"
          >
            <span className="font-mono text-sm font-medium text-text-primary">{repo.name}</span>
            <span className="text-xs text-text-secondary">
              {locale === "zh" ? repo.description_zh ?? repo.description : repo.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
