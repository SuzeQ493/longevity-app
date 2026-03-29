"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Flame,
  BarChart2,
  ListChecks,
  Calendar,
  FlaskConical,
  Lock,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function PayPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const report = localStorage.getItem("longevity_report");
    if (!report) router.push("/");
  }, [router]);

  const handlePay = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/create-checkout", { method: "POST" });
      if (!res.ok) throw new Error("Could not start checkout");
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gradient-to-br from-zinc-50 to-emerald-50/20">
        <div className="max-w-xl mx-auto px-6 py-16">

          {/* Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 mb-6">
              <Flame className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Your report is ready
              </span>
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 mb-3 tracking-tight">
              Unlock your longevity plan
            </h1>
            <p className="text-zinc-500 leading-relaxed max-w-sm mx-auto">
              Your personalised report has been generated. One payment to access it instantly.
            </p>
          </div>

          {/* What's included */}
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 mb-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
              What&apos;s included
            </p>

            {[
              { icon: BarChart2, label: "Longevity Score", desc: "Your baseline health rating out of 100" },
              { icon: ListChecks, label: "5-Area Optimization Protocol", desc: "Sleep, nutrition, movement, stress & supplements" },
              { icon: Calendar, label: "Week-One Action Plan", desc: "Day-by-day steps you can start today" },
              { icon: FlaskConical, label: "Biomarker Recommendations", desc: "Exactly which lab tests to prioritise" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{label}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="bg-zinc-900 rounded-2xl p-6 text-center mb-4">
            <p className="text-zinc-400 text-sm mb-1">One-time payment</p>
            <p className="text-5xl font-bold text-white mb-1">$19</p>
            <p className="text-zinc-400 text-sm mb-6">Instant access · PDF download included</p>

            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-700 disabled:text-zinc-400 text-white font-semibold py-4 rounded-xl text-base transition-all duration-150 shadow-lg shadow-emerald-900/30"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Redirecting to checkout…
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Get my report — $19
                </>
              )}
            </button>

            {error && (
              <p className="mt-3 text-sm text-red-400">{error}</p>
            )}
          </div>

          {/* Trust */}
          <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
            <Lock className="w-3.5 h-3.5" />
            Secure payment via Stripe · No subscription · Cancel anytime
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
