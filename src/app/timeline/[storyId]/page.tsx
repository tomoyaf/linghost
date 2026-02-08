"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import CitationsList from "@/components/CitationsList";
import LikeButton from "@/components/LikeButton";
import { useAuth } from "@/contexts/AuthContext";
import {
  fetchTimelineStory,
  fetchUserLikeStatuses,
} from "@/lib/firebase/firestore-client";
import { TimelineStory } from "@/lib/types";

export default function TimelineStoryDetailPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const { user } = useAuth();
  const [story, setStory] = useState<TimelineStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!storyId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchTimelineStory(storyId)
      .then((s) => {
        if (!s) setNotFound(true);
        setStory(s);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [storyId]);

  useEffect(() => {
    if (!user || !storyId) return;
    fetchUserLikeStatuses(user.uid, [storyId])
      .then((set) => setLiked(set.has(storyId)))
      .catch(console.error);
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
            href="/timeline"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6"
          >
            &larr; Back to Timeline
          </Link>

          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-zinc-800/50 rounded w-1/3" />
              <div className="h-4 bg-zinc-800/50 rounded w-full" />
              <div className="h-4 bg-zinc-800/50 rounded w-5/6" />
              <div className="h-4 bg-zinc-800/50 rounded w-4/6" />
            </div>
          ) : notFound ? (
            <div className="text-center py-16">
              <p className="text-zinc-500 mb-4 font-serif text-lg italic">
                Story not found.
              </p>
              <Link
                href="/timeline"
                className="text-sm text-amber-400/80 hover:text-amber-300 transition-colors"
              >
                Back to Timeline
              </Link>
            </div>
          ) : story ? (
            <div className="p-8 sm:p-10 bg-zinc-900/40 border border-zinc-800/40 rounded-xl animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                {story.authorPhotoURL ? (
                  <Image
                    src={story.authorPhotoURL}
                    alt={story.authorDisplayName}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-sm text-zinc-400">
                    {story.authorDisplayName[0]?.toUpperCase() || "?"}
                  </div>
                )}
                <span className="text-sm text-zinc-300">
                  {story.authorDisplayName}
                </span>
              </div>

              <div className="mb-2 text-xs text-zinc-500">
                {story.config.writingStyle} &middot;{" "}
                {story.config.keywords.join(", ")}
              </div>

              <h2 className="font-serif text-3xl font-bold text-zinc-50 mb-3">
                {story.title}
              </h2>

              <div className="flex items-center gap-1.5 mb-6 text-sm text-zinc-400">
                <svg
                  className="w-4 h-4 text-rose-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                <span>{story.likeCount}</span>
              </div>

              <div className="story-text">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p.trim()}</p>
                ))}
              </div>

              <CitationsList citations={story.citations} />

              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-zinc-800">
                <LikeButton
                  timelineStoryId={story.id}
                  initialLiked={liked}
                  initialCount={story.likeCount}
                />
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
