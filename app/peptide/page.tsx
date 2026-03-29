"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PeptideAssessmentData,
  defaultPeptideData,
  PeptideGoal,
  PeptideSymptom,
  ExperienceLevel,
  Budget,
  PeptideExerciseFrequency,
  PeptideDietType,
  UserType,
} from "@/lib/peptide-types";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import RadioGroup from "@/components/ui/RadioGroup";
import ScaleInput from "@/components/ui/ScaleInput";
import Footer from "@/components/Footer";

const SECTIONS = [
  { title: "About you", description: "Let's start with the basics" },
  { title: "Your goals", description: "What do you want to achieve?" },
  { title: "Symptoms", description: "What are you currently experiencing?" },
  { title: "Health background", description: "Help us personalise your protocol safely" },
  { title: "Lifestyle", description: "How are you living day to day?" },
  { title: "Final details", description: "Almost done" },
];

const GOALS: PeptideGoal[] = [
  "Fat loss / weight management", "Muscle growth & performance", "Anti-aging & longevity",
  "Cognitive performance & focus", "Recovery & injury healing", "Immune support",
  "Sleep improvement", "Skin health & rejuvenation", "Sexual health & libido",
  "Cardiovascular health", "Hormonal balance", "Metabolic health",
];

const SYMPTOMS: PeptideSymptom[] = [
  "Low energy / fatigue", "Poor sleep", "Brain fog", "Slow recovery from exercise",
  "Joint or muscle pain", "Low libido", "Weight gain / difficulty losing fat",
  "Skin aging / poor skin", "Frequent illness / low immunity", "High stress / anxiety",
  "Digestive issues", "Hair thinning",
];

const LOADING_MESSAGES = [
  "Analysing your health profile…",
  "Matching peptides to your goals…",
  "Building your personalised stack…",
  "Calculating your protocol phases…",
  "Finalising your recommendations…",
];

