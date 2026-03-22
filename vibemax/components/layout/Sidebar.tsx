"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Zap,
  CreditCard,
  Settings,
  Plus,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { VibeMaxLogo } from "@/components/ui/VibeMaxLogo";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

// Fallback icon for ShoppingGrid if not available
function MarketplaceIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

const navItemsFixed = [
  { href: "/dashboard", Icon: LayoutDashboard, label: "Dashboard" },
  { href: "/workspace/new", Icon: Zap, label: "Workspace" },
  { href: "/marketplace", Icon: MarketplaceIcon, label: "Marketplace" },
  { href: "/pricing", Icon: CreditCard, label: "Pricing" },
  { href: "/settings", Icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 220 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex flex-col h-screen border-r border-white/[0.06] bg-black/40 backdrop-blur-xl z-30 flex-shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/[0.06]">
        <Link href="/dashboard">
          <VibeMaxLogo size={28} showText={!collapsed} />
        </Link>
      </div>

      {/* New Vibe CTA */}
      <div className="p-3">
        <Link href="/workspace/new">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2.5",
              "bg-violet-600 hover:bg-violet-500 text-white transition-colors duration-200",
              "shadow-lg shadow-violet-900/30 cursor-pointer",
              collapsed && "justify-center px-2"
            )}
          >
            <Plus className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">New Vibe</span>}
          </motion.div>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItemsFixed.map(({ href, Icon, label }) => {
          const isActive =
            pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link key={href} href={href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150 cursor-pointer group",
                  isActive
                    ? "bg-violet-500/15 text-violet-300 border-l-2 border-violet-500 pl-[10px]"
                    : "text-white/50 hover:text-white hover:bg-white/5",
                  collapsed && "justify-center px-2 border-l-0 pl-2"
                )}
              >
                <Icon className={cn("h-4 w-4 flex-shrink-0", isActive && "text-violet-400")} />
                {!collapsed && <span>{label}</span>}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-white/[0.06] space-y-0.5">
        <button
          onClick={handleSignOut}
          className={cn(
            "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
            "text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-white/10 bg-black/80 flex items-center justify-center text-white/40 hover:text-white hover:border-violet-500/50 transition-all duration-200 z-10"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </motion.aside>
  );
}
