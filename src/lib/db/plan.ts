import { getDB } from "@/src/app/lib/db/get-db";
import { PlanDB ,NewPlan} from "@/src/types/plan";
import { ObjectId } from "mongodb";

const COLLECTION = "plans";

export async function createPlan(plan: NewPlan) {
  const db = await getDB();
 const result = await db
    .collection<PlanDB>(COLLECTION)
    .insertOne(plan as any);

  return result.insertedId.toString();
}

export async function getPlanById(id: string) {
  const db = await getDB();
  return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
}

export async function updatePlan(id: string, updated_output: any) {
  const db = await getDB();

  await db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        updated_output,
        updatedAt: new Date(),
      },
    }
  );
}

export async function getRecentPlans() {
  const db = await getDB();

  return db
    .collection(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .project({ input: 1, createdAt: 1 })
    .toArray();
}
