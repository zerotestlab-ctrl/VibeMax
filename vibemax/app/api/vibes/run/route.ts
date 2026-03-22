import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const GROK_API_URL = "https://api.x.ai/v1/chat/completions";
const GROK_MODEL = "grok-3-latest";

const agentPrompts: Record<string, string> = {
  Researcher: `You are the Researcher agent in a VibeMax multi-agent pipeline. Your job is to research and gather relevant data for the user's business goal. Return a JSON object with: { "findings": string[], "prospects": number, "sources": string[], "summary": string }`,
  Qualifier: `You are the Qualifier agent. Score and rank the research findings by relevance and business potential. Return: { "qualified": number, "rejected": number, "top_picks": string[], "scoring_criteria": string[], "summary": string }`,
  EmailWriter: `You are the EmailWriter agent. Create personalized, high-converting outreach content based on qualified prospects. Return: { "emails_written": number, "subject_line": string, "preview": string, "personalization_score": number, "summary": string }`,
  Scheduler: `You are the Scheduler agent. Set up the execution timeline and delivery for the content/outreach. Return: { "scheduled": number, "optimal_times": string[], "follow_up_cadence": string, "projected_responses": number, "summary": string }`,
};

interface RunVibeBody {
  vibeId: string;
  goal: string;
  category: string;
  agents: string[];
}

async function runAgent(
  agentName: string,
  goal: string,
  previousOutput: string,
  grokApiKey: string
): Promise<{ output: string; success: boolean }> {
  const systemPrompt = agentPrompts[agentName] || agentPrompts.Researcher;

  try {
    const response = await fetch(GROK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${grokApiKey}`,
      },
      body: JSON.stringify({
        model: GROK_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Business goal: ${goal}\n\nPrevious agent output: ${previousOutput || "None (you are the first agent)"}\n\nExecute your task and return structured JSON.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Grok API error: ${response.status} — ${error}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    return { output: content, success: true };
  } catch (error) {
    return {
      output: error instanceof Error ? error.message : "Agent execution failed",
      success: false,
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: RunVibeBody = await req.json();
    const { vibeId, goal, category, agents = ["Researcher", "Qualifier", "EmailWriter", "Scheduler"] } = body;

    if (!goal || !vibeId) {
      return NextResponse.json({ error: "Missing required fields: goal, vibeId" }, { status: 400 });
    }

    const grokApiKey = process.env.GROK_API_KEY;
    if (!grokApiKey) {
      return NextResponse.json({ error: "GROK_API_KEY not configured" }, { status: 500 });
    }

    // Run agents sequentially
    const results: Array<{
      agent: string;
      output: string;
      success: boolean;
      creditCost: number;
      timestamp: string;
    }> = [];

    let previousOutput = "";
    const creditCosts: Record<string, number> = {
      Researcher: 5,
      Qualifier: 4,
      EmailWriter: 8,
      Scheduler: 3,
    };

    for (const agentName of agents) {
      const start = Date.now();
      const result = await runAgent(agentName, goal, previousOutput, grokApiKey);
      const elapsed = Date.now() - start;

      const agentResult = {
        agent: agentName,
        output: result.output,
        success: result.success,
        creditCost: creditCosts[agentName] || 3,
        timestamp: new Date().toISOString(),
        elapsed,
      };

      results.push(agentResult);
      previousOutput = result.output;
    }

    const totalCredits = results.reduce((sum, r) => sum + r.creditCost, 0);
    const allSuccess = results.every((r) => r.success);

    // Attempt to save to Supabase (non-blocking)
    try {
      await supabase.from("vibe_runs").upsert({
        id: vibeId,
        user_id: user.id,
        goal,
        category,
        status: allSuccess ? "completed" : "failed",
        steps: results,
        total_credits: totalCredits,
        updated_at: new Date().toISOString(),
      });
    } catch {
      // Non-fatal: table may not exist yet during development
    }

    return NextResponse.json({
      success: allSuccess,
      vibeId,
      results,
      totalCredits,
      summary: {
        agentsRun: results.length,
        successful: results.filter((r) => r.success).length,
        failed: results.filter((r) => !r.success).length,
      },
    });
  } catch (error) {
    console.error("Vibe run error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
