"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ChevronDown, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const categories = ["Sales", "Content", "Web3", "Support", "Research", "Marketing", "HR"];

const exampleVibes = [
  "Find 50 B2B SaaS founders on LinkedIn who raised in the last 6 months and book discovery calls",
  "Generate 30 days of viral Twitter/X content for a developer tools startup",
  "Research the top 20 Web3 NFT projects launching this month and draft partnership pitches",
  "Write personalized cold emails to 100 e-commerce store owners about my payment solution",
  "Create a customer support knowledge base from my product docs and train a response bot",
];

interface VibeInputProps {
  onDeploy: (goal: string, category: string) => void;
  isRunning: boolean;
  onPause: () => void;
}

export function VibeInput({ onDeploy, isRunning, onPause }: VibeInputProps) {
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("Sales");
  const [showExamples, setShowExamples] = useState(false);

  function handleDeploy() {
    if (!goal.trim() || isRunning) return;
    onDeploy(goal.trim(), category);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-base font-semibold text-white">Define your vibe</h2>
        <p className="text-xs text-white/40 mt-0.5">
          Describe your business goal. The agent team handles everything else.
        </p>
      </div>

      {/* Category selector */}
      <div className="mb-4">
        <label className="text-xs font-medium text-white/50 mb-2 block uppercase tracking-wider">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-all duration-150",
                category === cat
                  ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                  : "border-white/10 text-white/40 hover:text-white/60 hover:border-white/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Goal input */}
      <div className="flex-1">
        <Textarea
          label="Your vibe (business goal)"
          id="vibe-goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. Find 50 qualified SaaS founders and book discovery calls..."
          className="h-40 resize-none"
          disabled={isRunning}
        />
      </div>

      {/* Examples toggle */}
      <div className="mt-3">
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          <Lightbulb className="h-3.5 w-3.5" />
          Example vibes
          <ChevronDown
            className={cn("h-3.5 w-3.5 transition-transform", showExamples && "rotate-180")}
          />
        </button>

        {showExamples && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 space-y-1.5"
          >
            {exampleVibes.map((example) => (
              <button
                key={example}
                onClick={() => {
                  setGoal(example);
                  setShowExamples(false);
                }}
                className="w-full text-left text-xs text-white/40 hover:text-white/70 rounded-lg border border-white/5 hover:border-violet-500/20 px-3 py-2 bg-white/[0.02] hover:bg-violet-500/5 transition-all duration-150 line-clamp-2"
              >
                &quot;{example}&quot;
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Agent stack preview */}
      <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
        <p className="text-xs text-white/30 mb-2 font-medium">Agent team will deploy:</p>
        <div className="flex items-center gap-2 flex-wrap">
          {["Researcher", "Qualifier", "EmailWriter", "Scheduler"].map((agent, i) => (
            <div key={agent} className="flex items-center gap-1">
              <span
                className={cn(
                  "text-xs rounded px-2 py-0.5 border",
                  i === 0 && "text-blue-400 border-blue-500/20 bg-blue-500/10",
                  i === 1 && "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
                  i === 2 && "text-violet-400 border-violet-500/20 bg-violet-500/10",
                  i === 3 && "text-amber-400 border-amber-500/20 bg-amber-500/10"
                )}
              >
                {agent}
              </span>
              {i < 3 && <span className="text-white/10 text-xs">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex items-center gap-3">
        {isRunning ? (
          <>
            <Button
              variant="destructive"
              onClick={onPause}
              className="flex-1"
            >
              ⏸ Pause agents
            </Button>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 animate-pulse">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Running...
            </div>
          </>
        ) : (
          <Button
            onClick={handleDeploy}
            disabled={!goal.trim()}
            className="flex-1 shadow-lg shadow-violet-900/30"
            size="lg"
          >
            <Zap className="h-4 w-4" />
            Deploy vibe
          </Button>
        )}
      </div>
    </div>
  );
}
