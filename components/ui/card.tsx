"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={hoverEffect ? { opacity: 0, y: 20 } : undefined}
        whileInView={hoverEffect ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true }}
        whileHover={hoverEffect ? { y: -5, boxShadow: "0 10px 40px -10px rgba(120,119,198,0.3)" } : undefined}
        className={cn(
          "rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";

export { Card };
