import { getDB } from "../../lib/db/get-db";

export async function GET() {
  const db = await getDB();

  const collections = await db.listCollections().toArray();

  return Response.json({
    success: true,
    collections
  });
}
