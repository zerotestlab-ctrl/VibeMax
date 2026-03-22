import { getGroqClient, MODEL } from './client'
import type { AgentStep } from '@/lib/types'

export interface AgentConfig {
  name: AgentStep['agent']
  systemPrompt: string
  maxTokens: number
  creditsPerCall: number
}

export const AGENTS: AgentConfig[] = [
  {
    name: 'Researcher',
    systemPrompt: `You are an expert business researcher and market analyst. 
Your role is to analyze the given business opportunity or task, identify key market insights, 
target audience characteristics, pain points, and competitive landscape. 
Be concise, data-driven, and focus on actionable intelligence. 
Structure your response with clear sections: Market Overview, Target Audience, Key Pain Points, Opportunities.`,
    maxTokens: 800,
    creditsPerCall: 8,
  },
  {
    name: 'Qualifier',
    systemPrompt: `You are a sales qualification expert using BANT and MEDDIC frameworks.
Based on the research provided, identify and qualify the best prospects and opportunities.
Assess: Budget indicators, Authority (decision makers), Need strength, Timeline urgency.
Provide a qualification score (1-10) and rationale for each key segment.
Output a prioritized list of qualified opportunities with clear reasoning.`,
    maxTokens: 600,
    creditsPerCall: 6,
  },
  {
    name: 'EmailWriter',
    systemPrompt: `You are an elite B2B copywriter specializing in cold outreach and conversion optimization.
Using the research and qualification data provided, craft 3 highly personalized, compelling email variants.
Each email must: Have a subject line under 50 chars, personalized opening, clear value proposition, 
specific social proof or data point, single clear CTA, and be under 150 words.
Format: Subject: [line] | Body: [content] for each variant.`,
    maxTokens: 800,
    creditsPerCall: 8,
  },
  {
    name: 'Scheduler',
    systemPrompt: `You are an expert revenue operations and sales cadence strategist.
Create a detailed, actionable 30-day outreach cadence and follow-up schedule.
Include: Day-by-day action plan, channel mix (email/LinkedIn/phone), 
optimal send times, follow-up triggers, and success metrics to track.
Also provide a pipeline value estimate based on typical conversion rates for this segment.`,
    maxTokens: 600,
    creditsPerCall: 6,
  },
]

export async function runAgentStep(
  agent: AgentConfig,
  userInput: string,
  context: string = ''
): Promise<{ output: string; credits: number; duration_ms: number }> {
  const start = Date.now()

  const messages: { role: 'system' | 'user'; content: string }[] = [
    { role: 'system', content: agent.systemPrompt },
    {
      role: 'user',
      content: context
        ? `Context from previous agents:\n${context}\n\nOriginal task: ${userInput}`
        : `Task: ${userInput}`,
    },
  ]

  const completion = await getGroqClient().chat.completions.create({
    model: MODEL,
    messages,
    max_tokens: agent.maxTokens,
    temperature: 0.7,
  })

  const output = completion.choices[0]?.message?.content ?? ''
  const duration_ms = Date.now() - start
  const usage = completion.usage
  const credits = usage
    ? Math.max(1, Math.ceil(((usage.prompt_tokens + usage.completion_tokens) / 1000) * 10))
    : agent.creditsPerCall

  return { output, credits, duration_ms }
}
