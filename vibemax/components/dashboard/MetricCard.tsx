"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  index?: number;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-violet-400",
  index = 0,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 hover:border-violet-500/20 hover:bg-white/[0.05] transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-white/40 font-medium uppercase tracking-wider truncate">
            {title}
          </p>
          <p className="mt-2 text-2xl font-bold text-white">{value}</p>
          {change && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                changeType === "up" && "text-emerald-400",
                changeType === "down" && "text-red-400",
                changeType === "neutral" && "text-white/40"
              )}
            >
              {changeType === "up" && "↑ "}
              {changeType === "down" && "↓ "}
              {change}
            </p>
          )}
        </div>
        <div
          className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0",
            "bg-white/5 border border-white/[0.06]"
          )}
        >
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </div>
    </motion.div>
  );
}
