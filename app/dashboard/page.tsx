import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AppLayout } from '@/components/layout/app-layout'
import { DashboardClient } from './dashboard-client'
import type { VibeRun, Profile } from '@/lib/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [runsResult, profileResult] = await Promise.all([
    supabase
      .from('vibe_runs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20),
    supabase.from('profiles').select('*').eq('id', user.id).single(),
  ])

  return (
    <AppLayout>
      <DashboardClient
        runs={(runsResult.data ?? []) as VibeRun[]}
        profile={profileResult.data as Profile | null}
        userEmail={user.email ?? ''}
      />
    </AppLayout>
  )
}
