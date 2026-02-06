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
      <label className="block text-sm font-medium text-ink-300 mb-2">
        Atmosphere
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {ATMOSPHERES.map((atm) => (
          <button
            key={atm.id}
            type="button"
            onClick={() => onChange(atm.id)}
            className={`p-3 rounded-lg border text-left text-sm transition-all ${
              selected === atm.id
                ? "border-amber-500/70 bg-amber-500/10 text-amber-200"
                : "border-ink-700/50 bg-ink-900/30 text-ink-300 hover:border-ink-600 hover:bg-ink-800/50"
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
