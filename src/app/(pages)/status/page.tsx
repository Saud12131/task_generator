"use client";

import { useEffect, useState } from "react";

type Status = {
  backend: boolean;
  database: boolean;
  llm: boolean;
  timestamp: string;
};

export default function StatusPage() {
  const [status, setStatus] = useState<Status | null>(null);

  async function load() {
    const res = await fetch("/api/status");
    const data = await res.json();
    setStatus(data);
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);

  if (!status)
    return <div className="p-10">Checking system health...</div>;

  return (
    <main className="max-w-xl mx-auto p-10 space-y-6">
      <h1 className="text-3xl font-bold">System Status</h1>

      <StatusItem name="Backend API" ok={status.backend} />
      <StatusItem name="Database" ok={status.database} />
      <StatusItem name="LLM Connection" ok={status.llm} />

      <div className="text-sm text-gray-500 mt-6">
        Last checked: {new Date(status.timestamp).toLocaleTimeString()}
      </div>
    </main>
  );
}

function StatusItem({ name, ok }: { name: string; ok: boolean }) {
  return (
    <div className="flex justify-between border p-4 rounded">
      <span>{name}</span>
      <span className={ok ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
        {ok ? "Healthy" : "Down"}
      </span>
    </div>
  );
}
