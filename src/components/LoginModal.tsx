"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, signInWithGoogle } = useAuth();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Reset checkbox when modal closes
  useEffect(() => {
    if (!isLoginModalOpen) {
      setAgreedToTerms(false);
    }
  }, [isLoginModalOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isLoginModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLoginModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoginModalOpen, closeLoginModal]);

  if (!isLoginModalOpen) return null;

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      closeLoginModal();
    } catch {
      // User cancelled or error — stay on modal
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]"
        onClick={closeLoginModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/40 animate-[fadeIn_200ms_ease-out]">
        {/* Close button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-8 py-10 flex flex-col items-center">
          {/* Logo */}
          <h2 className="font-serif text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 bg-clip-text text-transparent mb-2">
            linGhost
          </h2>

          <p className="text-sm text-zinc-400 mb-8">
            Sign in to create your story
          </p>

          {/* Google Sign in button */}
          <button
            onClick={handleSignIn}
            disabled={!agreedToTerms}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-zinc-950 font-semibold text-sm rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2 mt-5 text-xs text-zinc-500 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 accent-amber-500"
            />
            <span>
              I agree to the{" "}
              <Link href="/legal/terms" className="text-amber-400 hover:text-amber-300 transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/legal/privacy" className="text-amber-400 hover:text-amber-300 transition-colors">
                Privacy Policy
              </Link>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
