"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Share2, RotateCcw, TrendingUp } from "lucide-react";
import { VibeInput } from "@/components/workspace/VibeInput";
import { TerminalFeed } from "@/components/workspace/TerminalFeed";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { AgentStep } from "@/lib/types";
import { generateId } from "@/lib/utils";

type RunStatus = "idle" | "running" | "paused" | "completed" | "failed";

const agentSequences: Record<string, Array<{ agent: string; action: string; creditCost: number; output?: string; durationMs: number }>> = {
  Sales: [
    { agent: "Researcher", action: "Initializing LinkedIn scraper module...", creditCost: 1, durationMs: 1200 },
    { agent: "Researcher", action: "Scanning for target profiles matching ICP criteria...", creditCost: 3, output: "Found 2,847 potential matches in database", durationMs: 2000 },
    { agent: "Researcher", action: "Enriching profiles with company data...", creditCost: 4, output: "Enriched 847 profiles with funding, size, tech stack data", durationMs: 1800 },
    { agent: "Qualifier", action: "Loading ICP scoring model (Grok multi-agent)...", creditCost: 1, durationMs: 1000 },
    { agent: "Qualifier", action: "Scoring leads against ICP: funding > $1M, team 10-50, SaaS...", creditCost: 5, output: "Qualified 94 high-fit leads (score > 0.85)", durationMs: 2200 },
    { agent: "Qualifier", action: "Ranking by engagement probability + urgency signals...", creditCost: 2, output: "Top 50 leads ranked. #1: TechFlow Inc ($4.2M raised, 23 employees)", durationMs: 1400 },
    { agent: "EmailWriter", action: "Loading personalization context for each lead...", creditCost: 2, durationMs: 1000 },
    { agent: "EmailWriter", action: "Crafting personalized email sequences (50 contacts)...", creditCost: 8, output: "Generated 50 unique emails with 3-touch sequences. Avg personalization score: 9.2/10", durationMs: 2800 },
    { agent: "EmailWriter", action: "A/B testing subject lines with Grok optimization...", creditCost: 3, output: "Subject line winner: 'Your [Company] + [Product] = [specific outcome]'", durationMs: 1600 },
    { agent: "Scheduler", action: "Syncing with calendar API and finding optimal send times...", creditCost: 2, durationMs: 1200 },
    { agent: "Scheduler", action: "Queuing email sequences with smart follow-up logic...", creditCost: 3, output: "Scheduled 50 sequences. First sends: Mon-Wed 9-11am local time", durationMs: 1500 },
    { agent: "Scheduler", action: "Calculating projected pipeline value...", creditCost: 1, output: "Projected pipeline: $48,200 (3.2% est. conversion @ $30k avg deal)", durationMs: 800 },
  ],
  Content: [
    { agent: "Researcher", action: "Analyzing top-performing content in your niche...", creditCost: 2, durationMs: 1400 },
    { agent: "Researcher", action: "Extracting viral hooks and engagement patterns...", creditCost: 3, output: "Identified 12 high-engagement content patterns. Top theme: 'behind the scenes'", durationMs: 1800 },
    { agent: "ContentGen", action: "Generating 30-day content calendar structure...", creditCost: 3, durationMs: 1200 },
    { agent: "ContentGen", action: "Writing post drafts with hooks, body, CTAs...", creditCost: 8, output: "Created 30 posts: 10 threads, 15 single posts, 5 polls. Avg estimated reach: 4.2k", durationMs: 2600 },
    { agent: "ContentGen", action: "Optimizing for Twitter/X algorithm signals...", creditCost: 2, output: "Applied: optimal posting times, hashtag strategy, reply bait CTAs", durationMs: 1000 },
    { agent: "Scheduler", action: "Scheduling posts across optimal engagement windows...", creditCost: 2, output: "All 30 posts scheduled. Peak times: Tue/Thu 7am, 12pm, 8pm EST", durationMs: 1100 },
  ],
  Web3: [
    { agent: "Researcher", action: "Scanning Web3 project databases and Discord servers...", creditCost: 2, durationMs: 1300 },
    { agent: "Researcher", action: "Identifying active NFT launches and DAO governance...", creditCost: 4, output: "Found 73 active projects. Filtered to 28 matching partnership criteria", durationMs: 2000 },
    { agent: "Qualifier", action: "Analyzing on-chain metrics: floor price, holder count, velocity...", creditCost: 5, output: "Top 20 projects qualified. #1: PixelVerse (8.2 ETH floor, 12k holders)", durationMs: 2100 },
    { agent: "EmailWriter", action: "Drafting personalized partnership pitches...", creditCost: 6, output: "20 pitches crafted with unique value props per project vertical", durationMs: 2200 },
    { agent: "OutreachBot", action: "Sending via Twitter DM + email simultaneously...", creditCost: 3, output: "Outreach dispatched. Estimated 4-6 responses within 48 hours", durationMs: 1400 },
  ],
  default: [
    { agent: "Researcher", action: "Initializing research module with your goal context...", creditCost: 2, durationMs: 1200 },
    { agent: "Researcher", action: "Gathering relevant data and market intelligence...", creditCost: 4, output: "Collected 1,240 data points from 18 sources", durationMs: 2000 },
    { agent: "Qualifier", action: "Filtering and ranking findings by relevance...", creditCost: 3, output: "Qualified 89 high-value opportunities", durationMs: 1600 },
    { agent: "EmailWriter", action: "Creating outreach materials and action items...", creditCost: 5, output: "Prepared 15 priority action items with templates", durationMs: 1800 },
    { agent: "Scheduler", action: "Setting up execution timeline...", creditCost: 2, output: "Campaign scheduled. Est. completion: 3-5 business days", durationMs: 1000 },
  ],
};

