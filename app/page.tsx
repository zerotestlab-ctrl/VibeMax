'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Zap,
  ArrowRight,
  CheckCircle2,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Star,
  ChevronRight,
  Bot,
  Search,
  Mail,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const agents = [
  {
    icon: Search,
    name: 'Researcher',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    desc: 'Deep market analysis, ICP profiling, competitive intelligence',
  },
  {
    icon: Users,
    name: 'Qualifier',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    desc: 'BANT & MEDDIC scoring, priority ranking, deal qualification',
  },
  {
    icon: Mail,
    name: 'EmailWriter',
    color: 'text-teal-400',
    bg: 'bg-teal-400/10',
    desc: 'Hyper-personalized outreach, subject line optimization, A/B variants',
  },
  {
    icon: Calendar,
    name: 'Scheduler',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    desc: '30-day cadence planning, channel mix, follow-up triggers',
  },
]

const features = [
  {
    icon: Zap,
    title: 'Real AI, Real Results',
    desc: 'Powered by Llama 3.3 70B via Groq. Not simulated. Every output is live AI execution you can see in real time.',
  },
  {
    icon: TrendingUp,
    title: 'Pipeline Value Visibility',
    desc: 'See your estimated pipeline value grow as agents complete their analysis. No guesswork — data-driven projections.',
  },
  {
    icon: Shield,
    title: 'Enterprise-grade Security',
    desc: 'Row-level security via Supabase. Your data is isolated, encrypted, and never shared with other users.',
  },
  {
    icon: Clock,
    title: 'Minutes, Not Days',
    desc: 'What used to take a sales team a full week — market research, qualification, outreach — done in under 5 minutes.',
  },
]

const testimonials = [
  {
    quote:
      'VibeMax replaced three VAs for my outreach. The email quality is genuinely better than anything a junior writer produces.',
    name: 'Adaeze O.',
    title: 'Founder, B2B SaaS',
    initial: 'A',
  },
  {
    quote:
      'I ran my first vibe and had a full outreach campaign ready in 4 minutes. Closed a deal from it in the same week.',
    name: 'Chukwuemeka I.',
    title: 'Sales Consultant',
    initial: 'C',
  },
  {
    quote:
      'The live terminal view is incredible. Watching each agent work in real time builds so much confidence in the output.',
    name: 'Tolulope A.',
    title: 'Growth Lead',
    initial: 'T',
  },
]

const useCases = [
  'Solo founders building sales pipelines',
  'Freelance consultants scaling outreach',
  'Early-stage startups with no sales team',
  'Agency owners automating client prospecting',
  'Business developers targeting new markets',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 text-slate-900">
              <Zap className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-slate-100">VibeMax</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <Link href="#features" className="hover:text-slate-100 transition-colors">Features</Link>
            <Link href="#agents" className="hover:text-slate-100 transition-colors">Agents</Link>
            <Link href="/pricing" className="hover:text-slate-100 transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="hidden sm:inline-flex">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(20,184,166,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="default" className="gap-1.5 px-3 py-1">
                <Zap className="h-3 w-3" />
                Powered by Llama 3.3 70B via Groq
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-100 leading-tight tracking-tight"
            >
              Deploy AI agents that{' '}
              <span className="gradient-text">close deals</span>{' '}
              while you sleep
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-lg sm:text-xl text-slate-400 leading-relaxed"
            >
              VibeMax orchestrates a full pipeline of specialized AI agents — Researcher,
              Qualifier, EmailWriter, Scheduler — executing in real time. The solopreneur&apos;s
              unfair advantage.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link href="/login">
                <Button size="xl" variant="glow" className="gap-2 w-full sm:w-auto">
                  Start Free — No Card Needed
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="xl" variant="outline" className="w-full sm:w-auto">
                  View Pricing
                </Button>
              </Link>
            </motion.div>

            <motion.p variants={fadeUp} className="text-sm text-slate-500">
              100 free credits included. No credit card required.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Agent Pipeline Visual */}
      <section id="agents" className="py-16 sm:py-24 border-t border-slate-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              Four agents. One powerful pipeline.
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Each agent is specialized. Each output feeds the next. The result is a complete,
              production-ready sales campaign.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative rounded-xl border border-slate-700/50 bg-slate-800/40 p-5 hover:border-slate-600/70 transition-colors"
              >
                {i < 3 && (
                  <ChevronRight className="absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600 hidden lg:block z-10" />
                )}
                <div className={cn('mb-3 flex h-10 w-10 items-center justify-center rounded-lg', agent.bg)}>
                  <agent.icon className={cn('h-5 w-5', agent.color)} />
                </div>
                <div className="mb-0.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Agent {i + 1}
                </div>
                <h3 className="font-semibold text-slate-100 mb-1.5">{agent.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{agent.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24 border-t border-slate-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              Built for serious operators
            </h2>
            <p className="text-slate-400 text-lg">
              Not a toy. Not a demo. A real production system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4 rounded-xl border border-slate-700/50 bg-slate-800/30 p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/10">
                  <feature.icon className="h-5 w-5 text-teal-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 sm:py-24 border-t border-slate-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              Who VibeMax is built for
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {useCases.map((useCase) => (
              <div key={useCase} className="flex items-center gap-3 rounded-lg border border-slate-700/50 bg-slate-800/30 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0" />
                <span className="text-sm text-slate-300">{useCase}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 border-t border-slate-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              What operators are saying
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/30 p-6"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-teal-400 text-teal-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 border-t border-slate-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-10 sm:p-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              Ready to deploy your first vibe?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              Start with 100 free credits. No credit card. No commitment. See real AI agents
              execute in under 5 minutes.
            </p>
            <Link href="/login">
              <Button size="xl" variant="glow" className="gap-2">
                Launch VibeMax Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-teal-500 text-slate-900">
              <Zap className="h-3 w-3" />
            </div>
            <span className="text-sm font-semibold text-slate-300">VibeMax</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/pricing" className="hover:text-slate-300 transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-slate-300 transition-colors">Login</Link>
          </div>
          <p className="text-xs text-slate-600">© 2026 VibeMax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
