"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, Zap, Upload, Filter, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { generateId } from "@/lib/utils";
import type { MarketplaceVibe } from "@/lib/types";

const categories = ["All", "Sales", "Content", "Web3", "Support", "Research", "Marketing"];

const marketplaceVibes: MarketplaceVibe[] = [
  {
    id: "mv-1",
    title: "B2B LinkedIn Lead Machine",
    description: "Scrapes LinkedIn, qualifies 100 B2B leads against your ICP, and writes personalized cold emails. Books demos automatically.",
    category: "Sales",
    author: "marcus_chen",
    uses: 1842,
    rating: 4.9,
    tags: ["linkedin", "lead-gen", "email"],
    preview_steps: ["Researcher → LinkedIn scrape", "Qualifier → ICP scoring", "EmailWriter → personalize", "Scheduler → send + follow up"],
  },
  {
    id: "mv-2",
    title: "Viral Twitter Content Engine",
    description: "Generates 30 days of viral Twitter/X content with hooks, threads, and engagement bait. Optimized for algorithm.",
    category: "Content",
    author: "priya_nair",
    uses: 2341,
    rating: 4.8,
    tags: ["twitter", "content", "viral"],
    preview_steps: ["Researcher → trend analysis", "ContentGen → 30 posts", "Scheduler → optimal timing"],
  },
  {
    id: "mv-3",
    title: "Web3 NFT Partnership Outreach",
    description: "Identifies top NFT projects by on-chain metrics, drafts partnership pitches, and sends via Twitter DM + email.",
    category: "Web3",
    author: "jake_w",
    uses: 893,
    rating: 4.7,
    tags: ["web3", "nft", "partnerships"],
    preview_steps: ["Researcher → on-chain scan", "Qualifier → project scoring", "OutreachBot → DM + email"],
  },
  {
    id: "mv-4",
    title: "Customer Support AI Bot",
    description: "Reads your docs, creates a knowledge base, and trains a support bot. Handles 80% of tier-1 queries automatically.",
    category: "Support",
    author: "techflow_io",
    uses: 1104,
    rating: 4.6,
    tags: ["support", "chatbot", "automation"],
    preview_steps: ["Researcher → docs ingestion", "ContentGen → FAQ build", "Qualifier → response ranking"],
  },
  {
    id: "mv-5",
    title: "Podcast Guest Finder",
    description: "Finds 20 ideal podcasts in your niche, crafts personalized pitches, and sends booking requests to hosts.",
    category: "Marketing",
    author: "solo_builds",
    uses: 567,
    rating: 4.5,
    tags: ["podcast", "pr", "outreach"],
    preview_steps: ["Researcher → podcast discovery", "Qualifier → audience fit", "EmailWriter → pitch crafting", "Scheduler → outreach"],
  },
  {
    id: "mv-6",
    title: "Competitor Intel Report",
    description: "Deep-dives your top 5 competitors: pricing, features, reviews, social sentiment. Delivers a full strategic brief.",
    category: "Research",
    author: "indie_labs",
    uses: 788,
    rating: 4.8,
    tags: ["research", "competitive", "strategy"],
    preview_steps: ["Researcher → competitor scan", "Qualifier → data extraction", "ContentGen → report writing"],
  },
  {
    id: "mv-7",
    title: "Product Hunt Launch Kit",
    description: "Prepares your full PH launch: tagline variants, hunter outreach, comment responses, and post-launch follow-up.",
    category: "Marketing",
    author: "launch_team",
    uses: 1220,
    rating: 4.9,
    tags: ["product-hunt", "launch", "marketing"],
    preview_steps: ["ContentGen → taglines + copy", "Researcher → hunter targeting", "EmailWriter → outreach", "Scheduler → launch sequence"],
  },
  {
    id: "mv-8",
    title: "DAO Governance Outreach",
    description: "Monitors governance proposals across 50 DAOs, identifies voting opportunities, and drafts participation strategies.",
    category: "Web3",
    author: "dao_ninja",
    uses: 341,
    rating: 4.4,
    tags: ["dao", "governance", "web3"],
    preview_steps: ["Researcher → DAO monitoring", "Qualifier → proposal scoring", "ContentGen → strategy drafts"],
  },
];

interface PublishModalProps {
  onClose: () => void;
}

