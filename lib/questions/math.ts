import { Question } from "@/types/question";

export const mathQuestions: Question[] = [
  {
    id: "math-001",
    subject: "math",
    prompt: "จำนวนเต็ม -8 + 5 มีค่าเท่ากับข้อใด",
    choices: ["-13", "-3", "3", "13"],
    answerIndex: 1,
    explanation: "-8 + 5 = -3 เพราะ 5 หักลบขนาดของ -8 บางส่วน เหลือ -3",
    difficulty: 1,
  },
  {
    id: "math-002",
    subject: "math",
    prompt: "2³ × 2² มีค่าเท่ากับข้อใด",
    choices: ["2^5 = 32", "2^6 = 64", "4^5", "16"],
    answerIndex: 0,
    explanation: "เมื่อฐานเท่ากันและคูณกัน ให้นำเลขชี้กำลังมาบวกกัน: 3+2=5 ดังนั้น 2^5 = 32",
    difficulty: 2,
  },
  {
    id: "math-003",
    subject: "math",
    prompt: "แก้สมการ 2x + 3 = 11 ค่า x เท่ากับเท่าใด",
    choices: ["3", "4", "5", "7"],
    answerIndex: 1,
    explanation: "2x = 11 - 3 = 8 ดังนั้น x = 8/2 = 4",
    difficulty: 2,
  },
  {
    id: "math-004",
    subject: "math",
    prompt: "รูปสามเหลี่ยมมีมุมภายในรวมกันกี่องศา",
    choices: ["90", "180", "270", "360"],
    answerIndex: 1,
    explanation: "ผลรวมมุมภายในของรูปสามเหลี่ยมใดๆ เท่ากับ 180 องศาเสมอ",
    difficulty: 1,
  },
];
