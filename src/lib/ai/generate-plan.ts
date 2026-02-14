import { client } from "./azure";

export async function generatePlanFromAI(input: {
  goal: string;
  users: string;
  constraints: string;
}) {

  const completion = await client.chat.completions.create({
    model: process.env.AZURE_OPENAI_DEPLOYMENT!,
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content: "You are a senior product manager and software architect."
      },
      {
        role: "user",
        content: `
Create a software feature plan.

Goal: ${input.goal}
Users: ${input.users}
Constraints: ${input.constraints}

Return STRICT JSON only:

{
  "user_stories": ["string"],
  "tasks": ["string"],
  "risks": ["string"]
}

Rules:
- Minimum 4 user stories
- Minimum 8 tasks
- Tasks must include frontend, backend, database and testing work
- Each task should be a clear actionable sentence
- No markdown
- No explanation
`
      }
    ],
    response_format: { type: "json_object" }
  });

  const text = completion.choices[0].message.content!;
  return JSON.parse(text);
}
