export type Gender = "Male" | "Female" | "Prefer not to say";

export type Goal =
  | "Improve energy"
  | "Sleep better"
  | "Lose fat"
  | "Build muscle"
  | "Improve focus"
  | "Longevity / aging well"
  | "Stress reduction";

export type Symptom =
  | "Low energy"
  | "Poor sleep"
  | "Brain fog"
  | "Stress / anxiety"
  | "Weight gain"
  | "Low motivation"
  | "Digestive issues";

export type ExerciseFrequency =
  | "Never"
  | "1–2x per week"
  | "3–4x per week"
  | "5+ times per week";

export type DietType =
  | "Mostly processed foods"
  | "Mixed diet"
  | "Mostly whole foods"
  | "Very clean / structured";

export type CaffeineLevel = "None" | "1 coffee" | "2–3 coffees" | "4+";

export type AlcoholFrequency =
  | "None"
  | "Occasionally"
  | "Weekly"
  | "Frequently";

export type SupplementStatus =
  | "No"
  | "Yes (basic: vitamins, magnesium, etc.)"
  | "Yes (advanced stack)";

export interface AssessmentData {
  // Section 1 — Profile
  age: string;
  gender: Gender | "";

  // Section 2 — Goals
  goals: Goal[];

  // Section 3 — Symptoms
  symptoms: Symptom[];

  // Section 4 — Lifestyle
  sleepQuality: number;
  energyLevel: number;
  stressLevel: number;
  exerciseFrequency: ExerciseFrequency | "";
  dietType: DietType | "";

  // Section 5 — Daily Habits
  caffeineLevel: CaffeineLevel | "";
  alcoholFrequency: AlcoholFrequency | "";
  supplementStatus: SupplementStatus | "";

  // Final
  biggestFrustration: string;
}

export const defaultAssessmentData: AssessmentData = {
  age: "",
  gender: "",
  goals: [],
  symptoms: [],
  sleepQuality: 5,
  energyLevel: 5,
  stressLevel: 5,
  exerciseFrequency: "",
  dietType: "",
  caffeineLevel: "",
  alcoholFrequency: "",
  supplementStatus: "",
  biggestFrustration: "",
};
