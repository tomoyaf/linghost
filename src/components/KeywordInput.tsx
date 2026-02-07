"use client";

import { useState, KeyboardEvent } from "react";

interface KeywordInputProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
}

export default function KeywordInput({ keywords, onChange }: KeywordInputProps) {
  const [input, setInput] = useState("");

  const addKeyword = (value: string) => {
    const trimmed = value.trim().toLowerCase();
    if (trimmed && !keywords.includes(trimmed) && keywords.length < 5) {
      onChange([...keywords, trimmed]);
    }
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword(input);
    }
    if (e.key === "Backspace" && !input && keywords.length > 0) {
      onChange(keywords.slice(0, -1));
    }
  };

  const removeKeyword = (index: number) => {
    onChange(keywords.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
        Keywords{" "}
        <span className="text-zinc-500 normal-case font-normal tracking-normal">({keywords.length}/5)</span>
      </label>
      <div className="flex flex-wrap gap-2 p-3 bg-zinc-900/50 border border-zinc-700/40 rounded-lg focus-within:border-amber-500/40 focus-within:ring-1 focus-within:ring-amber-500/20 transition-colors">
        {keywords.map((keyword, i) => (
          <span
            key={keyword}
            className="inline-flex items-center gap-1 px-3 py-1 bg-zinc-800 text-zinc-200 rounded-full text-sm border border-zinc-700/50"
          >
            {keyword}
            <button
              type="button"
              onClick={() => removeKeyword(i)}
              className="ml-1 text-zinc-500 hover:text-zinc-200 transition-colors"
              aria-label={`Remove ${keyword}`}
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input && addKeyword(input)}
          placeholder={
            keywords.length < 5 ? "Type & press Enter..." : "Max 5 keywords"
          }
          disabled={keywords.length >= 5}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-zinc-100 placeholder:text-zinc-600 text-sm"
        />
      </div>
    </div>
  );
}
