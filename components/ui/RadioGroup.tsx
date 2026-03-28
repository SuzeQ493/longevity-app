"use client";

import { cn } from "@/lib/utils";

interface RadioGroupProps<T extends string> {
  options: T[];
  value: T | "";
  onChange: (value: T) => void;
}

export default function RadioGroup<T extends string>({
  options,
  value,
  onChange,
}: RadioGroupProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium border text-left transition-all duration-150",
            value === option
              ? "bg-emerald-600 border-emerald-600 text-white"
              : "bg-white border-zinc-200 text-zinc-600 hover:border-emerald-400 hover:text-emerald-700"
          )}
        >
          <span
            className={cn(
              "w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
              value === option ? "border-white" : "border-zinc-300"
            )}
          >
            {value === option && (
              <span className="w-2 h-2 rounded-full bg-white" />
            )}
          </span>
          {option}
        </button>
      ))}
    </div>
  );
}
