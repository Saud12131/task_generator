import { ObjectId } from "mongodb";

export type PlanInput = {
  idea: string;
  users: string;
  platform: "web" | "mobile" | "internal" | "api";
  constraints: string;
};

export type TaskGroup = "frontend" | "backend" | "infra";



export type PlanOutput = {
  user_stories: string[];
  tasks: string[];
  risks: string[];
};

/** Document stored in MongoDB */
export type PlanDB = {
  _id: ObjectId;
  input: PlanInput;
  original_output: PlanOutput;
  updated_output: PlanOutput;
  createdAt: Date;
  updatedAt: Date;
};

/** Document used in app/frontend */
export type Plan = Omit<PlanDB, "_id"> & {
  _id: string;
};

/** Document inserted (before Mongo generates id) */
export type NewPlan = Omit<PlanDB, "_id">;
