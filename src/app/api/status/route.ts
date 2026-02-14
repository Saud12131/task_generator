import { getDB } from "@/src/app/lib/db/get-db";

async function checkDB() {
  try {
    const db = await getDB();
    await db.command({ ping: 1 });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

async function checkLLM() {
  try {
    const res = await fetch(`${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_API_KEY!,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "ping" }],
        max_tokens: 1,
      }),
    });

    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

export async function GET() {
  const db = await checkDB();
  const llm = await checkLLM();

  return Response.json({
    backend: true,
    database: db.ok,
    llm: llm.ok,
    timestamp: new Date().toISOString(),
  });
}
