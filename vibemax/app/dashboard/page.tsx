"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  Bot,
  TrendingUp,
  DollarSign,
  CreditCard,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { VibeListItem } from "@/components/dashboard/VibeListItem";
import { Button } from "@/components/ui/Button";
import type { Vibe } from "@/lib/types";

const mockMetrics = [
  {
    title: "Vibes Deployed",
    value: "24",
    change: "+3 this week",
    changeType: "up" as const,
    icon: Zap,
    iconColor: "text-violet-400",
  },
  {
    title: "Active Agents",
    value: "3",
    change: "2 running now",
    changeType: "up" as const,
    icon: Bot,
    iconColor: "text-blue-400",
  },
  {
    title: "Projected ROI",
    value: "12.4x",
    change: "+2.1x vs last month",
    changeType: "up" as const,
    icon: TrendingUp,
    iconColor: "text-emerald-400",
  },
  {
    title: "Total Pipeline Value",
    value: "$48,200",
    change: "+$12,400 this month",
    changeType: "up" as const,
    icon: DollarSign,
    iconColor: "text-amber-400",
  },
  {
    title: "Cost This Month",
    value: "$19.00",
    change: "Pro plan",
    changeType: "neutral" as const,
    icon: CreditCard,
    iconColor: "text-pink-400",
  },
];

const mockVibes: Vibe[] = [
  {
    id: "v-8f2a9c",
    user_id: "u-1",
    title: "B2B SaaS Lead Gen — LinkedIn",
    description: "Find 100 qualified SaaS founders and book discovery calls",
    status: "running",
    category: "Sales",
    created_at: "2026-03-20T10:00:00Z",
    updated_at: "2026-03-22T08:30:00Z",
    steps: [],
    total_credits: 42,
    projected_roi: 18400,
  },
  {
    id: "v-7d4b1e",
    user_id: "u-1",
    title: "Content Calendar — Twitter/X",
    description: "Generate 30 days of viral tech/indiehacker content",
    status: "completed",
    category: "Content",
    created_at: "2026-03-18T09:00:00Z",
    updated_at: "2026-03-18T11:45:00Z",
    steps: [],
    total_credits: 28,
    projected_roi: 5200,
  },
  {
    id: "v-5c3a0f",
    user_id: "u-1",
    title: "Web3 NFT Project Outreach",
    description: "Reach 50 Web3 project founders for partnership",
    status: "completed",
    category: "Web3",
    created_at: "2026-03-15T14:00:00Z",
    updated_at: "2026-03-16T09:10:00Z",
    steps: [],
    total_credits: 19,
    projected_roi: 8800,
  },
  {
    id: "v-3b9e2d",
    user_id: "u-1",
    title: "Customer Support AI Setup",
    description: "Train a support bot with product docs and FAQ",
    status: "paused",
    category: "Support",
    created_at: "2026-03-10T12:00:00Z",
    updated_at: "2026-03-10T13:20:00Z",
    steps: [],
    total_credits: 11,
  },
  {
    id: "v-2a7f4c",
    user_id: "u-1",
    title: "Podcast Guest Research",
    description: "Identify 20 ideal podcast hosts in the SaaS space",
    status: "failed",
    category: "Content",
    created_at: "2026-03-08T16:00:00Z",
    updated_at: "2026-03-08T16:15:00Z",
    steps: [],
    total_credits: 3,
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-8 gap-4 flex-wrap"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-white/40">
            Sunday, March 22, 2026 — your agents are working.
          </p>
        </div>
        <Link href="/workspace/new">
          <Button>
            <Plus className="h-4 w-4" />
            New Vibe
          </Button>
        </Link>
      </motion.div>

      {/* Quick start banner (shown if new user) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-900/20 to-indigo-900/10 p-5 flex items-center justify-between gap-4 flex-wrap"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Ready to deploy a new vibe?</p>
            <p className="text-xs text-white/40 mt-0.5">
              You have 26 credits remaining this month. Deploy a vibe in 60 seconds.
            </p>
          </div>
        </div>
        <Link href="/workspace/new">
          <Button size="sm" variant="outline">
            Launch workspace <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </motion.div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {mockMetrics.map((metric, i) => (
          <MetricCard key={metric.title} {...metric} index={i} />
        ))}
      </div>

      {/* Recent Vibes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div>
            <h2 className="text-sm font-semibold text-white">Recent Vibes</h2>
            <p className="text-xs text-white/30 mt-0.5">Your last 5 deployments</p>
          </div>
          <Link href="/workspace/new">
            <button className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
              <Plus className="h-3.5 w-3.5" />
              New vibe
            </button>
          </Link>
        </div>

        {/* List */}
        <div className="divide-y divide-white/[0.04]">
          {mockVibes.map((vibe, i) => (
            <VibeListItem key={vibe.id} vibe={vibe} index={i} />
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/[0.04] text-center">
          <button className="text-xs text-white/30 hover:text-white/60 transition-colors">
            View all vibes →
          </button>
        </div>
      </motion.div>

      {/* Credit usage summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 grid sm:grid-cols-2 gap-4"
      >
        {/* Credit usage bar */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white">Credit Usage</span>
            <span className="text-xs text-white/40">24 / 50 this month</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "48%" }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400"
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-white/30">
            <span>48% used</span>
            <Link href="/pricing" className="text-violet-400 hover:text-violet-300 transition-colors">
              Upgrade for more →
            </Link>
          </div>
        </div>

        {/* Pipeline summary */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white">Pipeline by Category</span>
          </div>
          <div className="space-y-2">
            {[
              { cat: "Sales", val: "$28,400", pct: 59 },
              { cat: "Web3", val: "$12,200", pct: 25 },
              { cat: "Content", val: "$7,600", pct: 16 },
            ].map(({ cat, val, pct }) => (
              <div key={cat} className="flex items-center gap-3">
                <span className="text-xs text-white/40 w-14">{cat}</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full bg-violet-500/70"
                  />
                </div>
                <span className="text-xs text-white/60 w-16 text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
