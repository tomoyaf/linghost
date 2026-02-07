"use client";

export default function TodayStoryPrompt() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="today-story-prompt text-center py-8">
      <p className="text-sm text-zinc-500 uppercase tracking-widest mb-3">
        {dateStr}
      </p>
      <p className="font-serif text-xl text-zinc-400 italic leading-relaxed max-w-md mx-auto">
        One story per day. Let&apos;s weave something special — just for today.
      </p>
      <div className="mt-6 flex justify-center">
        <div className="today-story-glow w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      </div>
    </div>
  );
}
