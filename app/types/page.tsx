"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { personalities } from "@/lib/data";

export default function TypesPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0f1016] p-4 md:p-12 font-outfit relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto space-y-16 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
            <div className="space-y-4">
                <Link href="/">
                    <Button variant="ghost" className="pl-0 text-slate-400 hover:text-indigo-400 hover:bg-transparent transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> 返回主页
                    </Button>
                </Link>
                <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white">
                    人格属性 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">全览图谱</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl">
                    深度探索加密森林中的 16 种核心人格。每一个标签都代表着一种独特的生存哲学与获利逻辑。
                </p>
            </div>
            <div className="flex gap-4">
                <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-indigo-300 uppercase tracking-widest">
                    Collection v1.0
                </div>
            </div>
        </div>

        {/* Grid */}
        <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
            {Object.values(personalities).map((p) => (
                <motion.div key={p.code} variants={item}>
                    <Link href={`/results/${p.code}`}>
                        <Card className="group relative h-full flex flex-col bg-white/5 border-white/10 hover:border-indigo-500/50 shadow-2xl transition-all duration-500 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8">
                            {/* Hover Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="font-mono text-sm font-black px-3 py-1.5 rounded-xl bg-white/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                                        {p.code}
                                    </div>
                                    <div className="w-24 h-24 -mt-4 -mr-4 rounded-3xl overflow-hidden bg-slate-900 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        <img src={p.image} alt={p.name_en} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-white group-hover:text-indigo-300 transition-colors">
                                        {p.name_cn}
                                    </h3>
                                    <div className="text-sm font-medium text-slate-500 tracking-wider">
                                        {p.name_en}
                                    </div>
                                </div>
                                
                                <p className="mt-6 text-slate-400 text-sm leading-relaxed line-clamp-3 font-light mb-8 group-hover:text-slate-300 transition-colors">
                                    {p.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {p.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5 group-hover:border-indigo-500/30 group-hover:text-indigo-300 transition-all">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
      </div>
    </div>
  );
}