export default function WorkspacePage() {
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [status, setStatus] = useState<RunStatus>("idle");
  const [vibeTitle, setVibeTitle] = useState("");
  const [projectedROI, setProjectedROI] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState(0);
  const pausedRef = useRef(false);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const handleDeploy = useCallback(async (goal: string, category: string) => {
    setVibeTitle(goal);
    setSteps([]);
    setStatus("running");
    setProjectedROI(null);
    setTotalCredits(0);
    pausedRef.current = false;
    clearTimeouts();

    const sequence = agentSequences[category] || agentSequences.default;

    // Create pending steps first
    const initialSteps: AgentStep[] = sequence.map((s, i) => ({
      id: `step-${i}-${generateId()}`,
      agent: s.agent,
      action: s.action,
      status: "pending",
      timestamp: "",
      creditCost: s.creditCost,
    }));
    setSteps(initialSteps);

    let cumulativeDelay = 400;
    let runningCredits = 0;

    for (let i = 0; i < sequence.length; i++) {
      const s = sequence[i];

      // Set step to "running"
      const startDelay = cumulativeDelay;
      const t1 = setTimeout(() => {
        if (pausedRef.current) return;
        const ts = new Date().toLocaleTimeString("en-US", { hour12: false });
        setSteps((prev) =>
          prev.map((step, idx) =>
            idx === i ? { ...step, status: "running", timestamp: ts } : step
          )
        );
      }, startDelay);
      timeoutRefs.current.push(t1);

      cumulativeDelay += s.durationMs;

      // Set step to "done"
      const doneDelay = cumulativeDelay;
      const t2 = setTimeout(() => {
        if (pausedRef.current) return;
        const ts = new Date().toLocaleTimeString("en-US", { hour12: false });
        runningCredits += s.creditCost;
        setTotalCredits(runningCredits);
        setSteps((prev) =>
          prev.map((step, idx) =>
            idx === i
              ? { ...step, status: "done", timestamp: ts, output: sequence[i].output }
              : step
          )
        );
      }, doneDelay);
      timeoutRefs.current.push(t2);

      cumulativeDelay += 300;
    }

    // Finish
    const finishDelay = cumulativeDelay + 500;
    const t3 = setTimeout(() => {
      if (pausedRef.current) return;
      setStatus("completed");
      const roi = category === "Sales" ? 48200 : category === "Web3" ? 18800 : category === "Content" ? 5400 : 12000;
      setProjectedROI(roi);
    }, finishDelay);
    timeoutRefs.current.push(t3);
  }, []);

  const handlePause = useCallback(() => {
    pausedRef.current = true;
    clearTimeouts();
    setStatus("paused");
    setSteps((prev) =>
      prev.map((step) =>
        step.status === "running" ? { ...step, status: "pending" } : step
      )
    );
  }, []);

  const handleReset = useCallback(() => {
    clearTimeouts();
    setSteps([]);
    setStatus("idle");
    setVibeTitle("");
    setProjectedROI(null);
    setTotalCredits(0);
    pausedRef.current = false;
  }, []);

  function handleExport() {
    const data = {
      vibe: vibeTitle,
      status,
      totalCredits,
      projectedROI,
      steps: steps.map((s) => ({
        agent: s.agent,
        action: s.action,
        output: s.output,
        timestamp: s.timestamp,
        creditCost: s.creditCost,
      })),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vibe-results-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col h-full max-h-screen overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-black/20 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <h1 className="text-sm font-semibold text-white truncate">
            {vibeTitle || "New Workspace"}
          </h1>
          {status !== "idle" && (
            <Badge
              variant={
                status === "running" ? "violet"
                  : status === "completed" ? "success"
                  : status === "paused" ? "warning"
                  : status === "failed" ? "error"
                  : "default"
              }
            >
              {status === "running" && <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse inline-block mr-1" />}
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          )}
          {totalCredits > 0 && (
            <span className="text-xs text-white/30">{totalCredits} credits used</span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {projectedROI && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1"
            >
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium">
                ${projectedROI.toLocaleString()} projected
              </span>
            </motion.div>
          )}
          {steps.length > 0 && (
            <>
              <Button variant="ghost" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main split view */}
      <div className="flex flex-1 min-h-0 gap-0">
        {/* Left: Input panel */}
        <div className="w-full sm:w-[340px] lg:w-[380px] flex-shrink-0 border-r border-white/[0.06] p-5 overflow-y-auto">
          <VibeInput
            onDeploy={handleDeploy}
            isRunning={status === "running"}
            onPause={handlePause}
          />
        </div>

        {/* Right: Terminal feed */}
        <div className="flex-1 min-w-0 p-4 overflow-hidden">
          <TerminalFeed
            steps={steps}
            isRunning={status === "running"}
            vibeTitle={vibeTitle}
          />
        </div>
      </div>

      {/* Bottom: Completion summary */}
      {status === "completed" && projectedROI && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/[0.06] bg-black/30 px-5 py-3 flex items-center justify-between gap-4 flex-shrink-0 flex-wrap"
        >
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-xs text-white/40">Projected Pipeline</div>
              <div className="text-base font-bold text-emerald-400">${projectedROI.toLocaleString()}</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <div className="text-xs text-white/40">Credits Used</div>
              <div className="text-base font-bold text-violet-400">{totalCredits}</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <div className="text-xs text-white/40">Agent Steps</div>
              <div className="text-base font-bold text-white">{steps.length}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleExport}>
              <Download className="h-3.5 w-3.5" /> Export results
            </Button>
            <Button size="sm" onClick={handleReset}>
              + New vibe
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
