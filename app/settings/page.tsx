import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AppLayout } from '@/components/layout/app-layout'
import { SettingsClient } from './settings-client'
import type { Profile } from '@/lib/types'

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: runs } = await supabase
    .from('vibe_runs')
    .select('id, credits_used, created_at, status, title')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <AppLayout>
      <SettingsClient
        user={{ id: user.id, email: user.email ?? '' }}
        profile={profile as Profile | null}
        recentRuns={(runs ?? []) as {
          id: string
          credits_used: number
          created_at: string
          status: string
          title: string
        }[]}
      />
    </AppLayout>
  )
}
