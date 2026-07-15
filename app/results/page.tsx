import { Suspense } from "react";
import ResultsView from "@/components/ResultsView";

export default function ResultsPage() {
  return (
    <main className="min-h-screen px-6 py-10 flex items-center justify-center">
      <Suspense fallback={null}>
        <ResultsView />
      </Suspense>
    </main>
  );
}
