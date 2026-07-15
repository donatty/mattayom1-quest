"use client";

const AVATARS = ["🧑‍🚀", "🦾", "🛰️", "🧭", "🔭", "🪐", "⚡", "🎯"];

export default function AvatarPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (avatar: string) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {AVATARS.map((avatar) => (
        <button
          key={avatar}
          type="button"
          onClick={() => onChange(avatar)}
          className={`aspect-square rounded-card text-3xl flex items-center justify-center transition
            ${
              value === avatar
                ? "bg-gold/20 ring-2 ring-gold"
                : "bg-panel hover:bg-panelLight"
            }`}
          aria-pressed={value === avatar}
          aria-label={`เลือก avatar ${avatar}`}
        >
          {avatar}
        </button>
      ))}
    </div>
  );
}
