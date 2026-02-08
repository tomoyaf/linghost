"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import LikeButton from "@/components/LikeButton";
import { useAuth } from "@/contexts/AuthContext";
import {
  fetchTimelineStories,
  fetchUserLikeStatuses,
} from "@/lib/firebase/firestore-client";
import { TimelineStory, ATMOSPHERES } from "@/lib/types";
import { DocumentSnapshot } from "firebase/firestore";

const PAGE_SIZE = 10;

export default function TimelinePage() {
  const { user } = useAuth();
  const [stories, setStories] = useState<TimelineStory[]>([]);
  const [likedSet, setLikedSet] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadStories = useCallback(
    async (cursor?: DocumentSnapshot) => {
      const result = await fetchTimelineStories(PAGE_SIZE, cursor);
      if (result.stories.length < PAGE_SIZE) setHasMore(false);
      setLastDoc(result.lastDoc);
      return result.stories;
    },
    [],
  );

  // Initial load — timeline is public, no need to wait for auth
  useEffect(() => {
    setLoading(true);
    loadStories()
      .then((s) => setStories(s))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [loadStories]);

  // Load like statuses when user or stories change
  useEffect(() => {
    if (!user || stories.length === 0) return;
    fetchUserLikeStatuses(
      user.uid,
      stories.map((s) => s.id),
    )
      .then(setLikedSet)
      .catch(console.error);
  }, [user, stories]);

  const handleLoadMore = async () => {
    if (!lastDoc || loadingMore) return;
    setLoadingMore(true);
    try {
      const more = await loadStories(lastDoc);
      setStories((prev) => [...prev, ...more]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  const getAtmosphereIcon = (id: string) => {
    return ATMOSPHERES.find((a) => a.id === id)?.icon || "";
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="pb-12">
          <h2 className="font-serif text-3xl font-bold text-zinc-50 mb-8">
            Timeline
          </h2>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="library-card animate-pulse">
                  <div className="h-5 bg-zinc-800/50 rounded w-1/3 mb-3" />
                  <div className="h-4 bg-zinc-800/50 rounded w-full mb-2" />
                  <div className="h-4 bg-zinc-800/50 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-zinc-500 mb-4 font-serif text-lg italic">
                No stories on the timeline yet.
              </p>
              <Link
                href="/"
                className="text-sm text-amber-400/80 hover:text-amber-300 transition-colors"
              >
                Be the first to generate a story
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {stories.map((story) => (
                  <Link
                    key={story.id}
                    href={`/timeline/${story.id}`}
                    className="library-card block"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {story.authorPhotoURL ? (
                        <Image
                          src={story.authorPhotoURL}
                          alt={story.authorDisplayName}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-zinc-400">
                          {story.authorDisplayName[0]?.toUpperCase() || "?"}
                        </div>
                      )}
                      <span className="text-sm text-zinc-400">
                        {story.authorDisplayName}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">
                            {getAtmosphereIcon(story.config.atmosphere)}
                          </span>
                          <h3 className="font-serif text-lg font-semibold text-zinc-100 truncate">
                            {story.title}
                          </h3>
                        </div>
                        <p className="text-sm text-zinc-400 line-clamp-2">
                          {story.text.slice(0, 200)}...
                        </p>
                        <div className="flex items-center gap-3 mt-3 text-xs text-zinc-500">
                          <span className="capitalize">
                            {story.config.writingStyle}
                          </span>
                          <span className="text-zinc-700">|</span>
                          <span>{story.config.keywords.join(", ")}</span>
                          <span className="text-zinc-700">|</span>
                          <LikeButton
                            timelineStoryId={story.id}
                            initialLiked={likedSet.has(story.id)}
                            initialCount={story.likeCount}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-6 py-2.5 text-sm text-zinc-400 hover:text-zinc-200 bg-zinc-800/50 border border-zinc-700/40 rounded-lg hover:bg-zinc-700/50 transition-all disabled:opacity-50"
                  >
                    {loadingMore ? "Loading..." : "Load more"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
