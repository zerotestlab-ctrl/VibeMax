import Groq from 'groq-sdk'

let _groq: Groq | null = null

export function getGroqClient(): Groq {
  if (!_groq) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY environment variable is not set')
    }
    _groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
  }
  return _groq
}

export const MODEL = 'llama-3.3-70b-versatile'

export const CREDITS_PER_1K_TOKENS = 0.1

export function estimateCredits(inputTokens: number, outputTokens: number): number {
  return Math.ceil(((inputTokens + outputTokens) / 1000) * CREDITS_PER_1K_TOKENS * 10)
}
