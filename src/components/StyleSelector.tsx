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
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
        Writing Style
      </label>
      <div className="grid grid-cols-4 gap-1.5">
        {WRITING_STYLES.map((style) => (
          <button
            key={style.id}
            type="button"
            onClick={() => onChange(style.id)}
            className={`px-3 py-2 rounded-lg border text-sm transition-all ${
              selected === style.id
                ? "border-amber-500/60 bg-amber-500/10 text-amber-200 ring-1 ring-amber-500/20"
                : "border-zinc-700/50 bg-zinc-800/40 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/70"
            }`}
          >
            {style.label}
          </button>
        ))}
      </div>
    </div>
  );
}
