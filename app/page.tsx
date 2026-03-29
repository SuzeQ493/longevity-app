"use client";

import { useState, useEffect } from "react";
import AssessmentForm from "@/components/AssessmentForm";
import Footer from "@/components/Footer";
import { AssessmentData } from "@/lib/types";
import { useRouter } from "next/navigation";

const LOADING_MESSAGES = [
  "Analysing your lifestyle patterns…",
  "Identifying biological root causes…",
  "Building your personalized protocol…",
  "Calculating your longevity score…",
  "Generating your week-one plan…",
  "Finalising your report…",
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) return;
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[i]);
    }, 8000);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async (data: AssessmentData) => {
    setIsLoading(true);
    setLoadingMessage(LOADING_MESSAGES[0]);
    setError(null);
    try {
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to generate report");
      const result = await res.json();
      localStorage.setItem("longevity_report", JSON.stringify(result));
      router.push("/pay");
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gradient-to-br from-zinc-50 to-emerald-50/30">
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

          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-500 animate-spin" />
                <h2 className="text-lg font-semibold text-zinc-900">Building your plan…</h2>
                <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
                  {loadingMessage}
                </p>
                <p className="text-xs text-zinc-400">This takes up to 60 seconds — please don&apos;t close this tab.</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8 md:p-12">
              <AssessmentForm onSubmit={handleSubmit} isLoading={isLoading} />
              {error && (
                <p className="mt-4 text-center text-sm text-red-500">{error}</p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
