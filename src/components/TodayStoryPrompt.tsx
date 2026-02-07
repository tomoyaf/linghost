"use client";

const dailyQuotes = [
  { text: "There is no greater agony than bearing an untold story inside you.", author: "Maya Angelou" },
  { text: "A word after a word after a word is power.", author: "Margaret Atwood" },
  { text: "We write to taste life twice, in the moment and in retrospect.", author: "Anaïs Nin" },
  { text: "Stories are the creative conversion of life itself into a more powerful, clearer, more meaningful experience.", author: "Robert McKee" },
  { text: "The universe is made of stories, not of atoms.", author: "Muriel Rukeyser" },
  { text: "A story has no beginning or end: arbitrarily one chooses that moment of experience from which to look back or from which to look ahead.", author: "Graham Greene" },
  { text: "After nourishment, shelter and companionship, stories are the thing we need most in the world.", author: "Philip Pullman" },
  { text: "Words are, of course, the most powerful drug used by mankind.", author: "Rudyard Kipling" },
  { text: "There is nothing to writing. All you do is sit down at a typewriter and bleed.", author: "Ernest Hemingway" },
  { text: "A book is a dream that you hold in your hand.", author: "Neil Gaiman" },
  { text: "Stories may well be lies, but they are good lies that say true things.", author: "Neil Gaiman" },
  { text: "The purpose of a storyteller is not to tell you how to think, but to give you questions to think upon.", author: "Brandon Sanderson" },
  { text: "If a story is in you, it has to come out.", author: "William Faulkner" },
  { text: "Start writing, no matter what. The water does not flow until the faucet is turned on.", author: "Louis L'Amour" },
  { text: "You can always edit a bad page. You can't edit a blank page.", author: "Jodi Picoult" },
  { text: "Either write something worth reading or do something worth writing.", author: "Benjamin Franklin" },
  { text: "One must still have chaos in oneself to be able to give birth to a dancing star.", author: "Friedrich Nietzsche" },
  { text: "Literature is the most agreeable way of ignoring life.", author: "Fernando Pessoa" },
  { text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", author: "George R.R. Martin" },
  { text: "No tears in the writer, no tears in the reader.", author: "Robert Frost" },
  { text: "The first draft is just you telling yourself the story.", author: "Terry Pratchett" },
  { text: "Fantasy is hardly an escape from reality. It's a way of understanding it.", author: "Lloyd Alexander" },
  { text: "To survive, you must tell stories.", author: "Umberto Eco" },
  { text: "All great literature is one of two stories; a man goes on a journey or a stranger comes to town.", author: "Leo Tolstoy" },
  { text: "Stories are a communal currency of humanity.", author: "Tahir Shah" },
  { text: "The scariest moment is always just before you start.", author: "Stephen King" },
  { text: "Language is the dress of thought.", author: "Samuel Johnson" },
  { text: "Words are pale shadows of forgotten names.", author: "Patrick Rothfuss" },
  { text: "We are all storytellers. We all live in a network of stories.", author: "Ben Okri" },
  { text: "Ink and paper are sometimes passionate lovers, oftentimes brother and sister, and occasionally mortal enemies.", author: "Terri Guillemets" },
];

function getDayOfYear(date: Date): number {
  const start = new Date(date.getUTCFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

export default function TodayStoryPrompt() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const quote = dailyQuotes[getDayOfYear(today) % dailyQuotes.length];

  return (
    <div className="today-story-prompt text-center py-8">
      <p className="text-sm text-zinc-500 uppercase tracking-widest mb-3">
        {dateStr}
      </p>
      <p className="font-serif text-xl text-zinc-400 italic leading-relaxed max-w-md mx-auto">
        One story per day. Let&apos;s weave something special — just for today.
      </p>
      <p className="mt-4 text-sm text-zinc-500 italic max-w-sm mx-auto leading-relaxed">
        &ldquo;{quote.text}&rdquo;
        <span className="block mt-1 text-zinc-600 not-italic text-xs">
          — {quote.author}
        </span>
      </p>
      <div className="mt-6 flex justify-center">
        <div className="today-story-glow w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      </div>
    </div>
  );
}
