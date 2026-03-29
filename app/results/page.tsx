"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  AlertTriangle,
  CheckCircle2,
  Flame,
  Moon,
  Salad,
  Dumbbell,
  Brain,
  Pill,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Priority {
  rank: number;
  area: string;
  insight: string;
  urgency: "High" | "Medium" | "Low";
}

interface ProtocolArea {
  score: number;
  status: string;
  recommendations: string[];
}

interface WeekPlan {
  day: string;
  focus: string;
  actions: string[];
}

interface BiomarkerTest {
  test: string;
  reason: string;
}

interface Report {
  longevityScore: number;
  scoreLabel: string;
  headline: string;
  bodyNarrative: string;
  topPriorities: Priority[];
  protocol: {
    sleep: ProtocolArea;
    nutrition: ProtocolArea;
    movement: ProtocolArea;
    stress: ProtocolArea;
    supplementation: ProtocolArea;
  };
  weekOnePlan: WeekPlan[];
  biomarkersTesting: BiomarkerTest[];
  closingMessage: string;
}

const PROTOCOL_ICONS = {
  sleep: Moon,
  nutrition: Salad,
  movement: Dumbbell,
  stress: Brain,
  supplementation: Pill,
};

const PROTOCOL_LABELS = {
  sleep: "Sleep",
  nutrition: "Nutrition",
  movement: "Movement",
  stress: "Stress & Recovery",
  supplementation: "Supplementation",
};

const URGENCY_STYLES = {
  High: "bg-red-50 text-red-700 border-red-100",
  Medium: "bg-amber-50 text-amber-700 border-amber-100",
  Low: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 54;
  const dash = (score / 100) * circumference;

  const color =
    score >= 80
      ? "#10b981"
      : score >= 60
      ? "#f59e0b"
      : score >= 40
      ? "#f97316"
      : "#ef4444";

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#f4f4f5" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-zinc-900">{score}</span>
        <span className="text-xs text-zinc-400 font-medium">/100</span>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const [report, setReport] = useState<Report | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("longevity_report");
    if (!stored) {
      router.push("/");
      return;
    }
    setReport(JSON.parse(stored));
  }, [router]);

  if (!report) return null;

  const protocolEntries = Object.entries(report.protocol) as [
    keyof typeof PROTOCOL_ICONS,
    ProtocolArea
  ][];

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 to-emerald-50/20">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">

        {/* Nav */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            New assessment
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Save as PDF
          </button>
        </div>

        {/* Score card */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 mb-6">
            <Flame className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Your Longevity Report
            </span>
          </div>
          <ScoreRing score={report.longevityScore} />
          <p className="mt-4 text-lg font-semibold text-zinc-800">{report.scoreLabel}</p>
          <p className="mt-3 text-zinc-500 max-w-lg mx-auto leading-relaxed">
            {report.headline}
          </p>
        </div>

        {/* Body Narrative */}
        <div className="bg-zinc-900 rounded-2xl p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">
            What's happening in your body right now
          </p>
          <p className="text-zinc-200 leading-relaxed text-[15px]">{report.bodyNarrative}</p>
        </div>

        {/* Top Priorities */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">
            Your Top 3 Priorities
          </h2>
          <div className="space-y-3">
            {report.topPriorities.map((p) => (
              <div
                key={p.rank}
                className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-bold flex items-center justify-center">
                    {p.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-zinc-900">{p.area}</h3>
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full border",
                          URGENCY_STYLES[p.urgency]
                        )}
                      >
                        {p.urgency}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">{p.insight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protocol */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">
            Your Optimization Protocol
          </h2>
          <div className="space-y-4">
            {protocolEntries.map(([key, area]) => {
              const Icon = PROTOCOL_ICONS[key];
              return (
                <div
                  key={key}
                  className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-zinc-900">
                          {PROTOCOL_LABELS[key]}
                        </h3>
                        <span className="text-sm font-medium text-zinc-500">
                          {area.score}/10
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            area.score >= 7
                              ? "bg-emerald-500"
                              : area.score >= 4
                              ? "bg-amber-400"
                              : "bg-red-400"
                          )}
                          style={{ width: `${area.score * 10}%` }}
                        />
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">{area.status}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {area.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Week 1 Plan */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Your First Week</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {report.weekOnePlan.map((week) => (
              <div
                key={week.day}
                className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5"
              >
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                  {week.day}
                </p>
                <p className="font-semibold text-zinc-900 mb-3">{week.focus}</p>
                <ul className="space-y-2">
                  {week.actions.map((action, i) => (
                    <li key={i} className="text-sm text-zinc-500 flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold flex-shrink-0">→</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Biomarkers */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">
            Recommended Lab Tests
          </h2>
          <div className="bg-white rounded-xl border border-zinc-100 shadow-sm divide-y divide-zinc-50">
            {report.biomarkersTesting.map((test, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{test.test}</p>
                  <p className="text-sm text-zinc-500 mt-0.5">{test.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing message */}
        <div className="bg-emerald-600 rounded-2xl p-8 text-center text-white">
          <p className="text-lg leading-relaxed font-medium">{report.closingMessage}</p>
        </div>

        {/* Peptide CTA */}
        <div className="bg-zinc-900 rounded-2xl p-8 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-400/30 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            <span className="text-xs font-semibold text-violet-300 uppercase tracking-wider">Next Step</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">Get your personalised peptide protocol</h2>
          <p className="text-zinc-400 leading-relaxed max-w-md mx-auto mb-6">
            Based on your longevity results, discover the exact peptide stack designed for your goals — with products you can order directly.
          </p>
          <a
            href="/peptide"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-4 rounded-xl text-sm transition-all shadow-lg shadow-violet-900/30"
          >
            Take the peptide assessment
            <span className="text-lg">→</span>
          </a>
          <p className="mt-4 text-xs text-zinc-500">Free · 5 minutes · AI-powered recommendations</p>
        </div>

        <p className="text-center text-xs text-zinc-400 pb-8">
          This report is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional before making changes to your health regimen.
        </p>
      </div>
    </main>
  );
}
