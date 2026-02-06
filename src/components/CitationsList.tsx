"use client";

import { Citation } from "@/lib/types";

interface CitationsListProps {
  citations: Citation[];
}

export default function CitationsList({ citations }: CitationsListProps) {
  if (citations.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t border-ink-800">
      <h3 className="text-sm font-medium text-ink-400 uppercase tracking-wider mb-3">
        Inspired by Current Events
      </h3>
      <ul className="space-y-2">
        {citations.map((citation, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="text-amber-500/60 mt-0.5 flex-shrink-0">
              &bull;
            </span>
            <a
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-300 hover:text-amber-300 transition-colors underline underline-offset-2 decoration-ink-700 hover:decoration-amber-500/50"
            >
              {citation.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
