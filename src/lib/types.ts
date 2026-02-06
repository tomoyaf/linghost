export const ATMOSPHERES = [
  { id: "dark", label: "Dark & Mysterious", icon: "🌑" },
  { id: "whimsical", label: "Whimsical & Playful", icon: "✨" },
  { id: "epic", label: "Epic & Grand", icon: "⚔️" },
  { id: "melancholic", label: "Melancholic & Reflective", icon: "🌧️" },
  { id: "suspenseful", label: "Suspenseful & Thrilling", icon: "🔍" },
  { id: "warm", label: "Warm & Heartfelt", icon: "🕯️" },
] as const;

export const WRITING_STYLES = [
  { id: "literary", label: "Literary Fiction" },
  { id: "pulp", label: "Pulp Fiction" },
  { id: "fairytale", label: "Fairy Tale" },
  { id: "noir", label: "Noir" },
  { id: "scifi", label: "Sci-Fi" },
  { id: "gothic", label: "Gothic" },
  { id: "minimalist", label: "Minimalist" },
  { id: "poetic", label: "Poetic Prose" },
] as const;

export const STORY_LENGTHS = [
  { id: "flash", label: "Flash", description: "~500 words", words: 500 },
  { id: "short", label: "Short", description: "~1,500 words", words: 1500 },
  { id: "long", label: "Long", description: "~3,000 words", words: 3000 },
] as const;

export type AtmosphereId = (typeof ATMOSPHERES)[number]["id"];
export type WritingStyleId = (typeof WRITING_STYLES)[number]["id"];
export type StoryLengthId = (typeof STORY_LENGTHS)[number]["id"];

export interface StoryConfig {
  keywords: string[];
  atmosphere: AtmosphereId;
  writingStyle: WritingStyleId;
  storyLength: StoryLengthId;
  includeCurrentEvents: boolean;
  themeNote?: string;
}

export interface Citation {
  title: string;
  url: string;
}

export type GenerationStatus =
  | "idle"
  | "connecting"
  | "generating"
  | "searching"
  | "done"
  | "error";

export interface SSEEvent {
  type: "text" | "title" | "citation" | "status" | "error" | "done";
  data: string;
}
