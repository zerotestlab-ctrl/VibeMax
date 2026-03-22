export type VibeStatus = "idle" | "running" | "completed" | "failed" | "paused";

export type AgentStep = {
  id: string;
  agent: string;
  action: string;
  status: "pending" | "running" | "done" | "error";
  timestamp: string;
  creditCost: number;
  output?: string;
};

export type Vibe = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: VibeStatus;
  category: string;
  created_at: string;
  updated_at: string;
  steps: AgentStep[];
  total_credits: number;
  projected_roi?: number;
};

export type MarketplaceVibe = {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  uses: number;
  rating: number;
  tags: string[];
  preview_steps: string[];
};

export type UserProfile = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  plan: "free" | "pro" | "unlimited";
  credits_used: number;
  credits_limit: number;
  api_key?: string;
  created_at: string;
};

export type BillingRecord = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "paid" | "pending" | "failed";
};
