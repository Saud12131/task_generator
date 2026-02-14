import clientPromise from "../db/mongo";

export async function getDB() {
  const client = await clientPromise;
  return client.db(); // uses DB from URI
}
