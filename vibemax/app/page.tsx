"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Users,
  Play,
  Star,
  CheckCircle,
  Sparkles,
  Terminal,
  Globe,
  TrendingUp,
} from "lucide-react";
import { VibeMaxLogo } from "@/components/ui/VibeMaxLogo";
import { Button } from "@/components/ui/Button";

const features = [
  {
    icon: Zap,
    title: "One vibe, infinite output",
    description:
      "Describe your business goal in plain English. VibeMax spins up a full agent team — researcher, qualifier, writer, scheduler — instantly.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Terminal,
    title: "Live agent transparency",
    description:
      "Watch every agent step in real time, just like Cursor's AI tab. Full visibility, full control. Pause, resume, or export at any point.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Globe,
    title: "Marketplace of vibes",
    description:
      "Import battle-tested vibe templates from the community. Sales prospecting, content creation, Web3 outreach — deploy in one click.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: TrendingUp,
    title: "ROI you can see",
    description:
      "Every agent run shows projected pipeline value, cost per credit, and real dollar ROI. Know exactly what you're getting.",
    color: "from-amber-500 to-orange-500",
  },
];

const testimonials = [
  {
    name: "Marcus Chen",
    role: "Indie Hacker, SaaSFactory",
    avatar: "MC",
    text: "VibeMax replaced my entire outreach stack. I deployed one vibe and booked 8 demos in a week. The live terminal is insane — I can see exactly what the AI is doing.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Solopreneur, ContentFlow",
    avatar: "PN",
    text: "I was skeptical about AI agents but VibeMax changed everything. The marketplace gave me a content vibe that publishes 20 posts/week. Zero manual work.",
    rating: 5,
  },
  {
    name: "Jake Williams",
    role: "Founder, Web3Studio",
    avatar: "JW",
    text: "The Web3 outreach vibe alone is worth the Pro plan. $19/month and I'm generating $10k+ in pipeline. ROI tracking built in — ridiculous value.",
    rating: 5,
  },
];

const whoItsFor = [
  { icon: "🧑‍💻", title: "Indie Hackers", desc: "Launch faster with AI doing the business legwork" },
  { icon: "🚀", title: "Solopreneurs", desc: "Replace a team of 5 with one VibeMax workspace" },
  { icon: "🎯", title: "Micro-agencies", desc: "Scale client delivery without hiring" },
  { icon: "🌐", title: "Web3 Founders", desc: "Outreach, community, partnerships on autopilot" },
];

const agentSteps = [
  { agent: "Researcher", action: "Scanning LinkedIn for target prospects...", color: "text-blue-400" },
  { agent: "Qualifier", action: "Scoring 847 leads against ICP criteria...", color: "text-emerald-400" },
  { agent: "EmailWriter", action: "Crafting personalized outreach (73 emails)...", color: "text-violet-400" },
  { agent: "Scheduler", action: "Booking calendar slots for qualified leads...", color: "text-amber-400" },
];

function FloatingOrb({ className }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
    />
  );
}

function NavBar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
    >
      <div className="flex items-center gap-8">
        <VibeMaxLogo size={30} />
        <div className="hidden md:flex items-center gap-6 text-sm text-white/50">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#who" className="hover:text-white transition-colors">Who it&apos;s for</Link>
          <Link href="#testimonials" className="hover:text-white transition-colors">Stories</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button variant="ghost" size="sm">Sign in</Button>
        </Link>
        <Link href="/login">
          <Button size="sm" className="hidden sm:flex">
            Get started free <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </motion.nav>
  );
}

