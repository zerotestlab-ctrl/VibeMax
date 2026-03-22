export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      vibe_runs: {
        Row: {
          id: string
          user_id: string
          title: string
          category: string
          status: 'pending' | 'running' | 'completed' | 'failed'
          input: string
          output: string | null
          steps: Json
          credits_used: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          category: string
          status?: 'pending' | 'running' | 'completed' | 'failed'
          input: string
          output?: string | null
          steps?: Json
          credits_used?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          category?: string
          status?: 'pending' | 'running' | 'completed' | 'failed'
          input?: string
          output?: string | null
          steps?: Json
          credits_used?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      templates: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          input_template: string
          tags: string[]
          uses_count: number
          created_at: string
          is_featured: boolean
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          input_template: string
          tags?: string[]
          uses_count?: number
          created_at?: string
          is_featured?: boolean
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          input_template?: string
          tags?: string[]
          uses_count?: number
          created_at?: string
          is_featured?: boolean
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          avatar_url: string | null
          plan: 'free' | 'pro' | 'unlimited'
          credits_used: number
          credits_limit: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'pro' | 'unlimited'
          credits_used?: number
          credits_limit?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'pro' | 'unlimited'
          credits_used?: number
          credits_limit?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      increment_credits: {
        Args: { user_id: string; amount: number }
        Returns: undefined
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type VibeRun = Database['public']['Tables']['vibe_runs']['Row']
export type Template = Database['public']['Tables']['templates']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']

export interface AgentStep {
  id: string
  agent: 'Researcher' | 'Qualifier' | 'EmailWriter' | 'Scheduler' | 'Analyzer'
  status: 'pending' | 'running' | 'completed' | 'error'
  input?: string
  output?: string
  credits: number
  duration_ms?: number
  timestamp: string
  error?: string
}

export interface AgentPipeline {
  run_id: string
  steps: AgentStep[]
  total_credits: number
  status: 'pending' | 'running' | 'completed' | 'failed'
}
