"use client";

import { useState } from "react";
import {
  StoryConfig,
  AtmosphereId,
  WritingStyleId,
  StoryLengthId,
  GenerationStatus,
} from "@/lib/types";
import KeywordInput from "./KeywordInput";
import AtmosphereSelector from "./AtmosphereSelector";
import StyleSelector from "./StyleSelector";
import LengthSelector from "./LengthSelector";
import CurrentEventsToggle from "./CurrentEventsToggle";

interface StoryConfiguratorProps {
  onGenerate: (config: StoryConfig) => void;
  onAbort: () => void;
  status: GenerationStatus;
}

export default function StoryConfigurator({
  onGenerate,
  onAbort,
  status,
}: StoryConfiguratorProps) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [atmosphere, setAtmosphere] = useState<AtmosphereId>("dark");
  const [writingStyle, setWritingStyle] = useState<WritingStyleId>("literary");
  const [storyLength, setStoryLength] = useState<StoryLengthId>("short");
  const [includeCurrentEvents, setIncludeCurrentEvents] = useState(false);
  const [themeNote, setThemeNote] = useState("");

  const isGenerating = status === "generating" || status === "connecting" || status === "searching";

  const handleGenerate = () => {
    if (keywords.length === 0) return;
    onGenerate({
      keywords,
      atmosphere,
      writingStyle,
      storyLength,
      includeCurrentEvents,
      themeNote: themeNote.trim() || undefined,
    });
  };

  return (
    <div className="space-y-6">
      <KeywordInput keywords={keywords} onChange={setKeywords} />
      <AtmosphereSelector selected={atmosphere} onChange={setAtmosphere} />
      <StyleSelector selected={writingStyle} onChange={setWritingStyle} />
      <LengthSelector selected={storyLength} onChange={setStoryLength} />
      <CurrentEventsToggle
        enabled={includeCurrentEvents}
        onChange={setIncludeCurrentEvents}
      />

      <div>
        <label className="block text-sm font-medium text-ink-300 mb-2">
          Theme Note{" "}
          <span className="text-ink-500">(optional)</span>
        </label>
        <textarea
          value={themeNote}
          onChange={(e) => setThemeNote(e.target.value)}
          placeholder="Any additional direction for the story..."
          rows={2}
          className="w-full p-3 bg-ink-900/50 border border-ink-700/50 rounded-lg text-sm text-ink-100 placeholder:text-ink-600 focus:border-amber-500/50 focus:outline-none transition-colors resize-none"
        />
      </div>

      {isGenerating ? (
        <button
          type="button"
          onClick={onAbort}
          className="w-full py-3 px-4 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-all text-sm font-medium"
        >
          Stop Generating
        </button>
      ) : (
        <button
          type="button"
          onClick={handleGenerate}
          disabled={keywords.length === 0}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-ink-950 font-semibold text-sm hover:from-amber-500 hover:to-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-500/20 disabled:shadow-none"
        >
          Generate Story
        </button>
      )}
    </div>
  );
}
