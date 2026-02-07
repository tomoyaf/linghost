import { getClientDb } from "./client";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  getDocs,
  limit,
  startAfter,
  DocumentSnapshot,
  QueryConstraint,
} from "firebase/firestore";
import { StoredStory, TimelineStory, UserLike } from "@/lib/types";

function getTodayId(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD in UTC
}

export async function fetchTodayStory(
  uid: string,
): Promise<(StoredStory & { id: string }) | null> {
  const todayId = getTodayId();
  const docRef = doc(getClientDb(), "users", uid, "stories", todayId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    id: todayId,
    title: data.title,
    text: data.text,
    config: data.config,
    citations: data.citations || [],
    createdAt: data.createdAt?.toDate() || new Date(),
  };
}

export async function fetchUserStories(
  uid: string,
): Promise<(StoredStory & { id: string })[]> {
  const storiesRef = collection(getClientDb(), "users", uid, "stories");
  const q = query(storiesRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title,
      text: data.text,
      config: data.config,
      citations: data.citations || [],
      createdAt: data.createdAt?.toDate() || new Date(),
    };
  });
}

export async function fetchStory(
  uid: string,
  storyId: string,
): Promise<(StoredStory & { id: string }) | null> {
  const docRef = doc(getClientDb(), "users", uid, "stories", storyId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    id: storyId,
    title: data.title,
    text: data.text,
    config: data.config,
    citations: data.citations || [],
    createdAt: data.createdAt?.toDate() || new Date(),
  };
}

// --- Timeline functions ---

export async function fetchTimelineStories(
  pageSize: number,
  lastDoc?: DocumentSnapshot,
): Promise<{ stories: TimelineStory[]; lastDoc: DocumentSnapshot | null }> {
  const timelineRef = collection(getClientDb(), "timeline");
  const constraints: QueryConstraint[] = [orderBy("createdAt", "desc"), limit(pageSize)];
  if (lastDoc) constraints.push(startAfter(lastDoc));
  const q = query(timelineRef, ...constraints);
  const snap = await getDocs(q);
  const stories = snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title,
      text: data.text,
      config: data.config,
      citations: data.citations || [],
      authorUid: data.authorUid,
      authorDisplayName: data.authorDisplayName,
      authorPhotoURL: data.authorPhotoURL || null,
      likeCount: data.likeCount || 0,
      createdAt: data.createdAt?.toDate() || new Date(),
    };
  });
  const last = snap.docs[snap.docs.length - 1] || null;
  return { stories, lastDoc: last };
}

export async function fetchTimelineStory(
  storyId: string,
): Promise<TimelineStory | null> {
  const docRef = doc(getClientDb(), "timeline", storyId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    id: storyId,
    title: data.title,
    text: data.text,
    config: data.config,
    citations: data.citations || [],
    authorUid: data.authorUid,
    authorDisplayName: data.authorDisplayName,
    authorPhotoURL: data.authorPhotoURL || null,
    likeCount: data.likeCount || 0,
    createdAt: data.createdAt?.toDate() || new Date(),
  };
}

export async function fetchUserLikeStatuses(
  uid: string,
  storyIds: string[],
): Promise<Set<string>> {
  const liked = new Set<string>();
  const results = await Promise.all(
    storyIds.map((id) =>
      getDoc(doc(getClientDb(), "users", uid, "likes", id)),
    ),
  );
  results.forEach((snap, i) => {
    if (snap.exists()) liked.add(storyIds[i]);
  });
  return liked;
}

export async function fetchUserLikes(
  uid: string,
): Promise<UserLike[]> {
  const likesRef = collection(getClientDb(), "users", uid, "likes");
  const q = query(likesRef, orderBy("likedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      timelineStoryId: data.timelineStoryId,
      likedAt: data.likedAt?.toDate() || new Date(),
      storyTitle: data.storyTitle,
      storyPreview: data.storyPreview,
      authorDisplayName: data.authorDisplayName,
      authorPhotoURL: data.authorPhotoURL || null,
      storyConfig: data.storyConfig,
    };
  });
}
