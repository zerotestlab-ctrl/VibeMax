# VibeMax — Autonomous AI Business Platform

> Turn one vibe into your full autonomous business team. Powered by Grok multi-agent AI.

## Stack

- **Next.js 16** App Router + TypeScript
- **Tailwind CSS** + custom dark/neon design system  
- **Framer Motion** for animations
- **Supabase** for auth, database, and realtime
- **Grok API** (`grok-3-latest`) for multi-agent execution
- **Paystack** for payments

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with hero, features, testimonials |
| `/login` | Magic link auth (no password) |
| `/dashboard` | Metrics, recent vibes, credit usage |
| `/workspace/[id]` | Live agent terminal feed + vibe input |
| `/marketplace` | Community vibe templates |
| `/pricing` | 3-tier pricing with Paystack links |
| `/settings` | Profile, API keys, billing, usage |

## Getting Started

### 1. Clone & install

```bash
cd vibemax
npm install
```

### 2. Set environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GROK_API_KEY=xai-your-grok-api-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the schema:

```bash
# Copy contents of supabase/schema.sql and run in Supabase SQL Editor
```

3. In Authentication settings, enable **Magic Link** and set redirect URL to `http://localhost:3000/login/callback`

### 4. Get a Grok API key

1. Go to [x.ai](https://x.ai)
2. Get your API key for `grok-3-latest`
3. Add to `.env.local` as `GROK_API_KEY`

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Paystack Setup

Update the payment links in `/app/pricing/page.tsx`:
- Pro plan: `https://paystack.com/pay/YOUR-PRO-LINK`
- Unlimited plan: `https://paystack.com/pay/YOUR-UNLIMITED-LINK`

## Agent Architecture

Each vibe runs a sequential multi-agent pipeline:

```
Researcher → Qualifier → EmailWriter → Scheduler
```

Agents are powered by Grok API with streaming support. Each agent:
1. Receives the user's goal + previous agent output
2. Executes its specialized task
3. Returns structured output for the next agent
4. Costs a defined number of credits

## Database Schema

See `supabase/schema.sql` for the full schema. Key tables:
- `profiles` — user data + plan + credit limits
- `vibes` — saved vibe records
- `vibe_runs` — agent execution history with steps
- `marketplace_vibes` — community-published templates

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/vibes/run` | POST | Execute vibe (batch mode) |
| `/api/vibes/run/stream` | POST | Execute vibe (SSE streaming) |
| `/api/auth/callback` | GET | OAuth callback handler |
| `/login/callback` | GET | Magic link handler |

## Design System

- **Colors**: Black base (#050508), violet neon (#7c3aed, #a78bfa)
- **Glass effect**: `bg-white/[0.03]` + `backdrop-blur` + `border-white/[0.06]`
- **Gradients**: Linear violet-to-indigo text gradients
- **Typography**: Geist Sans + Geist Mono

## Credit System

| Agent | Credits |
|---|---|
| Researcher | 5 |
| Qualifier | 4 |
| EmailWriter | 8 |
| Scheduler | 3 |

Plans:
- **Free**: 50 credits/month
- **Pro**: 500 credits/month  
- **Unlimited**: No limit
