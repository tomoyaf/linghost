"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";

const GA_ID = "G-JYJR9SESS9";

type ConsentStatus = "pending" | "granted" | "denied";

export default function GoogleAnalytics() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>("pending");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "granted" || stored === "denied") {
      setConsentStatus(stored);
    }
    setMounted(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "granted");
    setConsentStatus("granted");
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "denied");
    setConsentStatus("denied");
  };

  if (!mounted) return null;

  return (
    <>
      {consentStatus === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {consentStatus === "pending" && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6">
          <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800/60 rounded-xl shadow-2xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-sm text-zinc-400 flex-1">
                We use cookies to analyze site usage and improve your experience.
                See our{" "}
                <Link
                  href="/legal/privacy"
                  className="text-amber-400 hover:text-amber-300 underline transition-colors"
                >
                  Privacy Policy
                </Link>{" "}
                for details.
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 text-sm font-medium bg-amber-500 text-zinc-950 rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
