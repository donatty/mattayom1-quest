import ProfileSelector from "@/components/ProfileSelector";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 gap-8">
      <div className="text-center">
        <p className="text-teal font-display tracking-widest text-sm mb-2">
          MISSION READY
        </p>
        <h1 className="font-display text-3xl font-bold">
          ฐานภารกิจ ม.1 🚀
        </h1>
        <p className="text-muted mt-2">
          ใครจะออกเดินทางสำรวจภารกิจวันนี้?
        </p>
      </div>
      <ProfileSelector />
    </main>
  );
}
