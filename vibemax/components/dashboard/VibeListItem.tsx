"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Clock, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Vibe, VibeStatus } from "@/lib/types";

const statusMap: Record<VibeStatus, { label: string; variant: "success" | "warning" | "error" | "violet" | "default" | "info" }> = {
  completed: { label: "Completed", variant: "success" },
  running: { label: "Running", variant: "violet" },
  idle: { label: "Idle", variant: "default" },
  failed: { label: "Failed", variant: "error" },
  paused: { label: "Paused", variant: "warning" },
};

interface VibeListItemProps {
  vibe: Vibe;
  index: number;
}

export function VibeListItem({ vibe, index }: VibeListItemProps) {
  const { label, variant } = statusMap[vibe.status] || statusMap.idle;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/workspace/${vibe.id}`}>
        <div className="group flex items-center justify-between gap-4 rounded-lg px-4 py-3.5 border border-transparent hover:border-white/[0.06] hover:bg-white/[0.03] transition-all duration-150">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Status indicator */}
            <div
              className={cn(
                "h-2 w-2 rounded-full flex-shrink-0",
                vibe.status === "running" && "bg-violet-400 animate-pulse",
                vibe.status === "completed" && "bg-emerald-400",
                vibe.status === "failed" && "bg-red-400",
                vibe.status === "paused" && "bg-amber-400",
                vibe.status === "idle" && "bg-white/30"
              )}
            />

            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate group-hover:text-violet-300 transition-colors">
                {vibe.title}
              </p>
              <p className="text-xs text-white/40 truncate">{vibe.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <Badge variant={variant}>{label}</Badge>

            <div className="hidden sm:flex items-center gap-1 text-xs text-white/30">
              <Zap className="h-3 w-3" />
              {vibe.total_credits} cr
            </div>

            <div className="hidden sm:flex items-center gap-1 text-xs text-white/30">
              <Clock className="h-3 w-3" />
              {new Date(vibe.updated_at).toLocaleDateString()}
            </div>

            <ExternalLink className="h-3.5 w-3.5 text-white/20 group-hover:text-violet-400 transition-colors" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
