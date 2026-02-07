"use client";

import { ATMOSPHERES, AtmosphereId } from "@/lib/types";

interface AtmosphereSelectorProps {
  selected: AtmosphereId;
  onChange: (id: AtmosphereId) => void;
}

export default function AtmosphereSelector({
  selected,
  onChange,
}: AtmosphereSelectorProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
        Atmosphere
      </label>
      <div className="grid grid-cols-3 gap-1.5">
        {ATMOSPHERES.map((atm) => (
          <button
            key={atm.id}
            type="button"
            onClick={() => onChange(atm.id)}
            className={`px-2.5 py-2 rounded-lg border text-left text-sm transition-all ${
              selected === atm.id
                ? "border-amber-500/60 bg-amber-500/10 text-amber-200 ring-1 ring-amber-500/20"
                : "border-zinc-700/50 bg-zinc-800/40 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/70"
            }`}
          >
            <span className="text-lg">{atm.icon}</span>
            <span className="block mt-1 text-xs leading-tight">
              {atm.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
