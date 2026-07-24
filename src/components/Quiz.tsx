"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

export function Quiz({
  question,
  options,
  correctIndex,
}: {
  question: string;
  options: string[];
  correctIndex: number;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg-raised p-5">
      <p className="font-medium text-text-primary">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((option, i) => {
          const isSelected = selected === i;
          const revealed = selected !== null;
          const isCorrect = i === correctIndex;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              disabled={revealed}
              className={`flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                revealed && isCorrect
                  ? "border-mint bg-mint-soft"
                  : revealed && isSelected
                    ? "border-rose bg-rose-soft"
                    : "border-border text-text-secondary hover:bg-bg-sunken"
              }`}
              style={revealed && (isCorrect || isSelected) ? { color: "#1B1A17" } : undefined}
            >
              <span>{option}</span>
              {revealed && isCorrect && <Check size={16} className="shrink-0 text-mint" />}
              {revealed && isSelected && !isCorrect && <X size={16} className="shrink-0 text-rose" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
