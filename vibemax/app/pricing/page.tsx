"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, X, Zap, Shield, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { VibeMaxLogo } from "@/components/ui/VibeMaxLogo";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: 0,
    billing: "forever",
    description: "For testing the waters and building your first vibes.",
    cta: "Get started free",
    href: "/login",
    highlighted: false,
    badge: null,
    features: [
      "50 agent runs / month",
      "3 active workspaces",
      "Marketplace access (read)",
      "Basic agent types (Researcher, EmailWriter)",
      "JSON export",
      "Community support",
    ],
    missing: [
      "Advanced agents (Qualifier, Scheduler)",
      "Real-time Grok streaming",
      "API access",
      "Priority support",
      "Custom agent chains",
      "White-label export",
    ],
  },
  {
    name: "Pro",
    price: 19,
    billing: "/ month",
    description: "For solopreneurs ready to run a full autonomous business team.",
    cta: "Start Pro — $19/mo",
    href: "https://paystack.com/pay/vibemax-pro",
    highlighted: true,
    badge: "Most popular",
    features: [
      "500 agent runs / month",
      "Unlimited workspaces",
      "Full marketplace access + publishing",
      "All 6 agent types",
      "Real-time Grok streaming (grok-4 beta)",
      "API access (1,000 req/mo)",
      "ROI dashboard & analytics",
      "CSV + JSON export",
      "Email support (< 24h)",
    ],
    missing: [
      "Custom agent chains",
      "White-label export",
      "Team seats",
    ],
  },
  {
    name: "Unlimited",
    price: 49,
    billing: "/ month",
    description: "For power users and micro-agencies running multiple clients.",
    cta: "Go Unlimited — $49/mo",
    href: "https://paystack.com/pay/vibemax-unlimited",
    highlighted: false,
    badge: "Best value",
    features: [
      "Unlimited agent runs",
      "Unlimited workspaces",
      "Full marketplace access + publishing",
      "All 6 agent types + custom chains",
      "Real-time Grok streaming (priority)",
      "API access (unlimited)",
      "ROI dashboard & advanced analytics",
      "White-label export",
      "Up to 5 team seats",
      "Priority support (< 4h)",
      "Dedicated onboarding call",
    ],
    missing: [],
  },
];

const comparisonFeatures = [
  { feature: "Agent runs / month", free: "50", pro: "500", unlimited: "Unlimited" },
  { feature: "Active workspaces", free: "3", pro: "Unlimited", unlimited: "Unlimited" },
  { feature: "Agent types", free: "2 basic", pro: "6 full", unlimited: "6 + custom" },
  { feature: "Grok streaming", free: false, pro: true, unlimited: "Priority" },
  { feature: "Marketplace access", free: "Read", pro: "Full + publish", unlimited: "Full + publish" },
  { feature: "API access", free: false, pro: "1k req/mo", unlimited: "Unlimited" },
  { feature: "ROI analytics", free: false, pro: true, unlimited: "Advanced" },
  { feature: "Export formats", free: "JSON", pro: "CSV + JSON", unlimited: "White-label" },
  { feature: "Team seats", free: false, pro: false, unlimited: "5 seats" },
  { feature: "Support", free: "Community", pro: "Email < 24h", unlimited: "Priority < 4h" },
];

function FeatureRow({
  feature,
  value,
}: {
  feature: string;
  value: boolean | string;
}) {
  if (value === false) {
    return (
      <div className="flex items-center gap-2 text-sm text-white/25">
        <X className="h-4 w-4 flex-shrink-0" />
        {feature}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 text-sm text-white/70">
      <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
      {feature}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
        <Link href="/">
          <VibeMaxLogo size={28} />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary" size="sm">Dashboard</Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-sm text-violet-300">Simple, transparent pricing</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Choose your vibe level
          </h1>
          <p className="mt-4 text-white/40 max-w-xl mx-auto">
            Start free, scale when you&apos;re ready. All plans include the core VibeMax platform —
            upgrade for more runs, agents, and power.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative rounded-2xl border p-7 flex flex-col",
                plan.highlighted
                  ? "border-violet-500/50 bg-gradient-to-b from-violet-900/20 to-violet-900/5 shadow-xl shadow-violet-900/20"
                  : "border-white/[0.07] bg-white/[0.02]"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-violet-500/40 bg-violet-600 px-3 py-0.5 text-xs font-semibold text-white">
                  Most popular
                </div>
              )}
              {plan.badge && !plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-white/10 px-3 py-0.5 text-xs font-medium text-white/60">
                  {plan.badge}
                </div>
              )}

              {/* Plan name + price */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white">{plan.name}</h2>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {plan.price === 0 ? "Free" : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-white/40 text-sm">{plan.billing}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-white/40 leading-snug">{plan.description}</p>
              </div>

              {/* CTA */}
              <Link href={plan.href} target={plan.href.startsWith("http") ? "_blank" : undefined}>
                <Button
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="w-full mb-6"
                  size="lg"
                >
                  {plan.highlighted && <Zap className="h-4 w-4" />}
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              {/* Features */}
              <div className="flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <FeatureRow key={f} feature={f} value={true} />
                ))}
                {plan.missing.map((f) => (
                  <FeatureRow key={f} feature={f} value={false} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">Full comparison</h2>

          <div className="rounded-xl border border-white/[0.07] overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-4 bg-white/[0.03] border-b border-white/[0.06]">
              <div className="p-4 text-sm font-medium text-white/40">Feature</div>
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "p-4 text-sm font-semibold text-center",
                    plan.highlighted ? "text-violet-300" : "text-white/70"
                  )}
                >
                  {plan.name}
                </div>
              ))}
            </div>

            {/* Table rows */}
            {comparisonFeatures.map((row, i) => (
              <div
                key={row.feature}
                className={cn(
                  "grid grid-cols-4 border-b border-white/[0.04] last:border-0",
                  i % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
                )}
              >
                <div className="p-4 text-sm text-white/50">{row.feature}</div>

                {/* Free */}
                <div className="p-4 text-sm text-center text-white/50">
                  {typeof row.free === "boolean" ? (
                    row.free ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-white/20 mx-auto" />
                    )
                  ) : (
                    row.free
                  )}
                </div>

                {/* Pro */}
                <div className="p-4 text-sm text-center text-white/70 bg-violet-500/5">
                  {typeof row.pro === "boolean" ? (
                    row.pro ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-white/20 mx-auto" />
                    )
                  ) : (
                    <span className="text-violet-300">{row.pro}</span>
                  )}
                </div>

                {/* Unlimited */}
                <div className="p-4 text-sm text-center text-white/70">
                  {typeof row.unlimited === "boolean" ? (
                    row.unlimited ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-white/20 mx-auto" />
                    )
                  ) : (
                    row.unlimited
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ-style reassurance */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: Shield, title: "Cancel anytime", desc: "No lock-in. Downgrade or cancel from settings in one click." },
            { icon: Zap, title: "Instant activation", desc: "Your plan activates immediately after payment via Paystack." },
            { icon: Sparkles, title: "Built for solopreneurs", desc: "Every feature is designed for solo operators, not enterprise bloat." },
          ].map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-3"
            >
              <div className="h-10 w-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <Icon className="h-5 w-5 text-violet-400" />
              </div>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="text-sm text-white/40">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
