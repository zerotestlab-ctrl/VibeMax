"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Key,
  Link as LinkIcon,
  CreditCard,
  Zap,
  Eye,
  EyeOff,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Shield,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type SettingsTab = "profile" | "api-keys" | "connections" | "billing" | "usage";

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "api-keys", label: "API Keys", icon: Key },
  { id: "connections", label: "Connected Accounts", icon: LinkIcon },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "usage", label: "Credit Usage", icon: Zap },
];

const billingHistory = [
  { id: "b1", date: "Mar 1, 2026", description: "Pro Plan — March 2026", amount: 19, status: "paid" },
  { id: "b2", date: "Feb 1, 2026", description: "Pro Plan — February 2026", amount: 19, status: "paid" },
  { id: "b3", date: "Jan 1, 2026", description: "Pro Plan — January 2026", amount: 19, status: "paid" },
];

const usageData = [
  { month: "Oct", credits: 18 },
  { month: "Nov", credits: 31 },
  { month: "Dec", credits: 42 },
  { month: "Jan", credits: 38 },
  { month: "Feb", credits: 45 },
  { month: "Mar", credits: 24 },
];

function ProfileTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-white mb-4">Profile Information</h2>
        <div className="space-y-4 max-w-md">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-lg font-bold text-white">
              SC
            </div>
            <div>
              <Button variant="secondary" size="sm">Change avatar</Button>
              <p className="text-xs text-white/30 mt-1">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>

          <Input label="Full name" defaultValue="Solopreneur CEO" placeholder="Your name" />
          <Input label="Email" defaultValue="solopreneur@example.com" placeholder="your@email.com" disabled hint="Email cannot be changed. Contact support if needed." />
          <Input label="Username" defaultValue="soloceo" placeholder="username" hint="Used for vibe publishing attribution" />

          <Button>Save changes</Button>
        </div>
      </div>

      <div className="pt-5 border-t border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white mb-3">Danger Zone</h3>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 max-w-md">
          <p className="text-sm text-white/60 mb-3">Deleting your account is permanent. All vibes, workspaces, and data will be lost.</p>
          <Button variant="destructive" size="sm">Delete account</Button>
        </div>
      </div>
    </div>
  );
}

