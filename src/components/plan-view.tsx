"use client";

import { useEffect, useState } from "react";
import EditableText from "./editable-text";
import TaskReorder from "./task-reorder";
import { planToMarkdown } from "@/src/app/lib/export-markdown";
export default function PlanView({ id }: { id: string }) {
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/plan/${id}`)
      .then((r) => r.json())
      .then(setPlan);
  }, [id]);

  async function save(updated_output: any) {
    setPlan({ ...plan, updated_output });

    await fetch(`/api/plan/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updated_output }),
    });
  }

  if (!plan) return <div className="p-10">Loading...</div>;

  const data = plan.updated_output;

  return (
    <main className="max-w-4xl mx-auto p-10 space-y-10">
      <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
        <p className="text-blue-800 text-sm">💡 Click to edit user stories and risks • Drag tasks to reorder</p>
      </div>

      {/* STORIES */}
      <section className="border rounded-lg p-6 bg-white">
        <h2 className="text-2xl font-bold mb-3">User Stories</h2>
        {data.user_stories.map((s: string, i: number) => (
          <EditableText
            key={i}
            value={s}
            onSave={async (newVal) => {
              const updated = { ...data };
              updated.user_stories[i] = newVal;
              await save(updated);
            }}
          />
        ))}
      </section>

      {/* TASKS */}
      <section className="border rounded-lg p-6 bg-white">
        <h2 className="text-2xl font-bold mb-3">Tasks (Drag to reorder)</h2>

        <TaskReorder
          tasks={data.tasks}
          onChange={async (newTasks) => {
            const updated = { ...data, tasks: newTasks };
            await save(updated);
          }}
        />
      </section>


      {/* RISKS */}
      <section className="border rounded-lg p-6 bg-white">
        <h2 className="text-2xl font-bold mb-3">Risks</h2>
        {data.risks.map((r: string, i: number) => (
          <EditableText
            key={i}
            value={r}
            onSave={async (newVal) => {
              const updated = { ...data };
              updated.risks[i] = newVal;
              await save(updated);
            }}
          />
        ))}
      </section>
<div className="flex gap-3 mb-6">
  <button
    onClick={() => {
      const md = planToMarkdown(plan);
      navigator.clipboard.writeText(md);
      alert("Copied as Markdown!");
    }}
    className="px-4 py-2 bg-black text-white rounded"
  >
    Copy Markdown
  </button>

  <button
    onClick={() => {
      const md = planToMarkdown(plan);
      const blob = new Blob([md], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "plan.md";
      a.click();
      URL.revokeObjectURL(url);
    }}
    className="px-4 py-2 border rounded"
  >
    Download .md
  </button>
</div>

    </main>
  );
}
