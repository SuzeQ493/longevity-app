"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Download, AlertTriangle, CheckCircle2,
  Star, Calendar, Phone, ShoppingCart, Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

interface StackItem {
  name: string;
  price: number;
  frequency: string;
  duration: string;
  breakPeriod: string;
  primaryGoal: string;
  rationale: string;
  priority: "Core" | "Recommended" | "Optional";
}

interface Phase {
  weeks: string;
  focus: string;
  peptides: string[];
  instructions: string;
}

interface Report {
  headline: string;
  profileSummary: string;
  stack: StackItem[];
  totalMonthlyCost: number;
  stackSynergy: string;
  protocol: { phase1: Phase; phase2: Phase };
  safetyNotes: string[];
  consultationRecommended: boolean;
  consultationReason: string;
  nextSteps: string[];
}

const PRIORITY_STYLES = {
  Core:        "bg-violet-600 text-white",
  Recommended: "bg-violet-100 text-violet-700",
  Optional:    "bg-zinc-100 text-zinc-500",
};

function BuyButton({ item }: { item: StackItem }) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ peptideName: item.name, price: item.price }),
      });
      if (!res.ok) throw new Error();
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-200 disabled:text-zinc-400 text-white text-sm font-semibold transition-all"
    >
      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShoppingCart className="w-3.5 h-3.5" />}
      {loading ? "Loading…" : `Buy — €${item.price}`}
    </button>
  );
}

export default function PeptideResultsPage() {
  const [report, setReport] = useState<Report | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("peptide_report");
    if (!stored) { router.push("/peptide"); return; }
    setReport(JSON.parse(stored));
  }, [router]);

  if (!report) return null;

  const coreItems = report.stack.filter(s => s.priority === "Core");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gradient-to-br from-zinc-50 to-violet-50/20">
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">

          {/* Nav */}
          <div className="flex items-center justify-between no-print">
            <button onClick={() => router.push("/peptide")}
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />New assessment
            </button>
            <button onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors">
              <Download className="w-4 h-4" />Save as PDF
            </button>
          </div>

          {/* Hero */}
          <div className="bg-zinc-900 rounded-2xl p-8 text-white">
            <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-400/30 rounded-full px-4 py-1.5 mb-5">
              <Star className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-semibold text-violet-300 uppercase tracking-wider">Your Peptide Protocol</span>
            </div>
            <h1 className="text-2xl font-bold mb-4 leading-tight">{report.headline}</h1>
            <p className="text-zinc-300 leading-relaxed">{report.profileSummary}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Peptides in stack", value: report.stack.length.toString() },
              { label: "Core peptides", value: coreItems.length.toString() },
              { label: "Est. monthly cost", value: `€${report.totalMonthlyCost}` },
            ].map(m => (
              <div key={m.label} className="bg-white rounded-xl border border-zinc-100 p-5 text-center">
                <div className="text-2xl font-bold text-violet-600">{m.value}</div>
                <div className="text-xs text-zinc-400 mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Stack with buy buttons */}
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 mb-4">Your Recommended Stack</h2>
            <div className="space-y-3">
              {report.stack.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-zinc-900">{item.name}</h3>
                        <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", PRIORITY_STYLES[item.priority])}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-xs text-violet-600 font-medium">{item.primaryGoal}</p>
                    </div>
                    <BuyButton item={item} />
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-3">{item.rationale}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />{item.frequency}</span>
                    <span>{item.duration} on · {item.breakPeriod} off</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Synergy */}
          <div className="bg-violet-50 border border-violet-100 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-violet-700 uppercase tracking-wider mb-2">Stack Synergy</h2>
            <p className="text-zinc-700 leading-relaxed text-sm">{report.stackSynergy}</p>
          </div>

          {/* Protocol phases */}
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 mb-4">Your Protocol Plan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[report.protocol.phase1, report.protocol.phase2].map((phase, i) => (
                <div key={i} className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-violet-500" />
                    <span className="text-xs font-semibold text-violet-600 uppercase tracking-wider">{phase.weeks}</span>
                  </div>
                  <p className="font-semibold text-zinc-900 mb-2">{phase.focus}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {phase.peptides.map(p => (
                      <span key={p} className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded-lg">{p}</span>
                    ))}
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{phase.instructions}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safety notes */}
          {report.safetyNotes.length > 0 && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h2 className="text-sm font-semibold text-amber-700 uppercase tracking-wider">Safety Notes</h2>
              </div>
              <ul className="space-y-2">
                {report.safetyNotes.map((note, i) => (
                  <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                    <span className="flex-shrink-0 mt-0.5">•</span>{note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next steps */}
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 mb-4">Next Steps</h2>
            <div className="space-y-3">
              {report.nextSteps.map((step, i) => (
                <div key={i} className="bg-white rounded-xl border border-zinc-100 p-4 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs font-bold flex-shrink-0 flex items-center justify-center">{i + 1}</span>
                  <p className="text-sm text-zinc-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation CTA */}
          <div className={cn("rounded-2xl p-8 text-center", report.consultationRecommended ? "bg-violet-600 text-white" : "bg-zinc-900 text-white")}>
            <Phone className="w-6 h-6 mx-auto mb-3 opacity-80" />
            <h2 className="text-lg font-bold mb-2">
              {report.consultationRecommended ? "A consultation is recommended" : "Want expert guidance?"}
            </h2>
            <p className="text-sm opacity-80 mb-5 max-w-md mx-auto">{report.consultationReason}</p>
            <button className="bg-white text-zinc-900 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-zinc-100 transition-colors">
              Book a consultation
            </button>
          </div>

          <p className="text-center text-xs text-zinc-400 pb-8">
            This protocol is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional before starting any peptide protocol.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
