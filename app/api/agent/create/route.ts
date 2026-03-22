import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/lib/types'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, input, category } = await request.json()

  if (!title || !input || !category) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  type VibeRunInsert = Database['public']['Tables']['vibe_runs']['Insert']
  const insertData: VibeRunInsert = {
    user_id: user.id,
    title,
    input,
    category,
    status: 'pending',
    steps: [],
    credits_used: 0,
  }

  const { data, error } = await supabase
    .from('vibe_runs')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert(insertData as any)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ run: data })
}
