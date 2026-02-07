import {
  StoryConfig,
  ATMOSPHERES,
  WRITING_STYLES,
  STORY_LENGTHS,
} from "./types";

export function buildSystemPrompt(config: StoryConfig): string {
  const atmosphere = ATMOSPHERES.find((a) => a.id === config.atmosphere)!;
  const style = WRITING_STYLES.find((s) => s.id === config.writingStyle)!;
  const length = STORY_LENGTHS.find((l) => l.id === config.storyLength)!;

  let prompt = `You are a masterful storyteller with a gift for weaving captivating narratives.

Your task is to write a short story with the following parameters:

**Keywords to incorporate:** ${config.keywords.join(", ")}
**Atmosphere:** ${atmosphere.label}
**Writing Style:** ${style.label}
**Target Length:** approximately ${length.words} words (${length.label})`;

  if (config.themeNote) {
    prompt += `\n**Additional Theme Note:** ${config.themeNote}`;
  }

  prompt += `

**Output Format:**
- Your VERY FIRST line must be: TITLE: [Your Creative Title]
- Follow immediately with the story text.
- Write only the story — no meta-commentary, author notes, or explanations.

**Quality Guidelines:**
- Open with a strong, hooking first sentence.
- Use vivid sensory details throughout.
- Build a clear narrative arc (setup, rising action, climax, resolution).
- Match the requested atmosphere and writing style consistently.
- Incorporate all provided keywords naturally — they should feel organic, not forced.
- End with a memorable, resonant closing line.`;

  if (config.includeCurrentEvents) {
    prompt += `

**Current Events Integration:**
- Use your web search tool to find 1–3 current real-world events or news stories that relate to the keywords or theme.
- Weave these real events naturally into the narrative — they should enrich the story, not feel like a news report.
- After the story ends, append a sources block in this exact format:

SOURCES_START
- [Title of article](URL)
- [Title of article](URL)
SOURCES_END

This sources block is required when you use web search. It will be parsed by the system.`;
  }

  return prompt;
}

export function buildUserMessage(config: StoryConfig): string {
  return `Please write the story now. Remember: first line must be TITLE: [title], then the story immediately follows.`;
}
