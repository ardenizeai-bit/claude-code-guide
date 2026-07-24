"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { Locale } from "@/lib/pages";

const LABELS: Record<Locale, { copy: string; copied: string }> = {
  en: { copy: "Copy", copied: "Copied" },
  zh: { copy: "复制", copied: "已复制" },
};

export function CodeBlock({
  language,
  code,
  locale = "en",
}: {
  language: string;
  code: string;
  locale?: Locale;
}) {
  const [copied, setCopied] = useState(false);
  const labels = LABELS[locale];

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border-strong bg-code-bg">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-mono text-xs font-medium tracking-wide text-amber">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs text-code-text/70 transition-colors hover:bg-white/10 hover:text-code-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {copied ? (
            <>
              <Check size={13} />
              {labels.copied}
            </>
          ) : (
            <>
              <Copy size={13} />
              {labels.copy}
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 text-sm leading-relaxed">
        <code className="font-mono text-code-text">{code}</code>
      </pre>
    </div>
  );
}
