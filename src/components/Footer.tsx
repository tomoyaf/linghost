import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
        <span>&copy; {new Date().getFullYear()} linGhost</span>
        <nav className="flex items-center gap-4">
          <Link
            href="/legal/terms"
            className="hover:text-zinc-300 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/legal/privacy"
            className="hover:text-zinc-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/legal/tokushoho"
            className="hover:text-zinc-300 transition-colors"
          >
            特定商取引法に基づく表記
          </Link>
        </nav>
      </div>
    </footer>
  );
}
