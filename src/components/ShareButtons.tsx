"use client";

interface ShareButtonsProps {
  title: string;
}

function openShareWindow(url: string) {
  window.open(url, "_blank", "width=600,height=400,noopener,noreferrer");
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const handleShare = (platform: "x" | "facebook" | "reddit") => {
    const pageUrl = encodeURIComponent(window.location.href);
    const encodedTitle = encodeURIComponent(title);

    const urls = {
      x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${pageUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
      reddit: `https://www.reddit.com/submit?url=${pageUrl}&title=${encodedTitle}`,
    };

    openShareWindow(urls[platform]);
  };

  const btnClass =
    "inline-flex items-center gap-1.5 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 bg-zinc-800/50 border border-zinc-700/40 rounded-lg hover:bg-zinc-700/50 transition-all";

  return (
    <>
      <button onClick={() => handleShare("x")} className={btnClass}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        X
      </button>
      <button onClick={() => handleShare("facebook")} className={btnClass}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        Facebook
      </button>
      <button onClick={() => handleShare("reddit")} className={btnClass}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zm6.066 13.71c.147.307.222.64.222.986 0 2.726-3.2 4.937-7.145 4.937S3.998 17.422 3.998 14.696c0-.347.075-.68.223-.987a1.727 1.727 0 0 1-.353-1.05c0-.964.782-1.746 1.746-1.746.472 0 .9.19 1.212.497 1.19-.836 2.82-1.37 4.63-1.44l.88-4.14a.345.345 0 0 1 .41-.262l2.94.625a1.24 1.24 0 0 1 2.326.587 1.24 1.24 0 0 1-2.38.46l-2.63-.56-.78 3.67c1.77.08 3.36.612 4.53 1.44a1.74 1.74 0 0 1 1.21-.497c.964 0 1.746.782 1.746 1.746 0 .39-.13.75-.353 1.05zM9.144 14.696c0 .684.556 1.24 1.24 1.24s1.24-.556 1.24-1.24-.556-1.24-1.24-1.24-1.24.556-1.24 1.24zm6.712 2.88a.346.346 0 0 0-.005-.49c-.36-.36-1.106-.523-2.11-.523h-.003l-.005.001h-.01c-1.003 0-1.748.163-2.108.523a.346.346 0 0 0 .49.49c.24-.24.87-.37 1.62-.37h.008c.75 0 1.38.13 1.62.37a.346.346 0 0 0 .49-.001h.003zm-.48-1.64c.684 0 1.24-.556 1.24-1.24s-.556-1.24-1.24-1.24-1.24.556-1.24 1.24.556 1.24 1.24 1.24z" />
        </svg>
        Reddit
      </button>
    </>
  );
}
