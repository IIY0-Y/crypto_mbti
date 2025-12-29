"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TraitBarProps {
  label: string; // The specific trait name e.g. "Tactics"
  leftLabel: string; // e.g. "Judging"
  rightLabel: string; // e.g. "Prospecting"
  score: number; // -20 to 20
  color: string; // Tailwnd color class e.g. "bg-purple-500"
}

export function TraitBar({ label, leftLabel, rightLabel, score, color }: TraitBarProps) {
  // Normalize score (-20 to 20) to percentage (0 to 100)
  // -20 -> 0% (Left wins 100%)
  // 0 -> 50%
  // 20 -> 100% (Right wins 100%)
  
  // Calculate percentage for the circle position
  const rawPercent = ((score + 20) / 40) * 100;
  const clampedPercent = Math.min(100, Math.max(0, rawPercent));
  
  // Determine which side is dominant
  const isRightDominant = score > 0;
  const dominantPercent = Math.abs(score) / 20 * 100; // 0 to 100 representation of strength

  return (
    <div className="w-full space-y-3">
      {/* Top Labels */}
      <div className="flex justify-between items-end text-sm font-bold tracking-wide uppercase text-muted-foreground/80">
        <span className={cn(score < 0 ? "text-foreground" : "")}>{leftLabel}</span>
        <span className={cn(score > 0 ? "text-foreground" : "")}>{rightLabel}</span>
      </div>

      {/* The Bar */}
      <div className="relative h-4 w-full bg-secondary/50 rounded-full overflow-hidden flex items-center">
        {/* Center Divider */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-background z-10 opacity-50" />
        
        {/* Fill Bar - This is tricky. 
            If score is negative (Left), we want to fill from Center to Left.
            If score is positive (Right), we want to fill from Center to Right.
        */}
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(Math.abs(score) / 20) * 50}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn("h-full absolute top-0", color)}
            style={{
                left: score < 0 ? 'auto' : '50%',
                right: score < 0 ? '50%' : 'auto',
            }}
        />
      </div>

      {/* Percent Label */}
      <div className="flex justify-between text-xs font-mono text-muted-foreground">
        <span className={cn("transition-opacity", score < 0 ? "opacity-100 font-bold text-" + color.split('-')[1] + "-400" : "opacity-0")}>
            {score < 0 ? `${Math.round(dominantPercent)}%` : ""}
        </span>
         <span className="text-xs uppercase font-black text-slate-500/80 dark:text-slate-400/90 tracking-[0.2em]">{label}</span>
        <span className={cn("transition-opacity", score > 0 ? "opacity-100 font-bold text-" + color.split('-')[1] + "-400" : "opacity-0")}>
            {score > 0 ? `${Math.round(dominantPercent)}%` : ""}
        </span>
      </div>
    </div>
  );
}
