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
      <label className="block text-sm font-medium text-ink-300 mb-2">
        Story Length
      </label>
      <div className="flex rounded-lg border border-ink-700/50 overflow-hidden">
        {STORY_LENGTHS.map((len) => (
          <button
            key={len.id}
            type="button"
            onClick={() => onChange(len.id)}
            className={`flex-1 py-2.5 px-3 text-sm text-center transition-all ${
              selected === len.id
                ? "bg-amber-500/15 text-amber-200 border-amber-500/30"
                : "bg-ink-900/30 text-ink-400 hover:bg-ink-800/50 hover:text-ink-300"
            } ${len.id !== "flash" ? "border-l border-ink-700/50" : ""}`}
          >
            <span className="block font-medium">{len.label}</span>
            <span className="block text-xs opacity-70">{len.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
