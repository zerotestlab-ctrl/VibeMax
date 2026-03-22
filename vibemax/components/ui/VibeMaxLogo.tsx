"use client";

import { cn } from "@/lib/utils";

interface VibeMaxLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function VibeMaxLogo({ size = 32, className, showText = true }: VibeMaxLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer glow ring */}
        <circle cx="20" cy="20" r="19" stroke="url(#outer-ring)" strokeWidth="1" opacity="0.6" />
        
        {/* Main circle background */}
        <circle cx="20" cy="20" r="17" fill="url(#bg-gradient)" />
        
        {/* Inner glow */}
        <circle cx="20" cy="20" r="17" fill="url(#inner-glow)" opacity="0.4" />

        {/* Lightning bolt */}
        <path
          d="M22 8L14 22H20L18 32L26 18H20L22 8Z"
          fill="url(#lightning-gradient)"
          strokeLinejoin="round"
        />

        {/* Check mark accent */}
        <path
          d="M13 20.5L16.5 24L23.5 17"
          stroke="url(#check-gradient)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />

        {/* Outer sparkle dots */}
        <circle cx="20" cy="2" r="1.2" fill="#c4b5fd" opacity="0.8" />
        <circle cx="38" cy="20" r="1.2" fill="#c4b5fd" opacity="0.6" />
        <circle cx="2" cy="20" r="1.2" fill="#c4b5fd" opacity="0.6" />

        <defs>
          <linearGradient id="outer-ring" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e1040" />
            <stop offset="100%" stopColor="#0d0820" />
          </radialGradient>
          <radialGradient id="inner-glow" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lightning-gradient" x1="14" y1="8" x2="26" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e9d5ff" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="check-gradient" x1="13" y1="20" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span
          className="font-bold tracking-tight"
          style={{
            fontSize: size * 0.65,
            background: "linear-gradient(135deg, #e9d5ff 0%, #a78bfa 50%, #7c3aed 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          VibeMax
        </span>
      )}
    </div>
  );
}
