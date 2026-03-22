'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  CreditCard,
  Shield,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ExternalLink,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/types'
import { formatDate, STATUS_COLORS } from '@/lib/utils'

interface SettingsClientProps {
  user: { id: string; email: string }
  profile: Profile | null
  recentRuns: {
    id: string
    credits_used: number
    created_at: string
    status: string
    title: string
  }[]
}

const PLAN_LABELS: Record<string, { label: string; color: string }> = {
  free: { label: 'Free', color: 'secondary' },
  pro: { label: 'Pro', color: 'default' },
  unlimited: { label: 'Unlimited', color: 'default' },
}

export function SettingsClient({ user, profile, recentRuns }: SettingsClientProps) {
  const [fullName, setFullName] = useState(profile?.full_name ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const plan = profile?.plan ?? 'free'
  const creditsUsed = profile?.credits_used ?? 0
  const creditsLimit = profile?.credits_limit ?? 100
  const creditsPercent = Math.min((creditsUsed / creditsLimit) * 100, 100)

  const handleSaveProfile = async () => {
    setSaving(true)
    setError('')
    setSaved(false)

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName.trim() || null })
      .eq('id', user.id)

    if (error) {
      setError(error.message)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-14 lg:pt-6 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-slate-100 mb-1">Settings</h1>
        <p className="text-sm text-slate-400">Manage your account, billing, and preferences.</p>
      </motion.div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="gap-1.5">
            <User className="h-3.5 w-3.5" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-1.5">
            <CreditCard className="h-3.5 w-3.5" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-6">
              <h2 className="text-base font-semibold text-slate-200 mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Email address</Label>
                  <Input value={user.email} readOnly className="opacity-60 cursor-not-allowed" />
                  <p className="text-xs text-slate-600">Email cannot be changed.</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="full-name">Display name</Label>
                  <Input
                    id="full-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 rounded-md px-3 py-2 border border-red-400/20">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Button onClick={handleSaveProfile} disabled={saving} className="gap-2">
                    {saving ? (
                      <><Loader2 className="h-4 w-4 animate-spin" />Saving...</>
                    ) : saved ? (
                      <><CheckCircle2 className="h-4 w-4" />Saved</>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                  {saved && <span className="text-sm text-teal-400">Profile updated</span>}
                </div>
              </div>
            </div>

            {/* Account details */}
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-6">
              <h2 className="text-base font-semibold text-slate-200 mb-4">Account Details</h2>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-slate-500">User ID</dt>
                  <dd className="text-xs text-slate-400 font-mono truncate max-w-[200px]">{user.id}</dd>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <dt className="text-sm text-slate-500">Member since</dt>
                  <dd className="text-sm text-slate-400">
                    {profile ? formatDate(profile.created_at) : '—'}
                  </dd>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <dt className="text-sm text-slate-500">Current plan</dt>
                  <dd>
                    <Badge variant={PLAN_LABELS[plan]?.color as 'default' | 'secondary' ?? 'secondary'}>
                      {PLAN_LABELS[plan]?.label ?? plan}
                    </Badge>
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Plan & Credits */}
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-200">Current Plan</h2>
                  <p className="text-sm text-slate-500 mt-0.5">Manage your subscription</p>
                </div>
                <Badge variant={plan === 'free' ? 'secondary' : 'default'}>
                  {PLAN_LABELS[plan]?.label ?? plan}
                </Badge>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Credits used this period</span>
                  <span className="text-slate-200 font-medium">{creditsUsed} / {creditsLimit}</span>
                </div>
                <Progress value={creditsPercent} />
                <p className="text-xs text-slate-500">{creditsLimit - creditsUsed} credits remaining</p>
              </div>

              {plan === 'free' && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={process.env.NEXT_PUBLIC_PAYSTACK_PRO_LINK ?? '/pricing'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full gap-2">
                      Upgrade to Pro — ₦29,000/mo
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                  <a
                    href={process.env.NEXT_PUBLIC_PAYSTACK_UNLIMITED_LINK ?? '/pricing'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full gap-2">
                      Go Unlimited — ₦72,000/mo
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                </div>
              )}
            </div>

            {/* Credit Usage History */}
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-6">
              <h2 className="text-base font-semibold text-slate-200 mb-4">Recent Credit Usage</h2>
              {recentRuns.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">No runs yet</p>
              ) : (
                <div className="space-y-2">
                  {recentRuns.map((run) => (
                    <div
                      key={run.id}
                      className="flex items-center gap-3 rounded-md border border-slate-700/50 bg-slate-900/40 px-4 py-2.5"
                    >
                      <Clock className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-300 truncate">{run.title}</p>
                        <p className="text-xs text-slate-600">{formatDate(run.created_at)}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                          STATUS_COLORS[run.status as keyof typeof STATUS_COLORS] ?? STATUS_COLORS.pending
                        }`}
                      >
                        {run.status}
                      </span>
                      <span className="text-sm font-medium text-slate-300 shrink-0 w-16 text-right">
                        {run.credits_used} cr
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-6">
              <h2 className="text-base font-semibold text-slate-200 mb-2">Authentication</h2>
              <p className="text-sm text-slate-400 mb-4">
                VibeMax uses magic link authentication — no password to manage.
                Your account is secured by your email.
              </p>
              <div className="flex items-center gap-2 text-sm text-teal-400 bg-teal-500/10 rounded-md px-3 py-2 border border-teal-500/20">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Passwordless authentication is active
              </div>
            </div>

            <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-6">
              <h2 className="text-base font-semibold text-slate-200 mb-2">Data Privacy</h2>
              <p className="text-sm text-slate-400 mb-4">
                All your vibe runs and data are protected with row-level security.
                Only you can access your data.
              </p>
              <dl className="space-y-3">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-slate-500">Row-level security</dt>
                  <dd className="flex items-center gap-1.5 text-sm text-teal-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Enabled
                  </dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-slate-500">Data encryption</dt>
                  <dd className="flex items-center gap-1.5 text-sm text-teal-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    At rest & in transit
                  </dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-slate-500">Data sharing</dt>
                  <dd className="text-sm text-slate-300">Never</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
