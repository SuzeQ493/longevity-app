export type UserType = "Consumer" | "Practitioner";

export type PeptideGoal =
  | "Fat loss / weight management"
  | "Muscle growth & performance"
  | "Anti-aging & longevity"
  | "Cognitive performance & focus"
  | "Recovery & injury healing"
  | "Immune support"
  | "Sleep improvement"
  | "Skin health & rejuvenation"
  | "Sexual health & libido"
  | "Cardiovascular health"
  | "Hormonal balance"
  | "Metabolic health";

export type PeptideSymptom =
  | "Low energy / fatigue"
  | "Poor sleep"
  | "Brain fog"
  | "Slow recovery from exercise"
  | "Joint or muscle pain"
  | "Low libido"
  | "Weight gain / difficulty losing fat"
  | "Skin aging / poor skin"
  | "Frequent illness / low immunity"
  | "High stress / anxiety"
  | "Digestive issues"
  | "Hair thinning";

export type ExperienceLevel =
  | "New to peptides"
  | "Some experience (1–2 peptides)"
  | "Experienced (multiple protocols)";

export type Budget =
  | "Under €200/month"
  | "€200–400/month"
  | "€400–600/month"
  | "€600+/month";

export type PeptideExerciseFrequency =
  | "Never"
  | "1–2x per week"
  | "3–4x per week"
  | "5+ times per week";

export type PeptideDietType =
  | "Mostly processed foods"
  | "Mixed diet"
  | "Mostly whole foods"
  | "Very clean / structured";

export interface PeptideAssessmentData {
  userType: UserType | "";
  age: string;
  gender: string;
  goals: PeptideGoal[];
  symptoms: PeptideSymptom[];
  existingConditions: string;
  currentMedications: string;
  peptideExperience: ExperienceLevel | "";
  exerciseFrequency: PeptideExerciseFrequency | "";
  dietType: PeptideDietType | "";
  stressLevel: number;
  budget: Budget | "";
  additionalNotes: string;
}

export const defaultPeptideData: PeptideAssessmentData = {
  userType: "",
  age: "",
  gender: "",
  goals: [],
  symptoms: [],
  existingConditions: "",
  currentMedications: "",
  peptideExperience: "",
  exerciseFrequency: "",
  dietType: "",
  stressLevel: 5,
  budget: "",
  additionalNotes: "",
};
