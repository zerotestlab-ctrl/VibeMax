'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Zap,
  TrendingUp,
  Activity,
  CreditCard,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { VibeRun, Profile } from '@/lib/types'
import { formatRelativeTime, STATUS_COLORS } from '@/lib/utils'

interface DashboardClientProps {
  runs: VibeRun[]
  profile: Profile | null
  userEmail: string
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  delay = 0,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  sub?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-slate-400">{label}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10">
          <Icon className="h-4 w-4 text-teal-400" />
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-100">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </motion.div>
  )
}

function StatusIcon({ status }: { status: VibeRun['status'] }) {
  if (status === 'completed') return <CheckCircle2 className="h-4 w-4 text-teal-400" />
  if (status === 'running') return <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
  if (status === 'failed') return <AlertCircle className="h-4 w-4 text-red-400" />
  return <Clock className="h-4 w-4 text-yellow-400" />
}

export function DashboardClient({ runs, profile, userEmail }: DashboardClientProps) {
  const completedRuns = runs.filter((r) => r.status === 'completed')
  const activeRuns = runs.filter((r) => r.status === 'running')
  const totalCreditsUsed = runs.reduce((sum, r) => sum + r.credits_used, 0)
  const creditsLimit = profile?.credits_limit ?? 100
  const creditsUsed = profile?.credits_used ?? totalCreditsUsed
  const creditsPercent = Math.min((creditsUsed / creditsLimit) * 100, 100)

  const firstName = userEmail.split('@')[0]

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-14 lg:pt-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-start justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-100">
            Good to see you, {firstName}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {runs.length === 0
              ? 'Deploy your first vibe to get started.'
              : `${completedRuns.length} completed run${completedRuns.length !== 1 ? 's' : ''} so far.`}
          </p>
        </div>
        <Link href="/workspace/new">
          <Button size="sm" className="gap-1.5 shrink-0">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Vibe</span>
          </Button>
        </Link>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Zap}
          label="Vibes Deployed"
          value={completedRuns.length}
          sub="all time"
          delay={0}
        />
        <StatCard
          icon={Activity}
          label="Active Agents"
          value={activeRuns.length}
          sub={activeRuns.length > 0 ? 'running now' : 'all idle'}
          delay={0.05}
        />
        <StatCard
          icon={TrendingUp}
          label="Total Runs"
          value={runs.length}
          sub={`${runs.filter(r => r.status === 'failed').length} failed`}
          delay={0.1}
        />
        <StatCard
          icon={CreditCard}
          label="Credits Used"
          value={creditsUsed}
          sub={`of ${creditsLimit} total`}
          delay={0.15}
        />
      </div>

      {/* Credits usage bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-5 mb-8"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-slate-200">Credit Usage</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {creditsUsed} of {creditsLimit} credits used this period
            </p>
          </div>
          <Badge variant={creditsPercent > 80 ? 'warning' : 'default'}>
            {profile?.plan ?? 'Free'} plan
          </Badge>
        </div>
        <Progress value={creditsPercent} className="h-2" />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-slate-500">{creditsUsed} used</span>
          <span className="text-xs text-slate-500">{creditsLimit - creditsUsed} remaining</span>
        </div>
      </motion.div>

      {/* Recent Runs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-200">Recent Runs</h2>
        </div>

        {runs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center">
            <div className="mb-3 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10">
                <Zap className="h-6 w-6 text-teal-400" />
              </div>
            </div>
            <p className="text-slate-300 font-medium mb-1">No vibes deployed yet</p>
            <p className="text-sm text-slate-500 mb-4">
              Launch your first AI agent pipeline in seconds.
            </p>
            <Link href="/workspace/new">
              <Button size="sm" className="gap-2">
                Deploy First Vibe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {runs.map((run, i) => (
              <motion.div
                key={run.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.04 }}
                className="flex items-center gap-4 rounded-lg border border-slate-700/50 bg-slate-800/30 px-4 py-3 hover:border-slate-600/70 transition-colors"
              >
                <StatusIcon status={run.status} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 truncate">{run.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{run.input}</p>
                </div>
                <div className="hidden sm:flex items-center gap-3 shrink-0">
                  <Badge variant="outline" className="text-xs">{run.category}</Badge>
                  <span className="text-xs text-slate-500">{run.credits_used} credits</span>
                  <span className="text-xs text-slate-600">{formatRelativeTime(run.created_at)}</span>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[run.status]}`}
                >
                  {run.status}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
