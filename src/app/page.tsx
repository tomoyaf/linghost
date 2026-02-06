"use client";

import Header from "@/components/Header";
import StoryConfigurator from "@/components/StoryConfigurator";
import StoryDisplay from "@/components/StoryDisplay";
import { useStoryStream } from "@/hooks/useStoryStream";

export default function Home() {
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

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />

        <div className="flex flex-col lg:flex-row gap-8 pb-12">
          {/* Configurator panel */}
          <div className="w-full lg:w-[400px] flex-shrink-0">
            <div className="lg:sticky lg:top-6 p-6 bg-ink-900/40 border border-ink-800/50 rounded-xl backdrop-blur-sm">
              <StoryConfigurator
                onGenerate={generate}
                onAbort={abort}
                status={status}
              />
            </div>
          </div>

          {/* Story display panel */}
          <div className="flex-1 min-w-0">
            <div className="p-6 sm:p-8 bg-ink-900/20 border border-ink-800/30 rounded-xl min-h-[500px]">
              <StoryDisplay
                title={storyTitle}
                text={storyText}
                citations={citations}
                status={status}
                error={error}
                onReset={reset}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
