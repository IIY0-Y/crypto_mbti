"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Share2, Target, ShieldAlert, Zap, Activity, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TraitBar } from "@/components/ui/trait-bar";
import { cn } from "@/lib/utils";
import { type Personality } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useEffect, useState } from "react";

interface ResultsViewProps {
    personality: Personality | null;
    code: string;
    scores: {
        Time: number;
        Risk: number;
        Decision: number;
        Role: number;
    };
}

export function ResultsView({ personality, code, scores }: ResultsViewProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
        setMounted(true);
    } catch (e) {
        setError(String(e));
    }
  }, []);

  if (error) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0b10] text-white">
            <div className="text-center space-y-4">
                <ShieldAlert className="w-12 h-12 mx-auto text-rose-500" />
                <h2 className="text-xl font-bold">Dossier Access Error</h2>
                <p className="text-slate-400 text-sm">A technical issue occurred loading this report.</p>
                <Link href="/" className="inline-block px-6 py-2 bg-indigo-600 rounded-full font-bold">Return Home</Link>
            </div>
        </div>
    );
  }

  if (!mounted) {
    return (
        <div className="min-h-screen bg-[#0a0b10] flex items-center justify-center">
            <div className="text-white font-black tracking-widest animate-pulse">LOADING DOSSIER...</div>
        </div>
    );
  }

  if (!personality) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="p-8 text-center max-w-md w-full">
                <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h1 className="text-2xl font-bold mb-4">{t("未找到人格类型", "Type Not Found")}</h1>
                <p className="text-muted-foreground mb-6">{t(`未找到代码为 "${code}" 的人格类型。`, `We couldn't find a personality type matching code "${code}".`)}</p>
                <Link href="/test" className="w-full">
                    <div className="w-full h-11 bg-[#6366f1] text-white hover:bg-[#4f46e5] rounded-lg flex items-center justify-center font-medium transition-colors">
                        {t("重新测评", "Retake Test")}
                    </div>
                </Link>
            </Card>
        </div>
    );
  }

  const handleShare = async () => {
    try {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            await navigator.clipboard.writeText(url);
            alert(t("链接已复制", "Link copied!"));
        } else {
            const input = document.createElement('input');
            input.value = url;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            alert(t("链接已复制", "Link copied!"));
        }
    } catch (err) {
        console.error("Share error:", err);
        alert(t("复制失败，请手动复制网址", "Failed to copy. Please copy the URL manually."));
    }
  };

  // Safely get arrays
  const tags = Array.isArray(personality.tags) ? personality.tags : [];
  const strengths = Array.isArray(personality.strengths) ? personality.strengths : [];
  const weaknesses = Array.isArray(personality.weaknesses) ? personality.weaknesses : [];

  return (
    <div className="min-h-screen pb-20 bg-[#f5f7fa] dark:bg-[#0f1016] text-slate-900 dark:text-slate-50 transition-colors font-outfit overflow-x-hidden">
      
      {/* 1. Hero Header - REDESIGNED FOR MASSIVE "FULL SCREEN" IMMERSION */}
      <div className={cn(
          "w-full min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center text-center relative overflow-hidden px-4",
          "bg-[#0a0b10] text-white" 
      )}>
         {/* Background Effects - Deep Forest Texture */}
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0b10] z-20" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-100" />
         
         {/* Wave Divider Segment (Reduced blur for mobile stability) */}
         <div className="absolute top-[30%] left-[-25%] w-[150%] h-[100%] bg-indigo-500/5 rounded-[100%] blur-[60px] md:blur-[120px] opacity-40 animate-pulse" />

         <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="z-30 relative w-full h-full flex flex-col items-center py-10"
         >
            {/* Massive Background Image for Immersion */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[80vh] pointer-events-none opacity-10 md:opacity-20 blur-[2px]">
                 <img 
                    src={personality.image || ""} 
                    alt="Background Glow"
                    className="w-full h-full object-contain scale-[1.3] md:scale-[1.5]"
                />
            </div>

            <div className="space-y-4 md:space-y-6">
                <div className="uppercase tracking-[0.4em] md:tracking-[0.6em] text-[8px] md:text-sm font-black text-indigo-400/80 mb-2 flex items-center justify-center gap-3 md:gap-6">
                    <span className="h-px w-6 md:w-16 bg-indigo-400/30" />
                    {t("测评报告 / GENETIC DOSSIER", "测评报告 / GENETIC DOSSIER")}
                    <span className="h-px w-6 md:w-16 bg-indigo-400/30" />
                </div>
            </div>
            
            {/* Personality Avatar - THE FOCUS */}
            <motion.div 
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ 
                    delay: 0.2, 
                    type: "spring", 
                    stiffness: 80, 
                    damping: 20 
                }}
                className="w-full max-w-4xl h-[45vh] md:h-[65vh] relative mt-4 md:mt-8 group"
            >
                {/* Master Glow (Reduced for mobile) */}
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-[40px] md:blur-[180px] opacity-40 group-hover:scale-110 transition-transform duration-[2000ms]" />
                
                <img 
                    src={personality.image || ""} 
                    alt={personality.name_en || "Personality"}
                    className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:drop-shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
                />
            </motion.div>

            <div className="space-y-2 md:space-y-4 pt-6 md:pt-16 pb-12 relative z-30">
                <motion.h1 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl sm:text-6xl md:text-[11rem] font-black tracking-tighter text-white leading-[1] md:leading-[0.8] drop-shadow-2xl px-4"
                >
                    {personality.name_cn}
                </motion.h1>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.6 }}
                    className="text-[10px] sm:text-xl md:text-6xl font-thin tracking-[0.2em] md:tracking-[0.5em] text-indigo-200 uppercase italic"
                >
                    {personality.name_en}
                </motion.div>
                
                <div className="pt-6 md:pt-10 flex flex-wrap justify-center gap-2 md:gap-3 px-4">
                    {tags.map((tag, idx) => (
                        <span key={idx} className="px-3 md:px-6 py-1.5 md:py-2 bg-white/5 backdrop-blur-xl rounded-full text-[8px] md:text-xs font-black text-indigo-300 border border-white/10 uppercase tracking-widest">
                            # {tag}
                        </span>
                    ))}
                </div>
            </div>
         </motion.div>
      </div>

        {/* 2. Professional Traits - REDESIGNED FOR DENSITY */}
        <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-40">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <Card className="p-6 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] bg-slate-900 border-white/5 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-indigo-500/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8 md:mb-16">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/20">
                                <Activity className="h-5 w-5 md:h-6 md:w-6 text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-3xl font-black text-white">{t("核心人格维度 / Personality Traits", "Personality Traits")}</h3>
                                <p className="text-[10px] md:text-sm text-slate-500 font-medium">{t("行为金融学维度分析 / BEHAVIORAL ANALYSIS", "BEHAVIORAL ANALYSIS")}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 md:gap-y-12">
                            <TraitBar 
                                label={t("时间倾向", "Time Preference")}
                                leftLabel={t("短期 (S)", "Short-term (S)")}
                                rightLabel={t("长期 (L)", "Long-term (L)")}
                                score={scores?.Time ?? 0}
                                color="bg-indigo-500"
                            />
                            <TraitBar 
                                label={t("风险特征", "Risk Profile")}
                                leftLabel={t("稳健 (C)", "Conservative (C)")}
                                rightLabel={t("激进 (A)", "Aggressive (A)")}
                                score={scores?.Risk ?? 0}
                                color="bg-rose-500"
                            />
                            <TraitBar 
                                label={t("决策逻辑", "Decision Logic")}
                                leftLabel={t("理性 (R)", "Rational (R)")}
                                rightLabel={t("感性 (E)", "Emotional (E)")}
                                score={scores?.Decision ?? 0}
                                color="bg-emerald-500"
                            />
                            <TraitBar 
                                label={t("生态角色", "Eco-Role")}
                                leftLabel={t("参与 (P)", "Participant (P)")}
                                rightLabel={t("建设 (B)", "Builder (B)")}
                                score={scores?.Role ?? 0}
                                color="bg-purple-500"
                            />
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>

        {/* 3. Deep Analysis Section */}
        <div className="max-w-7xl mx-auto px-4 mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Left Column - Description & Quote */}
            <div className="md:col-span-7 space-y-8 md:space-y-12">
                <motion.section 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6 md:space-y-8"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-indigo-500 rounded-full" />
                        <h2 className="text-2xl md:text-4xl font-black tracking-tight">{t("深度档案分析 / Dossier Analysis", "Dossier Analysis")}</h2>
                    </div>
                    <p className="text-base md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-light first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-indigo-500">
                        {personality.description}
                    </p>
                </motion.section>

                <motion.div 
                   initial={{ opacity: 0, scale: 0.98 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="relative p-8 md:p-12 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-white/5 overflow-hidden group shadow-xl"
                >
                    <Quote className="absolute -top-4 -left-4 w-16 h-16 md:w-24 md:h-24 text-indigo-500/10 group-hover:scale-110 transition-transform" />
                    <p className="text-xl md:text-3xl font-black italic text-slate-800 dark:text-slate-200 leading-tight relative z-10">
                        "{personality.quote}"
                    </p>
                </motion.div>
            </div>

            {/* Right Column - Stats & Figures */}
            <div className="md:col-span-5 space-y-8 md:space-y-12">
                <div className="grid grid-cols-1 gap-6">
                    {/* Strengths */}
                    <Card className="p-6 md:p-10 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem]">
                        <div className="flex items-center gap-4 mb-6 md:mb-8">
                            <div className="p-2 md:p-3 bg-emerald-500/20 rounded-xl text-emerald-500"><Zap className="w-5 h-5 md:w-6 md:h-6" /></div>
                            <h4 className="text-lg md:text-2xl font-black text-emerald-500">{t("基因优势 / Strengths", "Strengths")}</h4>
                        </div>
                        <ul className="space-y-3 md:space-y-5">
                            {strengths.map((s, i) => (
                                <li key={i} className="flex items-start gap-3 md:gap-4 text-sm md:text-base font-medium text-slate-700 dark:text-slate-400">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Weaknesses */}
                    <Card className="p-6 md:p-10 bg-rose-500/5 border-rose-500/20 rounded-[2rem]">
                        <div className="flex items-center gap-4 mb-6 md:mb-8">
                            <div className="p-2 md:p-3 bg-rose-500/20 rounded-xl text-rose-500"><ShieldAlert className="w-5 h-5 md:w-6 md:h-6" /></div>
                            <h4 className="text-lg md:text-2xl font-black text-rose-500">{t("潜在弱点 / Weaknesses", "Weaknesses")}</h4>
                        </div>
                        <ul className="space-y-3 md:space-y-5">
                            {weaknesses.map((w, i) => (
                                <li key={i} className="flex items-start gap-3 md:gap-4 text-sm md:text-base font-medium text-slate-700 dark:text-slate-400">
                                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 shrink-0" />
                                    {w}
                                </li>
                            ))}
                        </ul>
                    </Card>
                    
                    {/* Famous Soulmate */}
                    <Card className="p-6 md:p-10 bg-indigo-500 shadow-2xl shadow-indigo-500/30 text-white rounded-[2rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-[40px] md:blur-[60px] translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
                        <div className="relative z-10 space-y-3 md:space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-100/70">{t("同频灵魂 / FAMOUS SOULMATE", "FAMOUS SOULMATE")}</h4>
                            <div className="text-2xl md:text-4xl font-black leading-tight">
                                {personality.famous_figure?.name || "Archetype"}
                            </div>
                            <p className="text-xs md:text-base text-indigo-50 font-medium leading-relaxed opacity-80">
                                {personality.famous_figure?.description}
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>

        {/* 5. Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 py-12 md:py-20 px-4">
            <Link href="/" className="w-full sm:w-auto h-14 md:h-16 px-6 md:px-8 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-white/5 inline-flex items-center justify-center font-bold transition-colors shadow-sm">
                <ArrowLeft className="mr-2 h-5 w-5" /> {t("返回首页", "Home")}
            </Link>
            <Link href="/types" className="w-full sm:w-auto h-14 md:h-16 px-6 md:px-8 rounded-full bg-slate-800 text-white hover:bg-slate-700 inline-flex items-center justify-center font-bold transition-colors">
                 {t("发现所有 人格", "View All Types")}
            </Link>
            <Button variant="glow" size="xl" className="w-full sm:w-auto rounded-full px-8 md:px-12 h-14 md:h-16 bg-indigo-600 text-white shadow-xl shadow-indigo-500/20" onClick={handleShare}>
                <Share2 className="mr-2 h-5 w-5" /> {t("分享结果", "Share Results")}
            </Button>
        </div>
    </div>
  );
}
