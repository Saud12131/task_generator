"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { useState } from "react";
import SortableTask from "./sortable-task";

export default function TaskReorder({
  tasks,
  onChange,
}: {
  tasks: string[];
  onChange: (tasks: string[]) => Promise<void>;
}) {
  const [items, setItems] = useState(tasks);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);

    setItems(newItems);
    onChange(newItems);
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((task) => (
            <SortableTask key={task} id={task} text={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
