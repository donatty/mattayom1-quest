import MissionMap from "@/components/MissionMap";

export default function SubjectsPage() {
  return (
    <main className="min-h-screen px-6 py-10 flex flex-col items-center gap-8">
      <div className="text-center">
        <p className="text-teal font-display tracking-widest text-sm mb-2">
          SELECT ZONE
        </p>
        <h1 className="font-display text-2xl font-bold">แผนที่ภารกิจ</h1>
        <p className="text-muted mt-1">เลือกวิชาที่จะออกสำรวจวันนี้</p>
      </div>
      <MissionMap />
    </main>
  );
}
