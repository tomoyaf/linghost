"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface LikeButtonProps {
  timelineStoryId: string;
  initialLiked: boolean;
  initialCount: number;
}

export default function LikeButton({
  timelineStoryId,
  initialLiked,
  initialCount,
}: LikeButtonProps) {
  const { user, getIdToken } = useAuth();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [pending, setPending] = useState(false);

  const handleToggle = useCallback(async () => {
    if (!user || pending) return;

    // Optimistic update
    const prevLiked = liked;
    const prevCount = count;
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
    setPending(true);

    try {
      const token = await getIdToken();
      const res = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ timelineStoryId }),
      });

      if (!res.ok) {
        // Rollback
        setLiked(prevLiked);
        setCount(prevCount);
        return;
      }

      const data = await res.json();
      setLiked(data.liked);
      setCount(data.newLikeCount);
    } catch {
      // Rollback on network error
      setLiked(prevLiked);
      setCount(prevCount);
    } finally {
      setPending(false);
    }
  }, [user, pending, liked, count, getIdToken, timelineStoryId]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggle();
      }}
      disabled={!user || pending}
      className={`inline-flex items-center gap-1.5 text-sm transition-all ${
        !user
          ? "text-zinc-600 cursor-not-allowed"
          : liked
            ? "text-rose-400 hover:text-rose-300"
            : "text-zinc-500 hover:text-zinc-300"
      }`}
    >
      <svg
        className="w-4 h-4"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      <span className="min-w-[1ch]">{count}</span>
    </button>
  );
}
