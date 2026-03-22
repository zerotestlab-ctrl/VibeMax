"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateId } from "@/lib/utils";

export default function NewWorkspacePage() {
  const router = useRouter();

  useEffect(() => {
    // Generate a new workspace ID and redirect
    const newId = generateId();
    router.replace(`/workspace/${newId}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center gap-2 text-white/40">
        <div className="h-4 w-4 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        <span className="text-sm">Creating workspace...</span>
      </div>
    </div>
  );
}
