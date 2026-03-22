import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const GROK_API_URL = "https://api.x.ai/v1/chat/completions";
const GROK_MODEL = "grok-3-latest";

export const runtime = "edge";

/**
 * Streaming SSE endpoint for real-time agent execution.
 * Usage: POST /api/vibes/run/stream
 * Body: { vibeId, goal, category }
 * Returns: Server-Sent Events with agent step updates
 */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { goal, category } = await req.json();

  if (!goal) {
    return new Response("Missing goal", { status: 400 });
  }

  const grokApiKey = process.env.GROK_API_KEY;

  const agentSequence = [
    { name: "Researcher", creditCost: 5 },
    { name: "Qualifier", creditCost: 4 },
    { name: "EmailWriter", creditCost: 8 },
    { name: "Scheduler", creditCost: 3 },
  ];

  const encoder = new TextEncoder();

  function sendEvent(data: object) {
    return encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
  }

  const stream = new ReadableStream({
    async start(controller) {
      let previousOutput = "";

      for (const agent of agentSequence) {
        // Signal agent starting
        controller.enqueue(
          sendEvent({
            type: "agent_start",
            agent: agent.name,
            creditCost: agent.creditCost,
            timestamp: new Date().toISOString(),
          })
        );

        try {
          if (!grokApiKey) throw new Error("GROK_API_KEY not configured");

          const response = await fetch(GROK_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${grokApiKey}`,
            },
            body: JSON.stringify({
              model: GROK_MODEL,
              messages: [
                {
                  role: "system",
                  content: `You are the ${agent.name} agent. Execute your role for the business goal. Be concise.`,
                },
                {
                  role: "user",
                  content: `Goal: ${goal}\nCategory: ${category}\nPrevious: ${previousOutput || "None"}\nExecute and summarize in 1-2 sentences.`,
                },
              ],
              stream: true,
              temperature: 0.7,
              max_tokens: 200,
            }),
          });

          if (!response.ok) {
            throw new Error(`Grok API ${response.status}`);
          }

          // Stream token chunks
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          let fullOutput = "";

          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value);
              const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

              for (const line of lines) {
                const data = line.slice(6);
                if (data === "[DONE]") break;
                try {
                  const parsed = JSON.parse(data);
                  const token = parsed.choices?.[0]?.delta?.content || "";
                  if (token) {
                    fullOutput += token;
                    controller.enqueue(
                      sendEvent({ type: "token", agent: agent.name, token })
                    );
                  }
                } catch {
                  // Skip malformed chunks
                }
              }
            }
          }

          previousOutput = fullOutput;
          controller.enqueue(
            sendEvent({
              type: "agent_done",
              agent: agent.name,
              output: fullOutput,
              creditCost: agent.creditCost,
              timestamp: new Date().toISOString(),
            })
          );
        } catch (error) {
          controller.enqueue(
            sendEvent({
              type: "agent_error",
              agent: agent.name,
              error: error instanceof Error ? error.message : "Agent failed",
            })
          );
        }
      }

      controller.enqueue(
        sendEvent({
          type: "run_complete",
          timestamp: new Date().toISOString(),
          totalCredits: agentSequence.reduce((sum, a) => sum + a.creditCost, 0),
        })
      );

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
