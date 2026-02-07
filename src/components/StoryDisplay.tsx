"use client";

import { useRef } from "react";
import { GenerationStatus, Citation } from "@/lib/types";
import CitationsList from "./CitationsList";

interface StoryDisplayProps {
  title: string;
  text: string;
  citations: Citation[];
  status: GenerationStatus;
  error: string | null;
  onReset: () => void;
}

const STATUS_MESSAGES: Partial<Record<GenerationStatus, string>> = {
  connecting: "Summoning the muse...",
  generating: "Writing your story...",
  searching: "Searching current events...",
};

export default function StoryDisplay({
  title,
  text,
  citations,
  status,
  error,
  onReset,
}: StoryDisplayProps) {
  const storyRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    const fullText = title ? `${title}\n\n${text}` : text;
    await navigator.clipboard.writeText(fullText);
  };

  const handleDownload = () => {
    const fullText = title ? `${title}\n\n${text}` : text;
    const blob = new Blob([fullText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "story"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Idle state
  if (status === "idle" && !text && !error) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-center text-zinc-500">
          <p className="font-serif text-xl italic">
            Choose your ingredients, and let the story unfold...
          </p>
        </div>
      </div>
    );
  }

  const isStreaming = status === "generating" || status === "searching" || status === "connecting";

  // Format text into paragraphs
  const paragraphs = text
    .split(/\n\n+/)
    .filter((p) => p.trim());

  return (
    <div className="animate-fade-in">
      {/* Status bar */}
      {isStreaming && (
        <div className="flex items-center gap-2 mb-4 text-sm text-amber-400/80">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          {STATUS_MESSAGES[status]}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Title */}
      {title && (
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-50 mb-6 animate-fade-in">
          {title}
        </h2>
      )}

      {/* Story text */}
      {text && (
        <div ref={storyRef} className="story-text">
          {paragraphs.map((p, i) => (
            <p key={i}>{p.trim()}</p>
          ))}
          {isStreaming && <span className="typewriter-cursor" />}
        </div>
      )}

      {/* Citations */}
      {status === "done" && <CitationsList citations={citations} />}

      {/* Actions */}
      {status === "done" && text && (
        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-zinc-800">
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 bg-zinc-800/50 border border-zinc-700/40 rounded-lg hover:bg-zinc-700/50 transition-all"
          >
            Copy
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 bg-zinc-800/50 border border-zinc-700/40 rounded-lg hover:bg-zinc-700/50 transition-all"
          >
            Download
          </button>
          <button
            onClick={onReset}
            className="ml-auto px-4 py-2 text-sm text-amber-400 hover:text-amber-300 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition-all"
          >
            New Story
          </button>
        </div>
      )}
    </div>
  );
}
