"use client";

import Link from "next/link";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="block group">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(251,191,36,0.15)]">
            LinGhost
          </h1>
          <p className="mt-0.5 text-amber-200/30 font-light text-xs tracking-[0.2em] uppercase">
            AI-Powered Story Generator
          </p>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/library"
            className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 px-3 py-1.5 rounded-md transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            Library
          </Link>
          <UserMenu />
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </header>
  );
}
