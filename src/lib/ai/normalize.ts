// import { PlanOutput} from "@/src/types/plan";

// export function normalizeAIOutput(ai: any): PlanOutput {
//   const tasks: Task[] = [];

//   ["frontend", "backend", "infra"].forEach((group) => {
//     ai.tasks?.[group]?.forEach((title: string, index: number) => {
//       tasks.push({
//         id: crypto.randomUUID(),
//         title,
//         group: group as any,
//         order: index,
//       });
//     });
//   });

//   return {
//     user_stories: ai.user_stories || [],
//     tasks,
//     risks: ai.risks || [],
//   };
// }
