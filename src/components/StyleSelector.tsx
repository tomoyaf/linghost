"use client";

import { WRITING_STYLES, WritingStyleId } from "@/lib/types";

interface StyleSelectorProps {
  selected: WritingStyleId;
  onChange: (id: WritingStyleId) => void;
}

export default function StyleSelector({
  selected,
  onChange,
}: StyleSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-300 mb-2">
        Writing Style
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {WRITING_STYLES.map((style) => (
          <button
            key={style.id}
            type="button"
            onClick={() => onChange(style.id)}
            className={`px-3 py-2 rounded-lg border text-sm transition-all ${
              selected === style.id
                ? "border-amber-500/70 bg-amber-500/10 text-amber-200"
                : "border-ink-700/50 bg-ink-900/30 text-ink-300 hover:border-ink-600 hover:bg-ink-800/50"
            }`}
          >
            {style.label}
          </button>
        ))}
      </div>
    </div>
  );
}
