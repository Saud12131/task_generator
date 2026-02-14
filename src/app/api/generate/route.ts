import { NextRequest } from "next/server";
import { createPlan } from "@/src/lib/db/plan";
import { NewPlan } from "@/src/types/plan";
import { generatePlanFromAI } from "@/src/lib/ai/generate-plan";
// import { normalizeAIOutput } from "@/src/lib/ai/normalize";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { idea, users, platform, constraints } = body;

    if (!idea || !users || !platform) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1️⃣ call AI
    const normalized = await generatePlanFromAI(body);

    // 2️⃣ normalize to editable structure
    // const normalized = normalizeAIOutput(aiRaw);

    // 3️⃣ store
    const planToInsert: NewPlan = {
      input: { idea, users, platform, constraints },
      original_output: normalized,
      updated_output: normalized,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const id = await createPlan(planToInsert);

    return Response.json({ id });

  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}
