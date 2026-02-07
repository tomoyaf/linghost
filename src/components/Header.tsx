"use client";

import Link from "next/link";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/60 backdrop-blur-md bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="block">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 bg-clip-text text-transparent">
            LingHost
          </h1>
          <p className="mt-1 text-zinc-400 font-light text-xs tracking-widest uppercase">
            AI-Powered Story Generator
          </p>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/library"
            className="text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 px-3 py-1.5 rounded-md transition-all"
          >
            Library
          </Link>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
