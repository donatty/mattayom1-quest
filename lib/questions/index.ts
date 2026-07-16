import { Subject } from "@/types/profile";
import { Question } from "@/types/question";
import { mathQuestions } from "./math";
import { englishQuestions } from "./english";
import { socialQuestions } from "./social";

// TODO: เติม thai.ts, science.ts, social.ts ตามโครงเดียวกันนี้
const bank: Record<Subject, Question[]> = {
  math: mathQuestions,
  english: englishQuestions,
  thai: [],
  science: [],
  social: socialQuestions,
};

export function getQuestionsForSubject(subject: Subject): Question[] {
  return bank[subject] ?? [];
}
