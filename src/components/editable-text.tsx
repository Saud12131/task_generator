"use client";

import { useState } from "react";

export default function EditableText({
  value,
  onSave,
}: {
  value: string;
  onSave: (v: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    await onSave(text);
    setLoading(false);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex gap-2">
        <input
          className="border px-2 py-1 rounded w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={save}
          className="bg-black text-white px-2 rounded"
        >
          {loading ? "..." : "Save"}
        </button>
      </div>
    );
  }

  return (
    <div
      className="cursor-pointer hover:bg-gray-100 p-1 rounded"
      onClick={() => setEditing(true)}
    >
      {value}
    </div>
  );
}
