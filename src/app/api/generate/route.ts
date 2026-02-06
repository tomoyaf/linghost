import { NextRequest } from "next/server";
import { createStoryStream } from "@/lib/claude";
import { StoryConfig, Citation } from "@/lib/types";

export const maxDuration = 120;

function sseEncode(type: string, data: string): string {
  return `data: ${JSON.stringify({ type, data })}\n\n`;
}

export async function POST(req: NextRequest) {
  let config: StoryConfig;
  try {
    config = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!config.keywords || config.keywords.length === 0) {
    return new Response(
      JSON.stringify({ error: "At least one keyword is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();
    writer.write(
      encoder.encode(
        sseEncode(
          "error",
          "ANTHROPIC_API_KEY is not configured. Please set it in .env.local",
        ),
      ),
    );
    writer.close();
    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  const send = (type: string, data: string) =>
    writer.write(encoder.encode(sseEncode(type, data)));

  (async () => {
    try {
      await send("status", "connecting");

      const stream = createStoryStream(config);
      let titleExtracted = false;
      let textBuffer = "";
      const citations: Citation[] = [];
      let inSourcesBlock = false;
      let sourcesBuffer = "";

      await send("status", "generating");

      stream.on("text", async (text) => {
        if (req.signal.aborted) {
          stream.abort();
          return;
        }

        textBuffer += text;

        // Extract title from first line
        if (!titleExtracted && textBuffer.includes("\n")) {
          const firstNewline = textBuffer.indexOf("\n");
          const firstLine = textBuffer.substring(0, firstNewline).trim();

          if (firstLine.startsWith("TITLE:")) {
            const title = firstLine.replace("TITLE:", "").trim();
            await send("title", title);
            titleExtracted = true;
            // Send remaining text after title line
            const remaining = textBuffer.substring(firstNewline + 1);
            if (remaining) {
              await send("text", remaining);
            }
            textBuffer = remaining;
            return;
          } else {
            // No TITLE: prefix found, send as-is
            titleExtracted = true;
            await send("title", "Untitled");
          }
        }

        if (titleExtracted) {
          // Check for SOURCES_START/END block
          if (text.includes("SOURCES_START")) {
            inSourcesBlock = true;
            // Don't send sources block text to client
            const beforeSources = text.split("SOURCES_START")[0];
            if (beforeSources.trim()) {
              await send("text", beforeSources);
            }
            sourcesBuffer += text.split("SOURCES_START")[1] || "";
            return;
          }

          if (inSourcesBlock) {
            if (text.includes("SOURCES_END")) {
              sourcesBuffer += text.split("SOURCES_END")[0];
              // Parse sources
              const lines = sourcesBuffer.split("\n").filter((l) => l.trim());
              for (const line of lines) {
                const match = line.match(/\[(.+?)\]\((.+?)\)/);
                if (match) {
                  citations.push({ title: match[1], url: match[2] });
                }
              }
              inSourcesBlock = false;
              return;
            }
            sourcesBuffer += text;
            return;
          }

          await send("text", text);
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stream.on("event" as any, async (event: any) => {
        if (event.type === "content_block_start") {
          const block = event.content_block;
          if (block?.type === "server_tool_use" && block?.name === "web_search") {
            await send("status", "searching");
          }
        }
      });

      stream.on("message", async (message) => {
        // Extract citations from web_search_tool_result blocks in final message
        if (message.content) {
          for (const block of message.content) {
            // Use type assertion since web_search types may not be in SDK types
            const b = block as { type: string; content?: Array<{ type: string; title?: string; url?: string }> };
            if (b.type === "web_search_tool_result" && Array.isArray(b.content)) {
              for (const item of b.content) {
                if (item.type === "web_search_result" && item.title && item.url) {
                  citations.push({ title: item.title, url: item.url });
                }
              }
            }
          }
        }
      });

      stream.on("error", async (error) => {
        const errMessage =
          error instanceof Error ? error.message : "Unknown error";
        if (errMessage.includes("429")) {
          await send(
            "error",
            "Rate limited by the API. Please wait a moment and try again.",
          );
        } else {
          await send("error", errMessage);
        }
      });

      const finalMessage = await stream.finalMessage();

      // Deduplicate citations by URL
      const uniqueCitations = citations.filter(
        (c, i, arr) => arr.findIndex((x) => x.url === c.url) === i,
      );

      for (const citation of uniqueCitations) {
        await send("citation", JSON.stringify(citation));
      }

      await send("status", "done");
      await send("done", "");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      try {
        await send("error", message);
      } catch {
        // Writer may be closed
      }
    } finally {
      try {
        await writer.close();
      } catch {
        // Already closed
      }
    }
  })();

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
