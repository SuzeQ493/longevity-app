"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AssessmentData,
  defaultAssessmentData,
  Gender,
  Goal,
  Symptom,
  ExerciseFrequency,
  DietType,
  CaffeineLevel,
  AlcoholFrequency,
  SupplementStatus,
} from "@/lib/types";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import RadioGroup from "@/components/ui/RadioGroup";
import ScaleInput from "@/components/ui/ScaleInput";

const SECTIONS = [
  { id: 1, title: "Profile", description: "Let's start with the basics" },
  { id: 2, title: "Goals", description: "What do you want to achieve?" },
  { id: 3, title: "Symptoms", description: "What are you currently experiencing?" },
  { id: 4, title: "Lifestyle", description: "How are you living day to day?" },
  { id: 5, title: "Daily Habits", description: "The small things that add up" },
  { id: 6, title: "Final", description: "One last thing" },
];

interface AssessmentFormProps {
  onSubmit: (data: AssessmentData) => void;
  isLoading: boolean;
}

export default function AssessmentForm({ onSubmit, isLoading }: AssessmentFormProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AssessmentData>(defaultAssessmentData);

  const section = SECTIONS[step];
  const isLast = step === SECTIONS.length - 1;
  const progress = ((step + 1) / SECTIONS.length) * 100;

  const update = <K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const canAdvance = (): boolean => {
    switch (step) {
      case 0: return !!data.age && !!data.gender;
      case 1: return data.goals.length >= 1;
      case 2: return true; // symptoms optional
      case 3:
        return (
          !!data.exerciseFrequency &&
          !!data.dietType
        );
      case 4:
        return (
          !!data.caffeineLevel &&
          !!data.alcoholFrequency &&
          !!data.supplementStatus
        );
      case 5: return true;
      default: return true;
    }
  };

  const handleNext = () => {
    if (isLast) {
      onSubmit(data);
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Section {step + 1} of {SECTIONS.length}
          </span>
          <span className="text-xs font-medium text-zinc-400">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Section header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-1">
          {section.title}
        </p>
        <h2 className="text-2xl font-semibold text-zinc-900">{section.description}</h2>
      </div>

      {/* Step content */}
      <div className="space-y-8">
        {step === 0 && (
          <>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Age
              </label>
              <input
                type="number"
                min={18}
                max={100}
                placeholder="e.g. 42"
                value={data.age}
                onChange={(e) => update("age", e.target.value)}
                className="w-32 px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                Gender
              </label>
              <RadioGroup<Gender>
                options={["Male", "Female", "Prefer not to say"]}
                value={data.gender}
                onChange={(v) => update("gender", v)}
              />
            </div>
          </>
        )}

        {step === 1 && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-3">
              Select all that apply
            </label>
            <CheckboxGroup<Goal>
              options={[
                "Improve energy",
                "Sleep better",
                "Lose fat",
                "Build muscle",
                "Improve focus",
                "Longevity / aging well",
                "Stress reduction",
              ]}
              selected={data.goals}
              onChange={(v) => update("goals", v)}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-3">
              Select all that apply (optional)
            </label>
            <CheckboxGroup<Symptom>
              options={[
                "Low energy",
                "Poor sleep",
                "Brain fog",
                "Stress / anxiety",
                "Weight gain",
                "Low motivation",
                "Digestive issues",
              ]}
              selected={data.symptoms}
              onChange={(v) => update("symptoms", v)}
            />
          </div>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                Sleep quality
              </label>
              <ScaleInput
                value={data.sleepQuality}
                onChange={(v) => update("sleepQuality", v)}
                lowLabel="Very poor"
                highLabel="Excellent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                Daily energy levels
              </label>
              <ScaleInput
                value={data.energyLevel}
                onChange={(v) => update("energyLevel", v)}
                lowLabel="Exhausted"
                highLabel="Full of energy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                Stress levels
              </label>
              <ScaleInput
                value={data.stressLevel}
                onChange={(v) => update("stressLevel", v)}
                lowLabel="Very low"
                highLabel="Extremely high"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                How often do you exercise?
              </label>
              <RadioGroup<ExerciseFrequency>
                options={["Never", "1–2x per week", "3–4x per week", "5+ times per week"]}
                value={data.exerciseFrequency}
                onChange={(v) => update("exerciseFrequency", v)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                Which best describes your diet?
              </label>
              <RadioGroup<DietType>
                options={[
                  "Mostly processed foods",
                  "Mixed diet",
                  "Mostly whole foods",
                  "Very clean / structured",
                ]}
                value={data.dietType}
                onChange={(v) => update("dietType", v)}
              />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                Daily caffeine intake
              </label>
              <RadioGroup<CaffeineLevel>
                options={["None", "1 coffee", "2–3 coffees", "4+"]}
                value={data.caffeineLevel}
                onChange={(v) => update("caffeineLevel", v)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                How often do you consume alcohol?
              </label>
              <RadioGroup<AlcoholFrequency>
                options={["None", "Occasionally", "Weekly", "Frequently"]}
                value={data.alcoholFrequency}
                onChange={(v) => update("alcoholFrequency", v)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                Are you currently taking supplements?
              </label>
              <RadioGroup<SupplementStatus>
                options={[
                  "No",
                  "Yes (basic: vitamins, magnesium, etc.)",
                  "Yes (advanced stack)",
                ]}
                value={data.supplementStatus}
                onChange={(v) => update("supplementStatus", v)}
              />
            </div>
          </>
        )}

        {step === 5 && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              What is your biggest frustration with your health right now?
              <span className="ml-2 text-zinc-400 font-normal">(optional)</span>
            </label>
            <textarea
              rows={4}
              placeholder="Describe what's been bothering you most…"
              value={data.biggestFrustration}
              onChange={(e) => update("biggestFrustration", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10">
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-zinc-700 transition-colors",
            step === 0 && "invisible"
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canAdvance() || isLoading}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150",
            canAdvance() && !isLoading
              ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow"
              : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating your plan…
            </>
          ) : isLast ? (
            <>
              Generate my plan
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
