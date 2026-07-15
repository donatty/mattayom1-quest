import { Subject } from "./profile";

export type Question = {
  id: string;
  subject: Subject;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation?: string;
  difficulty: 1 | 2 | 3;
};