function PublishModal({ onClose }: PublishModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-black/90 backdrop-blur-2xl p-6 shadow-2xl"
      >
        <h2 className="text-lg font-bold text-white mb-1">Publish your vibe</h2>
        <p className="text-sm text-white/40 mb-5">Share your vibe with the community and earn credits when others use it.</p>

        <div className="space-y-4">
          <Input label="Vibe title" placeholder="e.g. B2B SaaS Lead Finder" />
          <Input label="Description" placeholder="What does this vibe do?" />
          <div>
            <label className="text-sm font-medium text-white/70 block mb-1.5">Category</label>
            <select className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50">
              {categories.filter(c => c !== "All").map(c => (
                <option key={c} value={c} className="bg-black">{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
          <Button className="flex-1">
            <Upload className="h-4 w-4" />
            Publish vibe
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showPublish, setShowPublish] = useState(false);
  const [importing, setImporting] = useState<string | null>(null);
  const router = useRouter();

  const filtered = marketplaceVibes.filter((v) => {
    const matchesSearch =
      !search ||
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase()) ||
      v.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === "All" || v.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  async function handleImport(vibe: MarketplaceVibe) {
    setImporting(vibe.id);
    // Simulate import delay
    await new Promise((r) => setTimeout(r, 800));
    setImporting(null);
    router.push(`/workspace/${generateId()}`);
  }

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between gap-4 mb-8 flex-wrap"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Vibe Marketplace</h1>
          <p className="mt-1 text-sm text-white/40">
            Community-built agent templates. One-click deploy.
          </p>
        </div>
        <Button onClick={() => setShowPublish(true)}>
          <Upload className="h-4 w-4" />
          Publish your vibe
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: Zap, label: "Templates", value: "48" },
          { icon: Users, label: "Contributors", value: "312" },
          { icon: TrendingUp, label: "Total deploys", value: "14.2k" },
        ].map(({ icon: Icon, label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-center gap-3"
          >
            <Icon className="h-5 w-5 text-violet-400" />
            <div>
              <div className="text-lg font-bold text-white">{value}</div>
              <div className="text-xs text-white/40">{label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search + filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vibes by name, tag, or goal..."
            className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="h-4 w-4 text-white/30 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${
                activeCategory === cat
                  ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                  : "border-white/10 text-white/40 hover:text-white/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((vibe, i) => (
          <motion.div
            key={vibe.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            className="group rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 flex flex-col hover:border-violet-500/25 hover:bg-white/[0.05] transition-all duration-200"
          >
            {/* Category + rating */}
            <div className="flex items-center justify-between mb-3">
              <Badge variant={
                vibe.category === "Sales" ? "violet"
                  : vibe.category === "Web3" ? "info"
                  : vibe.category === "Content" ? "success"
                  : vibe.category === "Support" ? "warning"
                  : "default"
              }>
                {vibe.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-amber-400">
                <Star className="h-3 w-3 fill-current" />
                {vibe.rating}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-white leading-snug mb-2 group-hover:text-violet-300 transition-colors">
              {vibe.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-white/40 leading-relaxed flex-1 line-clamp-3">
              {vibe.description}
            </p>

            {/* Preview steps */}
            <div className="mt-3 space-y-0.5">
              {vibe.preview_steps.slice(0, 3).map((step) => (
                <div key={step} className="text-[10px] text-white/25 font-mono truncate">
                  → {step}
                </div>
              ))}
              {vibe.preview_steps.length > 3 && (
                <div className="text-[10px] text-white/15">+{vibe.preview_steps.length - 3} more steps</div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.05]">
              <div className="flex items-center gap-1 text-[11px] text-white/30">
                <Zap className="h-3 w-3" />
                {vibe.uses.toLocaleString()} runs
              </div>
              <span className="text-[11px] text-white/25">by @{vibe.author}</span>
            </div>

            {/* Import button */}
            <Button
              size="sm"
              className="mt-3 w-full"
              loading={importing === vibe.id}
              onClick={() => handleImport(vibe)}
            >
              <Zap className="h-3.5 w-3.5" />
              Import & Deploy
            </Button>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/30">
          <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No vibes found for &quot;{search}&quot;</p>
          <p className="text-xs mt-1">Try a different search or category</p>
        </div>
      )}

      {/* Publish modal */}
      {showPublish && <PublishModal onClose={() => setShowPublish(false)} />}
    </div>
  );
}
