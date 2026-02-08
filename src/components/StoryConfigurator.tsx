"use client";

import { useState } from "react";
import Link from "next/link";
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
  disabled?: boolean;
  onSignIn?: () => void;
}

export default function StoryConfigurator({
  onGenerate,
  onAbort,
  status,
  disabled,
  onSignIn,
}: StoryConfiguratorProps) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [atmosphere, setAtmosphere] = useState<AtmosphereId>("dark");
  const [writingStyle, setWritingStyle] = useState<WritingStyleId>("literary");
  const [storyLength, setStoryLength] = useState<StoryLengthId>("short");
  const [includeCurrentEvents, setIncludeCurrentEvents] = useState(false);
  const [themeNote, setThemeNote] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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
    <div className="space-y-5">
      <KeywordInput keywords={keywords} onChange={setKeywords} />
      <AtmosphereSelector selected={atmosphere} onChange={setAtmosphere} />
      <StyleSelector selected={writingStyle} onChange={setWritingStyle} />
      <LengthSelector selected={storyLength} onChange={setStoryLength} />
      <CurrentEventsToggle
        enabled={includeCurrentEvents}
        onChange={setIncludeCurrentEvents}
      />

      <div>
        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
          Theme Note{" "}
          <span className="text-zinc-500 normal-case font-normal tracking-normal">(optional)</span>
        </label>
        <textarea
          value={themeNote}
          onChange={(e) => setThemeNote(e.target.value)}
          placeholder="Any additional direction for the story..."
          rows={2}
          className="w-full p-3 bg-zinc-900/50 border border-zinc-700/50 rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/20 transition-colors resize-none"
        />
      </div>

      {disabled && onSignIn ? (
        <div className="space-y-3">
          <button
            type="button"
            onClick={onSignIn}
            disabled={!agreedToTerms}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-zinc-950 font-semibold text-sm hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Sign in to Generate
          </button>
          <label className="flex items-start gap-2 text-xs text-zinc-500 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 accent-amber-500"
            />
            <span>
              I agree to the{" "}
              <Link href="/legal/terms" className="text-amber-400 hover:text-amber-300 transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/legal/privacy" className="text-amber-400 hover:text-amber-300 transition-colors">
                Privacy Policy
              </Link>
            </span>
          </label>
        </div>
      ) : isGenerating ? (
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
          disabled={keywords.length === 0 || disabled}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-zinc-950 font-semibold text-sm hover:from-amber-500 hover:to-amber-400 hover:shadow-amber-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-500/20 disabled:shadow-none"
        >
          Generate Story
        </button>
      )}
    </div>
  );
}
