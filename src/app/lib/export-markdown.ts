export function planToMarkdown(plan: any) {
  const { user_stories, tasks, risks } = plan.updated_output;

  return `# Feature Plan

## User Stories
${user_stories.map((s: string) => `- ${s}`).join("\n")}

## Tasks
${tasks.map((t: string) => `- ${t}`).join("\n")}

## Risks
${risks.map((r: string) => `- ${r}`).join("\n")}
`;
}
