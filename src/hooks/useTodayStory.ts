"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchTodayStory } from "@/lib/firebase/firestore-client";
import { StoredStory } from "@/lib/types";

interface UseTodayStoryReturn {
  todayStory: (StoredStory & { id: string }) | null;
  loading: boolean;
  hasGeneratedToday: boolean;
  refresh: () => Promise<void>;
}

export function useTodayStory(uid: string | undefined): UseTodayStoryReturn {
  const [todayStory, setTodayStory] = useState<
    (StoredStory & { id: string }) | null
  >(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!uid) {
      setTodayStory(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const story = await fetchTodayStory(uid);
      setTodayStory(story);
    } catch (err) {
      console.error("Failed to fetch today's story:", err);
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    todayStory,
    loading,
    hasGeneratedToday: !!todayStory,
    refresh,
  };
}
