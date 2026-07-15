"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SUBJECTS } from "@/types/profile";

export default function ResultsView() {
  const params = useSearchParams();
  const subjectId = params.get("subject");
  const score = Number(params.get("score") ?? 0);
  const total = Number(params.get("total") ?? 0);
  const subject = SUBJECTS.find((s) => s.id === subjectId);

  const ratio = total > 0 ? score / total : 0;
  const message =
    ratio === 1
      ? "เต็มทุกข้อ! นักสำรวจระดับเทพ 🥇"
      : ratio >= 0.7
      ? "เก่งมาก ใกล้เต็มแล้ว 🥈"
      : ratio >= 0.4
      ? "ทำได้ดี ลองอีกครั้งเพื่อคะแนนที่ดีขึ้น 🥉"
      : "ไม่เป็นไร ลองใหม่อีกครั้งนะ 💪";

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6 text-center">
      <span className="text-2xl">{subject?.emoji}</span>
      <h1 className="font-display text-2xl font-bold">
        {subject?.label ?? "ภารกิจ"} เสร็จสิ้น!
      </h1>
      <p className="text-4xl font-display font-bold text-gold">
        {score} / {total}
      </p>
      <p className="text-muted">{message}</p>

      <div className="flex gap-3 w-full mt-4">
        <Link
          href={subjectId ? `/quiz/${subjectId}` : "/subjects"}
          className="flex-1 rounded-card bg-panelLight py-3 font-semibold"
        >
          ลองอีกครั้ง
        </Link>
        <Link
          href="/subjects"
          className="flex-1 rounded-card bg-teal text-base py-3 font-semibold"
        >
          กลับแผนที่ภารกิจ
        </Link>
      </div>
    </div>
  );
}
