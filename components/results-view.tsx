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

  return (
    <div className="min-h-screen pb-20 bg-[#f5f7fa] dark:bg-[#1a1b26] text-slate-900 dark:text-slate-50 transition-colors font-outfit">
      
      {/* 1. Hero Header - REDESIGNED FOR MASSIVE "FULL SCREEN" IMMERSION */}
      <div className={cn(
          "w-full min-h-[90vh] flex flex-col items-center justify-center text-center relative overflow-hidden px-4",
          "bg-[#0a0b10] text-white" 
      )}>
         {/* Background Effects - Deep Forest Texture */}
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0b10] z-20" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-100" />
         
         {/* Wave Divider Segment (Immersive Full Wave) */}
         <div className="absolute top-[30%] left-[-25%] w-[150%] h-[100%] bg-indigo-500/5 rounded-[100%] blur-[120px] opacity-40 animate-pulse" />

         <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="z-30 relative w-full h-full flex flex-col items-center"
         >
            {/* Massive Background Image for Immersion */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[80vh] pointer-events-none opacity-20 blur-sm">
                 <img 
                    src={personality.image} 
                    alt="Background Glow"
                    className="w-full h-full object-contain scale-[1.5]"
                />
            </div>

            <div className="space-y-4 md:space-y-6 pt-10">
                <div className="uppercase tracking-[0.4em] md:tracking-[0.6em] text-[10px] md:text-sm font-black text-indigo-400/80 mb-2 flex items-center justify-center gap-3 md:gap-6">
                    <span className="h-px w-6 md:w-16 bg-indigo-400/30" />
                    {t("测评报告 / GENETIC DOSSIER", "PERSONALITY REPORT / GENETIC DOSSIER")}
                    <span className="h-px w-6 md:w-16 bg-indigo-400/30" />
                </div>
            </div>
            
            {/* Personality Avatar - THE FOCUS */}
            <motion.div 
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ 
                    delay: 0.3, 
                    type: "spring", 
                    stiffness: 80, 
                    damping: 20 
                }}
                className="w-full max-w-4xl h-[50vh] md:h-[65vh] relative mt-4 md:mt-8 group"
            >
                {/* Master Glow */}
                <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-[100px] md:blur-[180px] opacity-40 group-hover:scale-110 transition-transform duration-[2000ms]" />
                
                <img 
                    src={personality.image} 
                    alt={personality.name_en}
                    className="w-full h-full object-contain relative z-10 drop-shadow-[0_40px_100px_rgba(0,0,0,0.8)] filter contrast-[1.05] brightness-[1.05]"
                />
            </motion.div>

            <div className="space-y-2 md:space-y-4 pt-10 md:pt-16 pb-20 relative z-30">
                <motion.h1 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-6xl md:text-[11rem] font-black tracking-tighter text-white leading-[0.8] drop-shadow-2xl"
                >
                    {personality.name_cn}
                </motion.h1>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.7 }}
                    className="text-xl md:text-6xl font-thin tracking-[0.2em] md:tracking-[0.5em] text-indigo-200 uppercase italic"
                >
                    {personality.name_en}
                </motion.div>
                
                <div className="pt-10 flex flex-wrap justify-center gap-3">
                    {personality.tags.map(tag => (
                        <span key={tag} className="px-6 py-2 bg-white/5 backdrop-blur-3xl rounded-full text-[10px] md:text-xs font-black text-indigo-300 border border-white/10 uppercase tracking-widest">
                            # {tag}
                        </span>
                    ))}
                </div>
            </div>
         </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20 space-y-20">
        
        {/* 2. Professional Traits - REDESIGNED FOR DENSITY */}
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <Card className="p-8 md:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] bg-slate-900 border-white/5 rounded-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-16">
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                            <Activity className="h-6 w-6 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-black text-white">{t("核心人格维度", "Core Personality Traits")}</h3>
                            <p className="text-sm text-slate-500 font-medium">{t("行为金融学数据透视 / Behavioral Finance Insight", "Behavioral Finance Data Perspective")}</p>
                        </div>
                    </div>

                    <div className="grid gap-12 md:gap-16">
                        <TraitBar 
                            label="时间偏好 / Time Preference"
                            leftLabel="短期爆发 (S)" 
                            rightLabel="长期主义 (L)"
                            score={scores.Time}
                            color="bg-indigo-500" 
                        />
                        <TraitBar 
                            label="风险承受 / Risk Tolerance"
                            leftLabel="稳健稳健 (C)" 
                            rightLabel="激进冒险 (A)"
                            score={scores.Risk}
                            color="bg-emerald-500" 
                        />
                        <TraitBar 
                            label="决策逻辑 / Decision Making"
                            leftLabel="纯粹理性 (R)" 
                            rightLabel="感性直觉 (E)"
                            score={scores.Decision}
                            color="bg-purple-500" 
                        />
                        <TraitBar 
                            label="市场角色 / Market Role"
                            leftLabel="交易玩家 (P)" 
                            rightLabel="庄家核心 (B)"
                            score={scores.Role}
                            color="bg-rose-500" 
                        />
                    </div>
                </div>
            </Card>
        </motion.div>

        {/* 3. Famous Figure & Quote */}
         <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
         >
             <div className="md:col-span-1">
                 <Card className="h-full bg-gradient-to-br from-indigo-600 to-purple-800 text-white border-0 p-8 flex flex-col justify-between overflow-hidden relative shadow-xl">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent" />
                    <div className="relative z-10">
                        <div className="text-sm font-bold uppercase tracking-widest opacity-70 mb-2">{t("典型代表", "ARCHETYPE")}</div>
                        <h3 className="text-3xl font-bold mb-4">{personality.famous_figure.name}</h3>
                        <p className="opacity-90 leading-relaxed text-sm">
                            {personality.famous_figure.description}
                        </p>
                    </div>
                    <div className="mt-8 relative z-10">
                         {/* Placeholder for portrait */}
                         <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">
                             {personality.famous_figure.name[0]}
                         </div>
                    </div>
                 </Card>
             </div>

             <div className="md:col-span-2">
                 <Card className="h-full p-10 flex flex-col justify-center items-center text-center bg-white dark:bg-slate-900 border-0 shadow-lg relative overflow-hidden">
                     <Quote className="absolute top-8 left-8 h-12 w-12 text-indigo-100 dark:text-indigo-900/20" />
                     <blockquote className="text-2xl md:text-3xl font-serif italic text-slate-700 dark:text-slate-200 relative z-10">
                        "{personality.quote}"
                     </blockquote>
                 </Card>
             </div>
         </motion.div>

        {/* 4. Strengths & Weaknesses */}
        <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
             <Card className="p-8 border-l-4 border-l-green-500 bg-white dark:bg-slate-900 shadow-lg">
                 <h3 className="text-xl font-bold mb-6 flex items-center text-green-600 dark:text-green-400">
                     <Zap className="mr-2 h-5 w-5" /> {t("核心优势", "Core Strengths")}
                 </h3>
                 <ul className="space-y-4">
                     {personality.strengths.map((str, i) => (
                         <li key={i} className="flex items-start">
                             <div className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                             <span className="text-slate-700 dark:text-slate-300">{str}</span>
                         </li>
                     ))}
                 </ul>
             </Card>
 
             <Card className="p-8 border-l-4 border-l-red-500 bg-white dark:bg-slate-900 shadow-lg">
                 <h3 className="text-xl font-bold mb-6 flex items-center text-red-600 dark:text-red-400">
                     <ShieldAlert className="mr-2 h-5 w-5" /> {t("潜伏风险", "Hidden Risks")}
                 </h3>
                 <ul className="space-y-4">
                     {personality.weaknesses.map((wk, i) => (
                         <li key={i} className="flex items-start">
                             <div className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                             <span className="text-slate-700 dark:text-slate-300">{wk}</span>
                         </li>
                     ))}
                 </ul>
             </Card>
        </motion.div>
 
        {/* 5. Footer Actions */}
        <div className="flex flex-wrap justify-center gap-6 py-12">
            <Link href="/" className="h-16 px-8 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center font-medium transition-colors">
                <ArrowLeft className="mr-2 h-5 w-5" /> {t("返回首页", "Home")}
            </Link>
            <Link href="/types" className="h-16 px-8 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center font-medium transition-colors">
                 {t("发现所有 人格", "View All Types")}
            </Link>
            <Button variant="glow" size="xl" className="rounded-full px-8 bg-indigo-600 text-white" onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("链接已复制！");
            }}>
                <Share2 className="mr-2 h-5 w-5" /> 分享测评结果
            </Button>
        </div>

      </div>
    </div>
  );
}
