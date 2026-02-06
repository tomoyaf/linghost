"use client";

import { useState, useRef, useCallback } from "react";
import { StoryConfig, Citation, GenerationStatus } from "@/lib/types";

interface UseStoryStreamReturn {
  storyText: string;
  storyTitle: string;
  citations: Citation[];
  status: GenerationStatus;
  error: string | null;
  generate: (config: StoryConfig) => void;
  abort: () => void;
  reset: () => void;
}

export function useStoryStream(): UseStoryStreamReturn {
  const [storyText, setStoryText] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [citations, setCitations] = useState<Citation[]>([]);
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setStoryText("");
    setStoryTitle("");
    setCitations([]);
    setStatus("idle");
    setError(null);
  }, []);

  const abort = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setStatus("idle");
  }, []);

  const generate = useCallback((config: StoryConfig) => {
    // Reset previous state
    if (abortRef.current) {
      abortRef.current.abort();
    }
    setStoryText("");
    setStoryTitle("");
    setCitations([]);
    setError(null);
    setStatus("connecting");

    const controller = new AbortController();
    abortRef.current = controller;

    (async () => {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(config),
          signal: controller.signal,
        });

        if (!response.ok) {
          const err = await response.json();
          setError(err.error || "Failed to start generation");
          setStatus("error");
          return;
        }

        if (!response.body) {
          setError("Streaming not supported");
          setStatus("error");
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const dataPrefix = "data: ";
            const dataLine = line
              .split("\n")
              .find((l) => l.startsWith(dataPrefix));
            if (!dataLine) continue;

            try {
              const event = JSON.parse(dataLine.slice(dataPrefix.length));

              switch (event.type) {
                case "text":
                  setStoryText((prev) => prev + event.data);
                  break;
                case "title":
                  setStoryTitle(event.data);
                  break;
                case "citation":
                  try {
                    const citation = JSON.parse(event.data);
                    setCitations((prev) => [...prev, citation]);
                  } catch {
                    // Skip malformed citation
                  }
                  break;
                case "status":
                  if (event.data === "done") {
                    setStatus("done");
                  } else if (event.data === "searching") {
                    setStatus("searching");
                  } else if (event.data === "generating") {
                    setStatus("generating");
                  } else if (event.data === "connecting") {
                    setStatus("connecting");
                  }
                  break;
                case "error":
                  setError(event.data);
                  setStatus("error");
                  break;
                case "done":
                  break;
              }
            } catch {
              // Skip malformed SSE
            }
          }
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        setError(err instanceof Error ? err.message : "Connection failed");
        setStatus("error");
      }
    })();
  }, []);

  return {
    storyText,
    storyTitle,
    citations,
    status,
    error,
    generate,
    abort,
    reset,
  };
}
