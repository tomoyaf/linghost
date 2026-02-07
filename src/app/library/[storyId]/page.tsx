"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import CitationsList from "@/components/CitationsList";
import { useAuth } from "@/contexts/AuthContext";
import { fetchStory } from "@/lib/firebase/firestore-client";
import { StoredStory } from "@/lib/types";

export default function StoryDetailPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const [story, setStory] = useState<(StoredStory & { id: string }) | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!user || !storyId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchStory(user.uid, storyId)
      .then((s) => {
        if (!s) setNotFound(true);
        setStory(s);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, storyId]);

  const handleCopy = async () => {
    if (!story) return;
    const fullText = `${story.title}\n\n${story.text}`;
    await navigator.clipboard.writeText(fullText);
  };

  const handleDownload = () => {
    if (!story) return;
    const fullText = `${story.title}\n\n${story.text}`;
    const blob = new Blob([fullText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${story.title || "story"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const paragraphs = story?.text.split(/\n\n+/).filter((p) => p.trim()) || [];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="pb-12">
          <Link
            href="/library"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6"
          >
            &larr; Back to Library
          </Link>

          {authLoading || loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-zinc-800/50 rounded w-1/3" />
              <div className="h-4 bg-zinc-800/50 rounded w-full" />
              <div className="h-4 bg-zinc-800/50 rounded w-5/6" />
              <div className="h-4 bg-zinc-800/50 rounded w-4/6" />
            </div>
          ) : !user ? (
            <div className="text-center py-16">
              <p className="text-zinc-500 mb-6">
                Sign in to view this story.
              </p>
              <button
                onClick={signInWithGoogle}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-zinc-950 font-semibold text-sm rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20"
              >
                Sign in with Google
              </button>
            </div>
          ) : notFound ? (
            <div className="text-center py-16">
              <p className="text-zinc-500 mb-4 font-serif text-lg italic">
                Story not found.
              </p>
              <Link
                href="/library"
                className="text-sm text-amber-400/80 hover:text-amber-300 transition-colors"
              >
                Back to Library
              </Link>
            </div>
          ) : story ? (
            <div className="p-8 sm:p-10 bg-zinc-900/40 border border-zinc-800/40 rounded-xl animate-fade-in">
              <div className="mb-2 text-xs text-zinc-500">
                {story.id} &middot; {story.config.writingStyle} &middot;{" "}
                {story.config.keywords.join(", ")}
              </div>

              <h2 className="font-serif text-3xl font-bold text-zinc-50 mb-6">
                {story.title}
              </h2>

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
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
