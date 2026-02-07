import { NextRequest } from "next/server";
import { getAdminAuth } from "@/lib/firebase/admin";
import { toggleLike } from "@/lib/firebase/firestore-server";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({ error: "Authentication required" }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  let uid: string;
  try {
    const token = authHeader.slice(7);
    const decoded = await getAdminAuth().verifyIdToken(token);
    uid = decoded.uid;
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid authentication token" }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: { timelineStoryId: string };
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!body.timelineStoryId || typeof body.timelineStoryId !== "string") {
    return new Response(
      JSON.stringify({ error: "timelineStoryId is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const result = await toggleLike(uid, body.timelineStoryId);
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
