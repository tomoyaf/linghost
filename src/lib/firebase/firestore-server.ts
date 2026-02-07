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
  author: {
    displayName: string;
    photoURL: string | null;
  },
): Promise<string> {
  const todayId = getTodayId();
  const db = getAdminDb();
  const userStoryRef = db
    .collection("users")
    .doc(uid)
    .collection("stories")
    .doc(todayId);
  const timelineRef = db
    .collection("timeline")
    .doc(`${uid}_${todayId}`);

  // Use transaction to write both user story and timeline atomically
  await db.runTransaction(async (tx) => {
    const existing = await tx.get(userStoryRef);
    if (existing.exists) return; // Already saved today — skip

    const storyData = {
      title: story.title,
      text: story.text,
      config: story.config,
      citations: story.citations,
      createdAt: FieldValue.serverTimestamp(),
    };

    tx.set(userStoryRef, storyData);
    tx.set(timelineRef, {
      ...storyData,
      authorUid: uid,
      authorDisplayName: author.displayName,
      authorPhotoURL: author.photoURL,
      likeCount: 0,
    });
  });

  return todayId;
}

export async function toggleLike(
  uid: string,
  timelineStoryId: string,
): Promise<{ liked: boolean; newLikeCount: number }> {
  const db = getAdminDb();
  const likeRef = db
    .collection("users")
    .doc(uid)
    .collection("likes")
    .doc(timelineStoryId);
  const timelineRef = db.collection("timeline").doc(timelineStoryId);

  return db.runTransaction(async (tx) => {
    const [likeSnap, timelineSnap] = await Promise.all([
      tx.get(likeRef),
      tx.get(timelineRef),
    ]);

    if (!timelineSnap.exists) {
      throw new Error("Timeline story not found");
    }

    const timelineData = timelineSnap.data()!;
    const currentCount = timelineData.likeCount || 0;

    if (likeSnap.exists) {
      // Unlike
      tx.delete(likeRef);
      const newCount = Math.max(0, currentCount - 1);
      tx.update(timelineRef, { likeCount: newCount });
      return { liked: false, newLikeCount: newCount };
    } else {
      // Like
      tx.set(likeRef, {
        timelineStoryId,
        likedAt: FieldValue.serverTimestamp(),
        storyTitle: timelineData.title,
        storyPreview: (timelineData.text || "").slice(0, 200),
        authorDisplayName: timelineData.authorDisplayName,
        authorPhotoURL: timelineData.authorPhotoURL || null,
        storyConfig: timelineData.config,
      });
      const newCount = currentCount + 1;
      tx.update(timelineRef, { likeCount: newCount });
      return { liked: true, newLikeCount: newCount };
    }
  });
}
