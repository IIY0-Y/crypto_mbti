"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { questions, Dimension } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "../../lib/utils";

// Helper for classnames since I missed exporting it from helpers, 
// using local version or standard import if I had it. 
// I'll inline a simple clsx/twMerge generic valid one.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
function cn_local(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SCALE_VALUES = [
  { value: -5, size: "h-11 w-11 sm:h-14 sm:w-14 md:h-20 md:w-20", label: "强烈不同意", color: "bg-rose-500/20 border-rose-500 hover:bg-rose-500/40 text-rose-500" },
  { value: -3, size: "h-9 w-9 sm:h-11 sm:w-11 md:h-16 md:w-16", label: "不同意", color: "bg-rose-500/15 border-rose-500/80 hover:bg-rose-500/30 text-rose-500" },
  { value: -1, size: "h-7 w-7 sm:h-9 sm:w-9 md:h-12 md:w-12", label: "轻微不同意", color: "bg-rose-500/10 border-rose-500/60 hover:bg-rose-500/20 text-rose-500" },
  { value: 0, size: "h-6 w-6 sm:h-7 sm:w-7 md:h-10 md:w-10", label: "中立", color: "bg-slate-500/10 border-slate-500 hover:bg-slate-500/30 text-slate-500" },
  { value: 1, size: "h-7 w-7 sm:h-9 sm:w-9 md:h-12 md:w-12", label: "轻微同意", color: "bg-indigo-500/10 border-indigo-500/60 hover:bg-indigo-500/20 text-indigo-500" },
  { value: 3, size: "h-9 w-9 sm:h-11 sm:w-11 md:h-16 md:w-16", label: "同意", color: "bg-indigo-500/15 border-indigo-500/80 hover:bg-indigo-500/30 text-indigo-500" },
  { value: 5, size: "h-11 w-11 sm:h-14 sm:w-14 md:h-20 md:w-20", label: "强烈同意", color: "bg-indigo-500/20 border-indigo-500 hover:bg-indigo-500/40 text-indigo-500" },
];

export default function TestPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    if (isTransitioning) return;
    
    // Immediately record the answer
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setDirection(1);
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsTransitioning(false);
      } else {
        finishTest(newAnswers);
      }
    }, 400); // Slightly longer for smoother feel and better guard
  };

  const handleNext = () => {
    if (isTransitioning) return;
    if (answers[question.id] === undefined) return;
    
    if (currentQuestionIndex < questions.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishTest(answers);
    }
  };

  const handleBack = () => {
    if (isTransitioning) return;
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const finishTest = (finalAnswers: Record<number, number>) => {
    setIsTransitioning(true);
    let scores: Record<Dimension, number> = {
      Time: 0,
      Risk: 0,
      Decision: 0,
      Role: 0,
    };

    questions.forEach((q) => {
      const ans = finalAnswers[q.id] || 0;
      const multiplier = q.isReverse ? -1 : 1;
      scores[q.dimension] += (ans * multiplier);
    });

    const timeChar = scores.Time >= 0 ? "L" : "S";
    const riskChar = scores.Risk >= 0 ? "A" : "C";
    const decisionChar = scores.Decision >= 0 ? "E" : "R";
    const roleChar = scores.Role >= 0 ? "B" : "P";

    const typeCode = `${timeChar}${riskChar}${decisionChar}${roleChar}`;

    const queryParams = new URLSearchParams();
    queryParams.set("time", scores.Time.toString());
    queryParams.set("risk", scores.Risk.toString());
    queryParams.set("decision", scores.Decision.toString());
    queryParams.set("role", scores.Role.toString());

    router.push(`/results/${typeCode}?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0f1016] relative overflow-hidden font-outfit">
       {/* Premium Background */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
           <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
       </div>

      <div className="max-w-4xl w-full space-y-12 z-10">
        {/* Progress Bar Header */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
             <div className="space-y-1">
                <div className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">行为分析进度 / Analysis Progress</div>
                <div className="text-2xl font-black text-white">{currentQuestionIndex + 1} <span className="text-slate-600">/ {questions.length}</span></div>
             </div>
             <div className="text-right">
                <div className="text-3xl font-black text-white">{Math.round(progress)}%</div>
             </div>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
             <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
             />
          </div>
        </div>

        <div className="relative min-h-[500px]">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
                <motion.div
                    key={currentQuestionIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: direction * -50, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute w-full"
                >
                    <Card className="flex flex-col items-center text-center p-6 sm:p-12 md:p-20 space-y-12 md:space-y-16 shadow-2xl border-white/10 bg-white/5 backdrop-blur-3xl rounded-2xl sm:rounded-[3rem]">
                        <div className="space-y-4 md:space-y-6">
                            <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[8px] md:text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] md:tracking-[0.4em]">
                                {question.dimension} Dimension
                            </div>
                            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight md:leading-[1.15] tracking-tight max-w-2xl mx-auto">
                                {question.statement}
                            </h3>
                        </div>

                        <div className="space-y-10 w-full max-w-2xl mx-auto">
                            <div className="flex justify-between px-2 text-xs md:text-sm font-black uppercase tracking-widest">
                                <span className="text-rose-400 opacity-80">非常不同意</span>
                                <span className="text-indigo-400 opacity-80">非常同意</span>
                            </div>

                            <div className="flex items-center justify-between gap-2 md:gap-4">
                                {SCALE_VALUES.map((scale) => {
                                    const isSelected = answers[question.id] === scale.value;
                                    return (
                                        <button
                                            key={scale.value}
                                            onClick={() => handleAnswer(scale.value)}
                                            disabled={isTransitioning}
                                            className={cn_local(
                                                 "rounded-full transition-all duration-300 flex items-center justify-center border-2 group relative",
                                                 scale.size,
                                                 scale.color,
                                                 isSelected 
                                                     ? "ring-4 ring-white/20 ring-offset-4 ring-offset-[#0f1016] opacity-100 bg-opacity-100 scale-110 shadow-2xl" 
                                                     : "bg-transparent opacity-40 hover:opacity-100 hover:scale-110 shadow-lg shadow-black/20",
                                                 isTransitioning && "cursor-not-allowed"
                                             )}
                                             aria-label={scale.label}
                                         >
                                            <div className={cn_local(
                                                "absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity",
                                                isSelected ? "opacity-20" : ""
                                            )} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>

        <div className="flex justify-between items-center px-4">
            <Button 
                variant="ghost" 
                size="lg"
                onClick={handleBack} 
                disabled={currentQuestionIndex === 0 || isTransitioning}
                className="text-slate-500 hover:text-white hover:bg-white/5 rounded-full px-8 h-14"
            >
                <ArrowLeft className="mr-3 h-5 w-5" /> 上一题
            </Button>
            
            <Button
                variant={answers[question.id] !== undefined ? "glow" : "secondary"}
                size="lg"
                onClick={handleNext}
                disabled={answers[question.id] === undefined || isTransitioning}
                className="h-14 px-12 rounded-full font-bold text-lg min-w-[160px]"
            >
                 {currentQuestionIndex === questions.length - 1 ? "完成测评" : "下一题"}
                 <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
        </div>
      </div>
    </div>
  );
}
