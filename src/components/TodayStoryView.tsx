"use client";

import { StoredStory, Citation } from "@/lib/types";
import CitationsList from "./CitationsList";
import CountdownTimer from "./CountdownTimer";

interface TodayStoryViewProps {
  story: StoredStory & { id: string };
}

export default function TodayStoryView({ story }: TodayStoryViewProps) {
  const paragraphs = story.text.split(/\n\n+/).filter((p) => p.trim());

  const handleCopy = async () => {
    const fullText = `${story.title}\n\n${story.text}`;
    await navigator.clipboard.writeText(fullText);
  };

  const handleDownload = () => {
    const fullText = `${story.title}\n\n${story.text}`;
    const blob = new Blob([fullText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${story.title || "story"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
            Today&apos;s Story
          </p>
          <h2 className="font-serif text-3xl font-bold text-zinc-50">
            {story.title}
          </h2>
        </div>
        <CountdownTimer />
      </div>

      <div className="story-text">
        {paragraphs.map((p, i) => (
          <p key={i}>{p.trim()}</p>
        ))}
      </div>

      <CitationsList citations={story.citations} />

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
        <div className="ml-auto text-xs text-zinc-500">
          Tomorrow, a new story awaits.
        </div>
      </div>
    </div>
  );
}
