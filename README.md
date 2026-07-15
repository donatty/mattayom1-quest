# ฐานภารกิจ ม.1 🚀

แบบฝึกหัดเตรียมความพร้อม ม.1 ธีม "ภารกิจนักสำรวจ" สร้างด้วย Next.js 14 (App Router) + TypeScript + Tailwind CSS

## เริ่มพัฒนาในเครื่องตัวเอง

```bash
npm install
npm run dev
```

เปิด http://localhost:3000

## โครงสร้างโปรเจกต์

```
app/                  หน้าเว็บ (App Router)
  page.tsx            หน้าแรก เลือก/สร้างโปรไฟล์นักสำรวจ
  subjects/page.tsx    แผนที่ภารกิจ (เลือกวิชา)
  quiz/[subject]/      หน้าทำโจทย์ (dynamic route ตามวิชา)
  results/page.tsx     หน้าสรุปผล

components/           React components (client components)
lib/
  storage.ts           wrapper สำหรับ localStorage (โปรไฟล์ + คะแนน)
  questions/           ธนาคารข้อสอบ แยกไฟล์ตามวิชา (math.ts, english.ts, ...)
types/                 TypeScript types (Profile, Question, Subject)
public/manifest.json   PWA manifest (ติดตั้งเป็นแอปบนมือถือ/แท็บเล็ต)
```

## เพิ่มโจทย์วิชาอื่น (ภาษาไทย/วิทยาศาสตร์/สังคม)

1. สร้างไฟล์ใหม่ใน `lib/questions/` เช่น `thai.ts` โดยก็อปโครงจาก `math.ts`
2. เติมข้อมูลใน `bank` ที่ `lib/questions/index.ts`
3. ระบบหน้าเว็บ, คะแนน, เหรียญตรา จะทำงานอัตโนมัติทันทีที่มีโจทย์ในไฟล์

## ข้อมูลเก็บที่ไหน

ทุกอย่าง (โปรไฟล์เด็ก, คะแนน, ความคืบหน้า) เก็บใน `localStorage` ของเบราว์เซอร์เท่านั้น ไม่มีการส่งข้อมูลขึ้นเซิร์ฟเวอร์ ไม่ต้องมี database

## Deploy ขึ้น Vercel

1. สร้าง repo บน GitHub แล้ว push โค้ดนี้ขึ้นไป:
   ```bash
   git init
   git add .
   git commit -m "init mattayom1 quest app"
   git branch -M main
   git remote add origin <URL_REPO_ของคุณ>
   git push -u origin main
   ```
2. เข้า https://vercel.com → New Project → Import repo จาก GitHub
3. Vercel จะตรวจพบว่าเป็น Next.js อัตโนมัติ กด Deploy ได้เลย ไม่ต้องตั้งค่าอะไรเพิ่ม
4. ทุกครั้งที่ push โค้ดใหม่ขึ้น GitHub, Vercel จะ deploy เวอร์ชันใหม่ให้อัตโนมัติ

## ทำเป็น PWA ติดตั้งบนแท็บเล็ต

`public/manifest.json` และไอคอนตั้งไว้ให้แล้ว (ไอคอนเป็นแบบร่างชั่วคราว ควรเปลี่ยนเป็นดีไซน์จริงก่อนใช้งานจริง) เบราว์เซอร์ที่รองรับจะขึ้นตัวเลือก "เพิ่มลงในหน้าจอโฮม" ให้อัตโนมัติ ถ้าต้องการให้ทำงานออฟไลน์เต็มรูปแบบ แนะนำเพิ่ม service worker ผ่านแพ็กเกจ `next-pwa` ภายหลัง
