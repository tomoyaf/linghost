"use client";

import { useState, useEffect } from "react";

function getTimeUntilMidnightUTC(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
  ));
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeUntilMidnightUTC);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntilMidnightUTC());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-timer">
      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
        Next story available in
      </p>
      <div className="flex items-center gap-1 font-mono text-2xl text-amber-400/90">
        <span className="countdown-digit">{pad(time.hours)}</span>
        <span className="text-zinc-600">:</span>
        <span className="countdown-digit">{pad(time.minutes)}</span>
        <span className="text-zinc-600">:</span>
        <span className="countdown-digit">{pad(time.seconds)}</span>
      </div>
    </div>
  );
}
