'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Star, ArrowRight, Zap, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { Template } from '@/lib/types'

const ALL_CATEGORIES = 'All'

interface MarketplaceClientProps {
  templates: Template[]
}

function TemplateCard({ template }: { template: Template }) {
  const router = useRouter()

  const handleDeploy = () => {
    const params = new URLSearchParams({
      template: template.id,
      input: template.input_template,
      category: template.category,
      title: template.title,
    })
    router.push(`/workspace/new?${params.toString()}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col rounded-xl border border-slate-700/50 bg-slate-800/40 p-5 hover:border-slate-600/70 transition-all hover:bg-slate-800/60"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-slate-100 group-hover:text-teal-300 transition-colors">
              {template.title}
            </h3>
            {template.is_featured && (
              <Badge variant="default" className="gap-0.5 text-xs py-0 px-1.5">
                <Star className="h-2.5 w-2.5 fill-current" />
                Featured
              </Badge>
            )}
          </div>
          <Badge variant="outline" className="text-xs">{template.category}</Badge>
        </div>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4">
        {template.description}
      </p>

      {/* Input template preview */}
      <div className="rounded-md bg-slate-900/60 border border-slate-700/50 px-3 py-2 mb-4">
        <p className="terminal-text text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {template.input_template}
        </p>
      </div>

      {/* Tags */}
      {template.tags && template.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {template.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 rounded-full bg-slate-700/50 px-2 py-0.5 text-xs text-slate-400"
            >
              <Tag className="h-2.5 w-2.5" />
              {tag}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-600">
          {template.uses_count} {template.uses_count === 1 ? 'deployment' : 'deployments'}
        </span>
        <Button size="sm" onClick={handleDeploy} className="gap-1.5">
          <Zap className="h-3.5 w-3.5" />
          Import & Deploy
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.div>
  )
}

export function MarketplaceClient({ templates }: MarketplaceClientProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)

  const categories = [ALL_CATEGORIES, ...Array.from(new Set(templates.map((t) => t.category)))]

  const filtered = templates.filter((t) => {
    const matchesSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = activeCategory === ALL_CATEGORIES || t.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-14 lg:pt-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-slate-100 mb-1">Template Marketplace</h1>
        <p className="text-sm text-slate-400">
          Proven vibe templates — import any and deploy immediately with your data.
        </p>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all border whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-teal-500/15 text-teal-400 border-teal-500/30'
                  : 'text-slate-400 border-slate-700 hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 py-16 text-center"
        >
          <Zap className="h-8 w-8 text-slate-600 mb-3" />
          <p className="text-slate-400 font-medium mb-1">
            {templates.length === 0 ? 'No templates yet' : 'No templates match your search'}
          </p>
          <p className="text-sm text-slate-600 mb-4">
            {templates.length === 0
              ? 'Templates from your Supabase database will appear here.'
              : 'Try a different search or category.'}
          </p>
          {templates.length === 0 && (
            <Link href="/workspace/new">
              <Button size="sm" className="gap-2">
                Build Your Own <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </motion.div>
      ) : (
        <>
          <p className="text-xs text-slate-600 mb-4">{filtered.length} template{filtered.length !== 1 ? 's' : ''}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
