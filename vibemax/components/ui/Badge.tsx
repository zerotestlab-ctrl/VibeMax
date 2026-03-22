import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "violet";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-white/10 text-white/70 border-white/10",
    success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    warning: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    error: "bg-red-500/15 text-red-400 border-red-500/25",
    info: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    violet: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
