"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserStories } from "@/lib/firebase/firestore-client";
import { StoredStory, ATMOSPHERES } from "@/lib/types";

export default function LibraryPage() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const [stories, setStories] = useState<(StoredStory & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchUserStories(user.uid)
      .then(setStories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const getAtmosphereIcon = (id: string) => {
    return ATMOSPHERES.find((a) => a.id === id)?.icon || "";
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="pb-12">
          <h2 className="font-serif text-3xl font-bold text-zinc-50 mb-8">
            Story Library
          </h2>

          {authLoading || loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="library-card animate-pulse">
                  <div className="h-5 bg-zinc-800/50 rounded w-1/3 mb-3" />
                  <div className="h-4 bg-zinc-800/50 rounded w-full mb-2" />
                  <div className="h-4 bg-zinc-800/50 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : !user ? (
            <div className="text-center py-16">
              <p className="text-zinc-500 mb-6">
                Sign in to see your story library.
              </p>
              <button
                onClick={signInWithGoogle}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-zinc-950 font-semibold text-sm rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20"
              >
                Sign in with Google
              </button>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-zinc-500 mb-4 font-serif text-lg italic">
                No stories yet.
              </p>
              <Link
                href="/"
                className="text-sm text-amber-400/80 hover:text-amber-300 transition-colors"
              >
                Generate your first story
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {stories.map((story) => (
                <Link
                  key={story.id}
                  href={`/library/${story.id}`}
                  className="library-card block"
                >
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
                        <span>{story.id}</span>
                        <span className="text-zinc-700">|</span>
                        <span className="capitalize">
                          {story.config.writingStyle}
                        </span>
                        <span className="text-zinc-700">|</span>
                        <span>{story.config.keywords.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
