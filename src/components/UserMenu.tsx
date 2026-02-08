"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function UserMenu() {
  const { user, loading, signOut, openLoginModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  if (loading) {
    return (
      <div className="h-8 w-8 rounded-full bg-zinc-800 animate-pulse" />
    );
  }

  if (!user) {
    return (
      <button
        onClick={openLoginModal}
        className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-200 bg-zinc-800/60 border border-zinc-700/40 rounded-lg hover:bg-zinc-700/50 transition-all"
      >
        Sign in
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-full hover:ring-2 hover:ring-zinc-700 transition-all"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt=""
            className="w-8 h-8 rounded-full border border-zinc-700"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-sm text-amber-300">
            {user.displayName?.[0] || "?"}
          </div>
        )}
        <svg
          className={`w-3 h-3 text-zinc-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl shadow-black/40 overflow-hidden animate-[fadeIn_150ms_ease-out]">
          <div className="px-4 py-3 border-b border-zinc-800">
            <p className="text-sm text-zinc-200 font-medium truncate">
              {user.displayName}
            </p>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              signOut();
            }}
            className="w-full px-4 py-2.5 text-left text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
