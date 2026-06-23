"use client";

import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  Coins,
  Briefcase,
  Rocket,
  Shield,
  Layers,
  BarChart3,
  Target,
  Zap,
  Users,
  Cpu,
  Sparkles,
} from "lucide-react";

export default function TechBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const iconClass = "text-gold/28 dark:text-gold/22 stroke-[1.2]";
  const labelClass = "font-mono text-[10px] font-semibold text-gold/32 dark:text-gold/26 select-none";

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 tech-grid-overlay opacity-50" />

      <div className="absolute left-[-180px] top-[12%] w-[450px] h-[450px] opacity-[0.2] dark:opacity-[0.12] text-gold animate-spin-slow hidden md:block">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="15 8" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.3" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="absolute right-[-180px] top-[45%] w-[500px] h-[500px] opacity-[0.18] dark:opacity-[0.1] text-gold animate-spin-slow-reverse hidden md:block">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="10 12" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="absolute left-[-150px] top-[75%] w-[400px] h-[400px] opacity-[0.15] dark:opacity-[0.08] text-gold animate-spin-slow hidden md:block">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="6 3" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Bare icons — no background boxes */}
      <TrendingUp className={`absolute left-[6%] top-[20%] w-10 h-10 ${iconClass} animate-float hidden md:block`} />
      <Coins className={`absolute left-[10%] top-[38%] w-8 h-8 ${iconClass} animate-float-delayed hidden md:block`} />
      <Rocket className={`absolute right-[8%] top-[16%] w-12 h-12 ${iconClass} animate-spin-slow hidden md:block`} />
      <Briefcase className={`absolute left-[42%] top-[56%] w-9 h-9 ${iconClass} animate-float hidden md:block`} />
      <BarChart3 className={`absolute right-[6%] top-[80%] w-10 h-10 ${iconClass} animate-float-delayed hidden md:block`} />
      <Target className={`absolute right-[20%] top-[46%] w-7 h-7 ${iconClass} animate-pulse hidden md:block`} />
      <Shield className={`absolute left-[16%] top-[76%] w-8 h-8 ${iconClass} animate-float hidden md:block`} />
      <Layers className={`absolute right-[32%] top-[28%] w-6 h-6 ${iconClass} hidden md:block`} />
      <Users className={`absolute left-[28%] top-[10%] w-7 h-7 ${iconClass} animate-float-delayed hidden md:block`} />
      <Cpu className={`absolute right-[4%] top-[60%] w-8 h-8 ${iconClass} hidden md:block`} />
      <Zap className={`absolute left-[52%] top-[83%] w-6 h-6 text-accent/25 dark:text-accent/20 stroke-[1.2] animate-pulse hidden md:block`} />
      <Sparkles className={`absolute right-[38%] top-[68%] w-6 h-6 ${iconClass} animate-float hidden md:block`} />

      {/* Floating stat labels — text only */}
      <span className={`absolute top-[14%] right-[18%] font-display font-semibold text-[10px] uppercase tracking-wider ${labelClass} animate-float hidden md:block`}>
        ₹2Cr+ Raised
      </span>
      <span className={`absolute top-[62%] left-[4%] font-display font-semibold text-[10px] uppercase tracking-wider ${labelClass} animate-float-delayed hidden md:block`}>
        50+ Partners
      </span>
      <span className={`absolute top-[88%] right-[14%] font-display font-semibold text-[10px] uppercase tracking-wider ${labelClass} animate-float hidden md:block`}>
        6-Wk Sprint
      </span>

      <div className={`absolute top-[8%] left-[10%] ${labelClass} hidden md:block`}>+ GTM.FLOW</div>
      <div className={`absolute top-[28%] right-[14%] ${labelClass} hidden md:block`}>+ SCALE.INIT</div>
      <div className={`absolute top-[52%] left-[7%] ${labelClass} hidden md:block`}>+ CAP_TABLE</div>
      <div className={`absolute top-[72%] right-[10%] ${labelClass} hidden md:block`}>+ VC.MATCH</div>

      <div className="absolute left-[2%] top-[34%] h-[180px] w-px bg-gradient-to-b from-transparent via-gold/25 dark:via-gold/15 to-transparent hidden md:block" />
      <div className="absolute right-[2%] top-[64%] h-[180px] w-px bg-gradient-to-b from-transparent via-gold/25 dark:via-gold/15 to-transparent hidden md:block" />

      <div className="absolute top-[18%] left-[22%] w-3 h-3 border border-gold/30 rotate-45 animate-pulse hidden md:block" />
      <div className={`absolute top-[38%] left-[4%] ${labelClass} hidden md:block`}>{"{/* COHORT_04 */}"}</div>
      <div className="absolute top-[64%] right-[18%] w-2 h-2 bg-gold/30 rounded-full animate-ping hidden md:block" />
      <div className={`absolute top-[82%] left-[26%] ${labelClass} hidden md:block`}>{"<EGA_PORTFOLIO>"}</div>
      <div className="absolute top-[48%] right-[7%] w-4 h-4 border border-dashed border-gold/25 rounded-full animate-spin-slow hidden md:block" />
      <div className={`absolute top-[92%] right-[24%] ${labelClass} hidden md:block`}>CM2_SAVINGS = 40%</div>
      <div className={`absolute top-[4%] right-[24%] ${labelClass} hidden md:block`}>MRR: ₹10L+</div>
    </div>
  );
}
