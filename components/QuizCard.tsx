"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Subject } from "@/types/profile";
import { Question } from "@/types/question";
import { getQuestionsForSubject } from "@/lib/questions";
import { getActiveProfile, updateProfile } from "@/lib/storage";

function medalFor(correct: number, total: number): "none" | "bronze" | "silver" | "gold" {
  if (total === 0) return "none";
  const ratio = correct / total;
  if (ratio === 1) return "gold";
  if (ratio >= 0.7) return "silver";
  if (ratio >= 0.4) return "bronze";
  return "none";
}

export default function QuizCard({ subject }: { subject: Subject }) {
  const router = useRouter();
  const questions = useMemo(() => getQuestionsForSubject(subject), [subject]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  if (questions.length === 0) {
    return (
      <div className="text-center text-muted">
        <p>วิชานี้ยังไม่มีโจทย์ กำลังจะเพิ่มเร็วๆ นี้ 🚧</p>
      </div>
    );
  }

  const question: Question = questions[index];
  const isLast = index === questions.length - 1;
  const isCorrect = selected === question.answerIndex;

  function handleSelect(choiceIndex: number) {
    if (selected !== null) return; // กันการกดซ้ำหลังตอบแล้ว
    setSelected(choiceIndex);
    if (choiceIndex === question.answerIndex) {
      setCorrectCount((c) => c + 1);
    }
  }

  function handleNext() {
    if (isLast) {
      finishQuiz();
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function finishQuiz() {
    const profile = getActiveProfile();
    if (profile) {
      const completedIds = questions.map((q) => q.id);
      const medal = medalFor(correctCount, questions.length);
      profile.progress[subject] = {
        completedQuestionIds: Array.from(
          new Set([...profile.progress[subject].completedQuestionIds, ...completedIds])
        ),
        bestStreak: Math.max(profile.progress[subject].bestStreak, correctCount),
        medal:
          medal === "none" ? profile.progress[subject].medal : medal,
      };
      updateProfile(profile);
    }
    router.push(`/results?subject=${subject}&score=${correctCount}&total=${questions.length}`);
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      <div className="flex justify-between text-sm text-muted">
        <span>
          ข้อ {index + 1} / {questions.length}
        </span>
        <span>ถูกแล้ว {correctCount} ข้อ</span>
      </div>

      <div className="bg-panel rounded-card p-6 flex flex-col gap-5">
        <p className="font-display text-lg leading-relaxed">{question.prompt}</p>

        <div className="flex flex-col gap-3">
          {question.choices.map((choice, i) => {
            const isChosen = selected === i;
            const showCorrect = selected !== null && i === question.answerIndex;
            const showWrong = isChosen && !showCorrect;

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`text-left rounded-lg px-4 py-3 border transition
                  ${
                    showCorrect
                      ? "bg-teal/20 border-teal"
                      : showWrong
                      ? "bg-red-500/10 border-red-500/60"
                      : "bg-base border-panelLight hover:border-teal/60"
                  }`}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="text-sm">
            <p className={isCorrect ? "text-teal" : "text-red-400"}>
              {isCorrect ? "เยี่ยมมาก ถูกต้อง! 🎯" : "ยังไม่ถูก ลองดูคำอธิบายนี้นะ"}
            </p>
            {question.explanation && (
              <p className="text-muted mt-1">{question.explanation}</p>
            )}
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={selected === null}
        className="rounded-card bg-gold text-base font-display font-bold py-3 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isLast ? "จบภารกิจนี้ 🏁" : "ข้อถัดไป →"}
      </button>
    </div>
  );
}