export default function PeptidePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<PeptideAssessmentData>(defaultPeptideData);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [error, setError] = useState<string | null>(null);

  const s = SECTIONS[step];
  const isLast = step === SECTIONS.length - 1;
  const progress = ((step + 1) / SECTIONS.length) * 100;

  const set = <K extends keyof PeptideAssessmentData>(k: K, v: PeptideAssessmentData[K]) =>
    setData(prev => ({ ...prev, [k]: v }));

  const canAdvance = () => {
    switch (step) {
      case 0: return !!data.userType && !!data.age && !!data.gender;
      case 1: return data.goals.length >= 1;
      case 2: return true;
      case 3: return !!data.peptideExperience;
      case 4: return !!data.exerciseFrequency && !!data.dietType;
      case 5: return !!data.budget;
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setLoadingMessage(LOADING_MESSAGES[0]);
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[i]);
    }, 8000);

    try {
      const res = await fetch("/api/peptide-assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to generate protocol");
      const result = await res.json();
      localStorage.setItem("peptide_report", JSON.stringify(result));
      router.push("/peptide/results");
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    } finally {
      clearInterval(interval);
    }
  };

  const handleNext = () => {
    if (!canAdvance()) return;
    if (isLast) {
      handleSubmit();
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gradient-to-br from-zinc-50 to-violet-50/30">
        <div className="max-w-3xl mx-auto px-6 py-16">

          {/* Hero */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">
                Peptide Assessment
              </span>
            </div>
            <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
              Your personalised peptide protocol
            </h1>
            <p className="text-lg text-zinc-500 max-w-lg mx-auto leading-relaxed">
              Answer a few questions and receive a personalised peptide stack built around your goals, health profile, and budget.
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-zinc-400">
              <span>5 min</span><span>·</span><span>6 sections</span><span>·</span><span>AI-powered protocol</span>
            </div>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-violet-100 border-t-violet-500 animate-spin" />
                <h2 className="text-lg font-semibold text-zinc-900">Building your protocol…</h2>
                <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">{loadingMessage}</p>
                <p className="text-xs text-zinc-400">This takes up to 60 seconds — please don&apos;t close this tab.</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8 md:p-12">

              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-xs font-medium text-zinc-400 mb-2">
                  <span>Step {step + 1} of {SECTIONS.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Header */}
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-1">{s.title}</p>
                <h2 className="text-2xl font-semibold text-zinc-900">{s.description}</h2>
              </div>

              {/* Steps */}
              <div className="space-y-7">
                {step === 0 && <>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-3">Are you a consumer or a medical practitioner?</label>
                    <RadioGroup<UserType> options={["Consumer", "Practitioner"]} value={data.userType} onChange={v => set("userType", v)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Age</label>
                    <input type="number" min={18} max={100} placeholder="e.g. 42" value={data.age}
                      onChange={e => set("age", e.target.value)}
                      className="w-32 px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-3">Gender</label>
                    <RadioGroup<string> options={["Male", "Female", "Prefer not to say"]} value={data.gender} onChange={v => set("gender", v)} />
                  </div>
                </>}

                {step === 1 && <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-3">Select all that apply</label>
                  <CheckboxGroup<PeptideGoal> options={GOALS} selected={data.goals} onChange={v => set("goals", v)} />
                </div>}

                {step === 2 && <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-3">Select all that apply <span className="text-zinc-400 font-normal">(optional)</span></label>
                  <CheckboxGroup<PeptideSymptom> options={SYMPTOMS} selected={data.symptoms} onChange={v => set("symptoms", v)} />
                </div>}

                {step === 3 && <>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-3">Experience with peptides</label>
                    <RadioGroup<ExperienceLevel>
                      options={["New to peptides", "Some experience (1–2 peptides)", "Experienced (multiple protocols)"]}
                      value={data.peptideExperience} onChange={v => set("peptideExperience", v)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Any existing health conditions? <span className="text-zinc-400 font-normal">(optional)</span></label>
                    <textarea rows={3} placeholder="e.g. Type 2 diabetes, hypertension, thyroid condition…"
                      value={data.existingConditions} onChange={e => set("existingConditions", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Current medications or supplements? <span className="text-zinc-400 font-normal">(optional)</span></label>
                    <textarea rows={3} placeholder="List any medications or supplements you're currently taking…"
                      value={data.currentMedications} onChange={e => set("currentMedications", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
                  </div>
                </>}

                {step === 4 && <>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-3">Current stress levels</label>
                    <ScaleInput value={data.stressLevel} onChange={v => set("stressLevel", v)} lowLabel="Very low" highLabel="Extremely high" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-3">How often do you exercise?</label>
                    <RadioGroup<PeptideExerciseFrequency>
                      options={["Never", "1–2x per week", "3–4x per week", "5+ times per week"]}
                      value={data.exerciseFrequency} onChange={v => set("exerciseFrequency", v)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-3">How would you describe your diet?</label>
                    <RadioGroup<PeptideDietType>
                      options={["Mostly processed foods", "Mixed diet", "Mostly whole foods", "Very clean / structured"]}
                      value={data.dietType} onChange={v => set("dietType", v)} />
                  </div>
                </>}

                {step === 5 && <>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-3">Monthly budget for peptides</label>
                    <RadioGroup<Budget>
                      options={["Under €200/month", "€200–400/month", "€400–600/month", "€600+/month"]}
                      value={data.budget} onChange={v => set("budget", v)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Anything else we should know? <span className="text-zinc-400 font-normal">(optional)</span></label>
                    <textarea rows={4} placeholder="Any specific concerns, goals, or context…"
                      value={data.additionalNotes} onChange={e => set("additionalNotes", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
                  </div>
                </>}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10">
                <button type="button" onClick={() => setStep(s => s - 1)}
                  className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-zinc-700", step === 0 && "invisible")}>
                  <ArrowLeft className="w-4 h-4" />Back
                </button>
                <button type="button" onClick={handleNext} disabled={!canAdvance()}
                  className={cn("flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all",
                    canAdvance() ? "bg-violet-600 text-white hover:bg-violet-700 shadow-sm" : "bg-zinc-100 text-zinc-400 cursor-not-allowed")}>
                  {isLast ? <>Get my protocol<ArrowRight className="w-4 h-4" /></> : <>Continue<ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>

              {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
