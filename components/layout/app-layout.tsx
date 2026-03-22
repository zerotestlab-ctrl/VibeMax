import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from './sidebar'

interface AppLayoutProps {
  children: React.ReactNode
}

export async function AppLayout({ children }: AppLayoutProps) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const email = user.email ?? ''
  const userInitial = email.charAt(0).toUpperCase()

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <Sidebar userEmail={email} userInitial={userInitial} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
