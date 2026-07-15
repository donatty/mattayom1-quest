import { notFound } from "next/navigation";
import QuizCard from "@/components/QuizCard";
import { Subject, SUBJECTS } from "@/types/profile";

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.id }));
}

export default function QuizPage({ params }: { params: { subject: string } }) {
  const subject = SUBJECTS.find((s) => s.id === params.subject);
  if (!subject) notFound();

  return (
    <main className="min-h-screen px-6 py-10 flex flex-col items-center gap-8">
      <div className="text-center">
        <p className="text-teal font-display tracking-widest text-sm mb-2">
          {subject.emoji} MISSION
        </p>
        <h1 className="font-display text-2xl font-bold">{subject.label}</h1>
      </div>
      <QuizCard subject={subject.id as Subject} />
    </main>
  );
}
