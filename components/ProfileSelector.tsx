"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "@/types/profile";
import {
  getProfiles,
  createProfile,
  setActiveProfileId,
} from "@/lib/storage";
import AvatarPicker from "./AvatarPicker";

export default function ProfileSelector() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("🧑‍🚀");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProfiles(getProfiles());
  }, []);

  function selectProfile(id: string) {
    setActiveProfileId(id);
    router.push("/subjects");
  }

  function handleCreate() {
    if (!name.trim()) return;
    const profile = createProfile(name.trim(), avatar);
    setProfiles((prev) => [...prev, profile]);
    router.push("/subjects");
  }

  // ป้องกัน hydration mismatch: รอ mount ก่อนค่อยอ่านค่าที่เก็บใน localStorage
  if (!mounted) return null;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6">
      {profiles.length > 0 && !creating && (
        <div className="flex flex-col gap-3">
          <p className="text-muted text-sm">นักสำรวจที่เคยเข้าฐาน</p>
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => selectProfile(p.id)}
              className="flex items-center gap-3 bg-panel hover:bg-panelLight rounded-card px-4 py-3 text-left transition"
            >
              <span className="text-2xl">{p.avatar}</span>
              <span className="font-display font-semibold">{p.name}</span>
            </button>
          ))}
        </div>
      )}

      {!creating ? (
        <button
          onClick={() => setCreating(true)}
          className="rounded-card bg-gold text-base font-display font-bold py-3 hover:brightness-95 transition"
        >
          + เริ่มภารกิจใหม่
        </button>
      ) : (
        <div className="flex flex-col gap-4 bg-panel rounded-card p-5">
          <div>
            <label className="text-sm text-muted mb-1 block">ชื่อนักสำรวจ</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น น้องพีช"
              className="w-full rounded-lg bg-base border border-panelLight px-3 py-2 outline-none focus:border-teal"
            />
          </div>
          <div>
            <label className="text-sm text-muted mb-2 block">เลือก avatar</label>
            <AvatarPicker value={avatar} onChange={setAvatar} />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setCreating(false)}
              className="flex-1 rounded-lg bg-panelLight py-2"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleCreate}
              className="flex-1 rounded-lg bg-teal text-base font-semibold py-2"
            >
              เริ่มเลย 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
