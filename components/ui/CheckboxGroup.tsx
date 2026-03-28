"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxGroupProps<T extends string> {
  options: T[];
  selected: T[];
  onChange: (selected: T[]) => void;
}

export default function CheckboxGroup<T extends string>({
  options,
  selected,
  onChange,
}: CheckboxGroupProps<T>) {
  const toggle = (option: T) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-150",
              isSelected
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "bg-white border-zinc-200 text-zinc-600 hover:border-emerald-400 hover:text-emerald-700"
            )}
          >
            {isSelected && <Check className="w-3.5 h-3.5" />}
            {option}
          </button>
        );
      })}
    </div>
  );
}
