"use client";

import { useState, useCallback, KeyboardEvent } from "react";

const KEYWORD_POOL = [
  // classic fantasy
  "dragon", "moonlight", "forgotten", "kingdom", "whisper",
  "storm", "lantern", "shadow", "crystal", "wanderer",
  "ruin", "prophecy", "ember", "ocean", "labyrinth",
  "ghost", "clockwork", "mirror", "frost", "bloom",
  "throne", "eclipse", "lighthouse", "mask", "silence",
  "raven", "alchemy", "dream", "carnival", "sword",
  "desert", "melody", "witch", "starfall", "fog",
  "library", "curse", "garden", "flame", "shipwreck",
  "oracle", "twilight", "wolf", "treasure", "portal",
  "cathedral", "venom", "comet", "exile", "phoenix",
  // modern / youth-appeal
  "neon", "glitch", "android", "hack", "rooftop",
  "rewind", "playlist", "pixel", "underground", "hologram",
  "graffiti", "doppelganger", "simulation", "deja vu", "viral",
  "dystopia", "streetlight", "amnesia", "avatar", "headphones",
  "satellite", "lucid", "cipher", "tattoo", "polaroid",
  "backpack", "frequency", "arcade", "urban", "paradox",
  "caffeine", "algorithm", "rebel", "neverland", "monochrome",
  "supernova", "parallel", "midnight", "static", "runaway",
  "synth", "cosmos", "blueprint", "detour", "wildcard",
  "abyss", "time loop", "solitude", "voltage", "anonymous",
  // literary classics
  "inheritance", "confession", "stranger", "manor", "betrayal",
  "gentleman", "orphan", "destiny", "forbidden", "sacrifice",
  "voyage", "jealousy", "widow", "aristocrat", "scandal",
  "duel", "regiment", "governess", "memoir", "obsession",
  "revenge", "asylum", "solitary", "manuscript", "chapel",
  "famine", "conquest", "melancholy", "virtue", "plague",
  "verdict", "banquet", "fugitive", "heirloom", "eulogy",
  "tavern", "countryside", "ransom", "impostor", "covenant",
  "testament", "garrison", "requiem", "peasant", "harbor",
  "rebellion", "monastery", "farewell", "riddle", "sovereign",
  // evocative places
  "Venice", "Marrakech", "Havana", "Prague", "Samarkand",
  "Kyoto", "Istanbul", "Bruges", "Casablanca", "Petra",
  "Zanzibar", "Reykjavik", "Tangier", "Dubrovnik", "Varanasi",
  "Patagonia", "Transylvania", "Santorini", "Timbuktu", "Kathmandu",
  // historical figures
  "Cleopatra", "Leonardo da Vinci", "Napoleon", "Joan of Arc", "Genghis Khan",
  "Marie Curie", "Shakespeare", "Mozart", "Galileo", "Tutankhamun",
  "Alexander the Great", "Nefertiti", "Marco Polo", "Nikola Tesla", "Frida Kahlo",
  "Beethoven", "Socrates", "Catherine the Great", "Hannibal", "Murasaki Shikibu",
  "Darwin", "Michelangelo", "Machiavelli", "Boudicca", "Ramesses II",
  "Confucius", "Hatshepsut", "Copernicus", "Sappho", "Saladin",
  "Rembrandt", "Sun Tzu", "Ada Lovelace", "Archimedes", "Nero",
  "Caravaggio", "Ibn Battuta", "Hypatia", "Montezuma", "Rasputin",
  "El Cid", "Hildegard von Bingen", "Attila", "Sei Shonagon", "Dante",
  "Vermeer", "Pythagoras", "Mary Shelley", "Robespierre", "Scheherazade",
];

function pickRandom(pool: string[], count: number, exclude: string[]): string[] {
  const available = pool.filter((w) => !exclude.includes(w));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

interface KeywordInputProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
}

export default function KeywordInput({ keywords, onChange }: KeywordInputProps) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>(() =>
    pickRandom(KEYWORD_POOL, 10, [])
  );

  const refreshSuggestions = useCallback(
    (currentKeywords: string[]) => {
      setSuggestions(pickRandom(KEYWORD_POOL, 10, currentKeywords));
    },
    []
  );

  const addKeyword = (value: string) => {
    const trimmed = value.trim().toLowerCase();
    if (trimmed && !keywords.includes(trimmed) && keywords.length < 5) {
      const next = [...keywords, trimmed];
      onChange(next);
      setSuggestions((prev) => prev.filter((s) => s !== trimmed));
    }
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword(input);
    }
    if (e.key === "Backspace" && !input && keywords.length > 0) {
      onChange(keywords.slice(0, -1));
    }
  };

  const removeKeyword = (index: number) => {
    onChange(keywords.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
        Keywords{" "}
        <span className="text-zinc-500 normal-case font-normal tracking-normal">({keywords.length}/5)</span>
      </label>
      <div className="flex flex-wrap gap-2 p-3 bg-zinc-900/50 border border-zinc-700/40 rounded-lg focus-within:border-amber-500/40 focus-within:ring-1 focus-within:ring-amber-500/20 transition-colors">
        {keywords.map((keyword, i) => (
          <span
            key={keyword}
            className="inline-flex items-center gap-1 px-3 py-1 bg-zinc-800 text-zinc-200 rounded-full text-sm border border-zinc-700/50"
          >
            {keyword}
            <button
              type="button"
              onClick={() => removeKeyword(i)}
              className="ml-1 text-zinc-500 hover:text-zinc-200 transition-colors"
              aria-label={`Remove ${keyword}`}
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input && addKeyword(input)}
          placeholder={
            keywords.length < 5 ? "Type & press Enter..." : "Max 5 keywords"
          }
          disabled={keywords.length >= 5}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-zinc-100 placeholder:text-zinc-600 text-sm"
        />
      </div>

      {keywords.length < 5 && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {suggestions.map((word) => (
            <button
              key={word}
              type="button"
              onClick={() => addKeyword(word)}
              className="px-2.5 py-0.5 text-xs text-zinc-400 bg-zinc-800/60 border border-zinc-700/30 rounded-full hover:text-amber-300 hover:border-amber-500/30 transition-colors"
            >
              + {word}
            </button>
          ))}
          <button
            type="button"
            onClick={() => refreshSuggestions(keywords)}
            className="ml-1 p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label="Refresh suggestions"
            title="Shuffle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
