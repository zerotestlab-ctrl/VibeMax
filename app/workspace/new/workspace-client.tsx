'use client'

import { useState, useRef, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap,
  Play,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  Search,
  Users,
  Mail,
  Calendar,
  CreditCard,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CATEGORIES } from '@/lib/utils'
import type { AgentStep } from '@/lib/types'

const AGENT_ICONS: Record<string, React.ElementType> = {
  Researcher: Search,
  Qualifier: Users,
  EmailWriter: Mail,
  Scheduler: Calendar,
  Analyzer: Zap,
}

const AGENT_COLORS: Record<string, string> = {
  Researcher: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
  Qualifier: 'text-purple-400 border-purple-400/20 bg-purple-400/5',
  EmailWriter: 'text-teal-400 border-teal-400/20 bg-teal-400/5',
  Scheduler: 'text-orange-400 border-orange-400/20 bg-orange-400/5',
  Analyzer: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5',
}

interface LogEntry {
  id: string
  timestamp: string
  type: 'system' | 'agent_start' | 'agent_complete' | 'agent_error' | 'run_complete' | 'run_failed'
  message: string
  agent?: string
  output?: string
  credits?: number
  duration_ms?: number
}

function AgentStepCard({ step }: { step: AgentStep }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const Icon = AGENT_ICONS[step.agent] ?? Zap
  const colorClass = AGENT_COLORS[step.agent] ?? 'text-slate-400 border-slate-400/20 bg-slate-400/5'

  const handleCopy = async () => {
    if (step.output) {
      await navigator.clipboard.writeText(step.output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg border p-4 ${colorClass}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-current/10">
            <Icon className="h-3.5 w-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{step.agent}</span>
              {step.status === 'running' && (
                <Loader2 className="h-3 w-3 animate-spin opacity-70" />
              )}
              {step.status === 'completed' && (
                <CheckCircle2 className="h-3.5 w-3.5 opacity-80" />
              )}
              {step.status === 'error' && (
                <AlertCircle className="h-3.5 w-3.5 text-red-400" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs opacity-60">
                {new Date(step.timestamp).toLocaleTimeString()}
              </span>
              {step.duration_ms && (
                <span className="text-xs opacity-50">• {(step.duration_ms / 1000).toFixed(1)}s</span>
              )}
              {step.credits > 0 && (
                <span className="text-xs opacity-50">• {step.credits} credits</span>
              )}
            </div>
          </div>
        </div>
        {step.output && (
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="flex h-6 w-6 items-center justify-center rounded opacity-60 hover:opacity-100 transition-opacity"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs opacity-60 hover:opacity-100 transition-opacity px-2 py-0.5 rounded border border-current/20"
            >
              {expanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        )}
      </div>

      {step.error && (
        <div className="mt-3 rounded-md bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-400">
          {step.error}
        </div>
      )}

      {step.output && expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 overflow-hidden"
        >
          <div className="rounded-md bg-slate-900/60 border border-slate-700/50 p-3">
            <pre className="terminal-text text-slate-300 whitespace-pre-wrap text-xs leading-relaxed">
              {step.output}
            </pre>
          </div>
        </motion.div>
      )}

      {step.output && !expanded && step.status === 'completed' && (
        <p className="mt-2 text-xs opacity-60 truncate">
          {step.output.substring(0, 120)}...
        </p>
      )}
    </motion.div>
  )
}

function TerminalLog({ entries }: { entries: LogEntry[] }) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [entries])

  return (
    <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 h-40 overflow-y-auto">
      <div className="space-y-1">
        {entries.length === 0 && (
          <span className="terminal-text text-slate-600 text-xs">
            Waiting for deployment...
          </span>
        )}
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-start gap-2 terminal-text text-xs">
            <span className="text-slate-600 shrink-0">{entry.timestamp}</span>
            <span
              className={
                entry.type === 'run_complete'
                  ? 'text-teal-400'
                  : entry.type === 'run_failed' || entry.type === 'agent_error'
                  ? 'text-red-400'
                  : entry.type === 'agent_complete'
                  ? 'text-slate-300'
                  : 'text-slate-500'
              }
            >
              {entry.message}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}

function WorkspaceInner() {
  const searchParams = useSearchParams()
  const templateInput = searchParams.get('input') ?? ''
  const templateCategory = searchParams.get('category') ?? CATEGORIES[0]
  const templateTitle = searchParams.get('title') ?? ''

  const [title, setTitle] = useState(templateTitle)
  const [input, setInput] = useState(templateInput)
  const [category, setCategory] = useState(CATEGORIES.includes(templateCategory) ? templateCategory : CATEGORIES[0])
  const [steps, setSteps] = useState<AgentStep[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [failed, setFailed] = useState(false)
  const [totalCredits, setTotalCredits] = useState(0)
  const [runId, setRunId] = useState<string | null>(null)

  const addLog = useCallback((type: LogEntry['type'], message: string, extra?: Partial<LogEntry>) => {
    setLogs((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        timestamp: new Date().toLocaleTimeString(),
        type,
        message,
        ...extra,
      },
    ])
  }, [])

  const handleReset = () => {
    setSteps([])
    setLogs([])
    setRunning(false)
    setDone(false)
    setFailed(false)
    setTotalCredits(0)
    setRunId(null)
    setTitle('')
    setInput('')
    setCategory(CATEGORIES[0])
  }

  const handleDeploy = async () => {
    if (!input.trim() || !title.trim()) return
    setRunning(true)
    setDone(false)
    setFailed(false)
    setSteps([])
    setLogs([])
    setTotalCredits(0)

    addLog('system', `[VibeMax] Initializing pipeline for: "${title}"`)

    try {
      // Create run record
      const createRes = await fetch('/api/agent/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, input, category }),
      })

      if (!createRes.ok) {
        const err = await createRes.json()
        addLog('run_failed', `[ERROR] Failed to create run: ${err.error}`)
        setFailed(true)
        setRunning(false)
        return
      }

      const { run } = await createRes.json()
      setRunId(run.id)

      addLog('system', `[VibeMax] Run ID: ${run.id}`)
      addLog('system', `[VibeMax] Starting 4-agent pipeline...`)

      // Stream agent execution via fetch SSE
      const response = await fetch('/api/agent/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ run_id: run.id, input, category }),
      })

      if (!response.ok || !response.body) {
        addLog('run_failed', `[ERROR] Agent pipeline failed to start`)
        setFailed(true)
        setRunning(false)
        return
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done: streamDone, value } = await reader.read()
        if (streamDone) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const event = JSON.parse(line.slice(6))

            if (event.type === 'step_start') {
              const step = event.step as AgentStep
              addLog('agent_start', `[${step.agent}] Starting analysis...`, { agent: step.agent })
              setSteps((prev) => [...prev.filter((s) => s.id !== step.id), step])
            } else if (event.type === 'step_complete') {
              const step = event.step as AgentStep
              addLog(
                'agent_complete',
                `[${step.agent}] Completed in ${((step.duration_ms ?? 0) / 1000).toFixed(1)}s — ${step.credits} credits`,
                { agent: step.agent, credits: step.credits }
              )
              setSteps((prev) => prev.map((s) => (s.id === step.id ? step : s)))
            } else if (event.type === 'step_error') {
              const step = event.step as AgentStep
              addLog('agent_error', `[${step.agent}] Error: ${event.error}`, { agent: step.agent })
              setSteps((prev) => prev.map((s) => (s.id === step.id ? step : s)))
            } else if (event.type === 'run_complete') {
              setTotalCredits(event.total_credits)
              setDone(true)
              setRunning(false)
              addLog('run_complete', `[VibeMax] Pipeline complete — ${event.total_credits} credits used`)
            } else if (event.type === 'run_failed') {
              setFailed(true)
              setRunning(false)
              addLog('run_failed', `[VibeMax] Pipeline failed: ${event.error}`)
            }
          } catch {
            // malformed SSE line
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unexpected error'
      addLog('run_failed', `[ERROR] ${msg}`)
      setFailed(true)
      setRunning(false)
    }
  }

  const completedSteps = steps.filter((s) => s.status === 'completed').length
  
  const progressPct = (completedSteps / 4) * 100

  return (
    <div className="flex h-full flex-col lg:flex-row pt-12 lg:pt-0">
      {/* Left Panel — Input */}
      <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-700/50 bg-slate-900/50 flex flex-col">
        <div className="flex items-center gap-2.5 border-b border-slate-700/50 px-5 py-4">
          <Zap className="h-4 w-4 text-teal-400" />
          <span className="text-sm font-semibold text-slate-200">Vibe Configuration</span>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-5 space-y-5">
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="vibe-title">Vibe Title</Label>
              <Input
                id="vibe-title"
                placeholder="e.g., SaaS Founder Outreach Q1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={running}
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label>Category</Label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.slice(0, 6).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    disabled={running}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-all border ${
                      category === cat
                        ? 'bg-teal-500/15 text-teal-400 border-teal-500/30'
                        : 'text-slate-400 border-slate-700 hover:border-slate-600'
                    } disabled:opacity-50`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="space-y-1.5">
              <Label htmlFor="vibe-input">What should the agents work on?</Label>
              <Textarea
                id="vibe-input"
                placeholder="e.g., Create an outreach campaign targeting B2B SaaS founders in Nigeria with 5-50 employees. Our product is a HR automation tool that reduces admin time by 70%."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
                className="resize-none"
                disabled={running}
              />
              <p className="text-xs text-slate-500">
                Be specific: include your product, target audience, goals, and any context.
              </p>
            </div>

            {/* Agent Pipeline Preview */}
            <div className="space-y-2">
              <Label>Agent Pipeline</Label>
              <div className="space-y-1.5">
                {(['Researcher', 'Qualifier', 'EmailWriter', 'Scheduler'] as const).map((agentName, i) => {
                  const Icon = AGENT_ICONS[agentName]
                  const step = steps.find((s) => s.agent === agentName)
                  const colorClass = AGENT_COLORS[agentName]
                  return (
                    <div
                      key={agentName}
                      className={`flex items-center gap-2.5 rounded-md border px-3 py-2 text-xs transition-all ${
                        step?.status === 'completed'
                          ? colorClass
                          : step?.status === 'running'
                          ? colorClass + ' opacity-100'
                          : 'border-slate-700/50 text-slate-600 bg-transparent'
                      }`}
                    >
                      <span className="text-slate-600 w-3 text-center">{i + 1}</span>
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="font-medium">{agentName}</span>
                      <div className="ml-auto flex items-center gap-1">
                        {step?.status === 'running' && <Loader2 className="h-3 w-3 animate-spin" />}
                        {step?.status === 'completed' && <CheckCircle2 className="h-3 w-3" />}
                        {step?.status === 'error' && <AlertCircle className="h-3 w-3 text-red-400" />}
                        {step?.credits ? <span className="text-xs opacity-60">{step.credits}cr</span> : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Deploy Button */}
        <div className="border-t border-slate-700/50 p-4 space-y-3">
          {done && (
            <div className="flex items-center gap-2 text-xs text-teal-400 bg-teal-500/10 border border-teal-500/20 rounded-md px-3 py-2">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              Pipeline complete — {totalCredits} credits used
            </div>
          )}
          {failed && (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              Pipeline failed. Check the log for details.
            </div>
          )}
          <div className="flex gap-2">
            {(done || failed) && (
              <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </Button>
            )}
            <Button
              onClick={handleDeploy}
              disabled={running || !input.trim() || !title.trim() || done}
              className="flex-1 gap-2"
              size="sm"
            >
              {running ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Running agents...
                </>
              ) : done ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Completed
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Deploy Vibe
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel — Live Output */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between border-b border-slate-700/50 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className={`h-2 w-2 rounded-full ${running ? 'bg-teal-400 animate-pulse' : done ? 'bg-teal-400' : failed ? 'bg-red-400' : 'bg-slate-600'}`} />
            <span className="text-sm font-semibold text-slate-200">Live Agent Output</span>
            {running && (
              <Badge variant="info" className="text-xs">
                Running
              </Badge>
            )}
            {done && <Badge variant="success" className="text-xs">Complete</Badge>}
            {failed && <Badge variant="destructive" className="text-xs">Failed</Badge>}
          </div>
          {totalCredits > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <CreditCard className="h-3.5 w-3.5" />
              <span>{totalCredits} credits</span>
            </div>
          )}
        </div>

        <ScrollArea className="flex-1 p-5">
          {steps.length === 0 && !running && !done && !failed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-64 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
                <Zap className="h-6 w-6 text-teal-400" />
              </div>
              <p className="text-slate-400 font-medium mb-1">Ready to deploy</p>
              <p className="text-sm text-slate-600 max-w-sm">
                Fill in your vibe details on the left, then click &ldquo;Deploy Vibe&rdquo; to watch four
                AI agents execute in real time.
              </p>
            </motion.div>
          )}

          {/* Progress */}
          {running && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 rounded-lg border border-teal-500/20 bg-teal-500/5 px-4 py-3"
            >
              <div className="flex justify-between text-xs text-teal-400 mb-2">
                <span>Pipeline Progress</span>
                <span>{completedSteps}/4 agents</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-teal-500 rounded-full"
                />
              </div>
            </motion.div>
          )}

          {/* Agent Steps */}
          <div className="space-y-3 mb-5">
            <AnimatePresence>
              {steps.map((step) => (
                <AgentStepCard key={step.id} step={step} />
              ))}
            </AnimatePresence>
          </div>

          {/* Terminal Log */}
          {logs.length > 0 && (
            <div>
              <p className="text-xs text-slate-600 mb-2 font-mono uppercase tracking-wider">System Log</p>
              <TerminalLog entries={logs} />
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}

export function WorkspaceClient() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center text-slate-500">Loading workspace...</div>}>
      <WorkspaceInner />
    </Suspense>
  )
}