function TerminalDemo() {
  return (
    <div className="relative rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm overflow-hidden shadow-2xl shadow-violet-900/20">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
        <div className="h-3 w-3 rounded-full bg-red-500/70" />
        <div className="h-3 w-3 rounded-full bg-amber-500/70" />
        <div className="h-3 w-3 rounded-full bg-emerald-500/70" />
        <span className="ml-2 text-xs text-white/30 font-mono">vibe-run-8f2a9c</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-mono">LIVE</span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-xs space-y-2 min-h-[200px]">
        <div className="text-white/30">$ vibe run &quot;Find 100 B2B SaaS founders and book demos&quot;</div>
        <div className="text-white/20">──────────────────────────────────────</div>
        {agentSteps.map((step, i) => (
          <motion.div
            key={step.agent}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.4, duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <span className="text-white/30 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex-1">
              <span className={`font-semibold ${step.color}`}>[{step.agent}]</span>
              <span className="text-white/60 ml-2">{step.action}</span>
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.4 }}
              className="text-white/20 ml-2"
            >
              {i < 2 ? "✓" : i === 2 ? "⟳" : "…"}
            </motion.span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="flex items-center gap-2 pt-2 border-t border-white/5"
        >
          <span className="text-violet-400">→</span>
          <span className="text-white/40">Pipeline value:</span>
          <span className="text-emerald-400 font-semibold">$18,400</span>
          <span className="text-white/20 ml-auto">Credits used: 24</span>
        </motion.div>
        <div className="flex items-center gap-1 text-white/20">
          <span className="cursor-blink">█</span>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <div className="min-h-screen bg-[#050508] overflow-x-hidden">
      <NavBar />

      {/* Background orbs */}
      <FloatingOrb className="top-0 left-1/4 w-[600px] h-[600px] bg-violet-700 float-orb" />
      <FloatingOrb className="top-1/3 right-0 w-[400px] h-[400px] bg-indigo-700" />
      <FloatingOrb className="bottom-0 left-0 w-[400px] h-[400px] bg-purple-800" />

      {/* Grid overlay */}
      <div className="fixed inset-0 grid-overlay pointer-events-none opacity-50" />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5"
        >
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
          <span className="text-sm text-violet-300 font-medium">Powered by Grok Multi-Agent</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight"
        >
          Turn one vibe into your{" "}
          <span className="gradient-text">full autonomous</span>
          {" "}business team
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg sm:text-xl text-white/50 leading-relaxed"
        >
          Describe your goal. VibeMax deploys a team of AI agents — Researcher, Qualifier,
          Writer, Scheduler — and executes in real time. Watch every step. Own every result.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/login">
            <Button size="lg" className="text-base px-8 shadow-xl shadow-violet-900/40">
              <Zap className="h-5 w-5" />
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="secondary" size="lg" className="text-base px-8">
              See Pricing
            </Button>
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center gap-6 text-sm text-white/30"
        >
          <div className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-emerald-500" />
            No credit card required
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-violet-400" />
            Free forever plan
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-blue-400" />
            2,000+ solopreneurs
          </div>
        </motion.div>

        {/* Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 w-full max-w-3xl"
        >
          <TerminalDemo />
        </motion.div>

        {/* Video placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 relative group cursor-pointer w-full max-w-3xl"
        >
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/3 aspect-video flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-black/40" />
            <div className="relative flex flex-col items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="h-16 w-16 rounded-full bg-violet-600/80 backdrop-blur-sm flex items-center justify-center border border-violet-400/30 shadow-xl shadow-violet-900/40"
              >
                <Play className="h-7 w-7 text-white ml-1" fill="white" />
              </motion.div>
              <span className="text-white/40 text-sm">Watch 2-min demo</span>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Who it&apos;s for */}
      <section id="who" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">Built for the builders who move fast</h2>
            <p className="mt-3 text-white/40">
              If you&apos;re doing the work of 5 people, VibeMax is your force multiplier.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {whoItsFor.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6 text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm text-white/40">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">Everything you need, nothing you don&apos;t</h2>
            <p className="mt-3 text-white/40 max-w-2xl mx-auto">
              Four ruthlessly focused capabilities that replace an entire growth team.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative group rounded-xl border border-white/[0.07] bg-white/[0.03] p-6 overflow-hidden"
              >
                {/* Gradient accent */}
                <div
                  className={`absolute top-0 left-0 h-1 w-16 rounded-bl-none rounded-tl-xl bg-gradient-to-r ${feature.color} opacity-80`}
                />

                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} bg-opacity-15 mb-4`}
                >
                  <feature.icon className="h-5 w-5 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "2,000+", label: "Solopreneurs using VibeMax" },
              { value: "$2.4M", label: "Pipeline generated" },
              { value: "98%", label: "Customer satisfaction" },
              { value: "12x", label: "Average ROI" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="mt-1.5 text-sm text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">Builders who shipped with VibeMax</h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-white/60 leading-relaxed flex-1">&quot;{t.text}&quot;</p>

                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/5">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-900/20 to-transparent p-12"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-violet-600/5 to-transparent pointer-events-none" />

            <BarChart3 className="h-10 w-10 text-violet-400 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl sm:text-4xl font-bold">Ready to run your first vibe?</h2>
            <p className="mt-4 text-white/40 max-w-lg mx-auto">
              Join 2,000+ solopreneurs using VibeMax to grow their business on autopilot. Free plan
              includes 50 agent runs/month.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="text-base px-10 shadow-xl shadow-violet-900/50">
                  <Zap className="h-5 w-5" />
                  Start for free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="text-base px-8">
                  View pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <VibeMaxLogo size={24} />
          <p className="text-sm text-white/20">
            © {new Date().getFullYear()} VibeMax. Built for the ones who ship.
          </p>
          <div className="flex items-center gap-5 text-sm text-white/30">
            <Link href="/pricing" className="hover:text-white/60 transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-white/60 transition-colors">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