function ApiKeysTab() {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const apiKey = "vm_live_sk_f9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6";

  function handleCopy() {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-base font-semibold text-white mb-1">API Keys</h2>
        <p className="text-sm text-white/40">Use these keys to access the VibeMax API programmatically.</p>
      </div>

      {/* Current key */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-white">Production API Key</p>
            <p className="text-xs text-white/40">Created Mar 1, 2026 · Last used 2 hours ago</p>
          </div>
          <Badge variant="success">Active</Badge>
        </div>

        <div className="flex items-center gap-2">
          <code className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-xs text-white/60 font-mono overflow-hidden">
            {showKey ? apiKey : "vm_live_sk_" + "•".repeat(28)}
          </code>
          <button
            onClick={() => setShowKey(!showKey)}
            className="p-2.5 rounded-lg border border-white/10 hover:border-white/20 text-white/40 hover:text-white transition-all"
          >
            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <button
            onClick={handleCopy}
            className="p-2.5 rounded-lg border border-white/10 hover:border-violet-500/30 text-white/40 hover:text-violet-400 transition-all"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
            <RefreshCw className="h-3.5 w-3.5" />
            Regenerate key
          </Button>
        </div>
      </div>

      {/* Grok API */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
        <div className="mb-3">
          <p className="text-sm font-medium text-white">Grok API Key</p>
          <p className="text-xs text-white/40 mt-0.5">Required for agent execution. Get yours at x.ai</p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="xai-••••••••••••••••••••••••••••••••••"
            type="password"
            className="flex-1"
          />
          <Button variant="secondary" size="md">Save</Button>
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs text-white/30">
          <Shield className="h-3 w-3" />
          Stored encrypted. Never shared.
        </div>
      </div>

      {/* Rate limits */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
        <h3 className="text-sm font-medium text-white mb-3">Rate Limits (Pro Plan)</h3>
        <div className="space-y-2">
          {[
            { label: "API requests / month", used: 342, limit: 1000 },
            { label: "Concurrent workspaces", used: 2, limit: 10 },
          ].map(({ label, used, limit }) => (
            <div key={label}>
              <div className="flex justify-between text-xs text-white/40 mb-1">
                <span>{label}</span>
                <span>{used} / {limit}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-violet-500/60"
                  style={{ width: `${(used / limit) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConnectionsTab() {
  return (
    <div className="space-y-4 max-w-lg">
      <div>
        <h2 className="text-base font-semibold text-white mb-1">Connected Accounts</h2>
        <p className="text-sm text-white/40">Link external services to enhance agent capabilities.</p>
      </div>

      {[
        { name: "LinkedIn", icon: "🔗", desc: "For lead research and outreach", connected: true },
        { name: "Twitter / X", icon: "🐦", desc: "For content publishing and DMs", connected: true },
        { name: "Gmail", icon: "📧", desc: "For email sequences and follow-ups", connected: false },
        { name: "Calendly", icon: "📅", desc: "For booking demos automatically", connected: false },
        { name: "Notion", icon: "📝", desc: "For exporting vibe results to pages", connected: false },
        { name: "Slack", icon: "💬", desc: "For agent completion notifications", connected: false },
      ].map((conn) => (
        <div
          key={conn.name}
          className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{conn.icon}</span>
            <div>
              <p className="text-sm font-medium text-white">{conn.name}</p>
              <p className="text-xs text-white/40">{conn.desc}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {conn.connected ? (
              <>
                <Badge variant="success">Connected</Badge>
                <Button variant="ghost" size="sm" className="text-white/30 hover:text-red-400">
                  Disconnect
                </Button>
              </>
            ) : (
              <Button variant="secondary" size="sm">
                <ExternalLink className="h-3.5 w-3.5" />
                Connect
              </Button>
            )}
          </div>
        </div>
      ))}

      {/* Notification preferences */}
      <div className="pt-4 border-t border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Bell className="h-4 w-4 text-violet-400" />
          Notifications
        </h3>
        {[
          { label: "Vibe run completed", enabled: true },
          { label: "Vibe run failed", enabled: true },
          { label: "Credit limit warning (80%)", enabled: true },
          { label: "New marketplace vibes", enabled: false },
          { label: "Weekly usage digest", enabled: false },
        ].map(({ label, enabled }) => (
          <div key={label} className="flex items-center justify-between py-2">
            <span className="text-sm text-white/60">{label}</span>
            <div
              className={cn(
                "h-5 w-9 rounded-full border transition-all cursor-pointer",
                enabled
                  ? "bg-violet-500 border-violet-500"
                  : "bg-white/10 border-white/10"
              )}
            >
              <div
                className={cn(
                  "h-3.5 w-3.5 rounded-full bg-white mt-[3px] transition-all",
                  enabled ? "ml-[18px]" : "ml-[3px]"
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-base font-semibold text-white mb-1">Billing</h2>
        <p className="text-sm text-white/40">Manage your subscription and payment history.</p>
      </div>

      {/* Current plan */}
      <div className="rounded-xl border border-violet-500/25 bg-gradient-to-b from-violet-900/15 to-transparent p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="violet">Pro Plan</Badge>
              <span className="text-xs text-white/30">Active</span>
            </div>
            <p className="text-2xl font-bold text-white">$19 / month</p>
            <p className="text-sm text-white/40 mt-0.5">Renews April 1, 2026</p>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="https://paystack.com/pay/vibemax-unlimited"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                Upgrade to Unlimited
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
            <Button variant="ghost" size="sm" className="text-white/30 hover:text-white/60">
              Cancel subscription
            </Button>
          </div>
        </div>
      </div>

      {/* Billing history */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Billing History</h3>
        <div className="rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="grid grid-cols-4 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <span className="text-xs text-white/40 font-medium">Date</span>
            <span className="text-xs text-white/40 font-medium col-span-2">Description</span>
            <span className="text-xs text-white/40 font-medium text-right">Amount</span>
          </div>
          {billingHistory.map((record) => (
            <div
              key={record.id}
              className="grid grid-cols-4 px-4 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-sm text-white/50">{record.date}</span>
              <span className="text-sm text-white/70 col-span-2">{record.description}</span>
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm text-white">${record.amount}</span>
                <Badge variant="success">{record.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsageTab() {
  const maxCredits = 50;
  const usedCredits = 24;
  const maxBarHeight = 80;
  const maxUsage = Math.max(...usageData.map((d) => d.credits));

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-base font-semibold text-white mb-1">Credit Usage</h2>
        <p className="text-sm text-white/40">Track your agent credit consumption over time.</p>
      </div>

      {/* Current month summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Used this month", value: `${usedCredits}`, sub: `of ${maxCredits} credits`, color: "text-violet-400" },
          { label: "Remaining", value: `${maxCredits - usedCredits}`, sub: "credits left", color: "text-emerald-400" },
          { label: "Avg per vibe", value: "8.2", sub: "credits", color: "text-blue-400" },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
            <div className={cn("text-2xl font-bold", color)}>{value}</div>
            <div className="text-xs text-white/30 mt-0.5">{sub}</div>
            <div className="text-[10px] text-white/20 mt-0.5 uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>

      {/* Usage bar */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/60">March 2026</span>
          <span className="text-sm font-medium text-white">{usedCredits}/{maxCredits} credits</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(usedCredits / maxCredits) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400"
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-white/30">
          <span>{Math.round((usedCredits / maxCredits) * 100)}% used · 8 days left in billing period</span>
          <a href="/pricing" className="text-violet-400 hover:text-violet-300 transition-colors">
            Upgrade for more →
          </a>
        </div>
      </div>

      {/* Usage chart */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
        <h3 className="text-sm font-medium text-white mb-5">6-Month Credit Usage</h3>
        <div className="flex items-end justify-between gap-2 h-24">
          {usageData.map(({ month, credits }) => (
            <div key={month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-white/40">{credits}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: (credits / maxUsage) * maxBarHeight }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                  "w-full rounded-t-md",
                  month === "Mar" ? "bg-violet-500" : "bg-white/10"
                )}
                style={{ height: (credits / maxUsage) * maxBarHeight }}
              />
              <span className="text-xs text-white/30">{month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Agent quotas */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
        <h3 className="text-sm font-medium text-white mb-4">Agent Quotas (This Month)</h3>
        <div className="space-y-3">
          {[
            { agent: "Researcher", used: 42, limit: 100 },
            { agent: "Qualifier", used: 18, limit: 50 },
            { agent: "EmailWriter", used: 31, limit: 75 },
            { agent: "Scheduler", used: 8, limit: 50 },
          ].map(({ agent, used, limit }) => (
            <div key={agent} className="flex items-center gap-4">
              <span className="text-xs text-white/50 w-28">{agent}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-violet-500/60"
                  style={{ width: `${(used / limit) * 100}%` }}
                />
              </div>
              <span className="text-xs text-white/30 w-14 text-right">{used}/{limit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const tabContent = {
    profile: <ProfileTab />,
    "api-keys": <ApiKeysTab />,
    connections: <ConnectionsTab />,
    billing: <BillingTab />,
    usage: <UsageTab />,
  };

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-white/40">Manage your account, integrations, and billing.</p>
      </motion.div>

      <div className="flex gap-6 flex-col sm:flex-row">
        {/* Sidebar nav */}
        <motion.nav
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="sm:w-44 flex-shrink-0 space-y-0.5"
        >
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all text-left",
                activeTab === id
                  ? "bg-violet-500/15 text-violet-300 border-l-2 border-violet-500"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </button>
          ))}
        </motion.nav>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 min-w-0"
        >
          {tabContent[activeTab]}
        </motion.div>
      </div>
    </div>
  );
}
