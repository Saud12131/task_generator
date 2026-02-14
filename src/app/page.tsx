"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<any[]>([]);

  /* ---------------- Load recent plans ---------------- */

  useEffect(() => {
    fetch("/api/plan/recent")
      .then((r) => r.json())
      .then(setRecent)
      .catch(() => { });
  }, []);

  /* ---------------- Submit form ---------------- */

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idea: form.get("idea"),
        users: form.get("users"),
        platform: form.get("platform"),
        constraints: form.get("constraints"),
      }),
    });

    const plan = await res.json();

    // redirect to plan page
    router.push(`/plan/${plan.  id}`);
  }

  return (
    <main className="max-w-2xl mx-auto p-10 space-y-12">
      {/* ---------- HEADER ---------- */}
      <a href="/status" className="text-lg text-blue-600 underline">
        View system status
      </a>

      <h1 className="text-3xl font-bold">AI Task Generator</h1>

      {/* ---------- FORM ---------- */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <textarea
          name="idea"
          placeholder="What do you want to build?"
          className="w-full border p-3 rounded"
          required
        />

        <input
          name="users"
          placeholder="Target users"
          className="w-full border p-3 rounded"
          required
        />

        <select name="platform" className="w-full border p-3 rounded">
          <option value="web">Web App</option>
          <option value="mobile">Mobile App</option>
          <option value="internal">Internal Tool</option>
          <option value="api">API</option>
        </select>

        <textarea
          name="constraints"
          placeholder="Constraints (optional)"
          className="w-full border p-3 rounded"
        />

        <button
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded w-full"
        >
          {loading ? "Generating plan..." : "Generate Plan"}
        </button>

      </form>

      {/* ---------- RECENT PLANS ---------- */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Recent Plans</h2>

        {recent.length === 0 && (
          <div className="text-gray-500 text-sm">
            No plans generated yet
          </div>
        )}

        <div className="space-y-2">
          {recent.map((p) => (
            <a
              key={p._id}
              href={`/plan/${p._id}`}
              className="block border p-3 rounded hover:bg-gray-50 transition"
            >
              <div className="font-medium">{p.idea}</div>
              <div className="text-sm text-gray-500">
                {new Date(p.createdAt).toLocaleString()}
              </div>
            </a>
          ))}
        </div>
      </section>

    </main>
  );
}
