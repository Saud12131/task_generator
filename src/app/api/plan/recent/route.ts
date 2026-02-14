import { getDB } from "@/src/app/lib/db/get-db";

export async function GET() {
  const db = await getDB();

  const plans = await db
    .collection("plans")
    .find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray();

  return Response.json(
    plans.map(p => ({
      _id: p._id.toString(),
      idea: p.input.idea,
      createdAt: p.createdAt
    }))
  );
}
