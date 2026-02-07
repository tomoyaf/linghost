import { getAdminDb } from "./admin";
import { StoryConfig, Citation } from "@/lib/types";
import { FieldValue } from "firebase-admin/firestore";

function getTodayId(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD in UTC
}

export async function getTodayStory(uid: string) {
  const todayId = getTodayId();
  const doc = await getAdminDb()
    .collection("users")
    .doc(uid)
    .collection("stories")
    .doc(todayId)
    .get();
  return doc.exists ? { id: todayId, ...doc.data() } : null;
}

export async function saveStory(
  uid: string,
  story: {
    title: string;
    text: string;
    config: StoryConfig;
    citations: Citation[];
  },
): Promise<string> {
  const todayId = getTodayId();
  const docRef = getAdminDb()
    .collection("users")
    .doc(uid)
    .collection("stories")
    .doc(todayId);

  // Use transaction to prevent race conditions (multiple tabs)
  await getAdminDb().runTransaction(async (tx) => {
    const existing = await tx.get(docRef);
    if (existing.exists) return; // Already saved today — skip
    tx.set(docRef, {
      title: story.title,
      text: story.text,
      config: story.config,
      citations: story.citations,
      createdAt: FieldValue.serverTimestamp(),
    });
  });

  return todayId;
}
