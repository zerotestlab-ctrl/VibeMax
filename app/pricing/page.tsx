'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, X, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const plans = [
  {
    name: 'Free',
    price: '₦0',
    period: 'forever',
    description: 'For exploring VibeMax and running your first pipelines.',
    cta: 'Get Started Free',
    href: '/login',
    highlight: false,
    badge: null,
    features: [
      { text: '100 credits/month', included: true },
      { text: 'Up to 3 vibe runs/month', included: true },
      { text: 'All 4 AI agents', included: true },
      { text: 'Marketplace access (read)', included: true },
      { text: 'Basic dashboard', included: true },
      { text: 'Priority execution', included: false },
      { text: 'Unlimited runs', included: false },
      { text: 'API access', included: false },
      { text: 'Export to CSV/PDF', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '₦29,000',
    period: 'per month',
    description: 'For active solopreneurs building real sales pipelines.',
    cta: 'Upgrade to Pro',
    href: process.env.NEXT_PUBLIC_PAYSTACK_PRO_LINK ?? '/login',
    highlight: true,
    badge: 'Most Popular',
    features: [
      { text: '2,000 credits/month', included: true },
      { text: 'Unlimited vibe runs', included: true },
      { text: 'All 4 AI agents', included: true },
      { text: 'Full marketplace access', included: true },
      { text: 'Advanced dashboard', included: true },
      { text: 'Priority execution', included: true },
      { text: 'Export to CSV/PDF', included: true },
      { text: 'API access', included: false },
      { text: 'Dedicated support', included: false },
    ],
  },
  {
    name: 'Unlimited',
    price: '₦72,000',
    period: 'per month',
    description: 'For power users and agencies running multiple pipelines daily.',
    cta: 'Go Unlimited',
    href: process.env.NEXT_PUBLIC_PAYSTACK_UNLIMITED_LINK ?? '/login',
    highlight: false,
    badge: null,
    features: [
      { text: 'Unlimited credits', included: true },
      { text: 'Unlimited vibe runs', included: true },
      { text: 'All 4 AI agents', included: true },
      { text: 'Full marketplace access', included: true },
      { text: 'Advanced dashboard', included: true },
      { text: 'Priority execution', included: true },
      { text: 'Export to CSV/PDF', included: true },
      { text: 'API access', included: true },
      { text: 'Dedicated support', included: true },
    ],
  },
]

const comparisonFeatures = [
  { feature: 'Monthly Credits', free: '100', pro: '2,000', unlimited: 'Unlimited' },
  { feature: 'Vibe Runs', free: '3', pro: 'Unlimited', unlimited: 'Unlimited' },
  { feature: 'AI Agents', free: 'All 4', pro: 'All 4', unlimited: 'All 4' },
  { feature: 'Marketplace', free: 'Read-only', pro: 'Full access', unlimited: 'Full access' },
  { feature: 'Priority Execution', free: '—', pro: '✓', unlimited: '✓' },
  { feature: 'Export Results', free: '—', pro: '✓', unlimited: '✓' },
  { feature: 'API Access', free: '—', pro: '—', unlimited: '✓' },
  { feature: 'Dedicated Support', free: '—', pro: '—', unlimited: '✓' },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Nav */}
      <nav className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 text-slate-900">
              <Zap className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-slate-100">VibeMax</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Start free. Upgrade when you&apos;re ready. Pay in Naira via Paystack.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                plan.highlight
                  ? 'border-teal-500/40 bg-teal-500/5 glow-teal'
                  : 'border-slate-700/50 bg-slate-800/30'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="shadow-md">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-100 mb-1">{plan.name}</h2>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-3xl font-bold text-slate-100">{plan.price}</span>
                  <span className="text-sm text-slate-500 mb-1">/{plan.period}</span>
                </div>
                <p className="text-sm text-slate-400">{plan.description}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-2.5">
                    {feature.included ? (
                      <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-slate-600 shrink-0" />
                    )}
                    <span
                      className={`text-sm ${feature.included ? 'text-slate-300' : 'text-slate-600'}`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} target={plan.href.startsWith('http') ? '_blank' : undefined}>
                <Button
                  variant={plan.highlight ? 'glow' : 'outline'}
                  size="lg"
                  className="w-full gap-2"
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-slate-700/50 bg-slate-800/30 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-700/50">
            <h2 className="text-lg font-bold text-slate-100">Full feature comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 w-1/2">
                    Feature
                  </th>
                  <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">
                    Free
                  </th>
                  <th className="text-center text-xs font-semibold text-teal-400 uppercase tracking-wider px-4 py-3">
                    Pro
                  </th>
                  <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">
                    Unlimited
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-slate-700/30 ${i % 2 === 0 ? 'bg-slate-800/20' : ''}`}
                  >
                    <td className="px-6 py-3.5 text-sm text-slate-300">{row.feature}</td>
                    <td className="px-4 py-3.5 text-center text-sm text-slate-400">{row.free}</td>
                    <td className="px-4 py-3.5 text-center text-sm font-medium text-teal-300">{row.pro}</td>
                    <td className="px-4 py-3.5 text-center text-sm text-slate-400">{row.unlimited}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ / Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-500 mb-2">
            Payments processed securely via Paystack. Plans billed monthly.
          </p>
          <p className="text-xs text-slate-600">
            Credits are consumed per AI agent call. 1 credit ≈ 100 tokens processed.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
