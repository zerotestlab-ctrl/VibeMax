import { createClient } from '@/lib/supabase/server'
import { AppLayout } from '@/components/layout/app-layout'
import { MarketplaceClient } from './marketplace-client'
import type { Template } from '@/lib/types'

export default async function MarketplacePage() {
  const supabase = await createClient()

  const { data: templates } = await supabase
    .from('templates')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('uses_count', { ascending: false })

  return (
    <AppLayout>
      <MarketplaceClient templates={(templates ?? []) as Template[]} />
    </AppLayout>
  )
}
