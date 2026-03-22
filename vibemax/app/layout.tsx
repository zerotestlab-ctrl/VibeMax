import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VibeMax — Your Autonomous Business Team",
  description:
    "Turn one vibe into your full autonomous business team. AI agents that research, qualify, write, and schedule — all in real time.",
  keywords: ["AI agents", "solopreneur", "automation", "business", "VibeMax"],
  openGraph: {
    title: "VibeMax — Your Autonomous Business Team",
    description: "Turn one vibe into your full autonomous business team.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050508] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
