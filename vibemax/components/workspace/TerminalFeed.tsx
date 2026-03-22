"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Loader2, Clock, Zap } from "lucide-react";
import type { AgentStep } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TerminalFeedProps {
  steps: AgentStep[];
  isRunning: boolean;
  vibeTitle?: string;
}

const agentColors: Record<string, string> = {
  Researcher: "text-blue-400",
  Qualifier: "text-emerald-400",
  EmailWriter: "text-violet-400",
  Scheduler: "text-amber-400",
  Strategist: "text-pink-400",
  ContentGen: "text-cyan-400",
  OutreachBot: "text-orange-400",
};

function StepIcon({ status }: { status: AgentStep["status"] }) {
  if (status === "done") return <CheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />;
  if (status === "error") return <XCircle className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />;
  if (status === "running") return <Loader2 className="h-3.5 w-3.5 text-violet-400 flex-shrink-0 animate-spin" />;
  return <Clock className="h-3.5 w-3.5 text-white/20 flex-shrink-0" />;
}

export function TerminalFeed({ steps, isRunning, vibeTitle }: TerminalFeedProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [steps]);

  return (
    <div className="flex flex-col h-full rounded-xl border border-white/[0.07] bg-black/70 overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02] flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-amber-500/60" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-white/30 font-mono">
            {vibeTitle || "vibe-workspace"} — agent runner
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {isRunning ? (
            <>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-mono">LIVE</span>
            </>
          ) : (
            <>
              <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="text-xs text-white/30 font-mono">IDLE</span>
            </>
          )}
        </div>
      </div>

      {/* Terminal body */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1 min-h-0">
        {steps.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/20">
            <Zap className="h-8 w-8 mb-3 opacity-30" />
            <p>Deploy your vibe to start the agent feed...</p>
            <p className="mt-1 text-xs">
              <span className="text-violet-400">$</span> vibe run &quot;your goal here&quot;
            </p>
          </div>
        ) : (
          <>
            <div className="text-white/20 mb-3 pb-2 border-b border-white/5">
              <span className="text-violet-400">$</span> vibe run &quot;{vibeTitle}&quot;
              <br />
              <span className="text-white/10">──────────────────────────────────────────</span>
            </div>

            <AnimatePresence>
              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "flex items-start gap-2.5 py-1 group",
                    step.status === "pending" && "opacity-40"
                  )}
                >
                  {/* Line number */}
                  <span className="text-white/20 w-5 text-right flex-shrink-0 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Status icon */}
                  <StepIcon status={step.status} />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span
                        className={cn(
                          "font-semibold",
                          agentColors[step.agent] || "text-white/60"
                        )}
                      >
                        [{step.agent}]
                      </span>
                      <span
                        className={cn(
                          "text-white/60",
                          step.status === "running" && "text-white/80",
                          step.status === "done" && "text-white/50",
                          step.status === "error" && "text-red-400/70"
                        )}
                      >
                        {step.action}
                      </span>
                    </div>

                    {/* Output (if any) */}
                    {step.output && (
                      <div className="mt-1 ml-2 text-white/30 text-xs leading-relaxed border-l border-white/10 pl-2">
                        {step.output}
                      </div>
                    )}
                  </div>

                  {/* Right side: timestamp + credits */}
                  <div className="flex items-center gap-3 flex-shrink-0 text-white/20 text-[10px]">
                    <span>{step.timestamp}</span>
                    {step.creditCost > 0 && (
                      <span className="flex items-center gap-0.5">
                        <Zap className="h-2.5 w-2.5" />
                        {step.creditCost}cr
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isRunning && (
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex items-center gap-2 text-white/20 mt-2"
              >
                <span className="text-violet-400">█</span>
                <span>agents thinking...</span>
              </motion.div>
            )}

            {!isRunning && steps.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 pt-3 border-t border-white/5"
              >
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-white/20">Run complete.</span>
                  <span className="text-emerald-400">
                    {steps.filter((s) => s.status === "done").length}/{steps.length} steps ✓
                  </span>
                  <span className="text-white/20">
                    Credits: {steps.reduce((a, s) => a + s.creditCost, 0)}
                  </span>
                </div>
              </motion.div>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
