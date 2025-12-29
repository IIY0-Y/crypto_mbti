"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TraitBarProps {
  label: string;
  leftLabel: string;
  rightLabel: string;
  score?: number; // Make optional with default
  color?: string; // e.g. "bg-indigo-500"
}

export function TraitBar({ label, leftLabel, rightLabel, score = 0, color = "bg-indigo-500" }: TraitBarProps) {
  // Safe parsing for color - assume format like "bg-colorname-500"
  let colorTheme = "indigo";
  try {
    const parts = color.split('-');
    if (parts.length >= 2) {
      colorTheme = parts[1];
    }
  } catch (e) {
    console.error("Color parse error", e);
  }

  const rawPercent = ((score + 20) / 40) * 100;
  const clampedPercent = Math.min(100, Math.max(0, rawPercent || 0));
  const dominantPercent = (Math.abs(score) / 20) * 100;

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between items-end text-[10px] md:text-sm font-bold tracking-wide uppercase text-muted-foreground/80">
        <span className={cn(score < 0 ? "text-foreground" : "")}>{leftLabel}</span>
        <span className={cn(score > 0 ? "text-foreground" : "")}>{rightLabel}</span>
      </div>

      <div className="relative h-4 w-full bg-slate-200 dark:bg-slate-800/50 rounded-full overflow-hidden flex items-center">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-background z-10 opacity-30" />
        
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(Math.min(20, Math.abs(score)) / 20) * 50}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={cn("h-full absolute top-0", color)}
            style={{
                left: score < 0 ? 'auto' : '50%',
                right: score < 0 ? '50%' : 'auto',
            }}
        />
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono">
        <div className="w-12">
            <span className={cn("transition-opacity duration-500", score < 0 ? "opacity-100 font-bold" : "opacity-0")} style={{ color: `var(--${colorTheme}-400)` }}>
                {score < 0 ? `${Math.round(dominantPercent)}%` : ""}
            </span>
        </div>
        <span className="text-[9px] md:text-xs uppercase font-black text-slate-500/60 tracking-[0.2em]">{label}</span>
        <div className="w-12 text-right">
            <span className={cn("transition-opacity duration-500", score > 0 ? "opacity-100 font-bold" : "opacity-0")} style={{ color: `var(--${colorTheme}-400)` }}>
                {score > 0 ? `${Math.round(dominantPercent)}%` : ""}
            </span>
        </div>
      </div>
    </div>
  );
}
