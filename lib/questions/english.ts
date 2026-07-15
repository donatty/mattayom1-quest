import { Question } from "@/types/question";

export const englishQuestions: Question[] = [
  {
    id: "eng-001",
    subject: "english",
    prompt: 'Choose the correct sentence: "She ___ to school every day."',
    choices: ["go", "goes", "going", "gone"],
    answerIndex: 1,
    explanation: 'Subject "She" is third person singular, so the verb needs "-s": goes.',
    difficulty: 1,
  },
  {
    id: "eng-002",
    subject: "english",
    prompt: 'What is the past tense of "go"?',
    choices: ["goed", "gone", "went", "going"],
    answerIndex: 2,
    explanation: '"Go" is an irregular verb; its past tense is "went".',
    difficulty: 1,
  },
  {
    id: "eng-003",
    subject: "english",
    prompt: 'Choose the synonym of "happy".',
    choices: ["sad", "joyful", "angry", "tired"],
    answerIndex: 1,
    explanation: '"Joyful" means feeling or showing great happiness, similar to "happy".',
    difficulty: 2,
  },
];
