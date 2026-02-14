import { getDB } from "@/src/app/lib/db/get-db";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const db = await getDB();

  if (!ObjectId.isValid(id))
    return Response.json({ error: "Invalid id" }, { status: 400 });

  const plan = await db
    .collection("plans")
    .findOne({ _id: new ObjectId(id) });

  if (!plan)
    return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json({
    ...plan,
    _id: plan._id.toString(),
  });
}

/* ---------------- PATCH ---------------- */

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const db = await getDB();

  await db.collection("plans").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        updated_output: body.updated_output,
        updatedAt: new Date(),
      },
    }
  );

  return Response.json({ success: true });
}
