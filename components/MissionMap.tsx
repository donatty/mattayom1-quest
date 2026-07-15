"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Profile, SUBJECTS } from "@/types/profile";
import { getActiveProfile } from "@/lib/storage";
import { getQuestionsForSubject } from "@/lib/questions";

const MEDAL_EMOJI: Record<string, string> = {
  none: "⚪",
  bronze: "🥉",
  silver: "🥈",
  gold: "🥇",
};

export default function MissionMap() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const active = getActiveProfile();
    if (!active) {
      router.push("/");
      return;
    }
    setProfile(active);
  }, [router]);

  if (!mounted || !profile) return null;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{profile.avatar}</span>
        <div>
          <p className="text-muted text-sm">นักสำรวจ</p>
          <p className="font-display font-semibold">{profile.name}</p>
        </div>
      </div>

      <div className="mission-path rounded-card bg-panel p-5">
        <div className="flex flex-col gap-4">
          {SUBJECTS.map((subject, i) => {
            const total = getQuestionsForSubject(subject.id).length;
            const done =
              profile.progress[subject.id]?.completedQuestionIds.length ?? 0;
            const medal = profile.progress[subject.id]?.medal ?? "none";
            const locked = total === 0;

            return (
              <Link
                key={subject.id}
                href={locked ? "#" : `/quiz/${subject.id}`}
                aria-disabled={locked}
                className={`flex items-center justify-between rounded-card px-4 py-3 transition
                  ${
                    locked
                      ? "bg-base/60 text-muted cursor-not-allowed pointer-events-none"
                      : "bg-panelLight hover:brightness-110"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{subject.emoji}</span>
                  <div>
                    <p className="font-display font-semibold">{subject.label}</p>
                    <p className="text-xs text-muted">
                      {locked ? "เร็วๆ นี้" : `${done}/${total} ข้อ`}
                    </p>
                  </div>
                </div>
                <span className="text-xl">{MEDAL_EMOJI[medal]}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
