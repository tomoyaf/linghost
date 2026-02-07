"use client";

import Header from "@/components/Header";
import StoryConfigurator from "@/components/StoryConfigurator";
import StoryDisplay from "@/components/StoryDisplay";
import TodayStoryPrompt from "@/components/TodayStoryPrompt";
import TodayStoryView from "@/components/TodayStoryView";
import { useStoryStream } from "@/hooks/useStoryStream";
import { useTodayStory } from "@/hooks/useTodayStory";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useRef } from "react";
import { StoryConfig } from "@/lib/types";

function SkeletonPanel() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-zinc-800/50 rounded w-1/3" />
      <div className="h-4 bg-zinc-800/50 rounded w-full" />
      <div className="h-4 bg-zinc-800/50 rounded w-5/6" />
      <div className="h-4 bg-zinc-800/50 rounded w-4/6" />
      <div className="h-4 bg-zinc-800/50 rounded w-full" />
      <div className="h-4 bg-zinc-800/50 rounded w-3/6" />
    </div>
  );
}

export default function Home() {
  const { user, loading: authLoading, signInWithGoogle, getIdToken } = useAuth();
  const { todayStory, loading: storyLoading, hasGeneratedToday, refresh } = useTodayStory(user?.uid);

  const {
    storyText,
    storyTitle,
    citations,
    status,
    error,
    generate,
    abort,
    reset,
  } = useStoryStream();

  const handleGenerate = (config: StoryConfig) => {
    generate(config, getIdToken);
  };

  // After stream completes, refresh today's story from Firestore
  const prevStatus = useRef(status);
  useEffect(() => {
    if (prevStatus.current !== "done" && status === "done") {
      refresh();
    }
    prevStatus.current = status;
  }, [status, refresh]);

  // Determine which right panel to show
  const renderRightPanel = () => {
    // Auth loading
    if (authLoading) {
      return (
        <div className="p-8 sm:p-10 bg-zinc-900/40 border border-zinc-800/40 rounded-xl min-h-[500px]">
          <SkeletonPanel />
        </div>
      );
    }

    // Not logged in
    if (!user) {
      return (
        <div className="p-8 sm:p-10 bg-zinc-900/40 border border-zinc-800/40 rounded-xl min-h-[500px]">
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="text-center text-zinc-500">
              <p className="font-serif text-xl italic mb-6">
                Sign in to generate your daily story
              </p>
              <button
                onClick={signInWithGoogle}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-zinc-950 font-semibold text-sm rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20"
              >
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Story loading from Firestore
    if (storyLoading) {
      return (
        <div className="p-8 sm:p-10 bg-zinc-900/40 border border-zinc-800/40 rounded-xl min-h-[500px]">
          <SkeletonPanel />
        </div>
      );
    }

    // Already generated today — show the saved story (only when stream is idle)
    if (hasGeneratedToday && todayStory && status === "idle") {
      return (
        <div className="p-8 sm:p-10 bg-zinc-900/40 border border-zinc-800/40 rounded-xl min-h-[500px]">
          <TodayStoryView story={todayStory} />
        </div>
      );
    }

    // Not yet generated / currently generating
    return (
      <div className="p-8 sm:p-10 bg-zinc-900/40 border border-zinc-800/40 rounded-xl min-h-[500px]">
        {status === "idle" && !storyText && !error ? (
          <TodayStoryPrompt />
        ) : (
          <StoryDisplay
            title={storyTitle}
            text={storyText}
            citations={citations}
            status={status}
            error={error}
            onReset={reset}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8 pb-12">
          {/* Configurator panel */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="lg:sticky lg:top-[73px] p-5 bg-zinc-900/70 border border-zinc-800/50 rounded-xl shadow-xl shadow-black/20">
              <StoryConfigurator
                onGenerate={handleGenerate}
                onAbort={abort}
                status={status}
                disabled={!user || hasGeneratedToday}
                onSignIn={!user ? signInWithGoogle : undefined}
              />
            </div>
          </div>

          {/* Story display panel */}
          <div className="flex-1 min-w-0">
            {renderRightPanel()}
          </div>
        </div>
      </main>
    </div>
  );
}
