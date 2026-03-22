import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
        secondary: 'bg-slate-700 text-slate-300',
        destructive: 'bg-red-500/10 text-red-400 border border-red-500/20',
        outline: 'border border-slate-600 text-slate-400',
        success: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
        warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
        info: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
