export type Subject = "math" | "thai" | "english" | "science" | "social";

export const SUBJECTS: { id: Subject; label: string; emoji: string }[] = [
  { id: "math", label: "คณิตศาสตร์", emoji: "📐" },
  { id: "thai", label: "ภาษาไทย", emoji: "📖" },
  { id: "english", label: "ภาษาอังกฤษ", emoji: "🔤" },
  { id: "science", label: "วิทยาศาสตร์", emoji: "🧪" },
  { id: "social", label: "สังคมศึกษา", emoji: "🌏" },
];

export type SubjectProgress = {
  completedQuestionIds: string[];
  bestStreak: number;
  medal: "none" | "bronze" | "silver" | "gold";
};

export type Profile = {
  id: string;
  name: string;
  avatar: string; // emoji avatar
  createdAt: string;
  progress: Record<Subject, SubjectProgress>;
};

export function createEmptyProgress(): Record<Subject, SubjectProgress> {
  return {
    math: { completedQuestionIds: [], bestStreak: 0, medal: "none" },
    thai: { completedQuestionIds: [], bestStreak: 0, medal: "none" },
    english: { completedQuestionIds: [], bestStreak: 0, medal: "none" },
    science: { completedQuestionIds: [], bestStreak: 0, medal: "none" },
    social: { completedQuestionIds: [], bestStreak: 0, medal: "none" },
  };
}
