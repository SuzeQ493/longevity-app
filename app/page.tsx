"use client";

import { useState } from "react";
import AssessmentForm from "@/components/AssessmentForm";
import { AssessmentData } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (data: AssessmentData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to generate report");
      const result = await res.json();
      sessionStorage.setItem("longevity_report", JSON.stringify(result));
      router.push("/results");
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 to-emerald-50/30">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Longevity Assessment
            </span>
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
            Your personalized longevity plan
          </h1>
          <p className="text-lg text-zinc-500 max-w-lg mx-auto leading-relaxed">
            Answer a few questions to receive a personalized longevity and
            performance optimization plan.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-zinc-400">
            <span>5 min</span>
            <span>·</span>
            <span>13 questions</span>
            <span>·</span>
            <span>AI-powered report</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8 md:p-12">
          <AssessmentForm onSubmit={handleSubmit} isLoading={isLoading} />
          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>
    </main>
  );
}
