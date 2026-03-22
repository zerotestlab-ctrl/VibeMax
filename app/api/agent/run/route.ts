import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { AGENTS, runAgentStep } from '@/lib/groq/agents'
import type { AgentStep } from '@/lib/types'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { run_id, input, category } = body

  if (!run_id || !input) {
    return NextResponse.json({ error: 'Missing run_id or input' }, { status: 400 })
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      try {
        // Mark run as running
        await supabase
          .from('vibe_runs')
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .update({ status: 'running' } as any)
          .eq('id', run_id)
          .eq('user_id', user.id)

        const steps: AgentStep[] = []
        let accumulatedContext = ''
        let totalCredits = 0

        for (const agentConfig of AGENTS) {
          const step: AgentStep = {
            id: crypto.randomUUID(),
            agent: agentConfig.name,
            status: 'running',
            input: input,
            credits: 0,
            timestamp: new Date().toISOString(),
          }

          steps.push(step)
          send({ type: 'step_start', step })

          await supabase
            .from('vibe_runs')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .update({ steps: steps as any } as any)
            .eq('id', run_id)
            .eq('user_id', user.id)

          try {
            const result = await runAgentStep(agentConfig, input, accumulatedContext)

            step.status = 'completed'
            step.output = result.output
            step.credits = result.credits
            step.duration_ms = result.duration_ms

            accumulatedContext += `\n\n=== ${agentConfig.name} Output ===\n${result.output}`
            totalCredits += result.credits

            send({ type: 'step_complete', step })

            await supabase
              .from('vibe_runs')
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .update({ steps: steps as any, credits_used: totalCredits } as any)
              .eq('id', run_id)
              .eq('user_id', user.id)
          } catch (err) {
            const errMsg = err instanceof Error ? err.message : 'Agent execution failed'
            step.status = 'error'
            step.error = errMsg

            send({ type: 'step_error', step, error: errMsg })

            await supabase
              .from('vibe_runs')
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .update({ status: 'failed', steps: steps as any } as any)
              .eq('id', run_id)
              .eq('user_id', user.id)

            send({ type: 'run_failed', error: errMsg })
            controller.close()
            return
          }
        }

        const finalOutput = accumulatedContext.trim()

        await supabase
          .from('vibe_runs')
          .update({
            status: 'completed',
            output: finalOutput,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            steps: steps as any,
            credits_used: totalCredits,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any)
          .eq('id', run_id)
          .eq('user_id', user.id)

        send({ type: 'run_complete', total_credits: totalCredits, output: finalOutput })
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'Unexpected error'

        await supabase
          .from('vibe_runs')
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .update({ status: 'failed' } as any)
          .eq('id', run_id)
          .eq('user_id', user.id)

        send({ type: 'run_failed', error: errMsg })
      }

      controller.close()
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
