import Anthropic from "@anthropic-ai/sdk";
import { StoryConfig } from "./types";
import { buildSystemPrompt, buildUserMessage } from "./prompts";

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) {
    client = new Anthropic();
  }
  return client;
}

export function createStoryStream(config: StoryConfig) {
  const anthropic = getClient();
  const systemPrompt = buildSystemPrompt(config);
  const userMessage = buildUserMessage(config);

  const tools: Anthropic.Messages.Tool[] = config.includeCurrentEvents
    ? [
        {
          type: "web_search_20250305" as const,
          name: "web_search",
          max_uses: 5,
        } as unknown as Anthropic.Messages.Tool,
      ]
    : [];

  return anthropic.messages.stream({
    model: "claude-opus-4-6",
    max_tokens: 16000,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
    ...(tools.length > 0 ? { tools } : {}),
  });
}
