"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Brain, TrendingUp, Shield, Activity, Sparkles, Zap, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] dark:bg-[#0f1016] text-slate-900 dark:text-slate-50 overflow-hidden font-outfit selection:bg-indigo-500/30">
        
      {/* Decorative blobs */}
      <div className="fixed top-[-10%] left-[-5%] w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px] pointer-events-none" />
      
      {/* Navbar to emulate standard site feel */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tight">
             <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center text-white">
                <Brain className="w-6 h-6" />
             </div>
             <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                Crypto MBTI
             </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
            <Link href="/types" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">人格全览</Link>
            <Link href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">设计哲学</Link>
        </div>
        <div className="flex items-center gap-4">
            <Link href="/test" className="font-semibold text-indigo-500 hover:text-indigo-600 hover:bg-indigo-500/10 hidden sm:flex h-9 px-3 text-xs items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring select-none">
                重新测评
            </Link>
            <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full border-slate-200 dark:border-white/10 font-bold"
                onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
            >
                {language === "zh" ? "EN" : "ZH"}
            </Button>
        </div>
      </nav>


      <main className="relative z-10 max-w-7xl mx-auto px-4 pt-10 pb-20 flex flex-col items-center justify-center text-center">
        
        {/* Main Hero */}
        <motion.div 
            initial="initial"
            animate="animate"
            variants={{
                animate: { transition: { staggerChildren: 0.1 } }
            }}
            className="max-w-5xl mx-auto mt-12 mb-20 space-y-10"
        >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-indigo-100 dark:border-white/10 shadow-sm backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {t("Web3 领域最权威的行为金融学测评", "The Most Decisive Behavioral Finance Test in Web3")}
                </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl md:text-[7rem] font-black tracking-tighter leading-[1] md:leading-[0.85] py-4">
                {t("谁是加密", "Who Rules")} <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">
                    {t("黑暗森林", "Dark Forest")} 
                </span>
                {t("的主宰？", "?")}
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-3xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-light px-4">
                市场是一面镜子。通过 16 个人格标签，深度发现你的交易心理，<br className="hidden md:block"/>释放优势，在残酷的加密生态中找到属于你的王座。
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4">
                <Link 
                    href="/test" 
                    className="w-full sm:w-auto h-16 md:h-18 px-8 md:px-12 rounded-full text-lg md:text-xl shadow-2xl shadow-indigo-500/40 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 dark:shadow-indigo-900/60 transition-all hover:scale-105 active:scale-95 border-0 inline-flex items-center justify-center font-bold text-white"
                >
                    {t("立即开始免费分析", "Start Free Analysis")} <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />
                </Link>
                <Link 
                    href="/types" 
                    className="w-full sm:w-auto h-16 md:h-18 px-8 md:px-12 rounded-full text-lg md:text-xl border-2 hover:bg-slate-50 dark:hover:bg-white/5 backdrop-blur-sm inline-flex items-center justify-center font-medium transition-colors"
                >
                    {t("浏览 16 种人格", "Types View")}
                </Link>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="pt-4 flex items-center justify-center gap-8 text-base font-medium text-slate-400">
                <span className="flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500"/> 2 分钟专业测评</span>
                <span className="flex items-center gap-2"><Fingerprint className="w-5 h-5 text-emerald-500"/> 100% 隐私匿名</span>
            </motion.div>

            {/* Hero Image - ULTIMATE DESIGN */}
            <motion.div 
                variants={fadeInUp}
                className="relative mx-auto w-full max-w-6xl mt-12 md:mt-20 aspect-[16/10] md:aspect-[21/9] rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-500/30 border-2 md:border-4 border-white dark:border-white/5 group"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-60" />
                <div className="absolute inset-0 bg-indigo-500/5 mix-blend-overlay z-10" />
                <img 
                    src="/images/landing/HERO.png" 
                    alt="Crypto MBTI World" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3 px-6 py-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                    <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                        <div className="text-sm font-bold text-white">Live Psychology Map</div>
                        <div className="text-xs text-indigo-200">Exploring 1.2k+ nodes</div>
                    </div>
                </div>
            </motion.div>
        </motion.div>


        {/* Feature Grid */}
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-7xl mt-20"
        >
             <FeatureCard 
                image="/images/landing/FEATURE_TIME.png"
                title="时间偏好"
                desc="短期爆发 vs. 长期主义"
                gradient="from-blue-500/20 via-blue-500/5 to-transparent"
             />
             <FeatureCard 
                image="/images/landing/FEATURE_RISK.png"
                title="风险偏好"
                desc="稳健防守 vs. 激进进攻"
                gradient="from-emerald-500/20 via-emerald-500/5 to-transparent"
             />
             <FeatureCard 
                image="/images/landing/FEATURE_DECISION.png"
                title="决策逻辑"
                desc="理性计算 vs. 感性直觉"
                gradient="from-purple-500/20 via-purple-500/5 to-transparent"
             />
             <FeatureCard 
                image="/images/landing/FEATURE_ROLE.png"
                title="市场角色"
                desc="市场参与者 vs. 规则制定者"
                gradient="from-rose-500/20 via-rose-500/5 to-transparent"
             />
        </motion.div>
        
        {/* Philosophy Section */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-7xl mt-48 grid grid-cols-1 md:grid-cols-2 gap-20 items-center text-left"
        >
             <div className="space-y-8">
                 <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-500 uppercase tracking-widest">
                    Design Philosophy
                 </div>
                 <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1]">
                     市场不仅是数据，更是 <br/> 
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-600">
                        集体心理学。
                     </span>
                 </h2>
                 <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                     每一根 K 线，每一次清算，都是人类本性在代码层面的放大。
                     在这个生态系统中，了解自己的角色不仅是为了获利，更是为了在黑暗森林中生存。
                 </p>
                 <div className="pt-4">
                    <Button variant="outline" size="xl" className="rounded-full px-10 border-2 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all">
                        阅读我们的心理学文献
                    </Button>
                 </div>
             </div>
             <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(99,102,241,0.3)] group">
                 <img src="/images/landing/LANDING_PHILOSOPHY.png" alt="Market Psychology" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[3000ms]" />
                 <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-transparent mix-blend-overlay" />
                 <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[3rem]" />
             </div>
        </motion.div>

        {/* Community Section */}
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-7xl mt-48 mb-32 relative rounded-[4rem] overflow-hidden bg-slate-900 text-white py-32 px-6"
        >
             <div className="absolute inset-0 opacity-40">
                 <img src="/images/landing/LANDING_COMMUNITY.png" alt="Community" className="w-full h-full object-cover" />
             </div>
             <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950" />
             
             <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                 <h2 className="text-5xl md:text-7xl font-bold tracking-tight">加入黑暗森林部落</h2>
                 <p className="text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                     与成千上万名已经发现自己真实属性的 Degen、巨鲸和开发者建立连接。
                 </p>
                 <div className="flex flex-wrap justify-center gap-6">
                     <Button size="xl" className="h-16 px-12 rounded-full bg-white text-slate-900 hover:bg-slate-100 border-0 text-lg font-bold">
                        加入 Discord 社群
                     </Button>
                     <Button size="xl" variant="outline" className="h-16 px-12 rounded-full border-white/20 hover:bg-white/10 text-white text-lg font-bold backdrop-blur-md">
                        对比人格差异
                     </Button>
                 </div>
             </div>
        </motion.div>

        {/* Social Proof / Trusted By */}
        <div className="pt-10 border-t border-slate-200 dark:border-white/5 w-full max-w-4xl">
             <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6">Inspired by Real Market Behaviors</p>
             <div className="flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                 {/* Placeholders for logos if needed */}
             </div>
        </div>

      </main>
    </div>
  );
}

function FeatureCard({ image, title, desc, gradient }: { image: string, title: string, desc: string, gradient: string }) {
    return (
        <Card className="group relative overflow-hidden border-0 bg-white dark:bg-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-all duration-300">
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", gradient)} />
            <div className="p-8 flex flex-col items-center text-center relative z-10">
                <div className="w-20 h-20 mb-6 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
            </div>
        </Card>
    )
}
