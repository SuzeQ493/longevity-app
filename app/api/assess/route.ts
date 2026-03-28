import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { AssessmentData } from "@/lib/types";

const client = new Anthropic();

function buildPrompt(data: AssessmentData): string {
  return `You are a world-class longevity physician and performance coach — think Peter Attia meets functional medicine. A patient has completed a health assessment. Your job is to analyze the PATTERN across their data, identify what is really going on biologically, and produce a deeply personalized longevity and performance optimization protocol.

CRITICAL INSTRUCTION: Do not treat each data point in isolation. Cross-reference everything. For example:
- If energy is low AND sleep is poor AND exercise is rare → explain the compounding cortisol/mitochondrial dysfunction cycle
- If stress is high AND caffeine is 4+ AND alcohol is weekly → explain the HPA axis dysregulation pattern
- If goals include longevity AND supplements are basic → identify the specific gaps
- Reference their age and gender when relevant to hormonal or metabolic context
- If they shared a frustration, directly address it and explain the biological root cause
Every insight must feel like it was written specifically for THIS person, not copied from a health brochure.

PATIENT DATA:
- Age: ${data.age}
- Gender: ${data.gender}
- Goals: ${data.goals.join(", ")}
- Current symptoms: ${data.symptoms.length > 0 ? data.symptoms.join(", ") : "None reported"}
- Sleep quality (1–10): ${data.sleepQuality}
- Daily energy (1–10): ${data.energyLevel}
- Stress levels (1–10): ${data.stressLevel}
- Exercise frequency: ${data.exerciseFrequency}
- Diet type: ${data.dietType}
- Daily caffeine: ${data.caffeineLevel}
- Alcohol frequency: ${data.alcoholFrequency}
- Current supplements: ${data.supplementStatus}
- Biggest health frustration: ${data.biggestFrustration || "Not specified"}

Generate a structured JSON report with the following exact schema:

{
  "longevityScore": <number 0–100>,
  "scoreLabel": <string: "Needs Attention" | "Building Foundation" | "On Track" | "Optimised" | "Elite">,
  "headline": <string: 1 powerful, specific sentence summarising their situation — name the core pattern you see>,
  "bodyNarrative": <string: 3–4 sentences written in plain English, no jargon. Explain what is actually happening in their body right now based on the COMBINATION of their inputs. This is the section that makes them feel truly understood — like a doctor just explained their life to them. Reference specific data points. Be direct, warm, and clinically grounded.>,
  "topPriorities": [
    {
      "rank": 1,
      "area": <string: e.g. "Sleep Optimization">,
      "insight": <string: 3 sentences. Explain WHY this is priority #1 for them specifically — reference their actual scores and how they interact. Include one biological mechanism.>,
      "urgency": <"High" | "Medium" | "Low">
    }
    // 3 priorities total
  ],
  "protocol": {
    "sleep": {
      "score": <number 0–10>,
      "status": <string: one sentence, specific to their score>,
      "recommendations": [<string: specific, actionable — not generic>, <string>, <string>]
    },
    "nutrition": {
      "score": <number 0–10>,
      "status": <string>,
      "recommendations": [<string>, <string>, <string>]
    },
    "movement": {
      "score": <number 0–10>,
      "status": <string>,
      "recommendations": [<string>, <string>, <string>]
    },
    "stress": {
      "score": <number 0–10>,
      "status": <string>,
      "recommendations": [<string>, <string>, <string>]
    },
    "supplementation": {
      "score": <number 0–10>,
      "status": <string>,
      "recommendations": [<string>, <string>, <string>]
    }
  },
  "weekOnePlan": [
    {
      "day": "Days 1–2",
      "focus": <string>,
      "actions": [<string: specific with timing or quantity>, <string>]
    },
    {
      "day": "Days 3–4",
      "focus": <string>,
      "actions": [<string>, <string>]
    },
    {
      "day": "Days 5–7",
      "focus": <string>,
      "actions": [<string>, <string>]
    }
  ],
  "biomarkersTesting": [
    {
      "test": <string: exact lab test name>,
      "reason": <string: why this matters specifically for their profile>
    }
    // 4–5 tests
  ],
  "closingMessage": <string: 2–3 sentences — warm, direct, specific to their stated goals and frustration. Make them feel like this plan was built for them alone.>
}

Return ONLY valid JSON. No markdown, no explanation, no code fences.`;
}

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const data: AssessmentData = await req.json();

    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: buildPrompt(data),
        },
      ],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";
    const text = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
    const report = JSON.parse(text);

    return NextResponse.json({ ...report, assessmentData: data });
  } catch (err) {
    console.error("Assessment API error:", err);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
