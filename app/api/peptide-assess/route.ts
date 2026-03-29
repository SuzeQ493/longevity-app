import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { PeptideAssessmentData } from "@/lib/peptide-types";
import { getCatalogueText } from "@/lib/peptide-catalogue";

export const maxDuration = 300;

function buildPrompt(data: PeptideAssessmentData): string {
  return `You are a world-class peptide therapy specialist and longevity physician. A ${data.userType === "Practitioner" ? "medical practitioner" : "client"} has completed a peptide assessment. Your job is to analyse their profile and recommend a personalised peptide protocol exclusively from the catalogue provided below.

AVAILABLE PEPTIDE CATALOGUE:
${getCatalogueText()}

CLIENT PROFILE:
- User type: ${data.userType}
- Age: ${data.age}
- Gender: ${data.gender}
- Primary goals: ${data.goals.join(", ")}
- Current symptoms: ${data.symptoms.length > 0 ? data.symptoms.join(", ") : "None reported"}
- Peptide experience: ${data.peptideExperience}
- Existing conditions: ${data.existingConditions || "None reported"}
- Current medications / supplements: ${data.currentMedications || "None reported"}
- Exercise frequency: ${data.exerciseFrequency}
- Diet: ${data.dietType}
- Stress level (1–10): ${data.stressLevel}
- Monthly budget: ${data.budget}
- Additional notes: ${data.additionalNotes || "None"}

INSTRUCTIONS:
- Only recommend peptides that exist in the catalogue above
- Match recommendations to their budget — total monthly cost must stay within their stated budget range
- Cross-reference goals, symptoms, experience level, and health conditions
- For beginners, start conservatively (2–3 peptides max)
- For experienced users, more comprehensive stacks are appropriate
- Flag any cautions based on their health conditions or medications
- Be specific about why each peptide was chosen for THIS person

Return ONLY valid JSON in this exact schema. No markdown, no code fences:

{
  "headline": <string: 1 powerful sentence summarising their protocol rationale>,
  "profileSummary": <string: 3–4 sentences explaining what you observed about their profile and why you made these choices. Written to the client directly, warm and clinical.>,
  "stack": [
    {
      "name": <string: exact peptide name from catalogue>,
      "price": <number: price per pen from catalogue>,
      "frequency": <string: dosing frequency>,
      "duration": <string: cycle duration>,
      "breakPeriod": <string: break period>,
      "primaryGoal": <string: main reason this peptide was chosen for them>,
      "rationale": <string: 2–3 sentences explaining why this specific peptide fits their profile>,
      "priority": <"Core" | "Recommended" | "Optional">
    }
  ],
  "totalMonthlyCost": <number: sum of all stack prices>,
  "stackSynergy": <string: 2–3 sentences explaining how the peptides work together>,
  "protocol": {
    "phase1": {
      "weeks": <string: e.g. "Weeks 1–4">,
      "focus": <string>,
      "peptides": [<string: peptide name>],
      "instructions": <string: practical guidance>
    },
    "phase2": {
      "weeks": <string: e.g. "Weeks 5–8">,
      "focus": <string>,
      "peptides": [<string: peptide name>],
      "instructions": <string>
    }
  },
  "safetyNotes": [<string: any safety considerations specific to their profile>],
  "consultationRecommended": <boolean>,
  "consultationReason": <string: why a consultation is or isn't recommended>,
  "nextSteps": [<string: 3 clear action steps to get started>]
}`;
}

export async function POST(req: NextRequest) {
  try {
    const client = new Anthropic();
    const data: PeptideAssessmentData = await req.json();

    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: buildPrompt(data) }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";
    const text = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
    const report = JSON.parse(text);

    return NextResponse.json(report);
  } catch (err) {
    console.error("Peptide assessment error:", err);
    return NextResponse.json({ error: "Failed to generate protocol" }, { status: 500 });
  }
}
