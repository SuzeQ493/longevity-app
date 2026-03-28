"use client";

import { cn } from "@/lib/utils";

interface ScaleInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  lowLabel?: string;
  highLabel?: string;
}

export default function ScaleInput({
  value,
  onChange,
  min = 1,
  max = 10,
  lowLabel = "Very poor",
  highLabel = "Excellent",
}: ScaleInputProps) {
  const steps = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <div className="w-full">
      <div className="flex gap-2">
        {steps.map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => onChange(step)}
            className={cn(
              "flex-1 h-10 rounded-lg text-sm font-medium transition-all duration-150 border",
              value === step
                ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                : "bg-white border-zinc-200 text-zinc-500 hover:border-emerald-400 hover:text-emerald-600"
            )}
          >
            {step}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-zinc-400">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}
