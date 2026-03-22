'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Zap,
  Store,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/workspace/new', icon: Zap, label: 'New Vibe' },
  { href: '/marketplace', icon: Store, label: 'Marketplace' },
  { href: '/settings', icon: Settings, label: 'Settings' },
]

interface SidebarProps {
  userEmail?: string | null
  userInitial?: string
}

export function Sidebar({ userEmail, userInitial = 'U' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={cn('flex items-center gap-3 px-4 py-5 border-b border-slate-700/50', collapsed && 'px-3 justify-center')}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500 text-slate-900">
          <Zap className="h-4 w-4" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-slate-100 tracking-tight">VibeMax</span>
        )}
      </div>

      {/* New Vibe CTA */}
      <div className={cn('px-3 py-3', collapsed && 'px-2')}>
        <Link href="/workspace/new" onClick={() => setMobileOpen(false)}>
          <Button
            variant="default"
            size="sm"
            className={cn('w-full gap-2', collapsed && 'px-0 justify-center')}
          >
            <Plus className="h-4 w-4 shrink-0" />
            {!collapsed && <span>New Vibe</span>}
          </Button>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-0.5 px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100',
                collapsed && 'justify-center px-2'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className={cn('border-t border-slate-700/50 p-3', collapsed && 'p-2')}>
        <div className={cn('flex items-center gap-2 rounded-md px-2 py-2', !collapsed && 'mb-1')}>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 text-xs font-semibold">
            {userInitial}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-slate-300">{userEmail}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className={cn(
            'flex w-full items-center gap-2 rounded-md px-2 py-2 text-xs text-slate-500 hover:bg-slate-800 hover:text-red-400 transition-colors',
            collapsed && 'justify-center px-0'
          )}
        >
          <LogOut className="h-3.5 w-3.5 shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-md bg-slate-800 p-2 text-slate-400 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-700/50 lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 rounded-md p-1.5 text-slate-500 hover:text-slate-300"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 220 }}
        transition={{ type: 'tween', duration: 0.2 }}
        className="relative hidden lg:flex flex-col bg-slate-900 border-r border-slate-700/50 shrink-0 overflow-hidden"
      >
        <SidebarContent />

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-16 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 hover:text-slate-100 shadow-md transition-colors"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </motion.aside>
    </>
  )
}
