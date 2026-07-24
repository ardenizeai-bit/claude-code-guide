import { CHANGELOG } from "@/lib/changelog";
import { TriangleAlert } from "lucide-react";
import type { Locale } from "@/lib/pages";

export function ChangelogTimeline({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="flex flex-col">
      {CHANGELOG.map((entry, i) => (
        <div key={entry.version} className="relative flex gap-4 pb-8">
          <div className="flex flex-col items-center">
            <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
            {i < CHANGELOG.length - 1 && <div className="w-px flex-1 bg-border" />}
          </div>
          <div className="flex flex-1 flex-col gap-2 pb-2">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-sm font-semibold text-text-primary">
                {entry.version}
              </span>
              <span className="font-mono text-xs text-text-muted">{entry.date}</span>
            </div>
            <ul className="flex flex-col gap-1.5">
              {entry.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                >
                  {item.breaking && (
                    <TriangleAlert size={14} className="mt-0.5 shrink-0 text-rose" />
                  )}
                  <span className={item.breaking ? "text-text-primary" : undefined}>
                    {locale === "zh" ? item.text_zh ?? item.text : item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
