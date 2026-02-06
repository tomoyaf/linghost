"use client";

interface CurrentEventsToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export default function CurrentEventsToggle({
  enabled,
  onChange,
}: CurrentEventsToggleProps) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative mt-0.5 inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors ${
          enabled ? "bg-amber-500" : "bg-ink-700"
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-[18px]" : "translate-x-[3px]"
          }`}
        />
      </button>
      <div>
        <span className="text-sm font-medium text-ink-200">
          Incorporate Current Events
        </span>
        <p className="text-xs text-ink-500 mt-0.5">
          Uses web search to weave real-world news into the story
        </p>
      </div>
    </div>
  );
}
