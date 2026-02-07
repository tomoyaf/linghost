"use client";

import { STORY_LENGTHS, StoryLengthId } from "@/lib/types";

interface LengthSelectorProps {
  selected: StoryLengthId;
  onChange: (id: StoryLengthId) => void;
}

export default function LengthSelector({
  selected,
  onChange,
}: LengthSelectorProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
        Story Length
      </label>
      <div className="flex rounded-lg border border-zinc-700/50 overflow-hidden">
        {STORY_LENGTHS.map((len) => (
          <button
            key={len.id}
            type="button"
            onClick={() => onChange(len.id)}
            className={`flex-1 py-2.5 px-3 text-sm text-center transition-all ${
              selected === len.id
                ? "bg-amber-500/15 text-amber-200 border-amber-500/30 shadow-[inset_0_1px_0_0_rgba(251,191,36,0.1)]"
                : "bg-zinc-900/30 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"
            } ${len.id !== "flash" ? "border-l border-zinc-700/50" : ""}`}
          >
            <span className="block font-medium">{len.label}</span>
            <span className="block text-xs opacity-70">{len.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
