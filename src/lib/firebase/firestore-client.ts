import { getClientDb } from "./client";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { StoredStory } from "@/lib/types";

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
