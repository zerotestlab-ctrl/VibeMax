"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Zap, Mail, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { VibeMaxLogo } from "@/components/ui/VibeMaxLogo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

type Stage = "idle" | "loading" | "sent" | "error";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [error, setError] = useState("");

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStage("loading");
    setError("");

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/login/callback`,
        },
      });

      if (authError) throw authError;
      setStage("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStage("error");
    }
  }

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 grid-overlay opacity-30" />

        {/* Animated orbs */}
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-700/15 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-700/15 blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className="absolute h-1 w-1 rounded-full bg-violet-400"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* Glow behind card */}
        <div className="absolute inset-0 rounded-2xl bg-violet-600/5 blur-xl scale-110 pointer-events-none" />

        <div className="relative rounded-2xl border border-white/[0.08] bg-black/60 backdrop-blur-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <VibeMaxLogo size={36} />
          </div>

          <AnimatePresence mode="wait">
            {stage !== "sent" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-white">Welcome back to VibeMax</h1>
                  <p className="mt-2 text-sm text-white/40">
                    Enter your email and we&apos;ll send you a magic link — no password needed.
                  </p>
                </div>

                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      label="Email address"
                      error={stage === "error" ? error : undefined}
                      required
                      autoFocus
                      className="pl-10"
                    />
                    <Mail className="absolute left-3 top-[34px] h-4 w-4 text-white/30 pointer-events-none" />
                  </div>

                  <Button
                    type="submit"
                    loading={stage === "loading"}
                    className="w-full"
                    size="lg"
                  >
                    <Sparkles className="h-4 w-4" />
                    Send magic link
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.07]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-black/60 px-3 text-xs text-white/30">
                      Instant access, no passwords ever
                    </span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2.5">
                  {[
                    "Free plan — 50 agent runs/month",
                    "No credit card required",
                    "Upgrade or cancel anytime",
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-2.5 text-sm text-white/40">
                      <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="mx-auto mb-6 h-16 w-16 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center"
                >
                  <Zap className="h-8 w-8 text-violet-400" />
                </motion.div>

                <h2 className="text-xl font-bold text-white">Magic link sent!</h2>
                <p className="mt-2 text-sm text-white/50">
                  Check <span className="text-violet-300 font-medium">{email}</span> for your link.
                  It expires in 10 minutes.
                </p>

                <div className="mt-6 rounded-lg border border-white/[0.07] bg-white/[0.03] p-4 text-left">
                  <p className="text-xs text-white/30 font-medium mb-2">WHAT HAPPENS NEXT</p>
                  <div className="space-y-2 text-sm text-white/50">
                    <p>1. Click the link in your email</p>
                    <p>2. You&apos;ll be taken to your dashboard</p>
                    <p>3. Deploy your first vibe in under 60 seconds</p>
                  </div>
                </div>

                <button
                  onClick={() => { setStage("idle"); setEmail(""); }}
                  className="mt-4 text-sm text-white/30 hover:text-white/60 transition-colors"
                >
                  Use a different email
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-white/30 hover:text-white/60 transition-colors">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
